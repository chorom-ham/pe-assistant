import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 어깨 스트레칭
export default function ShoulderStretchingDynamic() {
  //   console.log("dynamic shoulder stretching working");

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [spread, setSpread] = useState(false);
  const [together, setTogether] = useState(false);

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

    if (leftElbow.score > 0.3 && rightElbow.score > 0.3) {
      setSpread(checkShoulderStretchingSpread(anglesArms));
      setTogether(checkShoulderStretchingTogether(anglesArms));
    } else {
      setSpread(false);
      setTogether(false);
    }
  });

  useEffect(() => {
    if (spread && step == 0) {
      console.log("spread");
      setStep((step) => 1);
    }
  }, [spread, step]);

  useEffect(() => {
    if (together && step == 1) {
      console.log("together");
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [together, step, count]);

  return [count, step, checkPoses];
}

// 양팔을 펴서 옆으로 벌리기
function checkShoulderStretchingSpread(anglesArms) {
  if (-20 > anglesArms.leftHigh || anglesArms.leftHigh > 20) return false;
  else if (-160 < anglesArms.rightHigh && anglesArms.rightHigh < 160)
    return false;
  else return true;
}

// 양팔을 편 상태로, 앞으로 모으기
function checkShoulderStretchingTogether(anglesArms) {
  if (-90 < anglesArms.leftHigh && anglesArms.leftHigh < 90) return false;
  else if (-90 > anglesArms.rightHigh || anglesArms.rightHigh > 90)
    return false;
  else return true;
}
