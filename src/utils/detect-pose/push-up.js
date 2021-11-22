import { useState, useEffect, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function PushUp() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [push, setPush] = useState(false);
  const [up, setUp] = useState(false);

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
    setPush(checkPush(anglesArms));
    setUp(checkUp(anglesArms));
  });

  useEffect(() => {
    if (step == 0 && push) {
      console.log("push", count);
      setStep((step) => 1);
    }
  }, [step, count, push]);

  useEffect(() => {
    if (step == 1 && up) {
      console.log("up", count);
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [step, count, up]);

  return [count, step, checkPoses];
}

function checkPush(anglesArms) {
  if (anglesArms.leftHigh > 20 || 160 < anglesArms.rightHigh) {
    return false;
  } else if (-20 > anglesArms.leftLow || -160 < anglesArms.rightLow) {
    return false;
  } else {
    return true;
  }
}

function checkUp(anglesArms) {
  if (anglesArms.leftHigh < 60 || 120 < anglesArms.rightHigh) {
    return false;
  } else if (-60 < anglesArms.leftLow || -120 > anglesArms.rightLow) {
    return false;
  } else {
    return true;
  }
}
