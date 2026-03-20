
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// Mock API function
const getPrice = (name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name,
        price: Math.floor(Math.random() * 5000) + 100,
        open: 1000,
        close: 1200,
        time: new Date().toLocaleString(),
      });
    }, 1000);
  });
};

// Home Screen
function HomeScreen({ navigation }) {
  const metals = ["Gold", "Silver", "Platinum", "Palladium"];

  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    metals.forEach((m) => loadData(m));
  }, []);

  const loadData = async (metal) => {
    setLoading((p) => ({ ...p, [metal]: true }));
    const result = await getPrice(metal);
    setData((p) => ({ ...p, [metal]: result }));
    setLoading((p) => ({ ...p, [metal]: false }));
  };

  return (
    <View style={{ padding: 20 }}>
      {metals.map((m) => (
        <TouchableOpacity
          key={m}
          onPress={() => navigation.navigate("Details", { item: data[m] })}
          style={{
            padding: 15,
            margin: 10,
            backgroundColor: "#eee",
            borderRadius: 10,
          }}
        >
          <Text>{m}</Text>

          {loading[m] ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text>₹ {data[m]?.price}</Text>
              <Text>{data[m]?.time}</Text>
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

// Details Screen
function DetailScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>{item.name}</Text>
      <Text>Price: ₹ {item.price}</Text>
      <Text>Open: ₹ {item.open}</Text>
      <Text>Close: ₹ {item.close}</Text>
      <Text>{item.time}</Text>
    </View>
  );
}

// App Main
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}