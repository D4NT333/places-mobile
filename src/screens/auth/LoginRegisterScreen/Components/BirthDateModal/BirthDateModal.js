import React, { useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";

import styles from "./styles";

const MONTHS = [
  { value: 1, label: "Ene" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Abr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Ago" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dic" },
];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function BirthDateModal({
  visible,
  initialValue,
  onClose,
  onConfirm,
}) {
  const currentYear = new Date().getFullYear();

  const parsedInitial = useMemo(() => {
    if (!initialValue) return null;

    const parts = initialValue.split("-");
    if (parts.length !== 3) return null;

    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const day = Number(parts[2]);

    if (!year || !month || !day) return null;

    return { year, month, day };
  }, [initialValue]);

  const [selectedDay, setSelectedDay] = useState(parsedInitial?.day || 1);
  const [selectedMonth, setSelectedMonth] = useState(parsedInitial?.month || 1);
  const [selectedYear, setSelectedYear] = useState(
  parsedInitial?.year || currentYear - 14
);

const years = useMemo(() => {
  const minYear = currentYear - 100;
  const maxYear = currentYear;

  const list = [];

  for (let year = maxYear; year >= minYear; year--) {
    list.push(year);
  }

  return list;
}, [currentYear]);

  const days = useMemo(() => {
    const totalDays = getDaysInMonth(selectedMonth, selectedYear);

    return Array.from({ length: totalDays }, (_, index) => index + 1);
  }, [selectedMonth, selectedYear]);

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);

    const maxDays = getDaysInMonth(month, selectedYear);

    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
    }
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);

    const maxDays = getDaysInMonth(selectedMonth, year);

    if (selectedDay > maxDays) {
      setSelectedDay(maxDays);
    }
  };

  const handleConfirm = () => {
    const isoValue = `${selectedYear}-${pad(selectedMonth)}-${pad(selectedDay)}`;
    const displayValue = `${pad(selectedDay)}/${pad(selectedMonth)}/${selectedYear}`;

    onConfirm({
      isoValue,
      displayValue,
      day: selectedDay,
      month: selectedMonth,
      year: selectedYear,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Fecha de nacimiento</Text>
            <Text style={styles.subtitle}>
              Selecciona día, mes y año
            </Text>
          </View>

          <View style={styles.columns}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Día</Text>

              <ScrollView
                style={styles.scrollBox}
                showsVerticalScrollIndicator={false}
              >
                {days.map((day) => {
                  const selected = selectedDay === day;

                  return (
                    <Pressable
                      key={day}
                      onPress={() => setSelectedDay(day)}
                      style={[
                        styles.option,
                        selected && styles.optionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {pad(day)}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Mes</Text>

              <ScrollView
                style={styles.scrollBox}
                showsVerticalScrollIndicator={false}
              >
                {MONTHS.map((month) => {
                  const selected = selectedMonth === month.value;

                  return (
                    <Pressable
                      key={month.value}
                      onPress={() => handleSelectMonth(month.value)}
                      style={[
                        styles.option,
                        selected && styles.optionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {month.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Año</Text>

              <ScrollView
                style={styles.scrollBox}
                showsVerticalScrollIndicator={false}
              >
                {years.map((year) => {
                  const selected = selectedYear === year;

                  return (
                    <Pressable
                      key={year}
                      onPress={() => handleSelectYear(year)}
                      style={[
                        styles.option,
                        selected && styles.optionSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextSelected,
                        ]}
                      >
                        {year}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>

            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}