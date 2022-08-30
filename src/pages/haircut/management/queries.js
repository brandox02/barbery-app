import gql from "graphql-tag";

export const SAVE_MUTATION = gql`
  mutation SaveHaircut($haircut: HaircutInput!) {
    saveHaircut(haircut: $haircut) {
      # image
      name
      price
      duration
      id
    }
  }
`;

export const GET_HAIRCUT = gql`
  query Haircut($where: HaircutInput!) {
    haircut(where: $where) {
      id
      name
      duration
      image
      price
    }
  }
`;