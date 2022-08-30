import { useMutation } from "@apollo/react-hooks";
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-native";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";
import { LOGIN_BY_CREDENTIAL_MUTATION } from "./queries";

export default function useLogIn({ setToken }) {
  const [logInByCredentialMutation] = useMutation(LOGIN_BY_CREDENTIAL_MUTATION);

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      username: null,
      password: null,
    },
  });
  const { control, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    withGraphqlErrorHandler(async (data) => {
      const payload = pick(data, ["password", "username"]);
      payload.password = payload.password.trim();
      payload.username = payload.username.trim();

      const response = await logInByCredentialMutation({
        variables: { credentials: payload },
      });

      const token = response.data.logInByCredential.token;

      setToken(token);

      await setToken(token);
    })
  );

  const goToSignIn = () => navigate("/signIn");

  return { onSubmit, control, methods, goToSignIn };
}
