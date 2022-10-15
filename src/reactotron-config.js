import Reactotron, { asyncStorage } from "reactotron-react-native";

Reactotron
  // .con .configure() // controls connection & communication settings
  .useReactNative(asyncStorage()) // add all built-in react native plugins
  .connect();
