import React, { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import styles from "./styles";

const DAY_OPTIONS = [
  { id: "monday", label: "Lun" },
  { id: "tuesday", label: "Mar" },
  { id: "wednesday", label: "Mié" },
  { id: "thursday", label: "Jue" },
  { id: "friday", label: "Vie" },
  { id: "saturday", label: "Sáb" },
  { id: "sunday", label: "Dom" },
];

const HOUR_OPTIONS = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
  "01:00",
  "02:00",
];

function buildScheduleLabel({ type, days, openTime, closeTime }) {
  if (type === "always_open") {
    return "Abierto 24 horas";
  }

  const dayLabels = {
    monday: "Lun",
    tuesday: "Mar",
    wednesday: "Mié",
    thursday: "Jue",
    friday: "Vie",
    saturday: "Sáb",
    sunday: "Dom",
  };

  const daysText = days
    .map((day) => dayLabels[day])
    .filter(Boolean)
    .join(", ");

  return `${daysText} · ${openTime} - ${closeTime}`;
}

export default function EditableScheduleModal({
  visible,
  value,
  onApply,
  onClose,
}) {
  const [type, setType] = useState("defined");
  const [days, setDays] = useState([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("18:00");

  useEffect(() => {
    if (!visible) return;

    if (value?.type === "always_open") {
      setType("always_open");
      setDays([]);
      setOpenTime("09:00");
      setCloseTime("18:00");
      return;
    }

    setType("defined");
    setDays(
      Array.isArray(value?.days) && value.days.length > 0
        ? value.days
        : ["monday", "tuesday", "wednesday", "thursday", "friday"]
    );
    setOpenTime(value?.openTime || "09:00");
    setCloseTime(value?.closeTime || "18:00");
  }, [visible, value]);

  const isDefined = type === "defined";

  const previewLabel = useMemo(() => {
    return buildScheduleLabel({
      type,
      days,
      openTime,
      closeTime,
    });
  }, [type, days, openTime, closeTime]);

  const toggleDay = (dayId) => {
    setDays((prev) => {
      const exists = prev.includes(dayId);

      if (exists) {
        return prev.filter((id) => id !== dayId);
      }

      return [...prev, dayId];
    });
  };

  const canApply =
    type === "always_open" ||
    (type === "defined" &&
      days.length > 0 &&
      openTime &&
      closeTime &&
      openTime !== closeTime);

  const handleApply = () => {
    if (!canApply) return;

    if (type === "always_open") {
      onApply({
        type: "always_open",
        days: [],
        openTime: null,
        closeTime: null,
        label: "Abierto 24 horas",
      });

      onClose();
      return;
    }

    onApply({
      type: "defined",
      days,
      openTime,
      closeTime,
      label: previewLabel,
    });

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Nuevo horario</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>
            Selecciona cómo debe mostrarse el horario corregido.
          </Text>

          <View style={styles.typeRow}>
            <Pressable
              style={[
                styles.typeChip,
                type === "always_open" && styles.selectedChip,
              ]}
              onPress={() => setType("always_open")}
            >
              <Text
                style={[
                  styles.typeChipText,
                  type === "always_open" && styles.selectedChipText,
                ]}
              >
                24 horas
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.typeChip,
                type === "defined" && styles.selectedChip,
              ]}
              onPress={() => setType("defined")}
            >
              <Text
                style={[
                  styles.typeChipText,
                  type === "defined" && styles.selectedChipText,
                ]}
              >
                Definir
              </Text>
            </Pressable>
          </View>

          {isDefined ? (
            <>
              <Text style={styles.label}>Días</Text>

              <View style={styles.daysGrid}>
                {DAY_OPTIONS.map((day) => {
                  const selected = days.includes(day.id);

                  return (
                    <Pressable
                      key={day.id}
                      style={[styles.dayChip, selected && styles.selectedChip]}
                      onPress={() => toggleDay(day.id)}
                    >
                      <Text
                        style={[
                          styles.dayChipText,
                          selected && styles.selectedChipText,
                        ]}
                      >
                        {day.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.label}>Abre</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hourList}
              >
                {HOUR_OPTIONS.map((hour) => {
                  const selected = openTime === hour;

                  return (
                    <Pressable
                      key={`open-${hour}`}
                      style={[styles.hourChip, selected && styles.selectedChip]}
                      onPress={() => setOpenTime(hour)}
                    >
                      <Text
                        style={[
                          styles.hourChipText,
                          selected && styles.selectedChipText,
                        ]}
                      >
                        {hour}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <Text style={styles.label}>Cierra</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.hourList}
              >
                {HOUR_OPTIONS.map((hour) => {
                  const selected = closeTime === hour;

                  return (
                    <Pressable
                      key={`close-${hour}`}
                      style={[styles.hourChip, selected && styles.selectedChip]}
                      onPress={() => setCloseTime(hour)}
                    >
                      <Text
                        style={[
                          styles.hourChipText,
                          selected && styles.selectedChipText,
                        ]}
                      >
                        {hour}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </>
          ) : null}

          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>Vista previa</Text>
            <Text style={styles.previewText}>{previewLabel}</Text>
          </View>

          <Pressable
            style={[styles.applyButton, !canApply && styles.disabledButton]}
            onPress={handleApply}
            disabled={!canApply}
          >
            <Text style={styles.applyText}>Aplicar horario</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}