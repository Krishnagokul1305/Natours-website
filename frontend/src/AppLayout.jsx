import { Popup } from "react-leaflet";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./components/Loader";

function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <div>
        {isLoading&&<Loader />}
      <Outlet />
    </div>
  );
}

export default AppLayout;
