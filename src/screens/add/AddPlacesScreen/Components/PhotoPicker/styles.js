import { StyleSheet } from "react-native";

export default StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
    minHeight: 160,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  btn: {
    marginTop: 10,
    height: 38,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },
  card: {
    borderWidth: 1,
    borderColor: "#f1e4e4",
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
    backgroundColor: "transparent",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: "#222",
    borderRadius: 16,
    backgroundColor: "#f7d8dc",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  counter: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },

  previewGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginBottom: 16,
  },

  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  imageWrapper: {
  position: "relative",
},

removeButton: {
  position: "absolute",
  top: 8,
  right: 8,
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: "rgba(0,0,0,0.7)",
  alignItems: "center",
  justifyContent: "center",
},

removeButtonText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
  lineHeight: 20,
},
inputErrorText: {
  color: "#DC2626",
  marginTop: 8,
  fontSize: 12,
},
});