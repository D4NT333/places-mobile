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
  onPressAdd,
}) {
  const [expandedItemKey, setExpandedItemKey] = useState(null);

  const isReviewSelected = Boolean(reviewField?.selected);

  const visibleRows = useMemo(() => {
    const baseRows = rows.filter((row) => {
      return subtagCorrections[row.correctionKey]?.type !== "delete";
    });

    const addedRows = isReviewSelected
      ? Object.entries(subtagCorrections)
          .filter(([, value]) => value?.type === "add")
          .map(([key, value]) => ({
            correctionKey: key,
            isNewAddition: true,
            label: value.label,
          }))
      : [];

    return [...baseRows, ...addedRows];
  }, [rows, subtagCorrections, isReviewSelected]);

  if (visibleRows.length <= 0 && !isReviewSelected) return null;

  const handleEdit = (row) => {
    if (!isReviewSelected) return;

    setExpandedItemKey(row.correctionKey);
    onPressEditItem?.(row);
  };

  const handleDelete = (row) => {
    if (!isReviewSelected) return;

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
            if (row.isNewAddition) {
              return (
                <View
                  key={row.correctionKey}
                  style={[
                    styles.rowBlock,
                    index < visibleRows.length - 1 &&
                      styles.rowBlockWithGap,
                  ]}
                >
                  <View style={styles.topRow}>
                    <Text style={styles.columnLabel}>
                      Nueva subetiqueta
                    </Text>

                    {isReviewSelected ? (
                      <Pressable
                        onPress={() => handleDelete(row)}
                        hitSlop={8}
                      >
                        <Text style={styles.editText}>
                          Eliminar
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>

                  <View style={styles.compactContent}>
                    <View style={styles.pillWrapper}>
                      <Text style={styles.newPill}>
                        {row.label}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }

            const message = String(row.message || "").trim();
            const hasMessage = message.length > 0;

            const isReadOnly = !isReviewSelected || !hasMessage;

            if (isReadOnly) {
              return (
                <View
                  key={row.correctionKey || `valid-${index}`}
                  style={[
                    styles.rowBlock,
                    index < visibleRows.length - 1 &&
                      styles.rowBlockWithGap,
                    {
                      backgroundColor: "transparent",
                      borderBottomWidth: 0,
                      paddingBottom: 10,
                    },
                  ]}
                >
                  <View style={styles.compactContent}>
                    <View style={styles.pillWrapper}>
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

                    <Text style={styles.neutralMessageText}>
                      Subetiqueta sin observaciones.
                    </Text>
                  </View>
                </View>
              );
            }

            const correction = subtagCorrections[row.correctionKey];

            const newLabel =
              correction?.type === "replace"
                ? correction.label
                : "";

            const hasNewLabel = Boolean(
              newLabel && !sameTextValue(newLabel, row.oldLabel)
            );

            const isExpanded =
              expandedItemKey === row.correctionKey || hasNewLabel;

            const canDeleteThisItem = isReviewSelected;

            return (
              <View
                key={row.correctionKey}
                style={[
                  styles.rowBlock,
                  index < visibleRows.length - 1 &&
                    styles.rowBlockWithGap,
                ]}
              >
                <View style={styles.topRow}>
                  {!isExpanded ? (
                    <Text style={styles.columnLabel}>Antes</Text>
                  ) : (
                    <View />
                  )}

                  <Pressable
                    onPress={() => handleEdit(row)}
                    hitSlop={8}
                  >
                    <Text style={styles.editText}>Editar</Text>
                  </Pressable>
                </View>

                {!isExpanded ? (
                  <View style={styles.compactContent}>
                    <View style={styles.pillWrapper}>
                      <Text style={styles.oldPill}>
                        {row.oldLabel}
                      </Text>

                      {canDeleteThisItem ? (
                        <Pressable
                          style={styles.deleteBubble}
                          onPress={() => handleDelete(row)}
                          hitSlop={10}
                        >
                          <Text style={styles.deleteBubbleText}>
                            ×
                          </Text>
                        </Pressable>
                      ) : null}
                    </View>

                    {hasMessage ? (
                      <Text style={styles.messageText}>
                        {message}
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <View style={styles.columns}>
                    <View style={styles.column}>
                      <Text style={styles.columnLabel}>Antes</Text>

                      <View style={styles.pillWrapper}>
                        <Text style={styles.oldPill}>
                          {row.oldLabel}
                        </Text>

                        {canDeleteThisItem ? (
                          <Pressable
                            style={styles.deleteBubble}
                            onPress={() => handleDelete(row)}
                            hitSlop={10}
                          >
                            <Text style={styles.deleteBubbleText}>
                              ×
                            </Text>
                          </Pressable>
                        ) : null}
                      </View>

                      {hasMessage ? (
                        <Text style={styles.messageText}>
                          {message}
                        </Text>
                      ) : null}
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.column}>
                      <Text style={styles.columnLabel}>Nueva</Text>

                      {hasNewLabel ? (
                        <Text style={styles.newPill}>
                          {newLabel}
                        </Text>
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
            No hay subetiquetas. Toca en "+ Agregar subetiqueta"
            para proponer nuevas.
          </Text>
        )}

        {isReviewSelected && visibleRows.length < 2 ? (
          <Pressable
            onPress={onPressAdd}
            style={{
              marginTop: visibleRows.length > 0 ? 12 : 4,
              alignSelf: "flex-start",
              paddingVertical: 4,
            }}
          >
            <Text
              style={[
                styles.editText,
                {
                  color: "#3B82F6",
                  fontWeight: "bold",
                },
              ]}
            >
              + Agregar subetiqueta
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}