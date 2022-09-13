import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";
import { useAppContext } from "../appProvider";
import gql from "graphql-tag";
import makeApolloClient, { apolloClient } from "../apollo";

const HOME_ROUTE = "/haircuts";

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
        image
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
          const { user } = response.data.logInByToken;
          navigate(response.data.logInByToken.user ? HOME_ROUTE : "/");

          const apolloClient = makeApolloClient(
            "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjQsInVzZXJuYW1lIjoiZmYiLCJlbWFpbCI6ImJyQGdvYi5kbyIsInBhc3N3b3JkIjoiZmYiLCJmaXJzdG5hbWUiOiJmZiIsImxhc3RuYW1lIjoiZmYiLCJpbWFnZSI6bnVsbCwiaXNBZG1pbiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjItMDgtMTZUMjE6MDE6MDYuOTc4WiIsInVwZGF0ZWRBdCI6IjIwMjItMDktMDFUMTk6Mzk6MjAuMjAxWiJ9.C9aMfKxtRgv-aFlq6HMw1jETz2aDfRg04caYXSwjono"
          );
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
