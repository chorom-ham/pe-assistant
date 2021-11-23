import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 허리 스트레칭
export default function LeftWaistStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [frameCount, setFrameCount] = useState(0);
  const [stretching, setStretching] = useState(false);

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

    setStretching(checkLeftWaistStretching(anglesArms, anglesNose));
  });

  useEffect(() => {
    if (stretching && frameCount < 150) {
      setFrameCount((frameCount) => frameCount + 1);
    }
  }, [stretching, frameCount]);

  useEffect(() => {
    if (stretching && count < 30 && frameCount % 5 == 0) {
      setCount((count) => Math.floor(frameCount / 5));
    }
  }, [frameCount, count, stretching]);

  return [count, step, checkPoses];
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
