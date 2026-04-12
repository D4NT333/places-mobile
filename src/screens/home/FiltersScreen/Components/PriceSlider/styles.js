import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  label: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  freeBtn: {
    alignSelf: "center",
    minWidth: 96,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  freeBtnActive: {
    backgroundColor: "#222",
  },

  freeBtnText: {
    fontSize: 14,
    fontWeight: "600",
  },

  freeBtnTextActive: {
    color: "#FFF",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  btn: {
    width: 52,
    height: 52,
    borderWidth: 1.5,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  btnDisabled: {
    opacity: 0.4,
  },

  btnTxt: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 30,
  },

  track: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  step: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E2E2E2",
  },

  stepActive: {
    backgroundColor: "#222",
  },
});

export default styles;