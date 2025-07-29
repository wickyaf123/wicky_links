export default function Home() {
  const links = [
    {
      name: "Wicky Main",
      url: "https://wicky-alpha.vercel.app/",
      description: "The main Wicky platform for sports betting and more",
      color: "bg-purple-600",
    },
    {
      name: "Multi Builder",
      url: "https://multi-frontend-mu.vercel.app/",
      description: "Build your multi-bets for NRL, AFL, and combined sports",
      color: "bg-blue-600",
    },
    {
      name: "NBA",
      url: "https://nba-frontend-woad.vercel.app/",
      description: "NBA betting platform and statistics",
      color: "bg-red-600",
    },
    {
      name: "Premier League",
      url: "https://epl-frontend-oqbw.vercel.app/",
      description: "Premier League betting assistant with real-time insights",
      color: "bg-green-600",
    },
    {
      name: "Fantasy Team Builder",
      url: "https://ipl-fantsay1004-git-main-mayurs-projects-b6048be7.vercel.app/",
      description: "AI-Powered Fantasy Team Builder for cricket matches",
      color: "bg-yellow-600",
    },
    {
      name: "BBL AI Insights",
      url: "https://bbl-ai-insights-i-hawk-git-main-mayurs-projects-b6048be7.vercel.app/",
      description: "Cricket Analytics Platform for performance statistics",
      color: "bg-orange-600",
    },
    {
      name: "IPL Platform",
      url: "https://ipl-040725-frontend.vercel.app/",
      description: "IPL cricket platform with enhanced features and insights",
      color: "bg-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            Wicky Links
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your gateway to various Wicky sports betting platforms
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center text-white font-bold text-xl`}>
                  {link.name.charAt(0)}
                </div>
                <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {link.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{link.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                  Visit Site →
                </span>
              </div>
            </a>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
