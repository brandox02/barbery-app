import { Dimensions } from "react-native";

export const getHeightByPercent = (percent) =>
  (Dimensions.get("window").height * parseInt(percent.split("%")[0])) / 100;
