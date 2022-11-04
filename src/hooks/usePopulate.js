import { useEffect } from "react";
import { useQuery } from "react-apollo";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { HOME_ROUTE, useAppContext } from "../appProvider";

export function usePopulate({
  variables = {},
  graphqlQuery,
  onPopulate = () => {},
  onError = null,
}) {
  const {
    state: { apolloClient },
  } = useAppContext();
  const useQueryResponse = useQuery(graphqlQuery, {
    variables,
    client: apolloClient,
    fetchPolicy: "cache-and-network",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (useQueryResponse.data) {
      onPopulate(useQueryResponse.data);
    }
  }, [useQueryResponse.data]);

  useEffect(() => {
    if (useQueryResponse.error) {
      if (onError) onError();
      else {
        Alert.alert("Ha Ocurrido un Error Inesperado!");
        navigate(HOME_ROUTE);
      }
    }
  }, [useQueryResponse.error]);

  return useQueryResponse;
}
