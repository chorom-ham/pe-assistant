import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 허리 스트레칭
export default function RightWaistStretchingDynamic() {
  //   console.log("work right waist stretching moving");
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

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

    setUp(checkRightWaistStretching(anglesArms, anglesNose));
    setDown(checkRightWaistStretchingDown(anglesArms));
  });

  useEffect(() => {
    if (up && step == 0) {
      console.log("up");
      setStep((step) => 1);
    }
  }, [up, step]);

  useEffect(() => {
    if (down && step == 1) {
      console.log("down");
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [down, step, count]);

  return [count, step, checkPoses];
}

// 오른쪽 허리 스트레칭
// 왼쪽 손은 허리에 얹기, 오른쪽 팔은 펴서 머리 위로 넘기기
function checkRightWaistStretching(anglesArms, anglesNose) {
  if (0 > anglesArms.leftHigh || anglesArms.leftHigh > 90) return false;
  else if (90 > anglesArms.leftLow || anglesArms.leftLow > 180) return false;
  else if (0 < anglesNose.rightElbow) return false;
  else if (-90 > anglesArms.rightHigh || anglesArms.rightHigh > 0) return false;
  else return true;
}

// 오른팔을 내리기(어깨보다 팔꿈치가 아래로 가게)
function checkRightWaistStretchingDown(anglesArms) {
  if (0 > anglesArms.rightHigh) return false;
  else return true;
}
