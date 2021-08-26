import { useEffect, useState } from "react";
import ExerciseScreen from "src/components/exercise-screen";
import { isMobile } from "src/utils/draw";

export default function Home() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  if (isMobileDevice) {
    return <p>모바일에서 사용 불가</p>;
  }

  return <ExerciseScreen />;
}
