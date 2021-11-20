import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 다리 스트레칭
export default function LegStretching2() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [legStretching, setLegStretching] = useState(false);

  const checkPoses = useCallback((pose) => {
    if (pose.keypoints[11].score < 0.1 || pose.keypoints[13].score < 0.1) {
      console.log("can not see");
    } else {
      const { rightShoulder, rightHip, rightKnee } = getKeypointsObject(pose);

      const angles = {
        upperBody: getAngle(
          rightHip.x,
          rightHip.y,
          rightShoulder.x,
          rightShoulder.y
        ),
        leg: getAngle(rightHip.x, rightHip.y, rightKnee.x, rightKnee.y),
      };

      setLegStretching(checkLegStretching(angles));
    }
  });

  useEffect(() => {
    if (step == 0 && legStretching) {
      console.log("leg stretching", count);
      setCount((count) => count + 1);
    }
  }, [step, count, legStretching]);

  useEffect(() => {
    if (step == 0 && count > 20) {
      setStep((step) => 1);
      setCount((count) => 0);
    }
  }, [step, count]);

  return [count, step, checkPoses];
}

// 양 다리 스트레칭
// 몸 앞으로 숙이기
function checkLegStretching(angles) {
  if (70 > angles.leg || angles.leg > 110) return false;
  else if (0 > angles.upperBody) return false;
  else return true;
}
