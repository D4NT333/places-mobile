import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { LayoutScreen } from "../../../../layouts";
import styles from "./styles";

import CommentHeader from "./Components/CommentHeader";
import RecommendSection from "./Components/RecommendSection";
import RatingSection from "./Components/RatingSection";
import CommentActions from "./Components/CommentActions";
import ExitCommentModal from "./Components/ExitCommentModal";
import RatingSummaryCard from "./Components/RatingSummaryCard";
import LikertQuestionSection from "./Components/LikertQuestionSection";
import LikertAnswersSummary from "./Components/LikertAnswersSummary";
import OptionalCommentSection from "./Components/OptionalCommentSection";

const LIKERT_LABELS = {
  1: "Muy insatisfecho",
  2: "Insatisfecho",
  3: "Neutral",
  4: "Satisfecho",
  5: "Totalmente satisfecho",
};

const COMMENT_MIN_LENGTH = 80;
const COMMENT_MAX_LENGTH = 200;

export default function CommentScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const placeName = route?.params?.placeName ?? "este lugar";

  const [recommendation, setRecommendation] = useState(null);
  const [rating, setRating] = useState(0);
  const [matchesAnnouncement, setMatchesAnnouncement] = useState(null);
  const [questionOneValue, setQuestionOneValue] = useState(0);
  const [questionTwoValue, setQuestionTwoValue] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [commentTouched, setCommentTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showDetailsFlow, setShowDetailsFlow] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const trimmedCommentText = commentText.trim();
  const commentLength = trimmedCommentText.length;

  const commentRequired =
    showDetailsFlow &&
    matchesAnnouncement !== null &&
    questionOneValue > 0 &&
    questionTwoValue > 0;

  const shouldShowCommentError =
    commentRequired &&
    (commentTouched || submitAttempted) &&
    commentLength < COMMENT_MIN_LENGTH;

  const commentValidationMessage = shouldShowCommentError
    ? commentLength === 0
      ? `Escribe un comentario de al menos ${COMMENT_MIN_LENGTH} caracteres.`
      : `El comentario debe tener al menos ${COMMENT_MIN_LENGTH} caracteres.`
    : null;

  const isCommentValid =
    !commentRequired || commentLength >= COMMENT_MIN_LENGTH;

  const recommendationSummaryType = useMemo(() => {
    if (recommendation === true) return "positive";
    if (recommendation === false) return "negative";
    return "neutral";
  }, [recommendation]);

  const matchesAnnouncementSummaryType = useMemo(() => {
    if (matchesAnnouncement === true) return "positive";
    if (matchesAnnouncement === false) return "negative";
    return "neutral";
  }, [matchesAnnouncement]);

  const hasProgress =
    recommendation !== null ||
    rating > 0 ||
    matchesAnnouncement !== null ||
    questionOneValue > 0 ||
    questionTwoValue > 0 ||
    commentText.trim().length > 0 ||
    showDetailsFlow;

  const showLikertQuestions =
    showDetailsFlow && matchesAnnouncement !== null;

  const showLikertSummary =
    showDetailsFlow &&
    matchesAnnouncement !== null &&
    questionOneValue > 0 &&
    questionTwoValue > 0;

  const submitDisabled = showDetailsFlow
    ? recommendation === null ||
      rating === 0 ||
      matchesAnnouncement === null ||
      questionOneValue === 0 ||
      questionTwoValue === 0 ||
      !isCommentValid
    : recommendation === null || rating === 0;

  const resetCommentValidation = () => {
    setCommentTouched(false);
    setSubmitAttempted(false);
  };

  const resetDetailsFlow = () => {
    setShowDetailsFlow(false);
    setMatchesAnnouncement(null);
    setQuestionOneValue(0);
    setQuestionTwoValue(0);
    setCommentText("");
    resetCommentValidation();
  };

  const handleSelectRecommendation = (value) => {
    setRecommendation(value);
  };

  const handleEditRecommendation = () => {
    setRecommendation(null);
    resetDetailsFlow();
  };

  const handleSelectRating = (value) => {
    setRating(value);
  };

  const handleEditRatingSummary = () => {
    resetDetailsFlow();
  };

  const handleSelectMatchesAnnouncement = (value) => {
    setMatchesAnnouncement(value);
    setQuestionOneValue(0);
    setQuestionTwoValue(0);
    setCommentText("");
    resetCommentValidation();
  };

  const handleEditMatchesAnnouncement = () => {
    setMatchesAnnouncement(null);
    setQuestionOneValue(0);
    setQuestionTwoValue(0);
    setCommentText("");
    resetCommentValidation();
  };

  const handleChangeCommentText = (text) => {
    setCommentText(text);

    if (submitAttempted) {
      setSubmitAttempted(false);
    }
  };

  const handleBlurComment = () => {
    setCommentTouched(true);
  };

  const handlePressClose = () => {
    if (!hasProgress) {
      navigation.goBack();
      return;
    }

    setShowExitModal(true);
  };

  const handleContinueRating = () => {
    setShowExitModal(false);
  };

  const handleDiscardRating = () => {
    setShowExitModal(false);
    navigation.goBack();
  };

  const handleAddDetails = () => {
    if (recommendation === null || rating === 0) return;
    setShowDetailsFlow(true);
  };

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (showDetailsFlow && commentText.trim().length < COMMENT_MIN_LENGTH) {
      return;
    }

    const payload = {
      placeName,
      recommendation,
      rating,
      matchesAnnouncement,
      questionOneValue,
      questionOneLabel: LIKERT_LABELS[questionOneValue] ?? null,
      questionTwoValue,
      questionTwoLabel: LIKERT_LABELS[questionTwoValue] ?? null,
      commentText: commentText.trim(),
      showDetailsFlow,
    };

    console.log("Enviar calificación:", payload);
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <LayoutScreen
          scroll
          edges={["top"]}
          padding={{ top: 0, left: 0, right: 0, bottom: 18 }}
        >
          <View style={styles.screen}>
            <CommentHeader
              title="Califica tu experiencia"
              subtitle="Tu opinión ayuda a otros usuarios a descubrir mejores lugares."
              onClose={handlePressClose}
            />

            <RecommendSection
              question="¿Lo recomendarías?"
              value={recommendation}
              summaryType={recommendationSummaryType}
              onSelect={handleSelectRecommendation}
              onEdit={handleEditRecommendation}
            />

            <View style={styles.sectionGap} />

            {!showDetailsFlow ? (
              <RatingSection value={rating} onSelect={handleSelectRating} />
            ) : (
              <>
                <RatingSummaryCard
                  value={rating}
                  onEdit={handleEditRatingSummary}
                />

                <View style={styles.sectionGap} />

                <RecommendSection
                  question="¿Lo que viviste coincide con lo que se anuncia?"
                  value={matchesAnnouncement}
                  summaryType={matchesAnnouncementSummaryType}
                  onSelect={handleSelectMatchesAnnouncement}
                  onEdit={handleEditMatchesAnnouncement}
                />

                {showLikertQuestions && !showLikertSummary ? (
                  <>
                    <View style={styles.sectionGap} />

                    <LikertQuestionSection
                      title="Pregunta 1"
                      value={questionOneValue}
                      onSelect={setQuestionOneValue}
                    />

                    <View style={styles.sectionGap} />

                    <LikertQuestionSection
                      title="Pregunta 2"
                      value={questionTwoValue}
                      onSelect={setQuestionTwoValue}
                    />
                  </>
                ) : null}

                {showLikertSummary ? (
                  <>
                    <View style={styles.sectionGap} />

                    <LikertAnswersSummary
                      questionOneLabel={LIKERT_LABELS[questionOneValue]}
                      questionTwoLabel={LIKERT_LABELS[questionTwoValue]}
                      onEditQuestionOne={() => {
                        setQuestionOneValue(0);
                        setCommentText("");
                        resetCommentValidation();
                      }}
                      onEditQuestionTwo={() => {
                        setQuestionTwoValue(0);
                        setCommentText("");
                        resetCommentValidation();
                      }}
                    />

                    <View style={styles.sectionGap} />

                    <OptionalCommentSection
                      value={commentText}
                      onChangeText={handleChangeCommentText}
                      onBlur={handleBlurComment}
                      minLength={COMMENT_MIN_LENGTH}
                      maxLength={COMMENT_MAX_LENGTH}
                      errorMessage={commentValidationMessage}
                    />
                  </>
                ) : null}
              </>
            )}

            <View style={styles.bottomSpacer} />

            <CommentActions
              onAddDetails={handleAddDetails}
              onSubmit={handleSubmit}
              submitDisabled={submitDisabled}
              hideAddDetails={showDetailsFlow}
            />
          </View>
        </LayoutScreen>
      </KeyboardAvoidingView>

      <ExitCommentModal
        visible={showExitModal}
        onDiscard={handleDiscardRating}
        onContinue={handleContinueRating}
      />
    </>
  );
}