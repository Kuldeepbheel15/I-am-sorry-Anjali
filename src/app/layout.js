import "./globals.css";

export const metadata = {
  title: "A Special Sorry For Special Anjali",
  description: "Sorry website for Anjali Ahari ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
