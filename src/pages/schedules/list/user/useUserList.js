import gql from "graphql-tag";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { usePopulate } from "../../../../hooks/usePopulate";

const GET_SCHEDULES = gql`
  query Schedules($where: ScheduleWhereInput) {
    schedules(where: $where) {
      id
      userId

      haircut {
        id
        duration
        name
      }
      scheduleDate
    }
  }
`;

export default function useUserList({ user }) {
  const navigate = useNavigate();
  const goToManagement = () => navigate("/schedules/management");
 

  return { goToManagement };
}
