import * as React from "react";
import { Button, Text, View } from "react-native";
import HaircutCard from "../../../components/HaircutCard";
import HeaderPage from "../../../components/HeaderPage";
import useHaircut from "./useHaircut";
import Spinner from "../../../components/Spinner";
import { useAppContext } from "../../../appProvider";
import CardMenu from "./Menu";

export default function Haircut() {
  const {
    haircuts,
    goToCreate,
    goToUpdate,
    loading,
    launchDeleteHaircutConfirm,
  } = useHaircut();
  const {
    state: { user },
  } = useAppContext();

  return (
    <>
      <HeaderPage title={"Cortes de Pelo"} />
      <Spinner visible={loading} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          alignItems: "flex-end",
        }}
      >
        {user?.isAdmin && <Button title="Nuevo Corte" onPress={goToCreate} />}
      </View>
      <View style={{}}>
        {haircuts.length ? (
          haircuts.map(({ imageUrl, name, price, duration, id }) => (
            <HaircutCard
              key={id}
              duration={duration}
              image={imageUrl}
              price={price}
              title={name}
            >
              <HaircutCard.CardHeader
                title={name}
                right={
                  user?.isAdmin && (
                    <CardMenu
                      onDelete={async () =>
                        await launchDeleteHaircutConfirm(id)
                      }
                      onEdit={() => goToUpdate(id)}
                    />
                  )
                }
              />
              <HaircutCard.CardImage image={imageUrl} />
              <HaircutCard.CardDetail duration={duration} price={price} />
            </HaircutCard>
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>{"No hay ningun corte de pelo para mostrar"}</Text>
          </View>
        )}
      </View>
    </>
  );
}
