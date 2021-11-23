/* eslint-disable new-cap */
import PushUp from "./detect-pose/push-up";
import DumbbellUpper from "./detect-pose/dumbbell-upper";
import BandUpper from "./detect-pose/band-upper";
import LeftShoulderStretching from "./detect-pose/left-shoulder-stretching";
import RightShoulderStretching from "./detect-pose/right-shoulder-stretching";
import LeftWaistStretching from "./detect-pose/left-waist-stretching";
import LeftWaistStretchingDynamic from "./detect-pose/left-waist-stretching-dynamic";
import RightWaistStretching from "./detect-pose/right-waist-stretching";
import RightWaistStretchingDynamic from "./detect-pose/right-waist-stretching-dynamic";
import LegStretching from "./detect-pose/leg-stretching";
import { EXERCISES } from "../constants/exercises";

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
  switch (EXERCISES[action].pose) {
    case "LeftWaistStretching":
      return LeftWaistStretchingDynamic();
    case "RightWaistStretching":
      return RightWaistStretchingDynamic();
    case "LegStretching":
      return LegStretching();
  }
}
