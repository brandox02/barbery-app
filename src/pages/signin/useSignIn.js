import { gql, useMutation } from "graphql-tag";
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import withGraphqlErrorHandler from "../../utils/withGraphqlErrorHandler";
import { useNavigate } from "react-router-native";

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
  const [signInMutation] = useMutation(SIGN_IN_MUTATION);

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues,
  });
  const { control, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    withGraphqlErrorHandler(async (data) => {
      const payload = pick(data, [
        "email",
        "firstname",
        "lastname",
        "password",
        "username",
      ]);

      const response = await signInMutation({ variables: { user: payload } });
      const token = response.data.signIn.token;
      console.log("in payload", token);

      await setToken(token);
    })
  );

  const goToLogin = () => navigate("/");

  return { onSubmit, control, methods, goToLogin };
}
