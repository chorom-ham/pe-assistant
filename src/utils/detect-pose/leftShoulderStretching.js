import { useState, useCallback, useEffect } from "react";

import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
// 어깨 스트레칭
export default function LeftShoulderStretching() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [leftShoulderStretching, segLeftShoulderStretching] = useState(false);

  const checkPoses = useCallback((pose) => {
    const { leftShoulder, leftElbow, leftWrist } = getKeypointsObject(pose);

    console.log(leftShoulder.score, leftElbow.score, leftWrist.score);

    const anglesArms = {
      leftHigh: getAngle(
        leftShoulder.x,
        leftShoulder.y,
        leftElbow.x,
        leftElbow.y
      ),
      leftLow: getAngle(leftElbow.x, leftElbow.y, leftWrist.x, leftWrist.y),
    };

    segLeftShoulderStretching(
      checkLeftShoulderStretching(
        anglesArms,
        leftShoulder,
        leftElbow,
        leftWrist
      )
    );
    // console.log("work");
  });

  useEffect(() => {
    if (leftShoulderStretching) setCount((count) => count + 1);
  }, [leftShoulderStretching, count]);

  return [count, step, checkPoses];
}

// 왼쪽 어깨 스트레칭
// 왼팔은 오른쪽 앞으로 넘기고, 오른팔로 당기기
function checkLeftShoulderStretching(anglesArms, leftWrist) {
  if (leftWrist.score < 0.3) return false;
  else if (-170 < anglesArms.leftHigh && anglesArms.leftHigh < 145)
    return false;
  else if (-70 < anglesArms.rightLow || anglesArms.rightLow < -110)
    return false;
  else return true;
}
