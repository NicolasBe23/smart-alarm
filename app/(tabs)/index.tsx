import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAlarm } from "@/contexts/AlarmContext";
import { alarmStyles, colors, globalStyles, spacing } from "@/styles";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { state, toggleAlarm, deleteAlarm } = useAlarm();

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getDaysText = (days: number[]) => {
    if (days.length === 7) return "Todos os dias";
    if (days.length === 0) return "Nunca";

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return days.map((day) => dayNames[day]).join(", ");
  };

  const handleDeleteAlarm = (id: string, label: string) => {
    Alert.alert("Excluir Alarme", `Deseja excluir o alarme "${label}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => deleteAlarm(id) },
    ]);
  };

  const renderAlarm = ({ item }: { item: any }) => (
    <View style={alarmStyles.alarmCard}>
      <View style={alarmStyles.alarmContent}>
        <View style={alarmStyles.alarmInfo}>
          <Text style={alarmStyles.timeText}>{formatTime(item.time)}</Text>
          <Text style={alarmStyles.labelText}>{item.label}</Text>
          <Text style={alarmStyles.daysText}>{getDaysText(item.days)}</Text>
          {item.photoChallenge && (
            <View style={alarmStyles.photoChallengeRow}>
              <IconSymbol name="camera.fill" size={16} color={colors.gray500} />
              <Text style={alarmStyles.photoChallengeText}>
                Desafio da foto
              </Text>
            </View>
          )}
        </View>

        <View style={alarmStyles.controlsRow}>
          <Switch
            value={item.isActive}
            onValueChange={() => toggleAlarm(item.id)}
            trackColor={{ false: colors.gray200, true: colors.primary }}
            thumbColor={item.isActive ? colors.white : colors.gray400}
          />

          <TouchableOpacity
            onPress={() => router.push(`/edit-alarm?id=${item.id}`)}
            style={alarmStyles.iconButton}
          >
            <IconSymbol name="pencil" size={20} color={colors.gray500} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDeleteAlarm(item.id, item.label)}
            style={alarmStyles.iconButton}
          >
            <IconSymbol name="trash" size={20} color={colors.red500} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.content}>
        <View style={globalStyles.header}>
          <Text style={globalStyles.title}>Smart Alarm</Text>
          <TouchableOpacity
            onPress={() => router.push("/add-alarm")}
            style={alarmStyles.addButton}
          >
            <IconSymbol name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {state.alarms.length === 0 ? (
          <View style={globalStyles.emptyState}>
            <IconSymbol name="alarm" size={80} color={colors.gray400} />
            <Text style={globalStyles.emptyTitle}>
              Nenhum alarme configurado
            </Text>
            <Text style={globalStyles.emptySubtitle}>
              Toque no + para adicionar seu primeiro alarme
            </Text>
          </View>
        ) : (
          <FlatList
            data={state.alarms}
            renderItem={renderAlarm}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: spacing.xl,
  },
});
