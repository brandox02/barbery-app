import { useMutation } from "@apollo/react-hooks";
import { pick } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../appProvider";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";
import { LOGIN_BY_CREDENTIAL_MUTATION } from "./queries";

export default function useLogIn({ setToken }) {
  const [{ apolloClient }] = useAppContext();
  const [logInByCredentialMutation] = useMutation(
    LOGIN_BY_CREDENTIAL_MUTATION,
    { client: apolloClient }
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      username: null,
      password: null,
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

        const response = await logInByCredentialMutation({
          variables: { credentials: payload },
        });

        const token = response.data.logInByCredential.token;

        setToken(token);

        await setToken(token);
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
