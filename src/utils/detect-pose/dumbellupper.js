import { useState, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Dumbellupper() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const checkPoses = useCallback((pose) => {
    const {
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist,
    } = getKeypointsObject(pose);

    const anglesArms = {
      rightHigh: getAngle(
        rightElbow.x,
        rightElbow.y,
        rightShoulder.x,
        rightShoulder.y
      ),
      rightLow: getAngle(
        rightElbow.x,
        rightElbow.y,
        rightWrist.x,
        rightWrist.y
      ),
      leftHigh: getAngle(
        leftElbow.x,
        leftElbow.y,
        leftShoulder.x,
        leftShoulder.y
      ),
      leftLow: getAngle(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y),
    };

    const start = checkDownRight(anglesArms) && checkDownLeft(anglesArms);

    if (start) {
      console.log("start");
      setStep(1);
    }

    const up = checkUpLeft(anglesArms) || checkUpRight(anglesArms);

    if (step === 1 && up) {
      console.log("up");
      setCount(count + 1);
      setStep(0);
    }
  });
  return [count, step, checkPoses];
}

function checkUpLeft(anglesArms) {
  if (anglesArms.leftHigh < 80) {
    return false;
  } else if (anglesArms.leftLow < 20) {
    return false;
  } else {
    return true;
  }
}

function checkUpRight(anglesArms) {
  if (anglesArms.rightHigh < 80) {
    return false;
  } else if (anglesArms.rightLow < 20) {
    return false;
  } else {
    return true;
  }
}

function checkDownLeft(anglesArms) {
  if (anglesArms.leftHigh < 80) {
    return false;
  } else if (-80 < anglesArms.leftLow) {
    return false;
  } else {
    return true;
  }
}

function checkDownRight(anglesArms) {
  if (anglesArms.rightHigh < 80) {
    return false;
  } else if (-80 < anglesArms.rightLow) {
    return false;
  } else {
    return true;
  }
}
