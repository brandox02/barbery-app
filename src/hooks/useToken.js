import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { useAppContext } from "../appProvider";
import gql from "graphql-tag";
import makeApolloClient from "../apollo";

export const HOME_ROUTE = "/haircuts";

const LOGIN_BY_TOKEN_MUTATION = gql`
  mutation LogInByToken($token: String!) {
    logInByToken(token: $token) {
      user {
        id
        email
        firstname
        isAdmin
        lastname
        password
        username
        imageUrl
      }
    }
  }
`;

export default function useToken({ apolloClient }) {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const [logInByTokenMutation] = useMutation(LOGIN_BY_TOKEN_MUTATION, {
    client: apolloClient,
  });
  const [_, setAppState] = useAppContext();

  // load local token to state
  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then((token) => {
        setToken(token);
      })
      .catch((error) => {
        console.log(error);
        setToken(null);
      });
  }, []);

  // listen to any change of token for redirect to respective page
  useEffect(() => {
    if (token) {
      logInByTokenMutation({ variables: { token } })
        .then((response) => {
          const { user } = response.data.logInByToken;
          navigate(response.data.logInByToken.user ? HOME_ROUTE : "/");

          const apolloClient = makeApolloClient(token);
          setAppState((state) => ({
            ...state,
            user,
            apolloClient,
          }));
        })
        .catch(() => {
          Alert.alert("Error", "No se pudo iniciar sesión");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [token]);

  // handle token change
  async function _setToken(token) {
    if (token) {
      setToken(token);
      await SecureStore.setItemAsync("token", token);
    } else {
      setToken(null);
      await SecureStore.deleteItemAsync("token");
    }
  }

  const reloadUserInfo = () => logInByTokenMutation({ variables: { token } });

  return [token, _setToken, reloadUserInfo];
}
