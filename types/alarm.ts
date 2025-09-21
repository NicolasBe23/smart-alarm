export interface Alarm {
  id: string;
  time: string; // HH:MM format
  label: string;
  isActive: boolean;
  days: number[]; // 0-6 (Sunday-Saturday)
  photoChallenge: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlarmState {
  alarms: Alarm[];
  activeAlarm: Alarm | null;
  isRinging: boolean;
}

export interface PhotoChallenge {
  id: string;
  alarmId: string;
  imageUri: string;
  timestamp: Date;
  isCompleted: boolean;
}
