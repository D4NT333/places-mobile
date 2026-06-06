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
      googleServicesFile: "./google-services.json",
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_ANDROID_API_KEY || process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },

    plugins: ["expo-notifications"],

    extra: {
      eas: {
        projectId: "c2472174-98d6-4e9b-bfdc-1da6025dec4b",
      },
    },
  },
};



