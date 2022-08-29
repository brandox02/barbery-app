import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import { useNavigate } from "react-router-native";
import { apolloClient } from "../../../../App";

const HAIRCUTS_QUERY = gql`
  query Haircuts {
    haircuts {
      id
      # image
      name
      price
      duration
    }
  }
`;

export default function useHaircut() {
  const { data, loading } = useQuery(HAIRCUTS_QUERY, {
    variables: {},
    client: apolloClient,
    fetchPolicy: "network-only",
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