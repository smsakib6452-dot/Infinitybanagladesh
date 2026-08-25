import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AdminErrorBoundary } from './components/AdminErrorBoundary';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamOverviewPage } from './pages/TeamOverviewPage';
import { ExecutiveCommitteePage } from './pages/ExecutiveCommitteePage';
import { StandingCommitteesPage } from './pages/StandingCommitteesPage';
import { PastCommitteesPage } from './pages/PastCommitteesPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { CampaignsPage } from './pages/CampaignsPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { ImpactPage, StoryDetailPage } from './pages/ImpactPage';
import { StoriesPage } from './pages/StoriesPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { DonatePage } from './pages/DonatePage';
import { TransparencyPage } from './pages/TransparencyPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { MediaCoveragePage } from './pages/MediaCoveragePage';
import { PartnersPage } from './pages/PartnersPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NewsPage, NewsDetailPage } from './pages/NewsPage';
import { EventsPage, EventDetailPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { currentPage } = useRouter();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
      case 'about/story':
        return <AboutPage initialTab="overview" />;
      case 'about/mission-vision':
        return <AboutPage initialTab="mission-vision" />;
      case 'about/team':
        return <AboutPage initialTab="team" />;
      case 'team':
        return <TeamOverviewPage />;
      case 'team/executive-committee':
      case 'about/executive-committee':
        return <ExecutiveCommitteePage />;
      case 'team/standing-committee':
      case 'about/standing-committees':
        return <StandingCommitteesPage />;
      case 'team/past-committees':
      case 'about/past-committees':
        return <PastCommitteesPage />;
      case 'programs':
        return <ProgramsPage />;
      case 'programs/detail':
        return <ProgramDetailPage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'campaigns/detail':
        return <CampaignDetailPage />;
      case 'impact':
        return <ImpactPage />;
      case 'stories':
        return <StoriesPage />;
      case 'stories/detail':
        return <StoryDetailPage />;
      case 'volunteer':
        return <VolunteerPage />;
      case 'donate':
        return <DonatePage />;
      case 'transparency':
      case 'reports':
        return <TransparencyPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'videos':
        return <VideosPage />;
      case 'media-coverage':
        return <MediaCoveragePage />;
      case 'partners':
        return <PartnersPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'news':
        return <NewsPage />;
      case 'news/detail':
        return <NewsDetailPage />;
      case 'events':
        return <EventsPage />;
      case 'events/detail':
        return <EventDetailPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'admin':
        return <AdminPage />;
      case '404':
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-700 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        <AdminErrorBoundary fallbackTitle="Page Load Notice">
          {renderPage()}
        </AdminErrorBoundary>
      </main>

      {/* Global Footer (shown on all pages for consistency) */}
      <Footer />

      {/* Global Search Lightbox Modal */}
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </DataProvider>
    </LanguageProvider>
  );
}
