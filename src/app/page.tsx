'use client';

import { useState } from 'react';

export default function Home() {
  const [openCategories, setOpenCategories] = useState<string[]>(['main']);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categories = [
    {
      id: 'main',
      title: 'Main Platform',
      icon: '🏠',
      color: 'bg-purple-100 dark:bg-purple-900/30',
      borderColor: 'border-purple-300 dark:border-purple-700',
      links: [
        {
          name: "Wicky Main",
          url: "https://wicky-alpha.vercel.app/",
          description: "The main Wicky platform for sports betting and more",
          color: "bg-purple-600",
        },
      ]
    },
    {
      id: 'multi-sport',
      title: 'Multi-Sport Betting',
      icon: '🏆',
      color: 'bg-blue-100 dark:bg-blue-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
      links: [
        {
          name: "Multi Builder",
          url: "https://multi-frontend-mu.vercel.app/",
          description: "Build your multi-bets for NRL, AFL, and combined sports",
          color: "bg-blue-600",
        },
      ]
    },
    {
      id: 'basketball',
      title: 'Basketball',
      icon: '🏀',
      color: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-300 dark:border-red-700',
      links: [
        {
          name: "NBA",
          url: "https://nba-frontend-woad.vercel.app/",
          description: "NBA betting platform and statistics",
          color: "bg-red-600",
        },
      ]
    },
    {
      id: 'football',
      title: 'Football',
      icon: '⚽',
      color: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
      links: [
        {
          name: "Premier League",
          url: "https://epl-frontend-oqbw.vercel.app/",
          description: "Premier League betting assistant with real-time insights",
          color: "bg-green-600",
        },
      ]
    },
    {
      id: 'cricket',
      title: 'Cricket Platforms',
      icon: '🏏',
      color: 'bg-yellow-100 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-300 dark:border-yellow-700',
      links: [
        {
          name: "Fantasy Team Builder",
          url: "https://ipl-fantsay1004-git-main-mayurs-projects-b6048be7.vercel.app/",
          description: "AI-Powered Fantasy Team Builder for cricket matches",
          color: "bg-yellow-600",
        },
        {
          name: "IPL Platform",
          url: "https://ipl-040725-frontend.vercel.app/",
          description: "IPL cricket platform with enhanced features and insights",
          color: "bg-indigo-600",
        },
        {
          name: "IPL Opposition Planning",
          url: "https://ipl-opposition-planning-frontend.vercel.app/",
          description: "IPL opposition planning and strategic analysis tool",
          color: "bg-orange-600",
        },
        {
          name: "BBL AI Batting",
          url: "https://bbl-ai-batting-frontend.vercel.app/",
          description: "BBL batting analytics with AI-powered insights and statistics",
          color: "bg-pink-600",
        },
        {
          name: "Cricket Insights Pro",
          url: "https://insights-frontend-1.vercel.app/",
          description: "AI-Powered Match Analytics & Strategy with 6 AI Agents for cricket",
          color: "bg-teal-600",
        },
      ]
    },
    {
      id: 'chat-ai',
      title: 'Chat & AI Tools',
      icon: '🤖',
      color: 'bg-gray-100 dark:bg-gray-800/30',
      borderColor: 'border-gray-300 dark:border-gray-600',
      links: [
        {
          name: "Cricket Chatbots",
          url: "https://chatbots-cric-hor-frontend.vercel.app/",
          description: "Interactive cricket chatbots for enhanced user engagement and insights",
          color: "bg-cyan-600",
        },
        {
          name: "Chat Final",
          url: "https://chatfinalfrontend.vercel.app/",
          description: "Advanced chat interface with enhanced features and functionality",
          color: "bg-slate-600",
        },
      ]
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

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className={`border-2 rounded-xl overflow-hidden ${category.borderColor} ${category.color}`}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {category.title}
                  </h2>
                  <span className="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 py-1 rounded-full">
                    {category.links.length} {category.links.length === 1 ? 'platform' : 'platforms'}
                  </span>
                </div>
                <div className={`transform transition-transform duration-200 ${openCategories.includes(category.id) ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Category Content */}
              {openCategories.includes(category.id) && (
                <div className="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    {category.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center text-white font-bold text-sm`}>
                            {link.name.charAt(0)}
                          </div>
                          <h3 className="ml-3 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {link.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{link.description}</p>
                        <div className="flex justify-end">
                          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline">
                            Visit Site →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
