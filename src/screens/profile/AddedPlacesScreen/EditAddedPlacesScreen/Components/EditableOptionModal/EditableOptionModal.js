import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

import styles from "./styles";

export default function EditableOptionModal({
  visible,
  title,
  options = [],
  selectedValues = [],
  multiple = false,
  onSelect,
  onClose,
}) {
  const isSelected = (option) => selectedValues.includes(option.label);

  const handleSelect = (option) => {
    onSelect?.(option);

    if (!multiple) {
      onClose?.();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsContent}
          >
            {options.map((option) => {
              const selected = isSelected(option);

              return (
                <Pressable
                  key={option.id}
                  onPress={() => handleSelect(option)}
                  style={[styles.optionCard, selected && styles.optionSelected]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {multiple && (
            <Pressable style={styles.doneButton} onPress={onClose}>
              <Text style={styles.doneButtonText}>Listo</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}