import { SafeAreaView, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { fetchProgrammers } from "../services/ProgrammersService";
import { Card, Image, Text, Divider } from "react-native-elements";
import { useEffect, useState } from "react";
import { ScrollView } from "native-base";

const Main = () => {
  const [programmers, setProgrammers] = useState([]);

  useEffect(() => {
    const loadProgrammers = async () => {
      try {
        const response = await fetchProgrammers();
        setProgrammers(response.data || []);
      } catch (error) {
        console.error("Error fetching programmers:", error);
      }
    };
    loadProgrammers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Card containerStyle={styles.card}>
            <Text h4 h4Style={styles.cardTitle}>
              Programadores
            </Text>
            <Divider style={styles.divider} />
            {programmers.length > 0 ? (
              programmers.map((programmer, i) => (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: programmer.full_photo + `?${Date.now()}`, // Cache buster
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.name}>
                    {programmer.name || "Sin nombre"}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>
                No hay programadores disponibles
              </Text>
            )}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$appBg",
    justifyContent: "center",
    alignItems: "center",
  },
  user: {
    flexDirection: "row",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, // Para imágenes redondas
    minHeight: 50,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
  },
});
