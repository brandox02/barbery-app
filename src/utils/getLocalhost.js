import { NativeModules } from "react-native";

export const getLocalhost = () =>
  NativeModules.SourceCode.scriptURL
    .split(":")
    .filter((_, i) => [0, 1].includes(i))
    .join(":");
