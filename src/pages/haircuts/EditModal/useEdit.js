import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { pick } from "lodash";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";

const SAVE_MUTATION = gql`
  mutation SaveHaircut($haircut: HaircutInput!) {
    saveHaircut(haircut: $haircut) {
      image
      name
      price
      duration
      id
    }
  }
`;

export default function useEdit({ methods, setVisibleModalEdit }) {
  const [saveMutation] = useMutation(SAVE_MUTATION);
  const [imageError, setImageError] = useState(false);

  const image = methods.watch("image");
  useEffect(() => {
    if (image) {
      setImageError(false);
    }
  }, [image]);

  const handleSubmit = methods.handleSubmit(
    withGraphqlErrorHandler(async (data) => {
      if (!data.image) {
        setImageError(true);
        return;
      }

      const payload = pick(data, ["image", "name", "price", "duration"]);
      payload.price = parseInt(payload.price);
      payload.duration = dayjs().format("HH:mm:ss");

      await saveMutation({ variables: { haircut: payload } });
      Alert.alert("Corte de pelo actualizado correctamente");
      setVisibleModalEdit(false);
    })
  );

  return { handleSubmit, imageError };
}
