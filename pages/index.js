import { useEffect, useState } from "react";

import GlobalLayout from "src/layouts/global";
import ExerciseScreen from "src/components/exercise-screen";
import { isMobile } from "src/utils/draw";
import Banner from "../src/components/banner";

export default function Home() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  if (isMobileDevice) {
    return <p>모바일에서 사용 불가</p>;
  }

  return (
    <GlobalLayout>
      <Banner />
    </GlobalLayout>
  );
}
