import React from "react";
import { Button, Modal, Text, View } from "react-native";
import DurationPicker from "../../components/DurationPicker";

export default function AddModal({
  visible,
  dateEndInput,
  dateStartInput,
  onDateInput,
  onAddWorkInterval,
  handleClose,
}) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 16 }}>Selecciona los tiempos:</Text>
        <DurationPicker
          date={dateStartInput}
          setDate={onDateInput({ isStart: true })}
          label={<Text style={{ fontSize: 14 }}>Desde:</Text>}
          hourConfig={{
            label: "Hora:",
            limit: 24,
            step: 1,
          }}
        />
        <DurationPicker
          date={dateEndInput}
          setDate={onDateInput({ isStart: false })}
          label={<Text style={{ fontSize: 14 }}>Hasta:</Text>}
          hourConfig={{
            label: "Hora:",
            limit: 24,
            step: 1,
          }}
        />
        <Button title="Confirmar" onPress={onAddWorkInterval} />
        <Text></Text>
        <Button title="Cancelar" color={"red"} onPress={handleClose} />
      </View>
    </Modal>
  );
}
