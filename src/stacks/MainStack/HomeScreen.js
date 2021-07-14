import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";

import ExpenseForm from "../../components/ExpenseForm";
import BudgetTracker from "../../components/BudgetTracker";
import Screen from "../../components/Screen";
import { selectDisplayName } from "../../../store/userSlice";

export default function HomeScreen({ navigation }) {
  const displayName = useSelector(selectDisplayName);

  return (
    <Screen style={styles.container} title="Home" enableAppbar={true}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content style={{ alignItems: "center" }}>
            <Icon style={styles.icon} name="user-alt" size={72} />
            <Text style={styles.avatarName}>{displayName}</Text>
          </Card.Content>
        </Card>
        <Card style={styles.card}>{/* <BudgetTracker /> */}</Card>
        <Card style={styles.card}>
          <ExpenseForm />
        </Card>
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
