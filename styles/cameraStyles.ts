import { StyleSheet } from "react-native";
import { colors, spacing, typography } from "./globalStyles";

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: colors.gray900,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xxxl,
  },
  permissionTitle: {
    color: colors.white,
    fontSize: typography.xl,
    textAlign: "center",
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  permissionText: {
    color: colors.gray400,
    textAlign: "center",
    marginBottom: spacing.xxxl,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  permissionButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerText: {
    color: colors.white,
    fontSize: typography.lg,
    fontWeight: "600",
    textAlign: "center",
  },
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.xxxl,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  flipButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: spacing.xl,
    padding: spacing.lg,
  },
  captureButton: {
    backgroundColor: colors.white,
    borderRadius: 40,
    padding: spacing.sm,
    width: 80,
    height: 80,
  },
  captureButtonInner: {
    backgroundColor: colors.white,
    borderRadius: 32,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: colors.gray300,
  },
  captureButtonCenter: {
    backgroundColor: colors.red500,
    borderRadius: spacing.lg,
    width: 32,
    height: 32,
  },
  captureButtonCapturing: {
    width: 24,
    height: 24,
  },
  emergencyButton: {
    backgroundColor: "rgba(239, 68, 68, 0.8)",
    borderRadius: spacing.xl,
    padding: spacing.lg,
  },
  instructionText: {
    color: colors.white,
    textAlign: "center",
    opacity: 0.8,
  },
});
