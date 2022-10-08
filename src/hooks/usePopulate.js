import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../appProvider";
import { HOME_ROUTE } from "./useToken";

export function usePopulate({
  variables = {},
  graphqlQuery,
  onPopulate = () => {},
  onError = null,
}) {
  const [{ apolloClient }] = useAppContext();
  const useQueryResponse = useQuery(graphqlQuery, {
    variables,
    client: apolloClient,
    fetchPolicy: "network-only",
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
        Alert.alert("Ha ocurrido un error inesperado!");
        navigate(HOME_ROUTE);
      }
    }
  }, [useQueryResponse.error]);

  return useQueryResponse;
}
