import { gql, useMutation } from "@apollo/react-hooks";
import dayjs from "dayjs";
import { Alert, Button, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppContext } from "../../appProvider";
import addTime from "../../utils/addTime";
import Spinner from "../../components/Spinner";

const SAVE_SCHEDULE = gql`
  mutation SaveSchedule($schedule: ScheduleInput!) {
    saveSchedule(schedule: $schedule) {
      haircut {
        duration
        name
        id
      }
      id
      scheduleDate
      user {
        id
        username
      }
    }
  }
`;

export default function Card({ schedule, user, showCancelButton, refetch }) {
  const startDate = dayjs(schedule.scheduleDate);
  const endDate = addTime({
    date: schedule.scheduleDate,
    time: schedule.haircut.duration,
  });
  const dateLabel = dayjs(schedule.scheduleDate).format("DD-MM-YYYY");
  const timeLabel = `${startDate.format("hh:mmA")} - ${endDate.format(
    "hh:mmA"
  )}`;

  const {
    state: { apolloClient },
  } = useAppContext();

  const [cancelScheduleMutation, { loading }] = useMutation(SAVE_SCHEDULE, {
    client: apolloClient,
  });

  function launchCncelScheduleModal() {
    async function cancelSchedule() {
      const { id } = schedule;
      try {
        await cancelScheduleMutation({
          variables: { schedule: { id, cancelled: true } },
        });
        await refetch();

        Alert.alert("Cita Cancelada Exitosamente");
      } catch (error) {
        Alert.alert(
          "Ha ocurrido un error inesperado",
          "Ocurrió un error inesperado al momento de cancelar la cita"
        );
      }
    }

    Alert.alert("Estas seguro que deseas cancelar esta cita?", "", [
      { text: "Cancelar" },
      { text: "Confirmar", onPress: cancelSchedule },
    ]);
  }

  return (
    <View
      style={{
        padding: 20,
        marginVertical: 20,
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        borderWidth: 0.2,
        borderColor: "grey",
      }}
    >
      <Spinner visible={loading} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={{ justifyContent: "space-around" }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{dateLabel}</Text>
          <Text style={{ fontWeight: "600", fontSize: 14, fontWeight: "500" }}>
            {timeLabel}
          </Text>
          {user && <Text>{`${user.firstname} ${user.lastname}`}</Text>}
          <Text style={{ fontWeight: "200" }}>{schedule.haircut.name}</Text>
        </View>
        <View>
          <Image
            source={
              schedule.haircut.imageUrl
                ? { uri: schedule.haircut.imageUrl }
                : require("../../../assets/haircut-1.webp")
            }
            style={{ height: 70, width: 70, borderRadius: 10 }}
          />
        </View>
      </View>
      {showCancelButton && (
        <View>
          <Button
            title={"Cancelar Cita"}
            color={"red"}
            onPress={launchCncelScheduleModal}
          />
        </View>
      )}
    </View>
  );
}
