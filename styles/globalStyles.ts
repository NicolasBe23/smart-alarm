import { StyleSheet } from "react-native";

export const colors = {
  primary: "#3B82F6",
  secondary: "#6B7280",
  background: "#F9FAFB",
  white: "#FFFFFF",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  red500: "#EF4444",
  red600: "#DC2626",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 48,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: typography.xxl,
    fontWeight: "bold",
    color: colors.gray900,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xxl,
    padding: spacing.md,
    ...shadows.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: typography.xl,
    color: colors.gray500,
    marginTop: spacing.lg,
    textAlign: "center",
  },
  emptySubtitle: {
    color: colors.gray400,
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
