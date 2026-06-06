import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

function normalizeForCompare(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function sameTextValue(a = "", b = "") {
  return normalizeForCompare(a) === normalizeForCompare(b);
}

export default function EditableReturnedSubtagsBox({
  label = "Subetiquetas",
  rows = [],
  reviewField,
  subtagCorrections = {},
  onPressEditItem,
  onPressDeleteItem,
}) {
  const [expandedItemKey, setExpandedItemKey] = useState(null);

  const visibleRows = useMemo(() => {
    return rows.filter((row) => {
      return subtagCorrections[row.correctionKey]?.type !== "delete";
    });
  }, [rows, subtagCorrections]);

  if (!reviewField?.selected) return null;

  const handleEdit = (row) => {
    setExpandedItemKey(row.correctionKey);
    onPressEditItem?.(row);
  };

  const handleDelete = (row) => {
    if (expandedItemKey === row.correctionKey) {
      setExpandedItemKey(null);
    }
    onPressDeleteItem?.(row);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>{label}</Text>

      <View style={styles.box}>
        {visibleRows.length > 0 ? (
          visibleRows.map((row, index) => {
            const isReadOnly = !row.message;

            if (isReadOnly) {
              return (
                <View
                  key={row.correctionKey || `valid-${index}`}
                  style={[
                    styles.rowBlock,
                    index < visibleRows.length - 1 && styles.rowBlockWithGap,
                    // 🔥 Aquí quitamos el fondo gris feo y los bordes para que parezca parte de la caja principal
                    { backgroundColor: "transparent", borderBottomWidth: 0, paddingBottom: 10 }
                  ]}
                >
                  <View style={styles.compactContent}>
                    <View style={styles.pillWrapper}>
                      {/* 🔥 Le damos el estilo de las pills normales (blanco, borde oscuro, letra oscura) */}
                      <Text
                        style={[
                          styles.oldPill,
                          {
                            backgroundColor: "#FFFFFF",
                            color: "#374151", 
                            borderColor: "#374151",
                          },
                        ]}
                      >
                        {row.oldLabel}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }

            const correction = subtagCorrections[row.correctionKey];
            const newLabel = correction?.type === "replace" ? correction.label : "";
            const hasNewLabel = Boolean(
              newLabel && !sameTextValue(newLabel, row.oldLabel)
            );

            const isExpanded = expandedItemKey === row.correctionKey || hasNewLabel;
            const canDeleteThisItem = visibleRows.length > 1;

            return (
              <View
                key={row.correctionKey}
                style={[
                  styles.rowBlock,
                  index < visibleRows.length - 1 && styles.rowBlockWithGap,
                ]}
              >
                <View style={styles.topRow}>
                  {!isExpanded ? (
                    <Text style={styles.columnLabel}>Antes</Text>
                  ) : (
                    <View />
                  )}

                  <Pressable onPress={() => handleEdit(row)} hitSlop={8}>
                    <Text style={styles.editText}>Editar</Text>
                  </Pressable>
                </View>

                {!isExpanded ? (
                  <View style={styles.compactContent}>
                    <View style={styles.pillWrapper}>
                      <Text style={styles.oldPill}>{row.oldLabel}</Text>

                      {canDeleteThisItem ? (
                        <Pressable
                          style={styles.deleteBubble}
                          onPress={() => handleDelete(row)}
                          hitSlop={10}
                        >
                          <Text style={styles.deleteBubbleText}>×</Text>
                        </Pressable>
                      ) : null}
                    </View>

                    <Text style={styles.messageText}>{row.message}</Text>
                  </View>
                ) : (
                  <View style={styles.columns}>
                    <View style={styles.column}>
                      <Text style={styles.columnLabel}>Antes</Text>

                      <View style={styles.pillWrapper}>
                        <Text style={styles.oldPill}>{row.oldLabel}</Text>

                        {canDeleteThisItem ? (
                          <Pressable
                            style={styles.deleteBubble}
                            onPress={() => handleDelete(row)}
                            hitSlop={10}
                          >
                            <Text style={styles.deleteBubbleText}>×</Text>
                          </Pressable>
                        ) : null}
                      </View>

                      <Text style={styles.messageText}>{row.message}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.column}>
                      <Text style={styles.columnLabel}>Nueva</Text>

                      {hasNewLabel ? (
                        <Text style={styles.newPill}>{newLabel}</Text>
                      ) : (
                        <Text style={styles.emptyText}>
                          Selecciona una nueva.
                        </Text>
                      )}
                    </View>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>
            Ya eliminaste las subetiquetas marcadas. Puedes continuar si aún
            queda al menos una subetiqueta válida.
          </Text>
        )}
      </View>
    </View>
  );
}