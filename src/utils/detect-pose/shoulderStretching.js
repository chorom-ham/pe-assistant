import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 어깨 스트레칭
export default function ShoulderStretching() {
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

    const left = checkLeftShoulderStretching(anglesArms);
    const right = checkRightShoulderStretching(anglesArms);

    if (step == 0 && left) {
      setCount((count) => count + 1);
    } else if (step == 1 && right) {
      setCount((count) => count + 1);
    }
  });

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

// 왼쪽 어깨 스트레칭
// 왼팔은 오른쪽 앞으로 넘기고, 오른팔로 당기기
function checkLeftShoulderStretching(anglesArms) {
  if (-170 < anglesArms.leftHigh && anglesArms.leftHigh < 145) return false;
  else if (-70 < anglesArms.rightLow || anglesArms.rightLow < -110)
    return false;
  else return true;
}

// 오른쪽 어깨 스트레칭
// 위와 반대
function checkRightShoulderStretching(anglesArms) {
  if (-10 > anglesArms.rightHigh || anglesArms.rightHigh > 45) return false;
  else if (-70 < anglesArms.leftLow || anglesArms.leftLow < -110) return false;
  else return true;
}
