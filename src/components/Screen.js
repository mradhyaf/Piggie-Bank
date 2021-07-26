import React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";

import Logo from "../../assets/app-logo.svg";

export default function Screen({
  children,
  backAction,
  appbarContentProps,
  style,
  icon,
  ...props
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        {backAction && <Appbar.BackAction onPress={backAction} />}
        {icon ? (
          icon()
        ) : (
          <Logo style={{ marginLeft: 17 }} width={30} height={30} />
        )}
        <Appbar.Content
          color="black"
          title="Piggie Bank"
          titleStyle={styles.appbarTitle}
          {...appbarContentProps}
        />
      </Appbar.Header>
      <View style={[styles.content, style]} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export function ScreenWrapper(Component) {
  return function WrappedComponent(props) {
    return (
      <Screen>
        <Component {...props} />
      </Screen>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "white",
  },
  appbar: {
    backgroundColor: "white",
  },
  appbarTitle: {
    fontFamily: "sans-serif-condensed",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    margin: "1%",
  },
});
