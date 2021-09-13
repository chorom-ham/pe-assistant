import { getKeypointsObject, getAngle } from "../estimate-pose";

// 추후 함수명은 동작 이름으로 변경. 대문자로 시작.
export default function Example() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);
  const checkPoses = useCallback((pose) => {
    // 동작 확인 후 카운트와 스텝 변경하는 코드
  });
  return [count, step, checkPoses];
}
