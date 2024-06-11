import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./userContent";

const useAuthRedirct = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
};
export default useAuthRedirct;


