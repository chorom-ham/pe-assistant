import { useState, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Pushup() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [pushup, setPushup] = useState(false);

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
    setPushup(checkPushup(anglesArms));
  });

  useEffect(() => {
    if (step == 0 && pushup) {
      console.log("push-up", count);
      setCount((count) => count + 1);
    }
  }, [step, count, pushup]);

  useEffect(() => {
    if (step == 0 && count > 20) {
      setStep((step) => 1);
      setCount((count) => 0);
    }
  }, [step, count]);

  return [count, step, checkPoses];
}

function checkPushup(anglesArms) {
  if (anglesArms.leftHigh > 20 || 160 > anglesArms.rightHigh) {
    return false;
  } else if (-10 < anglesArms.leftLow || -30 < anglesArms.rightLow) {
    return false;
  } else {
    return true;
  }
}
