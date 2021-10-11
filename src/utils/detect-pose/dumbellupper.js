import { useState, useCallback, useEffect } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Dumbellupper() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [leftDumbell, setLeftDumbell] = useState(false);
  const [rightDumbell, setRightDumbell] = useState(false);

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

    setLeftDumbell(checkLeftDumbell(anglesArms));
    setRightDumbell(checkRightDumbell(anglesArms));
  });

  useEffect(() => {
    if ((step == 0 && leftDumbell) || (step == 1 && rightDumbell)) {
      if (step == 0) console.log("left dumbell", count);
      else if (step == 1) console.log("right dumbell", count);
      setCount((count) => count + 1);
    }
  }, [step, count, leftDumbell, rightDumbell]);

  useEffect(() => {
    if (step == 0 && count > 20) {
      setStep((step) => 1);
      setCount((count) => 0);
    }
    if (step == 1 && count > 20) {
      setStep((step) => 2);
      setCount((count) => 0);
    }
  }, [step, count]);

  return [count, step, checkPoses];
}

function checkLeftDumbell(anglesArms) {
  if (anglesArms.leftHigh < 80) {
    return false;
  } else if (anglesArms.leftLow < 20) {
    return false;
  } else {
    return true;
  }
}

function checkRightDumbell(anglesArms) {
  if (anglesArms.rightHigh < 80) {
    return false;
  } else if (anglesArms.rightLow < 20) {
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
