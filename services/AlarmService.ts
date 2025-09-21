import { Alarm } from "@/types/alarm";

export class AlarmService {
  private static timers: Map<string, NodeJS.Timeout> = new Map();
  private static onAlarmTrigger: ((alarm: Alarm) => void) | null = null;

  static setAlarmTriggerCallback(callback: (alarm: Alarm) => void) {
    this.onAlarmTrigger = callback;
  }

  static scheduleAlarm(alarm: Alarm) {
    this.cancelAlarm(alarm.id);

    if (!alarm.isActive) {
      console.log(`⏰ Alarme "${alarm.label}" está inativo, não agendando`);
      return;
    }

    const [hours, minutes] = alarm.time.split(":").map(Number);
    const now = new Date();

    alarm.days.forEach((dayOfWeek) => {
      const nextAlarm = new Date();
      nextAlarm.setHours(hours, minutes, 0, 0);

      const currentDay = now.getDay();
      const targetDay = dayOfWeek;

      let daysUntilAlarm = (targetDay - currentDay + 7) % 7;

      if (daysUntilAlarm === 0 && now.getTime() >= nextAlarm.getTime()) {
        daysUntilAlarm = 7;
      }

      nextAlarm.setDate(now.getDate() + daysUntilAlarm);

      const timeUntilAlarm = nextAlarm.getTime() - now.getTime();
      const minutesUntil = Math.round(timeUntilAlarm / (1000 * 60));

      console.log(
        `⏰ Agendando alarme "${
          alarm.label
        }" para ${nextAlarm.toLocaleString()} (em ${minutesUntil} minutos)`
      );

      const timerId = setTimeout(() => {
        console.log(`🔔 ALARME DISPAROU: "${alarm.label}"`);
        if (this.onAlarmTrigger) {
          this.onAlarmTrigger(alarm);
        }

        this.scheduleAlarm(alarm);
      }, timeUntilAlarm);

      const timerKey = `${alarm.id}-${dayOfWeek}`;
      this.timers.set(timerKey, timerId as unknown as NodeJS.Timeout);
    });
  }

  static cancelAlarm(alarmId: string) {
    let canceledCount = 0;

    for (const [key, timerId] of this.timers.entries()) {
      if (key.startsWith(alarmId)) {
        clearTimeout(timerId);
        this.timers.delete(key);
        canceledCount++;
      }
    }

    if (canceledCount > 0) {
      console.log(
        `🗑️ ${canceledCount} timer(s) cancelado(s) para alarme ${alarmId}`
      );
    }
  }

  static cancelAllAlarms() {
    for (const timerId of this.timers.values()) {
      clearTimeout(timerId);
    }
    this.timers.clear();
    console.log("🗑️ Todos os timers cancelados");
  }

  static getScheduledAlarms() {
    console.log(`📋 ${this.timers.size} timers ativos:`);
    for (const key of this.timers.keys()) {
      console.log(`  - ${key}`);
    }
    return this.timers.size;
  }
}
