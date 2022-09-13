import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Divider, List } from "react-native-paper";
import HeaderPage from "../../components/HeaderPage";
import useWorkSchedule from "./useWorkSchedule";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay/lib";
import dayjs from "dayjs";
import { timeToUnix } from "../../utils/timeToUnix";
import formatTime from "../../utils/formatTime";
import { useAppContext } from "../../appProvider";

export default function WorkSchedule() {
  const {
    dateEndInput,
    dateStartInput,
    items,
    onDateInput,
    onAddNonWorkInterval,
    onDeleteWorkInterval,
    onSave,
    isLoading,
  } = useWorkSchedule();
  const [{ user }] = useAppContext();
  return (
    <View>
      <HeaderPage title={"Horarios"} />
      <Spinner visible={isLoading} />
      <View style={{ alignItems: "flex-end", paddingRight: 20 }}>
        {user?.isAdmin && <Button title="Guardar" onPress={onSave} />}
      </View>
      <View style={styles.body}>
        <List.Section
          title={
            <View>
              <Text style={{ fontWeight: "500" }}>
                {
                  "A continuación estan los días y horas en las que no laboramos"
                }
              </Text>
            </View>
          }
        >
          {items.map((item) => (
            <List.Accordion
              key={item.id}
              title={item.day}
              left={(props) => <List.Icon {...props} icon="briefcase" />}
            >
              {item.nonWorkIntervals.length ? (
                item.nonWorkIntervals.map((nonWorkInterval) => (
                  <List.Item
                    style={{ marginVertical: 10 }}
                    key={nonWorkInterval.id}
                    left={(props) => (
                      <List.Icon {...props} icon="clock-time-nine-outline" />
                    )}
                    right={(props) =>
                      user?.isAdmin ? (
                        <Pressable
                          onPress={onDeleteWorkInterval({
                            dayId: item.id,
                            nonWorkIntervalId: nonWorkInterval.id,
                          })}
                        >
                          <List.Icon {...props} icon="delete" color="red" />
                        </Pressable>
                      ) : (
                        <Text></Text>
                      )
                    }
                    title={`${formatTime(
                      timeToUnix(nonWorkInterval.start)
                    )} - ${formatTime(timeToUnix(nonWorkInterval.start))}`}
                  />
                ))
              ) : (
                <List.Item title={`No se labora a todas horas hoy`} />
              )}
              {user?.isAdmin && (
                <>
                  <Divider
                    style={{ borderWidth: 0.34, borderColor: "purple" }}
                  />
                  <List.Item
                    title={
                      <View
                        style={{
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <DateTimePicker
                          onChange={onDateInput({ isStart: true })}
                          style={{ width: 60, marginLeft: 10 }}
                          mode="time"
                          value={dateStartInput}
                        />
                        <DateTimePicker
                          onChange={onDateInput({ isStart: false })}
                          style={{ width: 60, marginLeft: 10 }}
                          mode="time"
                          value={dateEndInput}
                        />
                        <Button
                          title={"Agregar"}
                          onPress={() =>
                            onAddNonWorkInterval({ dayId: item.id })
                          }
                        />
                      </View>
                    }
                  />
                </>
              )}
            </List.Accordion>
          ))}
        </List.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
});
