import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function HeaderWithLogoOnly() {
  return (
    <div className="flex items-center py-10 px-appWidth">
      <Link to="/">
        <img src={logo} alt="logo" className="w-48" />
      </Link>
    </div>
  );
}
