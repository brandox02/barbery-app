import React from "react";
import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import conditionalObj from "../utils/conditionalObj";

const HeaderPage = ({ text, onBack = async () => {}, showBackButton }) => {
  const navigate = useNavigate();
  async function _onBack() {
    await onBack();
    navigate(-1);
  }

  return (
    <View style={styles.container}>
      <View
        style={conditionalObj({
          condition: !showBackButton,
          conditionlObj: { marginLeft: 15 },
          obj: styles.left,
        })}
      >
        {showBackButton && (
          <View style={styles.backButtonContainer}>
            <Pressable onPress={_onBack}>
              <Image
                source={require("../../assets/back-icon.png")}
                style={{ width: 40, height: 40, marginLeft: -10 }}
              />
            </Pressable>
          </View>
        )}
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              // marginTop: 10,
              marginBottom: 10,
              top: 0,
            }}
          >
            {text}
          </Text>
          <Text style={{ fontSize: 16 }}>{"Brandon Fernández"}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/me.jpeg")}
        />
      </View>
    </View>
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
    width: "100%",
    // border styles
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

    // borderWidth: 1,
  },
  right: {
    justifyContent: "center",
  },
  backButtonContainer: {
    // borderWidth: 1,
    padding: 10,
    // marginRight: 10,
  },
});

export default HeaderPage;
