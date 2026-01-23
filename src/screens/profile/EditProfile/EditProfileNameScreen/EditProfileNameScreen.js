import React, { useMemo, useState } from "react";
import { View, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";
import ModalHeader from "./Components/ModalHeader";

export default function EditProfileNameScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialValue = useMemo(() => route.params?.value ?? "", [route.params]);
  const [value, setValue] = useState(initialValue);

  const onClose = () => navigation.goBack();
  const onSave = () => {
    navigation.navigate("EditProfileScreen", { updatedName: value.trim() });
    navigation.goBack();
  };

  return (
    <LayoutScreen edges={["top"]} padding={{ top: 16, left: 16, right: 16, bottom: 16 }} bg="#FFF">
      <ModalHeader title="Nombre" onClose={onClose} onSave={onSave} />

      <View style={styles.section}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Texto"
          placeholderTextColor="#777"
          style={styles.input}
        />
      </View>
    </LayoutScreen>
  );
}
