import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 어깨 스트레칭
export default function RightShoulderStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [stretching, setStretching] = useState(false);

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

    if (checkRightShoulderStretching(anglesArms, rightWrist))
      setStretching(true);
  });

  useEffect(() => {
    if (stretching && count < 30) setCount((count) => count + 1);
  }, [stretching, count]);

  return [count, step, checkPoses];
}

// 오른쪽 어깨 스트레칭
// 위와 반대
function checkRightShoulderStretching(anglesArms, rightWrist) {
  if (rightWrist.score < 0.3) return false;
  else if (-10 > anglesArms.rightHigh || anglesArms.rightHigh > 45)
    return false;
  else if (-70 < anglesArms.leftLow || anglesArms.leftLow < -110) return false;
  else return true;
}
