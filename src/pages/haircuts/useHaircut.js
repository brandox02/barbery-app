import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { apolloClient } from "../../../App";

const HAIRCUTS_QUERY = gql`
  query Haircuts {
    haircuts {
      image
      name
      price
      duration
    }
  }
`;

export default function useHaircut() {
  const methods = useForm({
    defaultValues: {
      image: null,
      name: null,
      price: null,
      duration: null,
    },
  });
  const [visibleModalEdit, setVisibleModalEdit] = React.useState(true);
  // const response = useQuery(HAIRCUTS_QUERY, {
  //   variables: {},
  //   client: apolloClient,
  // });
  // console.log({ response });

  return {
    methods,
    visibleModalEdit,
    setVisibleModalEdit,
    haircuts: [
      { img: "img", name: "Feid bajito", price: 300, duration: "00:45:00" },
      {
        img: "img 2",
        name: "Feid bajito 2",
        price: 1300,
        duration: "00:10:00",
      },
      {
        img: "img 3",
        name: "Feid bajito 4",
        price: 3200,
        duration: "00:42:00",
      },
    ],
  };
}
