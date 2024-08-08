// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import "@/styles/globals.scss";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { colors } from "@/theme/colors";
import { DM_Sans } from "next/font/google";

export const metadata = {
  title: "Template",
  description: "I have followed setup instructions carefully",
};

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    colors: {
      primary: [...colors.primary],
      secondary: [...colors.secondary],
      grey: [...colors.gray],
      success: [...colors.success],
      warning: [...colors.warning],
      error: [...colors.error],
    },
    primaryColor: "secondary",
    primaryShade: 9,
    fontFamily: dmSans.style.fontFamily,
  });
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body style={{ backgroundColor: "#F3F5F7" }}>
        <MantineProvider theme={theme}>
          <Notifications position="top-center" limit={1} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
