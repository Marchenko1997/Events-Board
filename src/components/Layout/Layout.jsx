import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import { selectIsAuth } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/authSlice";
import { Suspense } from "react";
import css from "./Layout.module.css";

const Layout = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

    return (
      <>
        <header className={css.header}>
          <div className={css.headerWrap}>
            <nav className={css.nav}>
              <NavLink
                to="/"
                className={`${css.link} ${
                  location.pathname === "/" ? css.active : ""
                }`}
              >
                Events
              </NavLink>
              {!isAuth ? (
                <NavLink
                  to="/login"
                  className={`${css.link} ${
                    location.pathname === "/login" ? css.active : ""
                  }`}
                >
                  Login
                </NavLink>
              ) : (
                <NavLink
                  to="/user-events"
                  className={`${css.link} ${
                    location.pathname === "/user-events" ? css.active : ""
                  }`}
                >
                  User
                </NavLink>
              )}
              {isAuth && (
                <button
                  className={css.authBtn}
                  type="button"
                  onClick={() => {
                    dispatch(logOut());
                    navigate("/");
                  }}
                >
                  LogOut
                </button>
              )}
            </nav>
          </div>
        </header>
        <main className={css.mainContainer}>
          <section className={css.section}>
            <Suspense>
              <Outlet />
            </Suspense>
          </section>
        </main>
      </>
    );
};

export default Layout;
