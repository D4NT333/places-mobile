import React from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";
import { formatNotificationTime } from "../../utils/formatNotificationTime";

export default function NotificationCard({ notification, onPress }) {
  const {
    title,
    message,
    actionLabel,
    read,
    createdAt,
  } = notification;

  return (
    <Pressable
      style={[
        styles.card,
        !read && styles.cardUnread,
      ]}
      onPress={() => onPress?.(notification)}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          {!read && <View style={styles.unreadDot} />}

          <Text
            style={[
              styles.title,
              !read && styles.titleUnread,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      </View>

      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>

      <View style={styles.footerRow}>
        <Text style={styles.time}>
          {formatNotificationTime(createdAt)}
        </Text>

        {actionLabel && (
          <Text style={styles.action}>
            {actionLabel}
          </Text>
        )}
      </View>
    </Pressable>
  );
}