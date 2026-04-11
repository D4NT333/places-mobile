import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingTop: 18,
    paddingHorizontal: 14,
    paddingBottom: 0,
  },


  scrollContent: {
    paddingBottom: 24,
    gap: 14,
  },

headerTextContainer: {
  flex: 1,
},
headerContainer: {
  marginBottom: 16,
},

titleRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 6,
},

backButton: {
  width: 32,
  height: 32,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 8,
},

backIcon: {
  fontSize: 22,
  fontWeight: "700",
  color: "#111827",
},

title: {
  flex: 1,
  fontSize: 22,
  fontWeight: "700",
  color: "#111827",
},

helperText: {
  fontSize: 12,
  color: "#374151",
  lineHeight: 16,
  marginLeft: 40,
},
});

export default styles;