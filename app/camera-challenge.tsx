import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAlarm } from "@/contexts/AlarmContext";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { cameraStyles, colors } from "@/styles";

export default function CameraChallengeScreen() {
  const { stopAlarm } = useAlarm();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert("Parar Alarme", "Deseja parar o alarme sem tirar a foto?", [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Parar",
            style: "destructive",
            onPress: () => {
              stopAlarm();
              router.replace("/");
            },
          },
        ]);
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={cameraStyles.permissionContainer}>
        <IconSymbol name="camera" size={80} color={colors.gray400} />
        <Text style={cameraStyles.permissionTitle}>
          Precisamos de acesso à câmera
        </Text>
        <Text style={cameraStyles.permissionText}>
          Para usar o desafio da foto, permita o acesso à câmera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={cameraStyles.permissionButton}
        >
          <Text style={cameraStyles.permissionButtonText}>Permitir Acesso</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
      });

      if (photo) {
        await savePhotoChallenge(photo.uri);

        Alert.alert("Foto Capturada!", "Alarme desligado com sucesso", [
          {
            text: "OK",
            onPress: () => {
              stopAlarm();
              router.replace("/");
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Erro ao capturar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto");
    } finally {
      setIsCapturing(false);
    }
  };

  const savePhotoChallenge = async (photoUri: string) => {
    try {
      const filename = `alarm_photo_${Date.now()}.jpg`;
      const directory = `${FileSystem.documentDirectory}alarm_photos/`;

      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      const newPath = `${directory}${filename}`;
      await FileSystem.moveAsync({
        from: photoUri,
        to: newPath,
      });

      console.log("Photo saved:", newPath);
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <SafeAreaView style={cameraStyles.container}>
      <CameraView ref={cameraRef} style={cameraStyles.camera} facing={facing}>
        <View style={cameraStyles.header}>
          <Text style={cameraStyles.headerText}>
            Tire uma foto para parar o alarme
          </Text>
        </View>

        <View style={cameraStyles.controls}>
          <View style={cameraStyles.controlsRow}>
            <TouchableOpacity
              onPress={toggleCameraFacing}
              style={cameraStyles.flipButton}
            >
              <IconSymbol name="camera.rotate" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePicture}
              disabled={isCapturing}
              style={cameraStyles.captureButton}
            >
              <View style={cameraStyles.captureButtonInner}>
                <View
                  style={[
                    cameraStyles.captureButtonCenter,
                    isCapturing && cameraStyles.captureButtonCapturing,
                  ]}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Parar Alarme",
                  "Deseja parar o alarme sem tirar a foto?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Parar",
                      style: "destructive",
                      onPress: () => {
                        stopAlarm();
                        router.replace("/");
                      },
                    },
                  ]
                );
              }}
              style={cameraStyles.emergencyButton}
            >
              <IconSymbol name="stop.fill" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={cameraStyles.instructionText}>
            Toque no botão vermelho para capturar
          </Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}
