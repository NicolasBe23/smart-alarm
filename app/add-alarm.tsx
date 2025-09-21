import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAlarm } from "@/contexts/AlarmContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, formStyles } from "@/styles";

export default function AddAlarmScreen() {
  const { addAlarm } = useAlarm();
  const [time, setTime] = useState(new Date());
  const [label, setLabel] = useState("");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [photoChallenge, setPhotoChallenge] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const days = [
    { id: 0, name: "Dom", fullName: "Domingo" },
    { id: 1, name: "Seg", fullName: "Segunda" },
    { id: 2, name: "Ter", fullName: "Terça" },
    { id: 3, name: "Qua", fullName: "Quarta" },
    { id: 4, name: "Qui", fullName: "Quinta" },
    { id: 5, name: "Sex", fullName: "Sexta" },
    { id: 6, name: "Sáb", fullName: "Sábado" },
  ];

  const toggleDay = (dayId: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId]
    );
  };

  const formatTimeString = (date: Date) => {
    return date.toTimeString().slice(0, 5);
  };

  const handleSave = () => {
    if (!label.trim()) {
      Alert.alert("Erro", "Por favor, insira um nome para o alarme");
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um dia da semana");
      return;
    }

    addAlarm({
      time: formatTimeString(time),
      label: label.trim(),
      isActive: true,
      days: selectedDays,
      photoChallenge,
    });

    router.back();
  };

  return (
    <SafeAreaView style={formStyles.container}>
      <ScrollView style={formStyles.scrollView}>
        <View style={formStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color={colors.gray500} />
          </TouchableOpacity>
          <Text style={formStyles.headerTitle}>Novo Alarme</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={formStyles.saveButton}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <View style={formStyles.content}>
          <View style={formStyles.section}>
            <Text style={formStyles.sectionTitle}>Horário</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={formStyles.timeContainer}
            >
              <Text style={formStyles.timeText}>
                {time.toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setTime(selectedTime);
                }
              }}
            />
          )}

          <View style={formStyles.section}>
            <Text style={formStyles.sectionTitle}>Nome do Alarme</Text>
            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="Ex: Acordar para trabalhar"
              placeholderTextColor={colors.gray400}
              style={formStyles.textInput}
            />
          </View>

          <View style={formStyles.section}>
            <Text style={formStyles.sectionTitle}>Repetir</Text>
            <View style={formStyles.daysContainer}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day.id}
                  onPress={() => toggleDay(day.id)}
                  style={[
                    formStyles.dayButton,
                    selectedDays.includes(day.id) &&
                      formStyles.dayButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      formStyles.dayText,
                      selectedDays.includes(day.id) &&
                        formStyles.dayTextSelected,
                    ]}
                  >
                    {day.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={formStyles.section}>
            <View style={formStyles.switchRow}>
              <View style={formStyles.switchInfo}>
                <Text style={formStyles.sectionTitle}>Desafio da Foto</Text>
                <Text style={formStyles.switchDescription}>
                  Exigir foto para parar o alarme
                </Text>
              </View>
              <Switch
                value={photoChallenge}
                onValueChange={setPhotoChallenge}
                trackColor={{ false: colors.gray200, true: colors.primary }}
                thumbColor={photoChallenge ? colors.white : colors.gray400}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
