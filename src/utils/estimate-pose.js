import hajung from "./detect-pose/hajung";
import pushup from "./detect-pose/pushup";
import dumbellupper from "./detect-pose/dumbellupper";
import bandupper from "./detect-pose/bandupper";

export function getKeypointsObject(pose) {
  return pose.keypoints.reduce((acc, { part, position }) => {
    acc[part] = position;
    return acc;
  }, {});
}

export function getAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return (rad * 180) / Math.PI;
}

export default function EstimatePose(action) {
  switch (action) {
    case "hajung":
      return hajung();
    case "pushup":
      return pushup();
    case "upperdumbell":
      return dumbellupper();
    case "upperband":
      return bandupper();
  }
  // return [count, step, checkPoses];
}
