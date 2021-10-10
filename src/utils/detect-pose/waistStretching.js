import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 허리 스트레칭
export default function WaistStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [leftStretching, setLeftStretching] = useState(false);
  const [rightStretching, setRightStretching] = useState(false);

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

    setLeftStretching(checkLeftWaistStretching(anglesArms, anglesNose));
    setRightStretching(checkRightWaistStretching(anglesArms, anglesNose));
  });

  useEffect(() => {
    if ((step == 0 && leftStretching) || (step == 1 && rightStretching)) {
      if (step == 0) console.log("left waist stretching", count);
      else if (step == 1) console.log("right waist stretching", count);
      setCount((count) => count + 1);
    }
  }, [step, count, leftStretching, rightStretching]);

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

// 오른쪽 허리 스트레칭
// 왼쪽 손은 허리에 얹기, 오른쪽 팔은 펴서 머리 위로 넘기기
function checkRightWaistStretching(anglesArms, anglesNose) {
  if (0 > anglesArms.leftHigh || anglesArms.leftHigh > 90) return false;
  else if (90 > anglesArms.leftLow || anglesArms.leftLow > 180) return false;
  else if (0 < anglesNose.rightElbow) return false;
  else if (-90 > anglesArms.rightHigh || anglesArms.rightHigh > 0) return false;
  else return true;
}

// 왼쪽 허리 스트레칭
// 위와 반대
function checkLeftWaistStretching(anglesArms, anglesNose) {
  if (90 > anglesArms.rightHigh || anglesArms.rightHigh > 180) return false;
  else if (0 > anglesArms.rightLow || anglesArms.rightLow > 90) return false;
  else if (0 < anglesNose.leftElbow) return false;
  else if (-90 < anglesArms.leftHigh) return false;
  else return true;
}
