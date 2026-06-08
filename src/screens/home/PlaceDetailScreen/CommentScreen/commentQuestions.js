export const REVIEW_QUESTIONS_BY_TAG_ID = {
  tag_gastronomy: {
    tagLabel: "Gastronomía",
    questions: [
      {
        id: "gastronomy_food_quality",
        label: "¿Qué tal estuvo el sabor y la calidad de la comida?",
      },
      {
        id: "gastronomy_service",
        label: "¿El servicio fue adecuado y atento?",
      },
    ],
  },

  tag_entertainment: {
    tagLabel: "Entretenimiento",
    questions: [
      {
        id: "entertainment_atmosphere",
        label: "¿El ambiente y la atmósfera fueron agradables?",
      },
      {
        id: "entertainment_facilities",
        label: "¿Las instalaciones estaban limpias y en buen estado?",
      },
    ],
  },

  tag_nature: {
    tagLabel: "Naturaleza",
    questions: [
      {
        id: "nature_cleanliness",
        label: "¿El lugar está bien cuidado y limpio?",
      },
      {
        id: "nature_safety",
        label: "¿Te sentiste con seguridad durante tu visita?",
      },
    ],
  },

  tag_learning: {
    tagLabel: "Aprendizaje y formación",
    questions: [
      {
        id: "learning_spaces",
        label: "¿Las instalaciones y espacios de estudio son adecuados?",
      },
      {
        id: "learning_experience",
        label: "¿La experiencia de aprendizaje fue clara y bien organizada?",
      },
    ],
  },

  tag_sport: {
    tagLabel: "Deportes",
    questions: [
      {
        id: "sport_facilities",
        label: "¿Las instalaciones están en buen estado?",
      },
      {
        id: "sport_equipment",
        label: "¿El equipo/material estaba en buenas condiciones?",
      },
    ],
  },

  tag_art: {
    tagLabel: "Arte y cultura",
    questions: [
      {
        id: "art_experience",
        label: "¿La experiencia fue interesante o enriquecedora?",
      },
      {
        id: "art_organization",
        label: "¿La organización y presentación fueron adecuadas?",
      },
    ],
  },

  tag_shopping: {
    tagLabel: "Compras",
    questions: [
      {
        id: "shopping_variety",
        label: "¿Encontraste variedad de productos?",
      },
      {
        id: "shopping_attention",
        label: "¿La atención fue buena?",
      },
    ],
  },

  tag_lodging: {
    tagLabel: "Hospedaje",
    questions: [
      {
        id: "lodging_cleanliness",
        label: "¿La habitación estaba limpia y cómoda?",
      },
      {
        id: "lodging_accuracy",
        label: "¿La habitación coincide con lo que se anuncia?",
      },
    ],
  },

  tag_service: {
    tagLabel: "Servicios",
    questions: [
      {
        id: "service_solution",
        label: "¿El servicio resolvió tu necesidad?",
      },
      {
        id: "service_speed",
        label: "¿La atención o rapidez fue la adecuada?",
      },
    ],
  },
};

const DEFAULT_REVIEW_QUESTIONS = {
  tagLabel: "Lugar",
  questions: [
    {
      id: "general_experience",
      label: "¿La experiencia fue agradable?",
    },
    {
      id: "general_quality",
      label: "¿El lugar cumplió con tus expectativas?",
    },
  ],
};

export function getReviewQuestionsByTagId(tagId) {
  const cleanTagId = typeof tagId === "string" ? tagId.trim() : "";

  return REVIEW_QUESTIONS_BY_TAG_ID[cleanTagId] || DEFAULT_REVIEW_QUESTIONS;
}