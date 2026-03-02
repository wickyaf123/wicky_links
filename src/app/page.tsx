'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Link {
  id?: string;
  name: string;
  url: string;
  description: string;
  color: string;
  sort_order?: number;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  sort_order?: number;
  links: Link[];
}

export default function Home() {
  const [openCategories, setOpenCategories] = useState<string[]>(['main-links']);
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editingLink, setEditingLink] = useState<Link | null>(null);
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setError(null);

      // Fetch categories ordered by sort_order
      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (catError) throw catError;

      // Fetch all links ordered by sort_order
      const { data: linksData, error: linksError } = await supabase
        .from('links')
        .select('*')
        .order('sort_order', { ascending: true });

      if (linksError) throw linksError;

      // Combine categories with their links
      const combined: Category[] = (categoriesData || []).map((cat) => ({
        id: cat.id,
        title: cat.title,
        icon: cat.icon,
        sort_order: cat.sort_order,
        links: (linksData || [])
          .filter((link) => link.category_id === cat.id)
          .map((link) => ({
            id: link.id,
            name: link.name,
            url: link.url,
            description: link.description,
            color: link.color,
            sort_order: link.sort_order,
          })),
      }));

      setCategories(combined);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data from Supabase. Please ensure the database tables are set up.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLink.name || !newLink.url) {
      alert('Please fill in at least the name and URL');
      return;
    }

    // Get the current max sort_order for this category
    const category = categories.find(cat => cat.id === selectedCategory);
    const maxSortOrder = category
      ? Math.max(...category.links.map(l => l.sort_order || 0), -1)
      : 0;

    const { error: insertError } = await supabase
      .from('links')
      .insert({
        category_id: selectedCategory,
        name: newLink.name,
        url: newLink.url,
        description: newLink.description || '',
        color: newLink.color,
        sort_order: maxSortOrder + 1,
      });

    if (insertError) {
      console.error('Error adding link:', insertError);
      alert('Failed to add link. Please try again.');
      return;
    }

    await fetchCategories();
    closeAddLinkModal();
  };

  const handleDeleteLink = async (categoryId: string, link: Link) => {
    if (!link.id) return;

    if (confirm('Are you sure you want to delete this link?')) {
      const { error: deleteError } = await supabase
        .from('links')
        .delete()
        .eq('id', link.id);

      if (deleteError) {
        console.error('Error deleting link:', deleteError);
        alert('Failed to delete link. Please try again.');
        return;
      }

      // Optimistic update
      setCategories(prev =>
        prev.map(category =>
          category.id === categoryId
            ? { ...category, links: category.links.filter(l => l.id !== link.id) }
            : category
        )
      );
    }
  };

  const openEditLinkModal = (categoryId: string, link: Link) => {
    setSelectedCategory(categoryId);
    setEditingLink(link);
    setEditLink({ ...link });
    setShowEditLinkModal(true);
  };

  const closeEditLinkModal = () => {
    setShowEditLinkModal(false);
    setSelectedCategory('');
    setEditingLink(null);
    setEditLink({
      name: '',
      url: '',
      description: '',
      color: 'bg-purple-600'
    });
  };

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editLink.name || !editLink.url || !editingLink?.id) {
      alert('Please fill in at least the name and URL');
      return;
    }

    const { error: updateError } = await supabase
      .from('links')
      .update({
        name: editLink.name,
        url: editLink.url,
        description: editLink.description,
        color: editLink.color,
      })
      .eq('id', editingLink.id);

    if (updateError) {
      console.error('Error updating link:', updateError);
      alert('Failed to update link. Please try again.');
      return;
    }

    await fetchCategories();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(216,32%,15%)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[hsl(168,100%,45%)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[hsl(168,30%,70%)] text-lg">Loading Wicky Links...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[hsl(216,32%,15%)] flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-[hsl(216,28%,18%)] rounded-xl border-2 border-red-500/50 p-8 text-center">
          <h1 className="text-2xl font-bold text-[hsl(168,100%,95%)] mb-4">Database Setup Required</h1>
          <p className="text-[hsl(168,30%,70%)] mb-6">{error}</p>
          <div className="bg-[hsl(216,32%,15%)] rounded-lg p-4 text-left mb-6">
            <p className="text-sm text-[hsl(168,100%,95%)] font-semibold mb-2">To set up the database:</p>
            <ol className="text-sm text-[hsl(168,30%,70%)] space-y-2 list-decimal list-inside">
              <li>Go to the <a href="https://supabase.com/dashboard/project/ljsiggrlbklujknqglwm/sql" target="_blank" rel="noopener noreferrer" className="text-[hsl(168,100%,45%)] underline">Supabase SQL Editor</a></li>
              <li>Visit <code className="bg-[hsl(216,24%,25%)] px-1 rounded">/api/setup</code> to get the migration SQL</li>
              <li>Copy and run the SQL in the editor</li>
              <li>Refresh this page</li>
            </ol>
          </div>
          <button
            onClick={() => { setLoading(true); setError(null); fetchCategories(); }}
            className="px-6 py-3 bg-[hsl(168,100%,45%)] text-[hsl(216,32%,15%)] rounded-lg font-semibold hover:bg-[hsl(168,100%,55%)] transition-all duration-300"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

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
                      {category.links.map((link) => (
                        <div
                          key={link.id}
                          className="relative group block p-4 bg-[hsl(216,28%,18%)] rounded-lg hover:bg-[hsl(216,28%,22%)] transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_0_20px_hsl(168,100%,45%,0.2)] border border-[hsl(216,24%,25%)] hover:border-[hsl(168,100%,45%)]"
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              openEditLinkModal(category.id, link);
                            }}
                            className="absolute top-2 right-10 w-6 h-6 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs font-bold hover:bg-blue-700"
                            title="Edit link"
                          >
                            ✎
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteLink(category.id, link);
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
          <p>&copy; {new Date().getFullYear()} Wicky Links. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
