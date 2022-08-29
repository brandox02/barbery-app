import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { omit, pick } from "lodash";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useForm } from "react-hook-form";
import { usePopulate } from "../../../hooks/usePopulate";
import { GET_HAIRCUT, SAVE_MUTATION } from "./queries";

export default function useManagement() {
  const methods = useForm({
    defaultValues: {
      name: null,
      duration: null,
      image: null,
      price: null,
    },
  });
  const [saveMutation] = useMutation(SAVE_MUTATION);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { haircutId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const { populated } = usePopulate({
    graphqlQuery: GET_HAIRCUT,
    isUpdating: haircutId,
    variables: { where: { id: parseInt(haircutId) } },
    onPopulate: async (data) => {
      const payload = pick(data?.haircut, [
        "id",
        "name",
        "duration",
        "image",
        "price",
      ]);
      payload.price = payload.price.toString();
      methods.reset(payload);
    },
  });

  const image = methods.watch("image");

  // for manage the error when doesn't load an image
  useEffect(() => {
    if (image) {
      setImageError(false);
    }
  }, [image]);

  const goToBack = () => navigate(-1);

  const handleSubmit = methods.handleSubmit(
    withGraphqlErrorHandler(
      async (data) => {
        if (!data.image) {
          setImageError(true);
          return;
        }
        setIsLoading(true);

        const payload = pick(data, ["image", "name", "price", "duration"]);
        payload.price = parseInt(payload.price);
        payload.duration = dayjs().format("HH:mm:ss");
        if (haircutId) payload.id = parseInt(haircutId);
        console.log({ payload: omit(payload, "image") });
        await saveMutation({ variables: { haircut: payload } });
        setIsLoading(false);
        Alert.alert("Corte de pelo actualizado correctamente");
        setTimeout(() => goToBack(), 1000);
      },
      () => setIsLoading(false)
    )
  );

  return {
    handleSubmit,
    imageError,
    methods,
    haircutId,
    goToBack,
    isLoading: isLoading || !populated,
  };
}
