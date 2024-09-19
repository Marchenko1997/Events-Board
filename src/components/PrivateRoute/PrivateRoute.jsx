import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/auth/selectors";

 const PrivateRoute = ({ component, redirectTo = "/" }) => {
  const isAuth = useSelector(selectIsAuth);

  const shouldRedirect = !isAuth;
  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : component}</>;
};

export default PrivateRoute