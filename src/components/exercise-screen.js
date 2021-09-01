import { useRef } from "react";
import styled from "styled-components";

import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";

import { drawKeypoints, drawSkeleton } from "src/utils/draw";
import estimateAction from "src/utils/example-pose-estimation";

export default function App() {
  const webcamRef = useRef(null);
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

  function detectWebcamFeed(posenetModel, movement) {
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
      const pose = posenetModel.estimateSinglePose(video);

      // Pose Estimation (WIP)
      if (estimateAction(pose, movement)){
        return true
      }
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
    return false
  };

  const runPosenet = async () => {
    const posenetModel = await posenet.load({
      inputResolution: { width: videoWidth, height: videoHeight },
      scale: 0.8,
    });
    let move_to_detect = ['start', 'arm-up', 'arm-down']
    let step = 0

    console.log('start!');

    function check_movements (){
      if(step >= move_to_detect.length){
        console.log('finish!');
        clearInterval(movement_timer);
      }
      if ( detectWebcamFeed(posenetModel, move_to_detect[step]) == true){
        console.log('cool! ', move_to_detect[step]);
        step+=1;
      }
    }
    let movement_timer = setInterval(check_movements, 100);


  };

  runPosenet();

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 640px;
  height: 480px;
  position: relative;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
