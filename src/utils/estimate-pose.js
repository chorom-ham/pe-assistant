import PushUp from "./detect-pose/push-up";
import DumbbellUpper from "./detect-pose/dumbbell-upper";
import BandUpper from "./detect-pose/band-upper";
import LeftShoulderStretching from "./detect-pose/left-shoulder-stretching";
import RightShoulderStretching from "./detect-pose/right-shoulder-stretching";
import LeftWaistStretching from "./detect-pose/left-waist-stretching";
import RightWaistStretching from "./detect-pose/right-waist-stretching";
import LegStretching2 from "./detect-pose/leg-stretching-2";
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
  return EXERCISES[action].pose;
}
