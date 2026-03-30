import { StyleSheet } from "react-native";

export default StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
  },
  overlayPressable: {
    flex: 1,
  },

  // ✅ full height, no rebote, clean
  panel: {
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
    //paddingTop: 14,
    paddingHorizontal: 14,
    //paddingBottom: 18,

    // sombra
    elevation: 12,
    shadowOpacity: 0.16,
    shadowRadius: 18,
    shadowOffset: { width: -4, height: 4 },
  },

  header: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  applyBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  applyIcon: {
    fontSize: 18,
    fontWeight: "900",
  },

  sectionLabel: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "900",
    opacity: 0.7,
  },

  footer: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
  },
  clearBtn: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  clearText: {
    fontWeight: "900",
  },
});
