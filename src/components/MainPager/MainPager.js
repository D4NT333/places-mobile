import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import FooterNav from "../FooterNav";
import styles from "./styles";

import HomeScreen from "../../screens/home/HomeScreen";
import SearchScreen from "../../screens/search/SearchScreen";
import AddPlacesScreen from "../../screens/add/AddPlacesScreen";
import MetricsScreen from "../../screens/metrics/MetricsScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";

export default function MainPager() {
  const pagerRef = useRef(null);
  const [index, setIndex] = useState(2);

  const onNavigate = (i) => {
    setIndex(i);
    pagerRef.current?.setPage(i);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={2}
        ref={pagerRef}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}
      >
        <AddPlacesScreen key="add" />
        <MetricsScreen key="metrics" />
        <HomeScreen key="home" />
        <SearchScreen key="search" />
        <ProfileScreen key="user" />
      </PagerView>

      <FooterNav index={index} onNavigate={onNavigate} />
    </View>
  );
}
