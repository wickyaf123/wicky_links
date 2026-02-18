'use client';

import { useState, useEffect } from 'react';

interface Link {
  name: string;
  url: string;
  description: string;
  color: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  links: Link[];
}

export default function Home() {
  const [openCategories, setOpenCategories] = useState<string[]>(['main-links']);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingLinkIndex, setEditingLinkIndex] = useState<number>(-1);
  const [newLink, setNewLink] = useState<Link>({
    name: '',
    url: '',
    description: '',
    color: 'bg-purple-600'
  });
  const [editLink, setEditLink] = useState<Link>({
    name: '',
    url: '',
    description: '',
    color: 'bg-purple-600'
  });

  const initialCategories: Category[] = [
    {
      id: 'main-links',
      title: 'Main Links',
      icon: '⭐',
      links: [
        {
          name: "Wicky Main",
          url: "https://wicky-alpha.vercel.app/",
          description: "The main Wicky platform for sports betting and more",
          color: "bg-purple-600",
        },
        {
          name: "Chat Final",
          url: "https://chatfinalfrontend.vercel.app/",
          description: "Advanced chat interface with enhanced features and functionality",
          color: "bg-slate-600",
        },
        {
          name: "AI Insights Pro",
          url: "https://ai-insights-pro-frontend.vercel.app/",
          description: "Professional-grade AI insights platform with enhanced analytics capabilities",
          color: "bg-purple-600",
        },
        {
          name: "Content Generator",
          url: "https://content-generator-mvp.vercel.app/",
          description: "Advanced content generation platform for sports analytics and insights",
          color: "bg-teal-600",
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
          name: "NRL Supercoach Chat",
          url: "https://supercoach-frontend.vercel.app/",
          description: "NRL Supercoach chatbot for team and strategy insights",
          color: "bg-green-600",
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
          name: "Cricket AI Agents Project",
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
          name: "NRL Teams Tool Ben",
          url: "https://nrl-opposition-pointers.vercel.app/",
          description: "NRL teams opposition pointers and planning tool",
          color: "bg-green-600",
        },
        {
          name: "Gaurav Cricket Teams Project",
          url: "https://iploppositionpointsgit-mrmnvdru3prb5azsqkhndd.streamlit.app/",
          description: "Cricket teams analysis project by Gaurav",
          color: "bg-orange-600",
        },
        {
          name: "Tyson Cricket Teams Project",
          url: "https://ipl-opposition-planning-frontend.vercel.app/",
          description: "Cricket teams planning project by Tyson",
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
        {
          name: "New Wicky Website",
          url: "https://wicky-sphere-icons.vercel.app/",
          description: "Interactive sphere-based icon system and design resources",
          color: "bg-cyan-600",
        },
      ]
    },
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Load categories from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('wickyLinksCategories');
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error('Error loading saved categories:', error);
      }
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('wickyLinksCategories', JSON.stringify(categories));
    }
  }, [categories]);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const openAddLinkModal = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setNewLink({
      name: '',
      url: '',
      description: '',
      color: 'bg-purple-600'
    });
    setShowAddLinkModal(true);
  };

  const closeAddLinkModal = () => {
    setShowAddLinkModal(false);
    setSelectedCategory('');
    setNewLink({
      name: '',
      url: '',
      description: '',
      color: 'bg-purple-600'
    });
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newLink.name || !newLink.url) {
      alert('Please fill in at least the name and URL');
      return;
    }

    setCategories(prev => 
      prev.map(category => 
        category.id === selectedCategory
          ? { ...category, links: [...category.links, newLink] }
          : category
      )
    );

    closeAddLinkModal();
  };

  const handleDeleteLink = (categoryId: string, linkIndex: number) => {
    if (confirm('Are you sure you want to delete this link?')) {
      setCategories(prev =>
        prev.map(category =>
          category.id === categoryId
            ? { ...category, links: category.links.filter((_, index) => index !== linkIndex) }
            : category
        )
      );
    }
  };

  const openEditLinkModal = (categoryId: string, linkIndex: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.links[linkIndex]) {
      setSelectedCategory(categoryId);
      setEditingLinkIndex(linkIndex);
      setEditLink({ ...category.links[linkIndex] });
      setShowEditLinkModal(true);
    }
  };

  const closeEditLinkModal = () => {
    setShowEditLinkModal(false);
    setSelectedCategory('');
    setEditingLinkIndex(-1);
    setEditLink({
      name: '',
      url: '',
      description: '',
      color: 'bg-purple-600'
    });
  };

  const handleUpdateLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editLink.name || !editLink.url) {
      alert('Please fill in at least the name and URL');
      return;
    }

    setCategories(prev =>
      prev.map(category =>
        category.id === selectedCategory
          ? {
              ...category,
              links: category.links.map((link, index) =>
                index === editingLinkIndex ? editLink : link
              )
            }
          : category
      )
    );

    closeEditLinkModal();
  };

  const colorOptions = [
    { name: 'Purple', value: 'bg-purple-600' },
    { name: 'Blue', value: 'bg-blue-600' },
    { name: 'Green', value: 'bg-green-600' },
    { name: 'Red', value: 'bg-red-600' },
    { name: 'Orange', value: 'bg-orange-600' },
    { name: 'Yellow', value: 'bg-yellow-600' },
    { name: 'Pink', value: 'bg-pink-600' },
    { name: 'Teal', value: 'bg-teal-600' },
    { name: 'Cyan', value: 'bg-cyan-600' },
    { name: 'Indigo', value: 'bg-indigo-600' },
    { name: 'Slate', value: 'bg-slate-600' },
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
                  <div className="mb-4 flex justify-end">
                    <button
                      onClick={() => openAddLinkModal(category.id)}
                      className="px-4 py-2 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-300 ease-out transform hover:-translate-y-0.5 shadow-[0_0_10px_hsl(168,100%,45%,0.3)]"
                    >
                      + Add Link
                    </button>
                  </div>
                  {category.links.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {category.links.map((link, index) => (
                        <div
                          key={index}
                          className="relative group block p-4 bg-[hsl(216,28%,18%)] rounded-lg hover:bg-[hsl(216,28%,22%)] transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(168,100%,45%,0.2)] border border-[hsl(216,24%,25%)] hover:border-[hsl(168,100%,45%)]"
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              openEditLinkModal(category.id, index);
                            }}
                            className="absolute top-2 right-10 w-6 h-6 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs font-bold hover:bg-blue-700"
                            title="Edit link"
                          >
                            ✎
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteLink(category.id, index);
                            }}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs font-bold hover:bg-red-700"
                            title="Delete link"
                          >
                            ✕
                          </button>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
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
                        </div>
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

        {/* Add Link Modal */}
        {showAddLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[hsl(216,28%,18%)] rounded-xl shadow-2xl border-2 border-[hsl(168,100%,45%)] max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[hsl(168,100%,95%)]">
                    Add New Link
                  </h3>
                  <button
                    onClick={closeAddLinkModal}
                    className="w-8 h-8 bg-[hsl(216,32%,15%)] text-[hsl(168,30%,70%)] rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newLink.name}
                      onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors"
                      placeholder="e.g., My Platform"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors"
                      placeholder="https://example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Description
                    </label>
                    <textarea
                      value={newLink.description}
                      onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors resize-none"
                      placeholder="Brief description of the platform"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setNewLink({ ...newLink, color: color.value })}
                          className={`h-10 rounded-lg ${color.value} transition-all duration-200 ${
                            newLink.color === color.value
                              ? 'ring-4 ring-[hsl(168,100%,45%)] scale-105'
                              : 'hover:scale-105'
                          }`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeAddLinkModal}
                      className="flex-1 px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,30%,70%)] rounded-lg font-semibold hover:bg-[hsl(216,24%,25%)] transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-200 shadow-[0_0_15px_hsl(168,100%,45%,0.4)]"
                    >
                      Add Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Link Modal */}
        {showEditLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[hsl(216,28%,18%)] rounded-xl shadow-2xl border-2 border-[hsl(168,100%,45%)] max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[hsl(168,100%,95%)]">
                    Edit Link
                  </h3>
                  <button
                    onClick={closeEditLinkModal}
                    className="w-8 h-8 bg-[hsl(216,32%,15%)] text-[hsl(168,30%,70%)] rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUpdateLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={editLink.name}
                      onChange={(e) => setEditLink({ ...editLink, name: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors"
                      placeholder="e.g., My Platform"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={editLink.url}
                      onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors"
                      placeholder="https://example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Description
                    </label>
                    <textarea
                      value={editLink.description}
                      onChange={(e) => setEditLink({ ...editLink, description: e.target.value })}
                      className="w-full px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,100%,95%)] border border-[hsl(216,24%,25%)] rounded-lg focus:outline-none focus:border-[hsl(168,100%,45%)] transition-colors resize-none"
                      placeholder="Brief description of the platform"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[hsl(168,100%,95%)] mb-2">
                      Color
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setEditLink({ ...editLink, color: color.value })}
                          className={`h-10 rounded-lg ${color.value} transition-all duration-200 ${
                            editLink.color === color.value
                              ? 'ring-4 ring-[hsl(168,100%,45%)] scale-105'
                              : 'hover:scale-105'
                          }`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeEditLinkModal}
                      className="flex-1 px-4 py-2 bg-[hsl(216,32%,15%)] text-[hsl(168,30%,70%)] rounded-lg font-semibold hover:bg-[hsl(216,24%,25%)] transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-200 shadow-[0_0_15px_hsl(168,100%,45%,0.4)]"
                    >
                      Update Link
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-[hsl(168,30%,70%)] text-sm">
          <p>© {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
