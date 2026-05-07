import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

import PriceSection from "../../../../../add/FilterSectionScreen/Components/PriceSection";

import styles from "./styles";

export default function EditablePriceModal({
  visible,
  config,
  selectedRangeId,
  isFree,
  onChangeRangeId,
  onToggleFree,
  onClose,
}) {
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
            <Text style={styles.title}>Selecciona tu nuevo precio</Text>

            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.closeText}>x</Text>
            </Pressable>
          </View>

          <PriceSection
            config={config}
            selectedRangeId={selectedRangeId}
            isFree={isFree}
            onChangeRangeId={onChangeRangeId}
            onToggleFree={onToggleFree}
          />

          <Pressable style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneText}>Listo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}