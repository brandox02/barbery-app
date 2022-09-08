import { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../appProvider";

export function usePopulate({ variables = {}, graphqlQuery, onPopulate }) {
  const [{ apolloClient }] = useAppContext();
  const { data, loading } = useQuery(graphqlQuery, {
    variables,
    client: apolloClient,
    fetchPolicy: "network-only",
  });
  const [populated, setPopulated] = useState(false);
  const navigate = useNavigate(-1);

  useEffect(() => {
    if (!loading && data) {
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
          console.error(err);
          navigate(-1);
        });
    }
  }, [loading, data]);

  return { populated };
}
