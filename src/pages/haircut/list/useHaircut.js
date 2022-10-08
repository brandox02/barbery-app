import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import { usePopulate } from "../../../hooks/usePopulate";

export const HAIRCUTS_QUERY = gql`
  query Haircuts {
    haircuts {
      id
      imageUrl
      name
      price
      duration
    }
  }
`;

export default function useHaircut() {
  const { data, loading } = usePopulate({
    graphqlQuery: HAIRCUTS_QUERY,
  });

  const navigate = useNavigate();

  const goToCreate = () => navigate("/haircuts/create");
  const goToUpdate = (haircutId) => navigate("/haircuts/update/" + haircutId);

  return {
    goToCreate,
    goToUpdate,
    haircuts: data?.haircuts || [],
    loading,
  };
}
