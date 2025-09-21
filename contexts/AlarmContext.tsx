import { AlarmService } from "@/services/AlarmService";
import { Alarm, AlarmState } from "@/types/alarm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useReducer } from "react";

type AlarmAction =
  | { type: "SET_ALARMS"; payload: Alarm[] }
  | { type: "ADD_ALARM"; payload: Alarm }
  | { type: "UPDATE_ALARM"; payload: Alarm }
  | { type: "DELETE_ALARM"; payload: string }
  | { type: "SET_ACTIVE_ALARM"; payload: Alarm | null }
  | { type: "SET_RINGING"; payload: boolean };

const AlarmContext = createContext<{
  state: AlarmState;
  dispatch: React.Dispatch<AlarmAction>;
  addAlarm: (alarm: Omit<Alarm, "id" | "createdAt" | "updatedAt">) => void;
  updateAlarm: (alarm: Alarm) => void;
  deleteAlarm: (id: string) => void;
  toggleAlarm: (id: string) => void;
  stopAlarm: () => void;
} | null>(null);

const alarmReducer = (state: AlarmState, action: AlarmAction): AlarmState => {
  switch (action.type) {
    case "SET_ALARMS":
      return { ...state, alarms: action.payload };
    case "ADD_ALARM":
      return { ...state, alarms: [...state.alarms, action.payload] };
    case "UPDATE_ALARM":
      return {
        ...state,
        alarms: state.alarms.map((alarm) =>
          alarm.id === action.payload.id ? action.payload : alarm
        ),
      };
    case "DELETE_ALARM":
      return {
        ...state,
        alarms: state.alarms.filter((alarm) => alarm.id !== action.payload),
      };
    case "SET_ACTIVE_ALARM":
      return { ...state, activeAlarm: action.payload };
    case "SET_RINGING":
      return { ...state, isRinging: action.payload };
    default:
      return state;
  }
};

export function AlarmProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(alarmReducer, {
    alarms: [],
    activeAlarm: null,
    isRinging: false,
  });

  useEffect(() => {
    loadAlarms();
    setupAlarmService();
  }, []);

  const setupAlarmService = () => {
    // Configurar callback para quando o alarme disparar
    AlarmService.setAlarmTriggerCallback((alarm: Alarm) => {
      console.log("🔔 Alarme disparou:", alarm.label);
      dispatch({ type: "SET_ACTIVE_ALARM", payload: alarm });
      dispatch({ type: "SET_RINGING", payload: true });

      // Navegar automaticamente para tela de alarme
      router.push("/alarm-ringing");
    });
  };

  const loadAlarms = async () => {
    try {
      const stored = await AsyncStorage.getItem("alarms");
      if (stored) {
        const alarms = JSON.parse(stored);
        dispatch({ type: "SET_ALARMS", payload: alarms });

        // Reagendar todos os alarmes ativos
        alarms.forEach((alarm: Alarm) => {
          if (alarm.isActive) {
            AlarmService.scheduleAlarm(alarm);
          }
        });

        console.log("📚 Alarmes carregados e reagendados:", alarms.length);
      }
    } catch (error) {
      console.error("❌ Erro ao carregar alarmes:", error);
    }
  };

  const saveAlarms = async (alarms: Alarm[]) => {
    try {
      await AsyncStorage.setItem("alarms", JSON.stringify(alarms));
    } catch (error) {
      console.error("❌ Erro ao salvar alarmes:", error);
    }
  };

  const addAlarm = async (
    alarmData: Omit<Alarm, "id" | "createdAt" | "updatedAt">
  ) => {
    const newAlarm: Alarm = {
      ...alarmData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("➕ Adicionando novo alarme:", newAlarm);

    const updatedAlarms = [...state.alarms, newAlarm];
    dispatch({ type: "ADD_ALARM", payload: newAlarm });
    await saveAlarms(updatedAlarms);

    // Agendar se estiver ativo
    if (newAlarm.isActive) {
      AlarmService.scheduleAlarm(newAlarm);
    }
  };

  const updateAlarm = async (alarm: Alarm) => {
    const updatedAlarm = { ...alarm, updatedAt: new Date() };
    dispatch({ type: "UPDATE_ALARM", payload: updatedAlarm });

    const updatedAlarms = state.alarms.map((a) =>
      a.id === alarm.id ? updatedAlarm : a
    );
    await saveAlarms(updatedAlarms);

    // Reagendar
    AlarmService.cancelAlarm(alarm.id);
    if (updatedAlarm.isActive) {
      AlarmService.scheduleAlarm(updatedAlarm);
    }
  };

  const deleteAlarm = async (id: string) => {
    dispatch({ type: "DELETE_ALARM", payload: id });
    const filteredAlarms = state.alarms.filter((a) => a.id !== id);
    await saveAlarms(filteredAlarms);
    AlarmService.cancelAlarm(id);
  };

  const toggleAlarm = async (id: string) => {
    const alarm = state.alarms.find((a) => a.id === id);
    if (alarm) {
      await updateAlarm({ ...alarm, isActive: !alarm.isActive });
    }
  };

  const stopAlarm = () => {
    dispatch({ type: "SET_RINGING", payload: false });
    dispatch({ type: "SET_ACTIVE_ALARM", payload: null });
  };

  return (
    <AlarmContext.Provider
      value={{
        state,
        dispatch,
        addAlarm,
        updateAlarm,
        deleteAlarm,
        toggleAlarm,
        stopAlarm,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export const useAlarm = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error("useAlarm must be used within an AlarmProvider");
  }
  return context;
};
