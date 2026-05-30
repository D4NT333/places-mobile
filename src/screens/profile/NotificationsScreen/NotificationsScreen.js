import React, { useMemo, useState } from "react";
import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LayoutScreen } from "../../../layouts";
import { icons } from "../../../../assets/icons";

import styles from "./styles";
import { MOCK_NOTIFICATIONS } from "./data";

import NotificationCard from "./Components/NotificationCard/NotificationCard";
import NotificationFilterPills from "./Components/NotificationFilterPills/NotificationFilterPills";

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const [activeFilter, setActiveFilter] = useState("all");

  const notifications = useMemo(() => {
    if (activeFilter === "unread") {
      return MOCK_NOTIFICATIONS.filter((item) => !item.read);
    }

    return MOCK_NOTIFICATIONS;
  }, [activeFilter]);

  const handleNotificationPress = (notification) => {
    switch (notification.type) {
      case "proposal_returned":
        console.log("Abrir edición de propuesta");
        break;

      case "proposal_rejected":
        console.log("Abrir motivo de rechazo");
        break;

      case "weekly_report":
        console.log("Abrir reporte semanal");
        break;

      case "activity_warning":
        console.log("Abrir aviso de actividad");
        break;

      case "proposal_accepted":
        console.log("Abrir lugar aprobado");
        break;

      default:
        console.log("Notificación presionada", notification);
    }
  };

  return (
    <LayoutScreen
      edges={["top"]}
      padding={{ top: 16, left: 20, right: 20, bottom: 0 }}
      bg="#FFFFFF"
    >
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}
        >
          <Image
            source={icons.flecha}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.title}>Notificaciones</Text>
      </View>

      <NotificationFilterPills
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={handleNotificationPress}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No tienes notificaciones pendientes
            </Text>

            <Text style={styles.emptyText}>
              Aquí aparecerán avisos sobre tus propuestas, reportes y actividad
              dentro de Lsearch.
            </Text>
          </View>
        )}
      </ScrollView>
    </LayoutScreen>
  );
}