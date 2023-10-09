import { useContext, useState} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext)

  if (!user) {
    return <Navigate to={"/"} />;
  }
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  const logout = () => {
    let clear = localStorage.clear()
    setRedirect(true)
    setUser(null)
    return <Navigate to={'/'} />
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-12">
        <Link className={linkClasses("profile")} to={"/account"}>
          My account
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My booking
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {localStorage.getItem("user info")} (
          {localStorage.getItem("email")})
          <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
