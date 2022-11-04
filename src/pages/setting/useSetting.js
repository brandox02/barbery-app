import { useNavigate } from "react-router-native";
import { useAppContext } from "../../appProvider";

export default function useSetting() {
  const {
    actions: { logout },
  } = useAppContext();

  const navigate = useNavigate();
  const goToUpdateProfilePage = () => navigate("/settings/update-profile");
  return { logout, goToUpdateProfilePage };
}
