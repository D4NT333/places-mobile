import React, {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Image,
  Text,
  View,
} from "react-native";

import getGooglePhotoUrlService from "../../../../../services/firebase/getGooglePhotoUrl.service";

const resolvedPhotoCache =
  new Map();

function cleanText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function getInitial(value) {
  const normalizedValue =
    cleanText(value);

  return normalizedValue
    ? normalizedValue
        .charAt(0)
        .toUpperCase()
    : "?";
}

export default function SearchPlaceImage({
  mainPhoto,
  placeName,
  style,
  fallbackStyle,
  fallbackTextStyle,
}) {
  const directUrl =
    cleanText(mainPhoto?.url);

  const reference =
    cleanText(
      mainPhoto?.reference
    );

  const source =
    cleanText(mainPhoto?.source);

  const cachedUrl =
    reference
      ? resolvedPhotoCache.get(
          reference
        ) || ""
      : "";

  const [photoUrl, setPhotoUrl] =
    useState(
      directUrl ||
      cachedUrl
    );

  const [loading, setLoading] =
    useState(
      !directUrl &&
      !cachedUrl &&
      source === "google" &&
      Boolean(reference)
    );

  const [failed, setFailed] =
    useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadPhoto() {
      setFailed(false);

      if (directUrl) {
        setPhotoUrl(directUrl);
        setLoading(false);

        return;
      }

      const storedUrl =
        reference
          ? resolvedPhotoCache.get(
              reference
            ) || ""
          : "";

      if (storedUrl) {
        setPhotoUrl(storedUrl);
        setLoading(false);

        return;
      }

      if (
        source !== "google" ||
        !reference
      ) {
        setPhotoUrl("");
        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        const resolvedUrl =
          await getGooglePhotoUrlService(
            reference,
            {
              maxWidthPx: 400,
            }
          );

        if (!isActive) {
          return;
        }

        if (!resolvedUrl) {
          setPhotoUrl("");
          setFailed(true);

          return;
        }

        resolvedPhotoCache.set(
          reference,
          resolvedUrl
        );

        setPhotoUrl(
          resolvedUrl
        );
      } catch (error) {
        console.log(
          "Error al resolver foto Google:",
          error
        );

        if (isActive) {
          setPhotoUrl("");
          setFailed(true);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadPhoto();

    return () => {
      isActive = false;
    };
  }, [
    directUrl,
    reference,
    source,
  ]);

  if (loading) {
    return (
      <View
        style={[
          style,
          fallbackStyle,
          {
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator
          size="small"
        />
      </View>
    );
  }

  if (!photoUrl || failed) {
    return (
      <View
        style={[
          style,
          fallbackStyle,
        ]}
      >
        <Text
          style={
            fallbackTextStyle
          }
        >
          {getInitial(placeName)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{
        uri: photoUrl,
      }}
      style={style}
      resizeMode="cover"
      onError={() => {
        setFailed(true);
      }}
    />
  );
}