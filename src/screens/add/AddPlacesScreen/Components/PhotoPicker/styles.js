import { StyleSheet } from "react-native";

export default StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 24,
    padding: 18,
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 26,
    padding: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    gap: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 8,
  },

button: {
  marginTop: 6,
  paddingVertical: 13,
  paddingHorizontal: 24,
  borderWidth: 1,
  borderColor: "#0F766E",
  borderRadius: 18,
  backgroundColor: "#0F766E",

  shadowColor: "#0F766E",
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 3,
},

buttonText: {
  fontSize: 15,
  fontWeight: "900",
  color: "#FFFFFF",
},

btn: {
  marginTop: 10,
  height: 42,
  paddingHorizontal: 18,
  borderRadius: 16,
  borderWidth: 1,
  borderColor: "#0F766E",
  backgroundColor: "#0F766E",
  justifyContent: "center",
  alignItems: "center",
},

btnText: {
  fontSize: 14,
  fontWeight: "900",
  color: "#FFFFFF",
},

  counter: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "700",
    marginBottom: 10,
  },

  previewGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginBottom: 10,
  },

  imageWrapper: {
    position: "relative",
  },

  previewImage: {
    width: 105,
    height: 105,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
  },

  removeButton: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(17,24,39,0.82)",
    alignItems: "center",
    justifyContent: "center",
  },

  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 20,
  },

  inputErrorText: {
    color: "#DC2626",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});