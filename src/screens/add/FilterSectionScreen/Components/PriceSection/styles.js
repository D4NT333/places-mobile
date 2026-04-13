import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  currentLabel: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },

  freeBtn: {
    alignSelf: "flex-start",
    minWidth: 110,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  freeBtnActive: {
    backgroundColor: "#222",
    borderColor: "#222",
  },

  freeBtnText: {
    fontSize: 16,
    fontWeight: "700",
  },

  freeBtnTextActive: {
    color: "#FFF",
  },

  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  controlBtn: {
    width: 54,
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  controlBtnDisabled: {
    opacity: 0.35,
  },

  controlBtnText: {
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 32,
  },

  stepsTrack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  step: {
    flex: 1,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E4E4E4",
  },

  stepActive: {
    backgroundColor: "#222",
  },
});

export default styles;