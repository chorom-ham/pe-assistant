import hajung from "./detect-pose/hajung";
import ShoulderStretching from "./detect-pose/shoulder-stretching";

export function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
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
      // eslint-disable-next-line new-cap
      return ShoulderStretching();
  }
  // return [count, step, checkPoses];
}
