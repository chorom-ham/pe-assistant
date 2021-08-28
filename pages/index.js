import GlobalLayout from "src/layouts/global";
import Banner from "src/components/banner";
import CourseList from "src/components/course-list";

export default function Home() {
  return (
    <GlobalLayout>
      <Banner />
      <CourseList />
    </GlobalLayout>
  );
}
