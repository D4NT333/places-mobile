export function formatNotificationTime(createdAt) {
  const now = new Date();

  const createdDate = createdAt?.toDate
    ? createdAt.toDate()
    : new Date(createdAt);

  const diffMs = now - createdDate;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) return "Ahora";

  if (diffMinutes === 1) return "Hace 1 min";
  if (diffMinutes < 60) return `Hace ${diffMinutes} min`;

  if (diffHours === 1) return "Hace 1 h";
  if (diffHours < 24) return `Hace ${diffHours} h`;

  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;

  if (diffWeeks === 1) return "Hace 1 semana";
  if (diffWeeks < 5) return `Hace ${diffWeeks} semanas`;

  if (diffMonths === 1) return "Hace 1 mes";
  return `Hace ${diffMonths} meses`;
}