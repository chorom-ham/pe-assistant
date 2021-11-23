import { useState, useEffect, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function BandUpper() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [bandUp, setBandUp] = useState(false);
  const [bandDown, setBandDown] = useState(false);

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
    setBandUp(checkBandUp(anglesArms));
    setBandDown(checkBandDown(anglesArms));
  });

  useEffect(() => {
    if (step == 0 && bandUp) {
      console.log("band up", count);
      setStep((step) => 1);
    }
  }, [step, count, bandUp]);

  useEffect(() => {
    if (step == 1 && bandDown) {
      console.log("band down", count);
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [step, count, bandDown]);

  return [count, step, checkPoses];
}

function checkBandUp(anglesArms) {
  if (anglesArms.leftHigh > 60 || anglesArms.rightHigh < 120) {
    return false;
  } else {
    return true;
  }
}

function checkBandDown(anglesArms) {
  if (anglesArms.leftHigh < 60 || anglesArms.rightHigh < 120) {
    return false;
  } else {
    return true;
  }
}
