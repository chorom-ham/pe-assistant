import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import * as posenet from "@tensorflow-models/posenet";

import { drawKeypoints, drawSkeleton } from "src/utils/draw";
import estimatePose from "src/utils/estimate-pose";

export default function ExerciseScreen() {
  const [isVideoReady, setIsVideoReady] = useState(true);
  // action: 동작명. 아래 estimatePose 인자를 동작명으로 변경해서 테스트
  const [count, step, checkPoses] = estimatePose("bandupper");
  const checkPose = useCallback((pose) => checkPoses(pose), [checkPoses]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const videoWidth = 640;
  const videoHeight = 480;

  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  async function detectVideo(posenetModel) {
    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null &&
      isVideoReady
    ) {
      // Get Video Properties
      const video = videoRef.current;
      const videoWidth = videoRef.current.style.width;
      const videoHeight = videoRef.current.style.height;
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
      architecture: "MobileNetV1",
      multiplier: 0.5,
      inputResolution: { width: videoWidth, height: videoHeight },
      scale: 0.8,
    });

    setInterval(() => {
      detectVideo(posenetModel);
    }, 100);
  };

  runPosenet();

  const checkIsReady = (event) => {
    console.log(event);
    if (event.target.readyState === 4) {
      setIsVideoReady(true);
    }
  };

  return (
    <>
      <Wrapper>
        {/* src에 비디오 파일 경로 넣어주면 됨*/}
        <Video
          src="../../public/assets/bandupper.mov"
          type="video/mov"
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          autoPlay
          muted
          playsInline
          onLoadStart={() => {
            setIsVideoReady(false);
          }}
          onLoadedData={checkIsReady}
        />
        <StyledCanvas
          ref={canvasRef}
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
        />
      </Wrapper>
      <p>
        step:{step} / count: {count}
      </p>
    </>
  );
}

const Wrapper = styled.div`
  width: 640px;
  height: 480px;
  position: relative;
`;

const Video = styled.video``;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
