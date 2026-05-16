import "dotenv/config";

export default {
  expo: {
    name: "Lsearch",
    slug: "places-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logoLsearch.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/logoLsearch.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
    },

    android: {
      edgeToEdgeEnabled: true,
      package: "com.dante_orozzco.placesmobile",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY,
        },
      },
    },

    extra: {
      eas: {
        projectId: "c2472174-98d6-4e9b-bfdc-1da6025dec4b",
      },
    },
  },
};