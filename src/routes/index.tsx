import { Route, Routes } from "react-router-dom";
import { PagesStructure } from "../enums";
import { lazy, Suspense } from "react";
import { Bars } from "react-loader-spinner";

const HomeProducts = lazy(() => import("../pages/HomeProducts"));
const AboutProducts = lazy(() => import("../pages/AboutProducts"));

export const loading = (
  <div className="flex items-center h-screen justify-center">
    <Bars
      height="80"
      width="80"
      color="#0000FF"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);
function CustomRoutes() {
  return (
    <Routes>
      <Route
        path={PagesStructure.home}
        element={
          <Suspense
            fallback={
            loading
            }
          >
            <HomeProducts />
          </Suspense>
        }
      />
      <Route
        path={PagesStructure.about}
        element={
          <Suspense
            fallback={
              loading
            }
          >
            <AboutProducts />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default CustomRoutes;
