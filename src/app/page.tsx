'use client';

import { useState } from 'react';

export default function Home() {
  const [openCategories, setOpenCategories] = useState<string[]>(['wicky-website']);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categories = [
    {
      id: 'wicky-website',
      title: 'Wicky Website',
      icon: '🌐',
      links: [
        {
          name: "Wicky Sphere Icons",
          url: "https://wicky-sphere-icons.lovable.app/",
          description: "Official Wicky website with interactive sphere-based design",
          color: "bg-purple-600",
        },
      ]
    },
    {
      id: 'chatbots',
      title: 'Chatbots',
      icon: '🤖',
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
    {
      id: 'live',
      title: 'Live',
      icon: '📺',
      links: [
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
      ]
    },
    {
      id: 'ai-insights',
      title: 'AI Insights',
      icon: '🧠',
      links: [
        {
          name: "AI Insights",
          url: "https://ai-insights-mu.vercel.app/",
          description: "Advanced AI-powered insights and analytics for sports data",
          color: "bg-teal-600",
        },
        {
          name: "AI Insights Pro",
          url: "https://ai-insights-pro-frontend.vercel.app/",
          description: "Professional-grade AI insights platform with enhanced analytics capabilities",
          color: "bg-purple-600",
        },
        {
          name: "IPL AI Agents",
          url: "https://iplaapaiagents-mjt4txdrqjc8aha3wabvkh.streamlit.app/",
          description: "IPL-focused AI agents for advanced cricket analytics and insights",
          color: "bg-indigo-600",
        },
      ]
    },
    {
      id: 'multi-builder',
      title: 'Multi Builder',
      icon: '🔧',
      links: []
    },
    {
      id: 'byob',
      title: 'BYOB (Build Your Own Bet)',
      icon: '🎯',
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
      id: 'content-generator',
      title: 'Content Generator',
      icon: '✍️',
      links: [
        {
          name: "Content Generator",
          url: "https://content-generator-mvp.vercel.app/",
          description: "Advanced content generation platform for sports analytics and insights",
          color: "bg-purple-600",
        },
      ]
    },
    {
      id: 'teams',
      title: 'Teams',
      icon: '👥',
      links: [
        {
          name: "IPL Opposition Planning",
          url: "https://ipl-opposition-planning-frontend.vercel.app/",
          description: "IPL opposition planning and strategic analysis tool",
          color: "bg-orange-600",
        },
        {
          name: "IPL Platform",
          url: "https://ipl-040725-frontend.vercel.app/",
          description: "IPL cricket platform with enhanced features and insights",
          color: "bg-indigo-600",
        },
      ]
    },
    {
      id: 'miscellaneous',
      title: 'Miscellaneous',
      icon: '📦',
      links: [
        {
          name: "Wicky Main",
          url: "https://wicky-alpha.vercel.app/",
          description: "The main Wicky platform for sports betting and more",
          color: "bg-purple-600",
        },
        {
          name: "Cricket Insights Pro",
          url: "https://insights-frontend-1.vercel.app/",
          description: "AI-Powered Match Analytics & Strategy with 6 AI Agents for cricket",
          color: "bg-teal-600",
        },
        {
          name: "Fantasy Team Builder",
          url: "https://ipl-fantsay1004-git-main-mayurs-projects-b6048be7.vercel.app/",
          description: "AI-Powered Fantasy Team Builder for cricket matches",
          color: "bg-yellow-600",
        },
        {
          name: "BBL AI Batting",
          url: "https://bbl-ai-batting-frontend.vercel.app/",
          description: "BBL batting analytics with AI-powered insights and statistics",
          color: "bg-pink-600",
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(216,32%,15%)] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(168,100%,95%)]">
            Wicky Links
          </h1>
          <p className="text-lg text-[hsl(168,30%,70%)]">
            Your gateway to various Wicky products and platforms
          </p>
        </header>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="border-2 border-[hsl(216,24%,25%)] bg-[hsl(216,28%,18%)] rounded-xl overflow-hidden shadow-lg">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-[hsl(216,28%,22%)] transition-all duration-300 ease-out"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-semibold text-[hsl(168,100%,95%)]">
                    {category.title}
                  </h2>
                  <span className="text-sm text-[hsl(168,30%,70%)] bg-[hsl(216,32%,15%)] px-2 py-1 rounded-full border border-[hsl(216,24%,25%)]">
                    {category.links.length} {category.links.length === 1 ? 'platform' : 'platforms'}
                  </span>
                </div>
                <div className={`transform transition-transform duration-200 ${openCategories.includes(category.id) ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-[hsl(168,30%,70%)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Category Content */}
              {openCategories.includes(category.id) && (
                <div className="border-t border-[hsl(216,24%,25%)] bg-[hsl(216,32%,15%)] p-6">
                  {category.links.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-4 bg-[hsl(216,28%,18%)] rounded-lg hover:bg-[hsl(216,28%,22%)] transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(168,100%,45%,0.2)] border border-[hsl(216,24%,25%)] hover:border-[hsl(168,100%,45%)]"
                        >
                          <div className="flex items-center mb-3">
                            <div className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_hsl(168,100%,45%,0.3)]`}>
                              {link.name.charAt(0)}
                            </div>
                            <h3 className="ml-3 text-lg font-semibold text-[hsl(168,100%,95%)] group-hover:text-[hsl(168,100%,45%)] transition-colors duration-300">
                              {link.name}
                            </h3>
                          </div>
                          <p className="text-sm text-[hsl(168,30%,70%)] mb-3">{link.description}</p>
                          <div className="flex justify-end">
                            <span className="text-[hsl(168,100%,45%)] font-medium text-sm group-hover:underline">
                              Visit Site →
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-[hsl(168,30%,70%)] text-sm">
                        No platforms available in this category yet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-[hsl(168,30%,70%)] text-sm">
          <p>© {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
