import { StyleSheet } from "react-native";
import { colors, shadows, spacing, typography } from "./globalStyles";

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: colors.gray900,
  },
  saveButton: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: spacing.lg,
  },
  content: {
    padding: spacing.lg,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: typography.lg,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  timeContainer: {
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "300",
    color: colors.primary,
  },
  textInput: {
    color: colors.gray900,
    fontSize: spacing.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: spacing.sm,
    backgroundColor: colors.background,
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  dayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonSelected: {
    backgroundColor: colors.primary,
  },
  dayText: {
    fontWeight: "600",
    color: colors.gray500,
  },
  dayTextSelected: {
    color: colors.white,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchInfo: {
    flex: 1,
  },
  switchDescription: {
    color: colors.gray500,
    marginTop: 4,
  },
});
