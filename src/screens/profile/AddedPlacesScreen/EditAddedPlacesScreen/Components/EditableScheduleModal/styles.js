const styles = {
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: "90%",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#111",
  },

  closeText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 18,
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },

  typeRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  typeChip: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  typeChipText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111",
  },

  selectedChip: {
    backgroundColor: "#111",
    borderColor: "#111",
  },

  selectedChipText: {
    color: "#fff",
  },

  label: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111",
    marginBottom: 12,
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  dayChip: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#f1f1f1",
  },

  dayChipText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333",
  },

  hourList: {
    gap: 10,
    paddingBottom: 22,
  },

  hourChip: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#f1f1f1",
  },

  hourChipText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333",
  },

  previewBox: {
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 18,
    padding: 14,
    marginTop: 4,
    marginBottom: 18,
  },

  previewLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#666",
    marginBottom: 4,
  },

  previewText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111",
  },

  applyButton: {
    backgroundColor: "#111",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.35,
  },

  applyText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
};

export default styles;