export const settingsSections = [
  {
    title: "Preferencias",
    items: [
      { label: "Notificaciones", route: "NotificationScreen" },
      { label: "Modo oscuro", route: "ThemeSettings" },
      { label: "Radio de búsqueda", route: "SearchRadiusScreen" },
    ],
  },
  {
    title: "App",
    items: [
      //{ label: "Versión de la aplicación", route: "AppVersion" }, no se si sea relevante jaja
      { label: "Aviso de privacidad", route: "PrivacyNoticeScreen" },
      { label: "Términos y condiciones", route: "TermsConditionsScreen" },
      { label: "Reportar un problema", route: "ReportProblemScreen" },
      { label: "Sugerir mejora", route: "SuggestImprovementScreen" },
    ],
  },
  {
    title: "Cuenta",
    items: [
      { label: "Cambiar contraseña", route: "ChangePasswordScreen" },
      { label: "Eliminar cuenta", route: "EliminateAccountScreen" },
    ],
  },
];