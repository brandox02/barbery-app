import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { apolloClient } from "../../App";

export function usePopulate({
  variables,
  graphqlQuery,
  onPopulate,
  isUpdating,
}) {
  const { data, loading } = useQuery(graphqlQuery, {
    variables,
    client: apolloClient,
    fetchPolicy: "network-only",
  });
  const [populated, setPopulated] = useState(!isUpdating);
  const navigate = useNavigate(-1);

  useEffect(() => {
    if (isUpdating && !loading && data?.haircut) {
      onPopulate(data)
        .then(() => {
          setPopulated(true);
        })
        .catch((err) => {
          setPopulated(true);
          Alert.alert(
            "Algo salió mal",
            "Ha ocurrido un error, intentalo de nuevo mas tarde"
          );
          navigate(-1);
          console.error(err);
        });
    }
  }, [loading, data]);

  return { populated };
}
