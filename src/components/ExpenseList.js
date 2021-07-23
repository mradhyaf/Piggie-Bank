import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  Dialog,
  Portal,
  Divider,
  List,
  Text,
  Button,
  Paragraph,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { format as formatDate } from "../../functions/date";

export default function ExpenseList({
  data,
  handleDelete,
  listProps,
  listItemProps,
}) {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState("");

  const DeleteBox = ({ expense }) => (
    <Icon
      name="trash"
      style={styles.deleteBox}
      onPress={() => {
        setVisible(true);
        setItem(expense);
      }}
    />
  );

  // List render item
  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={() => <DeleteBox expense={item} />}>
      <List.Item
        style={styles.listItem}
        title={item.title}
        description={formatDate(item.date)}
        right={() => <Text style={styles.center}>{"$" + item.price}</Text>}
        {...listItemProps}
      />
    </Swipeable>
  );

  return (
    <View>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        {...listProps}
      />

      {/* Confirmation dialogs */}
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
            setItem("");
          }}
        >
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                handleDelete(item);
              }}
            >
              Yes
            </Button>
            <Button
              onPress={() => {
                setVisible(false);
                setItem("");
              }}
            >
              No
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    // borderColor: 'black',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  listItem: {
    // fontWeight: 'bold'
    backgroundColor: "#FFF",
  },
  center: {
    paddingTop: 15,
    fontWeight: "bold",
  },
  deleteBox: {
    padding: 27,
    backgroundColor: "red",
    color: "white",
  },
});
