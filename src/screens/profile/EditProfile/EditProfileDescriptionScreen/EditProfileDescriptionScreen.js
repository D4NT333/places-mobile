import React, { useMemo, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";
import ModalHeader from "../EditProfileNameScreen/Components/ModalHeader";

export default function EditProfileDescriptionScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialValue = useMemo(() => route.params?.value ?? "", [route.params]);
  const maxLen = route.params?.maxLen ?? 250;

  const [value, setValue] = useState(initialValue);

  const onClose = () => navigation.goBack();
  const onSave = () => {
    navigation.navigate("EditProfileScreen", { updatedDescription: value.trim() });
    navigation.goBack();
  };

  return (
    <LayoutScreen edges={["top"]} padding={{ top: 16, left: 16, right: 16, bottom: 16 }} bg="#FFF">
      <ModalHeader title="Descripcion" onClose={onClose} onSave={onSave} />

      <View style={styles.section}>
        <Text style={styles.label}>Descripcion:</Text>

        <View style={styles.inputBox}>
          <TextInput
            value={value}
            onChangeText={(t) => setValue(t.slice(0, maxLen))}
            placeholder="Texto"
            placeholderTextColor="#777"
            style={styles.textArea}
            multiline
          />
          <View style={styles.counterRow}>
            <Text style={styles.counter}>{`${value.length}/${maxLen}`}</Text>
          </View>
        </View>
      </View>
    </LayoutScreen>
  );
}
