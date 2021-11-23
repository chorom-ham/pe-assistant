import { useState, useCallback, useEffect } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function DumbbellUpper() {
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
    if (step == 0 && (leftDumbell || rightDumbell)) {
      console.log("dumbbell up", count);
      setStep((step) => 1);
    }
  }, [step, count, leftDumbell, rightDumbell]);

  useEffect(() => {
    if ((step == 1) != (leftDumbell || rightDumbell)) {
      console.log("dumbbell down", count);
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [step, count, leftDumbell, rightDumbell]);

  return [count, step, checkPoses];
}

function checkLeftDumbell(anglesArms) {
  if (anglesArms.leftHigh < 60) {
    return false;
  } else if (anglesArms.leftLow < 50) {
    return false;
  } else {
    return true;
  }
}

function checkRightDumbell(anglesArms) {
  if (anglesArms.rightHigh < 60) {
    return false;
  } else if (anglesArms.rightLow < 50) {
    return false;
  } else {
    return true;
  }
}
