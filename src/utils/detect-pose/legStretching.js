import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 다리 스트레칭
export default function LegStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [leftStretching, setLeftStretching] = useState(false);
  const [rightStretching, setRightStretching] = useState(false);

  const checkPoses = useCallback((pose) => {
    if (pose.keypoints[11].score < 0.1 || pose.keypoints[13].score < 0.1) {
      console.log("can not see");
    } else {
      const { leftHip, rightHip, leftKnee, rightKnee, leftAnkle, rightAnkle } =
        getKeypointsObject(pose);

      const anglesLegs = {
        rightHigh: getAngle(rightHip.x, rightHip.y, rightKnee.x, rightKnee.y),
        rightLow: getAngle(
          rightKnee.x,
          rightKnee.y,
          rightAnkle.x,
          rightAnkle.y
        ),
        leftHigh: getAngle(leftHip.x, leftHip.y, leftKnee.x, leftKnee.y),
        leftLow: getAngle(leftHip.x, leftHip.y, leftAnkle.x, leftAnkle.y),
      };

      setLeftStretching(checkLeftLegStretching(anglesLegs));
      setRightStretching(checkRightLegStretching(anglesLegs));
    }
  });

  useEffect(() => {
    if ((step == 0 && leftStretching) || (step == 1 && rightStretching)) {
      if (step == 0) console.log("left shoulder stretching", count);
      else if (step == 1) console.log("right shoulder stretching", count);
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

// 오른쪽 종아리 스트레칭
// 왼다리 직각으로 굽혀서 앞으로, 오른쪽 다리는 쭉 펴서 뒤로, 왼쪽 보며 실행
function checkRightLegStretching(anglesLegs) {
  if (anglesLegs.rightLow < 110) return false;
  else if (20 > anglesLegs.leftHigh || anglesLegs.leftHigh > 70) return false;
  else if (80 > anglesLegs.leftLow || anglesLegs.leftLow > 100) return false;
  else return true;
}

// 왼쪽 종아리 스트레칭
// 앞과 반대
function checkLeftLegStretching(anglesLegs) {
  if (anglesLegs.leftLow > 70) return false;
  else if (110 > anglesLegs.rightHigh || anglesLegs.rightHigh > 160)
    return false;
  else if (80 > anglesLegs.leftLow || anglesLegs.leftLow > 100) return false;
  else return true;
}
