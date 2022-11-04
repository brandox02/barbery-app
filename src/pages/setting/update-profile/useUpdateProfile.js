import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { pick } from "lodash";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { useAppContext } from "../../../appProvider";
import withGraphqlErrorHandler from "../../../utils/withGraphqlErrorHandler";

const UPDATE_USER_MUTATION = gql`
  mutation SaveUser($user: UsersInput!) {
    token: saveUser(user: $user) {
      accessToken
    }
  }
`;

export default function useUpdateProfile() {
  const {
    state: { user, apolloClient },
    actions: { updateUserInfo },
  } = useAppContext();
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    client: apolloClient,
  });

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
        "phoneNumber",
      ]);

      payload.image = data.imageUrl;

      const response = await updateUserMutation({
        variables: { user: payload },
      });

      const { accessToken } = response.data.token;
      updateUserInfo(accessToken);

      Alert.alert("Información de perfil actualizada exitosamente");
      navigate(-1);
    })
  );

  return { methods, onUpdateProfile, loading };
}
