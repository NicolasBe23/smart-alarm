import { StyleSheet } from "react-native";
import { colors, shadows, spacing, typography } from "./globalStyles";

export const alarmRingingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red500,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  currentTime: {
    color: colors.white,
    fontSize: typography.xxl,
    fontWeight: "300",
    marginBottom: spacing.sm,
  },
  alarmTime: {
    color: colors.white,
    fontSize: 64,
    fontWeight: "100",
    marginBottom: spacing.lg,
  },
  alarmLabel: {
    color: colors.white,
    fontSize: typography.xl,
    textAlign: "center",
    marginBottom: 48,
  },
  iconContainer: {
    marginBottom: 64,
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 300,
  },
  stopButton: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  stopButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stopButtonText: {
    color: colors.red500,
    fontSize: typography.xl,
    fontWeight: "600",
    marginLeft: spacing.sm,
  },
  snoozeButton: {
    backgroundColor: colors.red600,
    borderRadius: 25,
    paddingVertical: spacing.lg,
    borderWidth: 2,
    borderColor: colors.white,
  },
  snoozeButtonText: {
    color: colors.white,
    fontSize: typography.lg,
    fontWeight: "600",
    textAlign: "center",
  },
  instructionText: {
    color: colors.white,
    textAlign: "center",
    fontSize: typography.sm,
    marginTop: spacing.xxxl,
    opacity: 0.8,
  },
  // Novos estilos que estavam inline:
  headerContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: spacing.xl,
    padding: spacing.sm,
  },
  skipPhotoButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 25,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  skipPhotoText: {
    color: colors.white,
    fontSize: spacing.lg,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.8,
  },
});
