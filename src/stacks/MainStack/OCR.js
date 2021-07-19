import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GOOGLE_CLOUD_VISION_API_KEY } from '@env'

export default function OCR() {
  const [image, setImage] = useState(null);
  const [googleVision, setGoogleVision] = useState(null);

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

  const sendGoogle = async (base64) => {
    let googleVisionRes = await fetch("https://vision.googleapis.com/v1/images:annotate?key=" + GOOGLE_CLOUD_VISION_API_KEY, {
      method: 'POST',
      body: JSON.stringify({
        "requests": [
        {
          "image": {
            "content": base64
          },
          features: [
            { /*type: "LABEL_DETECTION", maxResults: 10 */},
            { /*type: "LANDMARK_DETECTION", maxResults: 5 */},
            { /*type: "FACE_DETECTION", maxResults: 5 */},
            { /*type: "LOGO_DETECTION", maxResults: 5 */},
            { type: "TEXT_DETECTION", maxResults: 30 },
            { /*type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 */},
            { /*type: "SAFE_SEARCH_DETECTION", maxResults: 5 */},
            { /*type: "IMAGE_PROPERTIES", maxResults: 5 */},
            { /*type: "CROP_HINTS", maxResults: 5 */},
            { /*type: "WEB_DETECTION", maxResults: 5 */}
          ],
        }
        ]
      })
    });

    await googleVisionRes.json()
      .then(googleVisionRes => {
        console.log(googleVisionRes)
        if (googleVisionRes) {
          setGoogleVision(googleVisionRes.responses[0]);
          console.log('this.is response', googleVision);
        }
      }).catch((error) => { console.log(error) })
  }


  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      sendGoogle(result.uri.replace(/^data:image\/(png|jpg);base64,/, ""));
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
      sendGoogle(result.uri.replace(/^data:image\/(png|jpg);base64,/, ""));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Launch Camera" onPress={launchCamera} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
