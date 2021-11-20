import hajung from "./detect-pose/hajung";
import shoulderStretching from "./detect-pose/shoulderStretching";
import leftShoulderStretching from "./detect-pose/leftShoulderStretching";
import waistStretching from "./detect-pose/waistStretching";
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
    case "ShoulderStretching":
      return shoulderStretching();
    case "LeftShoulderStretching":
      return leftShoulderStretching();
    case "WaistStretching":
      return waistStretching();
    case "LegStretching":
      return legStretching();
    case "LegStretching2":
      return legStretching2();
  }
}
