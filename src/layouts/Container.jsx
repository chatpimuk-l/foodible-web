import ProfileContextProvider from "../features/profile/contexts/ProfileContext";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <>
      <ProfileContextProvider>
        <Header />
        <Outlet />
      </ProfileContextProvider>
    </>
  );
}
