import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";

const UPDATE_USER_MUTATION = gql`
  mutation SaveUser($user: UserInput!) {
    token: saveUser(user: $user)
  }
`;

export default function useUpdateProfile({ setToken }) {
  const [{ user }] = useAppContext();
  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION);
  const methods = useForm({
    defaultValues: user,
  });

  const navigate = useNavigate();

  const onUpdateProfile = methods.handleSubmit(
    withGraphqlErrorHandler(async (data) => {
      const payload = pick(data, [
        "id",
        "username",
        "email",
        "password",
        "firstname",
        "lastname",
        "image",
      ]);

      const response = await updateUserMutation({
        variables: { user: payload },
      });

      const { token } = response.data;
      setToken(token);

      Alert.alert("Información de perfil actualizada exitosamente");
      navigate(-1);
    })
  );

  return { methods, onUpdateProfile };
}
