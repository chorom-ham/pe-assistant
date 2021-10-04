import { useState, useCallback } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function ShoulderStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
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

    const stretchLeftShoulder = checkLeftShoulderStretching(anglesArms);
    const stretchRightShoulder = checkRightShoulderStretching(anglesArms);

    if (step == 0 && stretchLeftShoulder) {
      console.log(true);
      setCount(count + 1);
      if (count >= 10) {
        setStep(step + 1);
        setCount(0);
      }
    }
    // console.log(stretchRightShoulder);
    if (step == 1 && stretchRightShoulder) {
      setCount(count + 1);
      if (count >= 10) {
        setStep(step + 1);
        console.log("finish!");
      }
    }
  });
  return [count, step, checkPoses];
}

function checkLeftShoulderStretching(anglesArms) {
  if (-170 < anglesArms.leftHigh && anglesArms.leftHigh < 145) return false;
  else if (-70 < anglesArms.rightLow || anglesArms.rightLow < -110)
    return false;
  else return true;
}

function checkRightShoulderStretching(anglesArms) {
  if (-10 > anglesArms.rightHigh || anglesArms.rightHigh > 45) return false;
  else if (-70 < anglesArms.leftLow || anglesArms.leftLow < -110) return false;
  else return true;
}
