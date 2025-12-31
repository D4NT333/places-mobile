import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

import FooterNav from "../FooterNav";
import {HomeScreen, SearchScreen, AddPlacesScreen, MetricsScreen, ProfileScreen} from "../../screens";

export default function MainPager() {
  const pagerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const onNavigate = (i) => {
    setIndex(i);
    pagerRef.current?.setPage(i);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => setIndex(e.nativeEvent.position)}
      >
        <HomeScreen key="home" />
        <SearchScreen key="search" />
        <AddPlacesScreen key="add" />
        <MetricsScreen key="metrics" />
        <ProfileScreen key="user" />
      </PagerView>

      <FooterNav index={index} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pager: { flex: 1 },
});
