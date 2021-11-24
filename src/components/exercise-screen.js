import { useRef, useCallback } from "react";
import styled from "styled-components";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { Text, Image } from "@chakra-ui/react";

import { EXERCISES } from "src/constants/exercises";
import { drawKeypoints, drawSkeleton } from "src/utils/draw";
import estimatePose from "src/utils/estimate-pose";

export default function ExerciseScreen({ id }) {
  const [count, step, checkPoses] = estimatePose(id); // estimatePose 인자로 EXERCISE 배열 id.

  const checkPose = useCallback((pose) => checkPoses(pose), [checkPoses]);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const videoWidth = 640;
  const videoHeight = 480;

  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  async function detectWebcamFeed(posenetModel) {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Estimation
      const pose = await posenetModel.estimateSinglePose(video);
      // Pose Estimation
      checkPose(pose);
      // Draw Result
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
  }

  const runPosenet = async () => {
    const posenetModel = await posenet.load({
      inputResolution: { width: videoWidth, height: videoHeight },
      scale: 0.8,
    });

    setInterval(() => {
      detectWebcamFeed(posenetModel);
    }, 1000);
  };

  runPosenet();

  return (
    <ExerciseScreenWrapper>
      <VideoWrapper>
        <Image
          width={videoWidth}
          height={videoHeight}
          src={EXERCISES[id].image}
          alt={EXERCISES[id].title}
          objectFit="contain"
          border="1px solid #e6e6e6"
          fallbackSrc="/assets/image-placeholder.png"
          opacity={0.3}
        />
        <Explanation>
          {EXERCISES[id].description.map((text, index) => (
            <Text fontSize="xl" fontWeight="medium" key={index}>
              {text}
            </Text>
          ))}
        </Explanation>
      </VideoWrapper>
      <WebcamWrapper>
        <Webcam
          ref={webcamRef}
          style={{
            width: videoWidth,
            height: videoHeight,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <StyledCanvas
          ref={canvasRef}
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
        />
      </WebcamWrapper>
    </ExerciseScreenWrapper>
  );
}

const ExerciseScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WebcamWrapper = styled.div`
  width: 640px;
  height: 480px;
  position: relative;
  margin-left: 20px;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  scale: (-1, 1);
  translate: (-200, 0);
`;

const VideoWrapper = styled.div`
  width: 640px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Explanation = styled.div`
  width: 640px;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
