import { useMutation } from "@apollo/react-hooks";
import { pick } from "lodash";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { useForm } from "react-hook-form";
import { usePopulate } from "../../../hooks/usePopulate";
import { GET_HAIRCUT, SAVE_MUTATION } from "./queries";
import { timeToUnix } from "../../../utils/timeToUnix";
import { unixToTime } from "../../../utils/unixToTime";
import convertToBase64 from "../../../utils/convertToBase64";
import { useAppContext } from "../../../appProvider";

export default function useManagement() {
  const methods = useForm({
    defaultValues: {
      name: null,
      duration: timeToUnix("00:30:00"),
      image: null,
      price: null,
    },
  });
  const {
    state: { apolloClient },
  } = useAppContext();
  const [saveMutation, { loading: loadingMutation }] = useMutation(
    SAVE_MUTATION,
    {
      client: apolloClient,
    }
  );
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { haircutId } = useParams();

  const { loading } = usePopulate({
    graphqlQuery: GET_HAIRCUT,
    variables: { where: { id: parseInt(haircutId) } },
    onPopulate: async (data) => {
      if (haircutId) {
        if (data?.haircut) {
          const payload = pick(data?.haircut, [
            "id",
            "name",
            "duration",
            "price",
          ]);
          payload.price = payload.price.toString();
          payload.duration = timeToUnix(payload.duration);
          if (data?.haircut.imageUrl)
            payload.image = await convertToBase64(data?.haircut.imageUrl);

          methods.reset(payload);
        } else {
          Alert.alert(
            "Ocurrió un error",
            "Ocurrió un error a la hora de obtener la información de este corte de pelo"
          );
        }
      }
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
    withGraphqlErrorHandler(async (data) => {
      if (!data.image) {
        setImageError(true);
        return;
      }

      const payload = pick(data, ["image", "name", "price", "duration"]);
      payload.price = parseInt(payload.price);
      payload.duration = unixToTime(payload.duration);

      if (haircutId) payload.id = parseInt(haircutId);

      await saveMutation({
        variables: {
          haircut: payload,
        },
      });

      Alert.alert(
        `Corte de pelo ${haircutId ? "actualizado" : "creado"} correctamente`
      );
      setTimeout(() => goToBack(), 1000);
    })
  );

  return {
    handleSubmit,
    imageError,
    methods,
    haircutId,
    goToBack,
    isLoading: loadingMutation || loading,
  };
}
