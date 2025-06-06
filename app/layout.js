import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>Zone Diet</title>
        <meta
          name="description"
          content="Learn about the Zone Diet and calculate your daily blocks"
        />
      </head>
      <body className="h-full bg-gray-50 text-gray-800 font-sans">
        <div className="flex flex-col min-h-screen">
          <header className="bg-green-600 text-white p-4 shadow-md">
            <h1 className="text-2xl font-bold">Zone Diet Platform</h1>
          </header>

          <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
            {children}
          </main>

          <footer className="bg-green-600 text-white p-4 text-center">
            &copy; 2025 Zone Diet Platform
          </footer>
        </div>
      </body>
    </html>
  );
}
