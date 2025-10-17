import { Fragment } from "react";
import MainNavigation from "./components/home/MainNavigation";
import Homepage from "./pages/Homepage";
import HeroSection from "./components/home/HeroSection";

function App() {

  return (
    <Fragment>
      {/* <Homepage /> */}
      <MainNavigation />
      <HeroSection />
    </Fragment>
  );
}

export default App
