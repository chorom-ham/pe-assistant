import { useState, useCallback } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Hajung() {
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
      nose,
    } = getKeypointsObject(pose);

    const anglesArms = {
      rightHigh: getAngle(
        rightShoulder.x,
        rightShoulder.y,
        rightElbow.x,
        rightElbow.y
      ),
      rightLow: getAngle(
        rightElbow.x,
        rightElbow.y,
        rightWrist.x,
        rightWrist.y
      ),
      leftHigh: getAngle(
        leftShoulder.x,
        leftShoulder.y,
        leftElbow.x,
        leftElbow.y
      ),
      leftLow: getAngle(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y),
    };

    const anglesNose = {
      rightElbow: getAngle(nose.x, nose.y, rightElbow.x, rightElbow.y),
      leftElbow: getAngle(nose.x, nose.y, leftElbow.x, leftElbow.y),
    };

    const start = checkBasicRight(anglesArms) && checkBasicLeft(anglesArms);

    if (start) {
      console.log("start");
      setStep(1);
    }

    const stretchRightSide =
      checkBasicLeft(anglesArms) && checkPassoverRight(anglesNose);

    if (step === 1 && stretchRightSide) {
      console.log("stretchRightSide");
      setCount(count + 1);
      setStep(0);
    }
  });
  return [count, step, checkPoses];
}

function checkBasicRight(anglesArms) {
  if (110 > anglesArms.rightHigh || anglesArms.rightHigh > 160) {
    return false;
  } else if (20 > anglesArms.rightLow || anglesArms.rightLow > 70) {
    return false;
  } else {
    return true;
  }
}

function checkBasicLeft(anglesArms) {
  if (20 > anglesArms.leftHigh || anglesArms.leftHigh > 70) {
    return false;
  } else if (110 > anglesArms.leftLow || anglesArms.leftLow > 160) {
    return false;
  } else {
    return true;
  }
}

function checkPassoverRight(anglesNose) {
  if (-110 > anglesNose.rightElbow || anglesNose.rightElbow > 0) {
    return false;
  }
  return true;
}
