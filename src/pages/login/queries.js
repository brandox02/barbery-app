import gql from "graphql-tag";

export const LOGIN_BY_CREDENTIAL_MUTATION = gql`
  mutation LogInByCredential($credentials: LogInByCredentialInput!) {
    logInByCredential(credentials: $credentials) {
      token
    }
  }
`;
