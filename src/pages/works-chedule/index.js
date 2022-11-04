import React from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Divider, List } from "react-native-paper";
import HeaderPage from "../../components/HeaderPage";
import useWorkSchedule from "./useWorkSchedule";
import DateTimePicker from "@react-native-community/datetimepicker";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { timeToUnix } from "../../utils/timeToUnix";
import formatTime from "../../utils/formatTime";
import { useAppContext } from "../../appProvider";
import AddModal from "./AddModal";

export default function WorkSchedule() {
  const {
    dateEndInput,
    dateStartInput,
    items,
    onDateInput,
    onAddWorkInterval,
    onDeleteWorkInterval,
    onSave,
    isLoading,
    onOpenModal,
    toggleModal,
    visible,
  } = useWorkSchedule();
  const {
    state: { user },
  } = useAppContext();
  return (
    <View>
      <HeaderPage title={"Horarios"} />
      <Spinner visible={isLoading} />
      <AddModal
        visible={visible}
        dateEndInput={dateEndInput}
        dateStartInput={dateStartInput}
        onDateInput={onDateInput}
        onSave={onSave}
        onAddWorkInterval={onAddWorkInterval}
        handleClose={toggleModal}
      />
      <View
        style={{ alignItems: "flex-end", paddingRight: 20, paddingTop: 20 }}
      >
        {user?.isAdmin && <Button title="Guardar" onPress={onSave} />}
      </View>
      <View style={styles.body}>
        <Text style={{ marginTop: 10 }}>
          A continuacion estan los dias y horas en las que laboramos:
        </Text>
        <List.Section>
          {items.map((item) => (
            <List.Accordion
              key={item.id}
              title={item.day}
              left={(props) => <List.Icon {...props} icon="briefcase" />}
            >
              {item.workIntervals.length ? (
                item.workIntervals.map((workInterval) => (
                  <List.Item
                    style={{ marginVertical: 10 }}
                    key={workInterval.id}
                    left={(props) => (
                      <List.Icon {...props} icon="clock-time-nine-outline" />
                    )}
                    right={(props) =>
                      user?.isAdmin ? (
                        <Pressable
                          onPress={onDeleteWorkInterval({
                            dayId: item.id,
                            workIntervalId: workInterval.id,
                          })}
                        >
                          <List.Icon {...props} icon="delete" color="red" />
                        </Pressable>
                      ) : (
                        <Text></Text>
                      )
                    }
                    title={`${formatTime(
                      timeToUnix(workInterval.start)
                    )} - ${formatTime(timeToUnix(workInterval.end))}`}
                  />
                ))
              ) : (
                <List.Item title={`En este día no laboramos`} />
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
                        <Button
                          title={"Agregar"}
                          onPress={() => onOpenModal(item.id)}
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
  body: {},
});
