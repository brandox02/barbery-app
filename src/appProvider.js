import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { IS_PRODUCTION } from "@env";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import makeApolloClient from "./apollo";
import gql from "graphql-tag";
import { useLazyQuery, useQuery } from "react-apollo";

export const HOME_ROUTE = "/haircuts";
const initialContextValue = {
  state: { isProduction: false, apolloClient: null, user: null, token: null },
  actions: {
    logout: async () => {},
    login: async () => {},
    sigin: async () => {},
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

export const AppProvider = ({ children, navigate }) => {
  const [state, setState] = useState({
    isProduction: Boolean(parseInt(IS_PRODUCTION)),
    apolloClient: makeApolloClient(),
    user: null,
    token: null,
  });
  const [skip, setSkip] = useState(false);

  const {
    data: userInfo,
    called,
    refetch,
  } = useQuery(GET_USER_INFO, {
    client: state.apolloClient,
  });

  const [loginMutation] = useMutation(LOGIN, { client: state.apolloClient });
  const [signinMutation] = useMutation(SIGNIN, { client: state.apolloClient });

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then((token) => {
        if (token) {
          // console.log("Token founded: ", token);
          setState((state) => ({ ...state, token }));
          navigate(HOME_ROUTE);
        }
      })
      .catch((error) => {
        Alert.alert(
          "Ocurrió un error",
          "Ocurrió un error a la hora de leer el token de acceso"
        );
      });
  }, []);

  useEffect(() => {
    // console.log({ userInfo, called });
    if (userInfo) {
      // setState((state) => ({ ...state, user: userInfo.userInfo }));
      console.log("is coming here", userInfo);
      // navigate(HOME_ROUTE);
    }
  }, [userInfo, called]);

  useEffect(() => {
    if (state.apolloClient) {
      console.log("llegando aqui");
      refetch();
    }
  }, [state.apolloClient]);

  useEffect(() => {
    console.log("out");
    if (state.token) {
      SecureStore.setItemAsync("token", state.token).then(() => {
        console.log("along here");
        setState((state) => ({
          ...state,
          apolloClient: makeApolloClient(state.token),
        }));
      });
    }
  }, [state.token]);

  const login = async ({ username, password }) => {
    try {
      const response = await loginMutation({
        variables: { username, password },
      });

      const { accessToken } = response.data.login;
      if (accessToken) {
        setState((state) => ({ ...state, token: accessToken }));
      }
    } catch (error) {
      Alert.alert("Ocurrió un error a la hora de iniciar sesión");
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
          username,
          email,
          firstname,
          lastname,
          phoneNumber,
          password,
        },
      });
      const { accessToken } = response.data.signin;
      if (accessToken) {
        setState((state) => ({ ...state, token: accessToken }));
        navigate(HOME_ROUTE);
      }
    } catch (error) {
      Alert.alert("Ocurrió un error a la hora de iniciar sesión");
    }
  };

  const logout = () => setState((state) => ({ ...state, user: null }));

  return (
    <context.Provider value={{ state, actions: { login, logout, sigin } }}>
      {children}
    </context.Provider>
  );
};
