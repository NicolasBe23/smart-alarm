import { StyleSheet } from "react-native";
import { colors, shadows, spacing, typography } from "./globalStyles";

export const alarmStyles = StyleSheet.create({
  alarmCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  alarmContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  alarmInfo: {
    flex: 1,
  },
  timeText: {
    fontSize: typography.xxxl,
    fontWeight: "bold",
    color: colors.gray900,
  },
  labelText: {
    color: colors.gray500,
    marginTop: 4,
    fontSize: typography.base,
  },
  daysText: {
    fontSize: typography.sm,
    color: colors.gray400,
    marginTop: 4,
  },
  photoChallengeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  photoChallengeText: {
    fontSize: typography.xs,
    color: colors.gray400,
    marginLeft: 4,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconButton: {
    padding: spacing.sm,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xxl,
    padding: spacing.md,
    ...shadows.md,
  },
});
