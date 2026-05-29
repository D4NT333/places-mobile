import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
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

export default function ScheduleSection({
  scheduleType,
  selectedDays,
  openTime,
  closeTime,
  onChangeScheduleType,
  onToggleDay,
  onChangeOpenTime,
  onChangeCloseTime,
}) {
  const isDefined = scheduleType === "defined";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horario</Text>

      <View style={styles.typeRow}>
        <Pressable
          style={[
            styles.typeChip,
            scheduleType === "not_specified" && styles.selectedChip,
          ]}
          onPress={() => onChangeScheduleType("not_specified")}
        >
          <Text
            style={[
              styles.typeChipText,
              scheduleType === "not_specified" && styles.selectedChipText,
            ]}
          >
            No especificado
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeChip,
            scheduleType === "always_open" && styles.selectedChip,
          ]}
          onPress={() => onChangeScheduleType("always_open")}
        >
          <Text
            style={[
              styles.typeChipText,
              scheduleType === "always_open" && styles.selectedChipText,
            ]}
          >
            24 horas
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeChip,
            scheduleType === "defined" && styles.selectedChip,
          ]}
          onPress={() => onChangeScheduleType("defined")}
        >
          <Text
            style={[
              styles.typeChipText,
              scheduleType === "defined" && styles.selectedChipText,
            ]}
          >
            Definir
          </Text>
        </Pressable>
      </View>

      {isDefined && (
        <>
          <Text style={styles.label}>Días</Text>

          <View style={styles.daysGrid}>
            {DAY_OPTIONS.map((day) => {
              const selected = selectedDays.includes(day.id);

              return (
                <Pressable
                  key={day.id}
                  style={[styles.dayChip, selected && styles.selectedChip]}
                  onPress={() => onToggleDay(day.id)}
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
                  onPress={() => onChangeOpenTime(hour)}
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
                  onPress={() => onChangeCloseTime(hour)}
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
      )}
    </View>
  );
}