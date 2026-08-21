import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageRoute } from '../types';

interface RouterContextType {
  currentPage: PageRoute;
  currentSlug: string | null;
  navigate: (page: PageRoute, slug?: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync with URL hash or pathname for reload/back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash) {
        setCurrentPage('home');
        setCurrentSlug(null);
        return;
      }

      const parts = hash.split('/');
      if (parts.length === 1) {
        setCurrentPage(parts[0] as PageRoute);
        setCurrentSlug(null);
      } else if (parts.length >= 2) {
        const root = parts[0];
        const sub = parts[1];
        if (root === 'about') {
          setCurrentPage(`about/${sub}` as PageRoute);
          setCurrentSlug(null);
        } else if (root === 'campaigns') {
          setCurrentPage('campaigns/detail');
          setCurrentSlug(sub);
        } else if (root === 'programs') {
          setCurrentPage('programs/detail');
          setCurrentSlug(sub);
        } else if (root === 'stories') {
          setCurrentPage('stories/detail');
          setCurrentSlug(sub);
        } else if (root === 'news') {
          setCurrentPage('news/detail');
          setCurrentSlug(sub);
        } else if (root === 'events') {
          setCurrentPage('events/detail');
          setCurrentSlug(sub);
        } else {
          setCurrentPage(hash as PageRoute);
          setCurrentSlug(null);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: PageRoute, slug: string | null = null) => {
    setCurrentPage(page);
    setCurrentSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let hash = page;
    if (page === 'campaigns/detail' && slug) hash = `campaigns/${slug}` as PageRoute;
    if (page === 'programs/detail' && slug) hash = `programs/${slug}` as PageRoute;
    if (page === 'stories/detail' && slug) hash = `stories/${slug}` as PageRoute;
    if (page === 'news/detail' && slug) hash = `news/${slug}` as PageRoute;
    if (page === 'events/detail' && slug) hash = `events/${slug}` as PageRoute;

    window.location.hash = `/${hash === 'home' ? '' : hash}`;
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <RouterContext.Provider
      value={{
        currentPage,
        currentSlug,
        navigate,
        isSearchOpen,
        setIsSearchOpen
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
