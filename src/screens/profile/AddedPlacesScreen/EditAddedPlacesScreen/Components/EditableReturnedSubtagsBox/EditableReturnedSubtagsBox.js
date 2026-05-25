import React from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./styles";

function getSelectedSubtagItems(reviewField = {}) {
  const items = Array.isArray(reviewField?.items) ? reviewField.items : [];
  return items.filter((item) => item?.selected);
}

function getOldLabel(item, oldPills = []) {
  if (item?.label) return item.label;

  const index = Number(item?.index);
  if (Number.isInteger(index)) {
    return oldPills[index] || `Subetiqueta ${index + 1}`;
  }

  return "Subetiqueta";
}

function getNewLabelForItem(item, newPills = []) {
  const index = Number(item?.index);

  if (!Number.isInteger(index)) return "";

  return newPills[index] || "";
}

export default function EditableReturnedSubtagsBox({
  label = "Subetiquetas",
  oldPills = [],
  newPills = [],
  reviewField,
  onPressEditItem,
}) {
  const selectedItems = getSelectedSubtagItems(reviewField);

  if (!reviewField?.selected) return null;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>{label}</Text>

      <View style={styles.box}>
        {selectedItems.length > 0 ? (
          selectedItems.map((item, index) => {
            const oldLabel = getOldLabel(item, oldPills);
            const newLabel = getNewLabelForItem(item, newPills);
            const hasNewLabel = Boolean(newLabel && newLabel !== oldLabel);

            return (
              <View
                key={`returned-subtag-${item.index}`}
                style={[
                  styles.rowBlock,
                  index < selectedItems.length - 1 && styles.rowBlockWithGap,
                ]}
              >
                <Pressable
                  style={styles.editButton}
                  onPress={() => onPressEditItem?.(item)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </Pressable>

                <View style={styles.columns}>
                  <View style={styles.column}>
                    <Text style={styles.columnLabel}>Antes</Text>

                    <Text style={styles.oldPill}>{oldLabel}</Text>

                    <Text style={styles.messageText}>
                      {item.message || "Esta subetiqueta requiere corrección."}
                    </Text>
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
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>
            No hay subetiquetas específicas marcadas.
          </Text>
        )}
      </View>
    </View>
  );
}