import GlobalHeader from "./header";
import GlobalFooter from "./footer";

export default function GlobalLayout({ children }) {
  return (
    <>
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
}
