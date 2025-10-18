import { useState, useEffect, useRef } from "react";
import { FaceLandmarker, HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export interface FocusParameters {
  headDirection: number;
  handActivity: number;
  postureStability: number;
  contextSmoothness: number;
}

export const useFocusDetection = (mode: string) => {
  const [focusScore, setFocusScore] = useState(0.75);
  const [parameters, setParameters] = useState<FocusParameters>({
    headDirection: 0.85,
    handActivity: 0.70,
    postureStability: 0.65,
    contextSmoothness: 0.80,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Initialize MediaPipe models
  useEffect(() => {
    const initializeModels = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });

        const handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 2,
        });

        faceLandmarkerRef.current = faceLandmarker;
        handLandmarkerRef.current = handLandmarker;
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize MediaPipe models:", error);
      }
    };

    initializeModels();

    return () => {
      faceLandmarkerRef.current?.close();
      handLandmarkerRef.current?.close();
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      return stream;
    } catch (error) {
      console.error("Failed to start webcam:", error);
      return null;
    }
  };

  const analyzeFrame = () => {
    if (!videoRef.current || !faceLandmarkerRef.current || !handLandmarkerRef.current) {
      return;
    }

    const video = videoRef.current;
    const timestamp = performance.now();

    // Detect face landmarks
    const faceResults = faceLandmarkerRef.current.detectForVideo(video, timestamp);
    
    // Detect hand landmarks
    const handResults = handLandmarkerRef.current.detectForVideo(video, timestamp);

    // Calculate focus parameters based on mode
    const newParams: FocusParameters = {
      headDirection: calculateHeadDirection(faceResults),
      handActivity: calculateHandActivity(handResults),
      postureStability: 0.65 + Math.random() * 0.2, // Placeholder
      contextSmoothness: 0.80 + Math.random() * 0.15, // Placeholder
    };

    setParameters(newParams);

    // Calculate weighted focus score based on mode
    const weights = getModeWeights(mode);
    const score = 
      newParams.headDirection * weights.headDirection +
      newParams.handActivity * weights.handActivity +
      newParams.postureStability * weights.postureStability +
      newParams.contextSmoothness * weights.contextSmoothness;

    setFocusScore(Math.max(0, Math.min(1, score)));
  };

  const calculateHeadDirection = (results: any): number => {
    if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
      return 0;
    }

    // Simplified head pose estimation using key landmarks
    const landmarks = results.faceLandmarks[0];
    const nose = landmarks[1];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    // Calculate approximate yaw angle
    const eyeCenter = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2,
    };

    const horizontalDeviation = Math.abs(nose.x - eyeCenter.x);
    const verticalDeviation = Math.abs(nose.y - eyeCenter.y);

    // Score: 1.0 = looking straight, 0.0 = looking far away
    const score = 1.0 - Math.min(1.0, (horizontalDeviation + verticalDeviation) * 2);
    return score;
  };

  const calculateHandActivity = (results: any): number => {
    if (!results.landmarks || results.landmarks.length === 0) {
      return mode === "digital" ? 0.7 : 0.3; // Default based on mode
    }

    // Hands detected = activity present
    return 0.7 + Math.random() * 0.2;
  };

  const getModeWeights = (mode: string) => {
    switch (mode) {
      case "digital":
        return { headDirection: 0.6, handActivity: 0.3, postureStability: 0.1, contextSmoothness: 0.0 };
      case "offline":
        return { headDirection: 0.0, handActivity: 0.5, postureStability: 0.2, contextSmoothness: 0.3 };
      case "hybrid":
        return { headDirection: 0.4, handActivity: 0.3, postureStability: 0.1, contextSmoothness: 0.2 };
      default:
        return { headDirection: 0.5, handActivity: 0.3, postureStability: 0.2, contextSmoothness: 0.0 };
    }
  };

  return {
    focusScore,
    parameters,
    isInitialized,
    videoRef,
    startWebcam,
    analyzeFrame,
  };
};
