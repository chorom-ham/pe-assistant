import hajung from "./detect-pose/hajung";
import pushup from "./detect-pose/pushup";
import dumbellupper from "./detect-pose/dumbellupper";
import bandupper from "./detect-pose/bandupper";
import shoulderStretching from "./detect-pose/shoulderStretching";
import leftShoulderStretching from "./detect-pose/leftShoulderStretching";
import rightShoulderStretching from "./detect-pose/rightShoulderStretching";
import waistStretching from "./detect-pose/waistStretching";
import leftWaistStretching from "./detect-pose/leftWaistStretching";
import rightWaistStretching from "./detect-pose/rightShoulderStretching";
import legStretching from "./detect-pose/legStretching";
import legStretching2 from "./detect-pose/legStretching2";

export function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position, score }) => {
    position["score"] = score;
    acc[part] = position;
    return acc;
  }, {});
}

export function getAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return 1 * ((rad * 180) / Math.PI);
}

export default function EstimatePose(action) {
  switch (action) {
    case "hajung":
      return hajung();
    case "pushup":
      return pushup();
    case "dumbellupper":
      return dumbellupper();
    case "bandupper":
      return bandupper();
    case "ShoulderStretching":
      return shoulderStretching();
    case "LeftShoulderStretching":
      return leftShoulderStretching();
    case "RightShoulderStretching":
      return rightShoulderStretching();
    case "WaistStretching":
      return waistStretching();
    case "LeftWaistStretching":
      return leftWaistStretching();
    case "RightWaistStretching":
      return rightWaistStretching();
    case "LegStretching":
      return legStretching();
    case "LegStretching2":
      return legStretching2();
  }
}
