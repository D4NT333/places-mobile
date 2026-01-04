export const settingsSections = [
  {
    title: "Preferencias",
    items: [
      { label: "Notificaciones", route: "NotificationsSettings" },
      { label: "Modo oscuro", route: "ThemeSettings" },
      { label: "Radio de búsqueda", route: "SearchRadiusSettings" },
    ],
  },
  {
    title: "App",
    items: [
      { label: "Versión de la aplicación", route: "AppVersion" },
      { label: "Aviso de privacidad", route: "PrivacyNotice" },
      { label: "Términos y condiciones", route: "Terms" },
      { label: "Reportar un problema", route: "ReportIssue" },
      { label: "Sugerir mejora", route: "SuggestImprovement" },
    ],
  },
  {
    title: "Cuenta",
    items: [
      { label: "Cambiar contraseña", route: "ChangePassword" },
      { label: "Cambiar correo", route: "ChangeEmail" },
      { label: "Eliminar cuenta", route: "DeleteAccount" },
    ],
  },
];