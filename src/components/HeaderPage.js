import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useAppContext } from "../appProvider";

const HeaderPage = ({ title }) => {
  const {
    state: { user },
  } = useAppContext();

  return (
    <ScrollView stickyHeaderIndices={[1]}>
      <View style={styles.container}>
        <View style={styles.left}>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                marginBottom: 10,
                top: 0,
              }}
            >
              {title}
            </Text>
            <Text
              style={{ fontSize: 16 }}
            >{`${user?.firstname} ${user?.lastname}`}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <Image
            style={styles.profileImage}
            source={
              user?.imageUrl
                ? { uri: user.imageUrl }
                : require("../../assets/non-profile-image.png")
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  left: {
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 15,
  },
  right: {
    justifyContent: "center",
    right: 10,
  },
  backButtonContainer: {
    padding: 10,
  },
});

export default HeaderPage;
