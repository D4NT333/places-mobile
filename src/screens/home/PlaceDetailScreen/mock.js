export const mockPlace = {
  id: "place_1",
  name: "Parque San Rafael",
  isOpen: true,
  distanceKm: 2,

  description:
    "Lugar para relajarse y pasar un agradable momento con tus amigos o pareja, es excelente.",

  images: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  ],

  googleRating: 4.8,
  googleReviewsCount: 1250,

  lsearchRating: 1.3,
  lsearchReviewsCount: 8,

  lsearchSummary: {
    rating: 2.6,
    reviewsCount: 8,
    recommendationPercent: 75,
  },

  googleSummary: {
    rating: 4.3,
    reviewsCount: 1250,
  },

  tags: ["Etiqueta", "Subetiqueta", "Subetiqueta", "Enfoque"],

  address: "Av. San Rafael 123, Guadalajara, Jal.",
};

export const mockLsearchReviews = [
  {
    id: "review_1",
    userName: "Usuario",
    rating: 4,
    recommends: true,
    comment: "Muy bonito y tranquilo...",
  },
];

export const mockGoogleReviews = [
  {
    id: "google_review_1",
    rating: 4.3,
    comment: "Muy bonito para caminar...",
  },
];