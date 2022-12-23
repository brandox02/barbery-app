import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { IS_PRODUCTION } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import makeApolloClient from "./apollo";
import gql from "graphql-tag";
import { useMutation, useQuery } from "react-apollo";
import { useNavigate } from "react-router-native";

export const HOME_ROUTE = "/haircuts";
const initialContextValue = {
  state: { isProduction: false, apolloClient: null, user: null, token: null },
  actions: {
    logout: async () => {},
    login: async () => {},
    sigin: async () => {},
    updateUserInfo: () => {},
  },
};
const context = createContext(initialContextValue);

export const useAppContext = () => useContext(context);

const GET_USER_INFO = gql`
  query GetUserInfo {
    getUserInfo {
      id
      username
      email
      firstname
      lastname
      isAdmin
      imageUrl
      imageId
      phoneNumber
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

const SIGNIN = gql`
  mutation Signin($signin: UsersInput!) {
    signin(user: $signin) {
      accessToken
    }
  }
`;

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    isProduction: Boolean(parseInt(IS_PRODUCTION)),
    apolloClient: makeApolloClient(),
    user: null,
    token: null,
  });

  const goTo = useNavigate();

  const { refetch } = useQuery(GET_USER_INFO, {
    client: state.apolloClient,
  });

  const [loginMutation] = useMutation(LOGIN, { client: state.apolloClient });
  const [signinMutation] = useMutation(SIGNIN, { client: state.apolloClient });

  const updateToken = async (token) => {
    await SecureStore.setItemAsync("token", token);
    setState((state) => ({
      ...state,
      token: token,
      apolloClient: makeApolloClient(token),
    }));
  };

  useEffect(() => {
    async function fn() {
      try {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          setState((state) => ({
            ...state,
            token,
            apolloClient: makeApolloClient(token),
          }));
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Ocurrió un error",
          "Ocurrió un error a la hora de leer el token de acceso"
        );
      }
    }
    fn();
  }, []);

  // when the apollo client is loaded & the token is extracted then get user info
  useEffect(() => {
    if (state.apolloClient && state.token) {
      refetch().then(({ data }) => {
        setState((state) => ({ ...state, user: data.getUserInfo }));
        goTo(HOME_ROUTE);
      });
    }
  }, [state.apolloClient]);

  const login = async ({ username, password }) => {
    console.log({ username, password });
    try {
      const response = await loginMutation({
        variables: { username, password },
      });

      console.log({ response });

      const { accessToken } = response.data.login;
      if (accessToken) {
        await updateToken(accessToken);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Datos incorrectos");
    }
  };

  const sigin = async ({
    username,
    email,
    firstname,
    lastname,
    phoneNumber,
    password,
  }) => {
    try {
      const response = await signinMutation({
        variables: {
          signin: {
            username,
            email,
            firstname,
            lastname,
            phoneNumber,
            password,
          },
        },
      });
      const { accessToken } = response.data.signin;
      if (accessToken) {
        await updateToken(accessToken);
      }
    } catch (error) {
      Alert.alert("Ocurrió un error a la hora de iniciar sesión");
    }
  };

  const logout = async () => {
    setState((state) => ({ ...state, user: null, token: null }));

    await SecureStore.deleteItemAsync("token");
    goTo("/");
  };

  const updateUserInfo = (token) => {
    setState((state) => ({
      ...state,
      apolloClient: makeApolloClient(token),
      token,
    }));
  };

  return (
    <context.Provider
      value={{ state, actions: { login, logout, sigin, updateUserInfo } }}
    >
      {children}
    </context.Provider>
  );
};
