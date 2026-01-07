import { Redirect } from 'expo-router';

// This file is now ONLY used to redirect to the first screen you want to show.
export default function StartupPage() {
  // The Redirect component instantly navigates the user to the specified path.
  // It is the first screen you see until a user is logged in.
  return <Redirect href="/(auth)/register" />;
}