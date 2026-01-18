export const mockPlace = {
  id: "place_1",
  name: "Parque San Rafael",
  distanceKm: 3.2,
  description:
    "Lugar para relajarse y pasar un agradable momento con tus amigos o pareja. Es excelente para caminar, tomar fotos y desconectarte un rato.",
  rating: 3.6,
  reviewsCount: 218,
  tags: ["Familiar", "Fotos", "Bosque", "Café", "Tranquilo"],
  images: [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1200",
  ],
  location: { lat: 20.6736, lng: -103.344 },
  address: "Guadalajara, Jal. (Ubicación aproximada)",
};

export const mockComments = [
  {
    id: "c1",
    userName: "Mariana",
    text: "Está bien bonito y tranquilo, ideal para ir en la tarde.",
    createdAt: "Hace 2 días",
    avatarUrl: null,
  },
  {
    id: "c2",
    userName: "Leo",
    text: "La zona está cool para fotos, pero ve temprano si no quieres tanta gente.",
    createdAt: "Hace 1 semana",
    avatarUrl: null,
  },
  {
    id: "c3",
    userName: "Ana",
    text: "Me encantó. Muy buen lugar para caminar y despejarte.",
    createdAt: "Hace 3 semanas",
    avatarUrl: null,
  },
];
