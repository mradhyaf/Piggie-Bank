import React, { useState, useEffect } from "react";
import { Image, View, Platform, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { GOOGLE_CLOUD_VISION_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setTextState, selectText } from "../../../../store/userSlice";

export default function OCR({ navigation, setExpenses }) {
  const [image, setImage] = useState(null);
  const [google, setGoogle] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    google && divideTextArray(google.split("\n"));
  }, [google]);

  const sendGoogle = async (base64) => {
    let googleVisionRes = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        GOOGLE_CLOUD_VISION_API_KEY,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  /*type: "LABEL_DETECTION", maxResults: 10 */
                },
                {
                  /*type: "LANDMARK_DETECTION", maxResults: 5 */
                },
                {
                  /*type: "FACE_DETECTION", maxResults: 5 */
                },
                {
                  /*type: "LOGO_DETECTION", maxResults: 5 */
                },
                { type: "TEXT_DETECTION", maxResults: 30 },
                {
                  /*type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 */
                },
                {
                  /*type: "SAFE_SEARCH_DETECTION", maxResults: 5 */
                },
                {
                  /*type: "IMAGE_PROPERTIES", maxResults: 5 */
                },
                {
                  /*type: "CROP_HINTS", maxResults: 5 */
                },
                {
                  /*type: "WEB_DETECTION", maxResults: 5 */
                },
              ],
            },
          ],
        }),
      }
    );

    await googleVisionRes
      .json()
      .then((googleVisionRes) => {
        console.log(googleVisionRes);
        if (googleVisionRes) {
          setGoogle(googleVisionRes.responses[0].fullTextAnnotation.text);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      sendGoogle(result.uri.replace(/^data:image\/(png|jpeg);base64,/, ""));
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
      sendGoogle(result.uri.replace(/^data:image\/(png|jpeg);base64,/, ""));
    }
  };

  const divideTextArray = (t) => {
    const val = [];
    const nam = [];
    t.forEach((str) => {
      if (
        str.startsWith("SGD") ||
        str.startsWith("S$") ||
        str.startsWith("$") ||
        Number(str)
      ) {
        val.push(str.match(/^[+-]?(\d*\.)?\d+$/g)[0]);
      } else if (str != "") {
        nam.push(str);
      }
    });
    const length = val.length < nam.length ? val.length : nam.length;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push({ title: nam[i], price: Number(val[i]) });
    }
    console.log("Resulted array: " + arr);
    setExpenses(arr);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button style={styles.button} mode="contained" onPress={pickImage}>
        Pick an image from camera roll
      </Button>
      <Button style={styles.button} mode="contained" onPress={launchCamera}>
        Launch Camera
      </Button>
      {image && (
        <Image source={{ uri: image }} style={{ flex: 0.3, width: '100%', height: '100%', resizeMode: 'contain'}} />
      )}
      {google && (
        <View>
          <Text>{google}</Text>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate("Confirmation")}
          >
            Go to confirmation screen
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});
