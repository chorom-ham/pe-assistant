import { useEffect, useState } from "react";

import { isMobile } from "src/utils/draw";
import GlobalLayout from "src/layouts/global";
import DoHomework from "src/components/do-homework";

export default function Course() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  if (isMobileDevice) {
    return <p>모바일에서 사용 불가</p>;
  }

  return (
    <GlobalLayout>
      <DoHomework />
    </GlobalLayout>
  );
}
