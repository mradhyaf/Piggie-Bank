import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, Divider, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

import ExpenseForm from "../../components/ExpenseForm";
import BudgetTracker from "../../components/BudgetTracker";
import Screen from "../../components/Screen";
import { selectDisplayName } from "../../../store/userSlice";

export default function HomeScreen({ navigation }) {
  const displayName = useSelector(selectDisplayName);

  return (
    <Screen
      style={styles.container}
      appbarConfig={{ contentProps: { title: "Home" } }}
    >
      <ScrollView>
        <Card.Content style={styles.card}>
          <Icon style={styles.icon} name="user-alt" size={72} />
          <Text style={styles.avatarName}>{displayName}</Text>
        </Card.Content>
        <Divider />
        <Card.Content style={styles.card}>
          <BudgetTracker />
        </Card.Content>
        <Divider />
        <ExpenseForm />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: "1%",
    marginVertical: 2,
    paddingHorizontal: "2%",
    paddingVertical: 15,
    alignItems: "center",
  },
  icon: {
    color: "#323031",
  },
  avatarName: {
    fontSize: 20,
    marginTop: 2,
    fontWeight: "bold",
  },
  budget: {
    flex: 11,
    alignItems: "center",
    justifyContent: "center",
  },
});
