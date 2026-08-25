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
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      if (!rawHash) {
        setCurrentPage('home');
        setCurrentSlug(null);
        return;
      }

      // Handle query params in hash (e.g. team/past-committees?id=comm-exec-2025 or ?year=2025)
      const [hashPath, queryString] = rawHash.split('?');
      let queryParamSlug: string | null = null;
      if (queryString) {
        const searchParams = new URLSearchParams(queryString);
        queryParamSlug = searchParams.get('id') || searchParams.get('year') || searchParams.get('comm');
      }

      const parts = hashPath.split('/');
      if (parts.length === 1) {
        if (parts[0] === 'team') {
          setCurrentPage('team');
          setCurrentSlug(queryParamSlug);
        } else {
          setCurrentPage(parts[0] as PageRoute);
          setCurrentSlug(queryParamSlug);
        }
      } else if (parts.length >= 2) {
        const root = parts[0];
        const sub = parts[1];
        const extra = parts[2] || queryParamSlug;

        if (root === 'about') {
          if (sub === 'standing-committees' || sub === 'standing-committee') {
            setCurrentPage('about/standing-committees');
            setCurrentSlug(extra || null);
          } else if (sub === 'executive-committee') {
            setCurrentPage('about/executive-committee');
            setCurrentSlug(extra || null);
          } else if (sub === 'past-committees') {
            setCurrentPage('about/past-committees');
            setCurrentSlug(extra || null);
          } else {
            setCurrentPage(`about/${sub}` as PageRoute);
            setCurrentSlug(extra || null);
          }
        } else if (root === 'team') {
          if (sub === 'executive-committee') {
            setCurrentPage('about/executive-committee');
            setCurrentSlug(extra || null);
          } else if (sub === 'standing-committee' || sub === 'standing-committees') {
            setCurrentPage('about/standing-committees');
            setCurrentSlug(extra || null);
          } else if (sub === 'past-committees') {
            setCurrentPage('about/past-committees');
            setCurrentSlug(extra || null);
          } else {
            setCurrentPage('team');
            setCurrentSlug(extra || null);
          }
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
          setCurrentPage(hashPath as PageRoute);
          setCurrentSlug(extra || null);
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
    if (page === 'about/past-committees' && slug) hash = `team/past-committees?id=${slug}` as PageRoute;
    if (page === 'team/past-committees' && slug) hash = `team/past-committees?id=${slug}` as PageRoute;

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

export { Link, getHref } from '../components/Link';
export type { LinkProps } from '../components/Link';

