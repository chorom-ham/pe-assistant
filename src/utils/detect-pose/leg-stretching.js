import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 다리 스트레칭
export default function LegStretching() {
  // console.log("leg stretching work");

  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);

  const checkPoses = useCallback((pose) => {
    const { rightShoulder, rightHip, rightKnee } = getKeypointsObject(pose);

    const angles = {
      upperBody: getAngle(
        rightHip.x,
        rightHip.y,
        rightShoulder.x,
        rightShoulder.y
      ),
      legHigh: getAngle(rightHip.x, rightHip.y, rightKnee.x, rightKnee.y),
    };

    if (rightKnee.score > 0.3) {
      // console.log(angles.upperBody);
      setUp(checkLegStretchingUp(angles));
      setDown(checkLegStretchingDown(angles));
    } else {
      setUp(false);
      setDown(false);
    }
  });

  useEffect(() => {
    if (down && step == 0) {
      console.log("down");
      setStep((step) => 1);
    }
  }, [down, step]);

  useEffect(() => {
    if (up && step == 1) {
      console.log("up");
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [up, step, count]);

  return [count, step, checkPoses];
}

// 양 다리 스트레칭
// 몸 앞으로 숙이기
function checkLegStretchingDown(angles) {
  if (70 > angles.legHigh || angles.legHigh > 110) return false;
  else if (5 > angles.upperBody || angles.upperBody > 175) return false;
  else return true;
}

function checkLegStretchingUp(angles) {
  if (-145 > angles.upperBody || angles.upperBody > -35) return false;
  else return true;
}
