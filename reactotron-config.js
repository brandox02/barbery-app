import Reactotron from "reactotron-react-native";
import { NativeModules } from "react-native";
// import { AsyncStorage } from "react-native";

const scriptURL = NativeModules.SourceCode.scriptURL;
let scriptHostname = scriptURL.split("://")[1].split(":")[0];
console.log({ scriptHostname });
export default Reactotron
  // .configure({ name: "React Native Example Inspect" })
  .configure()

  // .use(
  //   networking({
  //     ignoreContentTypes: /^(image)\/.*$/i,
  //     ignoreUrls: /\/(logs|symbolicate)$/,
  //   })
  // )
  .connect();
