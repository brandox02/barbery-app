import { Alert } from "react-native";

const withGraphqlErrorHandler = (fn, onError) => {
  return async (...args) => {
    try {
      const response = await fn(...args);
      return response;
    } catch (error) {
      const message = error.message.replace("GraphQL error: ", "");
      Alert.alert("Error", message || "Algo salió mal");
      console.error(error);
      onError && (await onError(error));
      return new Error(error);
    }
  };
};

export default withGraphqlErrorHandler;
