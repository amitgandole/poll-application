import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import useLocalStorage from "../utils/useLocalStorage";

interface Props {
  children: JSX.Element;
}

const RequiredAuth = ({ children }: Props) => {
  const [currentLoggedInUser] = useLocalStorage("currentLoggedInUser", []);

  if (!currentLoggedInUser[0]?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequiredAuth;
