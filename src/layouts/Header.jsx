import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../features/auth/hooks/useAuth";

export default function Header() {
  const { authUser, logout } = useAuth();

  return (
    <div className="flex justify-between items-center py-10 px-appWidth">
      <Link to="/">
        <img src={logo} alt="logo" className="w-48" />
      </Link>
      <div className="flex gap-8">
        {/* <Link to={`profile/${authUser?.id}`}>
          <h5 className="text-black text-3xl font-black">MY PROFILE</h5>
        </Link> */}

        {authUser ? (
          <>
            <Link to={`profile/${authUser?.id}`}>
              <h5 className="text-black text-3xl font-black">MY PROFILE</h5>
            </Link>
            <Link to="/">
              <i
                className="fa-solid fa-right-from-bracket text-black text-3xl"
                onClick={logout}
              ></i>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <h5 className="text-black text-3xl font-black">MY PROFILE</h5>
            </Link>
            <Link to="/login">
              <i className="fa-solid fa-right-to-bracket text-black text-3xl"></i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
