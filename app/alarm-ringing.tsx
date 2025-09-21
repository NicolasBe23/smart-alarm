import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAlarm } from "@/contexts/AlarmContext";
import { Audio } from "expo-av";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  BackHandler,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { alarmRingingStyles, colors } from "@/styles";

export default function AlarmRingingScreen() {
  const { state, stopAlarm } = useAlarm();
  const [sound, setSound] = useState<Audio.Sound>();
  const [pulseAnim] = useState(new Animated.Value(1));
  const [shakeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    console.log("Tela de alarme tocando carregada!");
    console.log("Estado do alarme:", state);

    playAlarmSound();
    startAnimations();

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleStopAlarm();
        return true;
      }
    );

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      backHandler.remove();
    };
  }, []);

  const playAlarmSound = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/alarm.mp3"),
        { shouldPlay: true, isLooping: true, volume: 1.0 }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Erro ao reproduzir som:", error);
    }
  };

  const startAnimations = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleSnooze = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    stopAlarm();
    router.replace("/");
  };

  const handleStop = () => {
    if (!state.activeAlarm?.photoChallenge) {
      handleStopAlarm();
      return;
    }

    router.push("/camera-challenge");
  };

  const handleStopAlarm = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    stopAlarm();
    router.replace("/");
  };

  const handleGoBack = async () => {
    if (sound) {
      await sound.stopAsync();
    }
    stopAlarm();
    router.back();
  };

  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={alarmRingingStyles.container}>
      <View style={alarmRingingStyles.headerContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          style={alarmRingingStyles.backButton}
          activeOpacity={0.7}
        >
          <IconSymbol name="xmark" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          alarmRingingStyles.content,
          { transform: [{ translateX: shakeAnim }] },
        ]}
      >
        <Text style={alarmRingingStyles.currentTime}>{currentTime}</Text>

        <Text style={alarmRingingStyles.alarmTime}>
          {state.activeAlarm?.time || "00:00"}
        </Text>

        <Text style={alarmRingingStyles.alarmLabel}>
          {state.activeAlarm?.label || "Alarme"}
        </Text>

        <Animated.View
          style={[
            alarmRingingStyles.iconContainer,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <IconSymbol name="alarm" size={120} color="white" />
        </Animated.View>

        <View style={alarmRingingStyles.buttonsContainer}>
          <TouchableOpacity
            onPress={handleStop}
            style={alarmRingingStyles.stopButton}
            activeOpacity={0.8}
          >
            <View style={alarmRingingStyles.stopButtonContent}>
              {state.activeAlarm?.photoChallenge && (
                <IconSymbol
                  name="camera.fill"
                  size={24}
                  color={colors.red500}
                />
              )}
              <Text style={alarmRingingStyles.stopButtonText}>
                {state.activeAlarm?.photoChallenge ? "Tirar Foto" : "Parar"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSnooze}
            style={alarmRingingStyles.snoozeButton}
            activeOpacity={0.8}
          >
            <Text style={alarmRingingStyles.snoozeButtonText}>
              Soneca (5 min)
            </Text>
          </TouchableOpacity>

          {state.activeAlarm?.photoChallenge && (
            <TouchableOpacity
              onPress={handleStopAlarm}
              style={alarmRingingStyles.skipPhotoButton}
              activeOpacity={0.8}
            >
              <Text style={alarmRingingStyles.skipPhotoText}>
                Parar sem foto
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {state.activeAlarm?.photoChallenge && (
          <Text style={alarmRingingStyles.instructionText}>
            Este alarme requer uma foto para ser desligado
          </Text>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}
