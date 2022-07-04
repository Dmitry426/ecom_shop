import { Link, Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/086 crown.svg";
import "./navigation.styles.scss";
import { UserContext } from "../../context/user.context";
import { logoutUser } from "../../utils/auth.utils";

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  const signOutHandler = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
    }
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="link" to="/ ">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {user ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT{" "}
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SING IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
