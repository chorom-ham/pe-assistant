import { useState, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Pushup() {
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

    const start = checkUpRight(anglesArms) && checkUpLeft(anglesArms);

    if (start) {
      console.log("start");
      setStep(1);
    }

    const down = checkDownLeft(anglesArms) && checkDownRight(anglesArms);

    if (step === 1 && down) {
      console.log("down");
      setCount(count + 1);
      setStep(0);
    }
  });
  return [count, step, checkPoses];
}

function checkUpLeft(anglesArms) {
  if (30 > anglesArms.leftHigh || anglesArms.leftHigh > 120) {
    return false;
  } else if (-30 < anglesArms.leftLow || anglesArms.leftLow < -120) {
    return false;
  } else {
    return true;
  }
}

function checkUpRight(anglesArms) {
  if (60 > anglesArms.rightHigh || anglesArms.rightHigh > 120) {
    return false;
  } else if (-30 < anglesArms.rightLow || anglesArms.rightLow < -120) {
    return false;
  } else {
    return true;
  }
}

function checkDownLeft(anglesArms) {
  if (anglesArms.leftHigh > 20) {
    return false;
  } else if (-10 < anglesArms.leftLow) {
    return false;
  } else {
    return true;
  }
}

function checkDownRight(anglesArms) {
  if (160 > anglesArms.rightHigh) {
    return false;
  } else if (-30 < anglesArms.rightLow) {
    return false;
  } else {
    return true;
  }
}
