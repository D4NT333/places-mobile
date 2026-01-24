import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator({ isLogged }) {
  return isLogged ? <AppNavigator /> : <AuthNavigator />;
}
