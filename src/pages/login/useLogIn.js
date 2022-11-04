import { pick } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../appProvider";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";

export default function useLogIn() {
  const {
    actions: { login },
  } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { control, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    withGraphqlErrorHandler(
      async (data) => {
        setIsLoading(true);
        const payload = pick(data, ["password", "username"]);
        payload.password = payload.password.trim();
        payload.username = payload.username.trim();

        await login(payload);

        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    )
  );

  const goToSignIn = () => navigate("/signIn");

  return { onSubmit, control, methods, goToSignIn, isLoading };
}
