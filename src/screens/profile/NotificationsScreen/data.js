export const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "proposal_returned",
    title: "Propuesta devuelta",
    message: "Tu propuesta necesita algunos ajustes antes de publicarse.",
    actionLabel: "Editar",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    type: "proposal_rejected",
    title: "Propuesta rechazada",
    message: "Tu propuesta no cumple con algunos criterios de publicación.",
    actionLabel: "Ver motivo",
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "3",
    type: "weekly_report",
    title: "Tu resumen semanal",
    message: "Esta semana tus propuestas recibieron 18 vistas y 5 guardados.",
    actionLabel: "Ver",
    read: true,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "4",
    type: "activity_warning",
    title: "Aviso sobre tu actividad",
    message:
      "Recibimos un reporte relacionado con una de tus reseñas. Si se acumulan más reportes válidos, tu cuenta podría recibir una sanción.",
    actionLabel: null,
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "5",
    type: "proposal_accepted",
    title: "Propuesta aceptada",
    message:
      "Tu lugar fue aprobado correctamente. Pronto estará visible para todos en Lsearch.",
    actionLabel: null,
    read: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
];