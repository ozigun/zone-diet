import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zone Diet</title>
        <meta
          name="description"
          content="Learn about the Zone Diet and calculate your daily blocks"
        />
      </head>
      <body className="bg-gray-50 text-gray-800 min-h-screen font-sans">
        <header className="bg-green-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Zone Diet Platform</h1>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        <footer className="bg-green-600 text-white p-4 mt-12 text-center">
          &copy; 2025 Zone Diet Platform
        </footer>
      </body>
    </html>
  );
}
