import { useNavigate } from "react-router-native";

export default function useSetting({ setToken }) {
  const logout = () => setToken(null);
  const navigate = useNavigate();
  const goToUpdateProfilePage = () => navigate("/settings/update-profile");
  return { logout, goToUpdateProfilePage };
}
