import { useState, useEffect, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Bandupper() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [bandUpper, setBandUpper] = useState(false);

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
    setBandUpper(checkBandUpper(anglesArms));
  });

  useEffect(() => {
    if (step == 0 && bandUpper) {
      console.log("upper body resistance band", count);
      setCount((count) => count + 1);
    }
  }, [step, count, bandUpper]);

  useEffect(() => {
    if (step == 0 && count > 20) {
      setStep((step) => 1);
      setCount((count) => 0);
    }
  }, [step, count]);

  return [count, step, checkPoses];
}

function checkBandUpper(anglesArms) {
  if (anglesArms.leftHigh > 60 || anglesArms.rightHigh < 60) {
    return false;
  } else if (anglesArms.leftLow > -110 || anglesArms.rightLow < -80) {
    return false;
  } else {
    return true;
  }
}

// function checkDownLeft(anglesArms) {
//   if (anglesArms.leftHigh < 80) {
//     return false;
//   } else if (-80 < anglesArms.leftLow) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function checkDownRight(anglesArms) {
//   if (anglesArms.rightHigh < 80) {
//     return false;
//   } else if (-80 < anglesArms.rightLow) {
//     return false;
//   } else {
//     return true;
//   }
// }
