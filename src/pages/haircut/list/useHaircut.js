import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import { usePopulate } from "../../../hooks/usePopulate";
import { SAVE_MUTATION } from "../management/queries";

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
  const { data, loading, refetch } = usePopulate({
    graphqlQuery: HAIRCUTS_QUERY,
  });

  const {
    state: { apolloClient },
  } = useAppContext();

  const [updateHaircutMutation, { loading: updateLoading }] = useMutation(
    SAVE_MUTATION,
    {
      client: apolloClient,
    }
  );

  async function launchDeleteHaircutConfirm(id) {
    async function deleteHaircut() {
      try {
        await updateHaircutMutation({
          variables: { haircut: { id, enabled: false } },
        });
        await refetch();

        Alert.alert("Corte de Pelo Borrado Exitosamente");
      } catch (error) {
        Alert.alert(
          "Ha Ocurrido un Error Inesperado",
          "Ocurrió un error inesperado al momento de borrar el corte de pelo"
        );
      }
    }

    Alert.alert(
      "Estas seguro de que deseas borrar este corte de pelo?",
      "Al hacer esto borrarás el corte de pelo",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Confirmar", onPress: deleteHaircut },
      ]
    );
  }

  const navigate = useNavigate();

  const goToCreate = () => navigate("/haircuts/create");
  const goToUpdate = (haircutId) => navigate("/haircuts/update/" + haircutId);

  return {
    goToCreate,
    goToUpdate,
    haircuts: data?.haircuts || [],
    loading: loading || updateLoading,
    launchDeleteHaircutConfirm,
  };
}
