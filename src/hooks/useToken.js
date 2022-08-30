import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { useAppContext } from "../appProvider";
import gql from "graphql-tag";

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
      }
    }
  }
`;

export default function useToken() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const [logInByTokenMutation] = useMutation(LOGIN_BY_TOKEN_MUTATION);
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
          // console.log({ edison: response.data.logInByToken.user });
          navigate(response.data.logInByToken.user ? "/haircuts" : "/");
          setAppState((state) => ({
            ...state,
            user: {
              id: -1,
              firstname: "en espera del back-end",
            },
          }));
        })
        .catch(() => {
          Alert.alert("Error", "No se pudo iniciar sesión");
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

  return [token, _setToken];
}
