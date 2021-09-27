import hajung from "./detect-pose/hajung";
import gymnastics from "./detect-pose/gymnastics";

export function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position;
    return acc;
  }, {});
}

export function getAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return -1 * ((rad * 180) / Math.PI);
}

export default function EstimatePose(action) {
  switch (action) {
    case "hajung":
      return hajung();
    case "gymnastics":
      return gymnastics();
  }
  // return [count, step, checkPoses];
}
