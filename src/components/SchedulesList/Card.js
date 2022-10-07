import dayjs from "dayjs";
import { Button, Image, View } from "react-native";
import { Text } from "react-native-paper";
import addTime from "../../utils/addTime";

export default function Card({ schedule, user }) {
  const startDate = dayjs(schedule.scheduleDate);
  const endDate = addTime({
    date: schedule.scheduleDate,
    time: schedule.haircut.duration,
  });
  const dateLabel = dayjs(schedule.scheduleDate).format("DD-MM-YYYY");
  const timeLabel = `${startDate.format("hh:mmA")} - ${endDate.format(
    "hh:mmA"
  )}`;

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20
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
      <View>
        <Button title={"Cancelar Cita"} color={'red'}/>
      </View>
    </View>
  );
}
