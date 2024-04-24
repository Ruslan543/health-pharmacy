import { Outlet } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import SpinnerFullPage from "./SpinnerFullPage";
import { useAccessToken } from "../features/authentication/useAccessToken";

function GetUser() {
  const { isLoading: isLoadingAccessToken } = useAccessToken();
  const { isLoading: isLoadingUser } = useUser();

  if (isLoadingUser || isLoadingAccessToken) return <SpinnerFullPage />;

  return <Outlet />;
}

export default GetUser;
