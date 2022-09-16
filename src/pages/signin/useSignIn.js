import { gql } from "graphql-tag";
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($user: SignInInput!) {
    signIn(user: $user) {
      token
    }
  }
`;

const defaultValues = {
  email: null,
  firstname: null,
  lastname: null,
  username: null,
  password: null,
  password2: null,
};

export default function useSignIn({ setToken }) {
  const [{ apolloClient }] = useAppContext();
  const [signInMutation] = useMutation(SIGN_IN_MUTATION, {
    client: apolloClient,
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
  });
  const { control, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    withGraphqlErrorHandler(
      async (data) => {
        setIsLoading(true);
        const payload = pick(data, [
          "email",
          "firstname",
          "lastname",
          "password",
          "username",
        ]);
        payload.email = payload.email.trim();
        payload.firstname = payload.firstname.trim();
        payload.lastname = payload.lastname.trim();
        payload.password = payload.password.trim();
        payload.username = payload.username.trim();

        const response = await signInMutation({ variables: { user: payload } });
        const token = response.data.signIn.token;

        await setToken(token);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    )
  );

  const goToLogin = () => navigate("/");

  return { onSubmit, control, methods, goToLogin, isLoading };
}
