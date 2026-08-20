import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Campaign,
  Program,
  ImpactMetric,
  ImpactStory,
  NewsArticle,
  EventItem,
  GalleryPhoto,
  VideoItem,
  TransparencyReport,
  Partner,
  VolunteerApplication,
  DonationRecord,
  ContactMessage,
  SiteSettings,
  AuditLog,
  Committee,
  Person,
  Position,
  CommitteeMember
} from '../types';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_PROGRAMS,
  INITIAL_IMPACT_METRICS,
  INITIAL_IMPACT_STORIES,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_VIDEOS,
  INITIAL_REPORTS,
  INITIAL_PARTNERS,
  INITIAL_SITE_SETTINGS,
  INITIAL_VOLUNTEER_APPLICATIONS,
  INITIAL_DONATIONS,
  INITIAL_POSITIONS,
  INITIAL_COMMITTEES,
  INITIAL_PERSONS,
  INITIAL_COMMITTEE_MEMBERS
} from '../data/initialData';

interface DataContextType {
  // Entities
  campaigns: Campaign[];
  programs: Program[];
  metrics: ImpactMetric[];
  stories: ImpactStory[];
  news: NewsArticle[];
  events: EventItem[];
  gallery: GalleryPhoto[];
  videos: VideoItem[];
  reports: TransparencyReport[];
  partners: Partner[];
  volunteers: VolunteerApplication[];
  donations: DonationRecord[];
  messages: ContactMessage[];
  settings: SiteSettings;
  auditLogs: AuditLog[];
  committees: Committee[];
  persons: Person[];
  positions: Position[];
  committeeMembers: CommitteeMember[];

  // Mutations
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  addProgram: (program: Omit<Program, 'id'>) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  updateMetric: (id: string, metric: Partial<ImpactMetric>) => void;

  addStory: (story: Omit<ImpactStory, 'id'>) => void;
  updateStory: (id: string, story: Partial<ImpactStory>) => void;
  deleteStory: (id: string) => void;

  addNews: (newsItem: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, newsItem: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  addEvent: (eventItem: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, eventItem: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;

  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  deleteVideo: (id: string) => void;

  addReport: (report: Omit<TransparencyReport, 'id'>) => void;
  updateReport: (id: string, report: Partial<TransparencyReport>) => void;
  deleteReport: (id: string) => void;

  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  submitVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => string;
  addVolunteerApplication: (app: Partial<VolunteerApplication>) => string;
  updateVolunteerStatus: (id: string, status: VolunteerApplication['status'], adminNotes?: string) => void;
  deleteVolunteerApplication: (id: string) => void;

  submitDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'status'>) => string;
  addDonationRecord: (donation: Partial<DonationRecord>) => DonationRecord;
  updateDonationStatus: (id: string, status: DonationRecord['status']) => void;

  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContactMessage: (id: string) => void;

  // Committee & Leadership Mutations
  addCommittee: (committee: Omit<Committee, 'id'>) => void;
  updateCommittee: (id: string, committee: Partial<Committee>) => void;
  deleteCommittee: (id: string) => void;
  archiveCommittee: (id: string) => void;
  setActiveCommittee: (id: string) => void;

  addPerson: (person: Omit<Person, 'id'>) => void;
  updatePerson: (id: string, person: Partial<Person>) => void;
  deletePerson: (id: string) => void;

  addPosition: (pos: Omit<Position, 'id'>) => void;
  updatePosition: (id: string, pos: Partial<Position>) => void;
  deletePosition: (id: string) => void;

  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => void;
  updateCommitteeMember: (id: string, member: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;
  reorderCommitteeMembers: (committeeId: string, orderedMemberIds: string[]) => void;
  getMembersWithDetails: (committeeId?: string) => (CommitteeMember & { person: Person; position: Position; committee?: Committee })[];

  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefaultData: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_PREFIX = 'infinity_bd_';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}campaigns`);
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}programs`);
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
  });

  const [metrics, setMetrics] = useState<ImpactMetric[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}metrics`);
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_METRICS;
  });

  const [stories, setStories] = useState<ImpactStory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}stories`);
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_STORIES;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}news`);
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}events`);
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}gallery`);
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}videos`);
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [reports, setReports] = useState<TransparencyReport[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}reports`);
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}partners`);
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}volunteers`);
    const parsed: VolunteerApplication[] = saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_APPLICATIONS;
    return (parsed || []).map(v => ({
      ...v,
      interests: v.interests || v.areasOfInterest || [],
      areasOfInterest: v.areasOfInterest || v.interests || [],
      appliedAt: v.appliedAt || v.submittedAt || '',
      submittedAt: v.submittedAt || v.appliedAt || ''
    }));
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}donations`);
    const parsed: DonationRecord[] = saved ? JSON.parse(saved) : INITIAL_DONATIONS;
    return (parsed || []).map(d => {
      const val = typeof d.amount === 'number' ? d.amount : typeof d.amountBDT === 'number' ? d.amountBDT : 0;
      const rec = d.receiptNumber || `REC-${d.id}`;
      const dt = d.date || d.donatedAt || '';
      return {
        ...d,
        amount: val,
        amountBDT: val,
        receiptNumber: rec,
        date: dt,
        donatedAt: dt
      };
    });
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}messages`);
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}settings`);
    return saved ? JSON.parse(saved) : INITIAL_SITE_SETTINGS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}auditLogs`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'log-1',
        user: 'System Admin',
        action: 'System Initialized',
        entity: 'System',
        entityId: 'ROOT',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        details: 'Initial verified system data initialized with strict compliance to organizational facts.'
      }
    ];
  });

  const [committees, setCommittees] = useState<Committee[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}committees`);
    const list: Committee[] = saved ? JSON.parse(saved) : INITIAL_COMMITTEES;
    const initialMap = new Map(INITIAL_COMMITTEES.map(c => [c.id, c]));
    return list.map(c => {
      const init = initialMap.get(c.id);
      return init ? { ...init, ...c } : c;
    }).concat(
      INITIAL_COMMITTEES.filter(c => !list.some(existing => existing.id === c.id))
    );
  });

  const [persons, setPersons] = useState<Person[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}persons`);
    const list: Person[] = saved ? JSON.parse(saved) : INITIAL_PERSONS;
    const initialMap = new Map<string, Person>(INITIAL_PERSONS.map(p => [p.id, p]));
    const merged: Person[] = list.map((p): Person => {
      const init = initialMap.get(p.id);
      return {
        ...p,
        photoUrl: p.photoUrl || init?.photoUrl || '',
        banglaName: p.banglaName || init?.banglaName || p.fullName,
        fullName: p.fullName || init?.fullName || ''
      };
    });
    const missing = INITIAL_PERSONS.filter(p => !list.some(existing => existing.id === p.id));
    return [...merged, ...missing];
  });

  const [positions, setPositions] = useState<Position[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}positions`);
    const list: Position[] = saved ? JSON.parse(saved) : INITIAL_POSITIONS;
    return list.concat(
      INITIAL_POSITIONS.filter(pos => !list.some(existing => existing.id === pos.id))
    );
  });

  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}committeeMembers`);
    const list: CommitteeMember[] = saved ? JSON.parse(saved) : INITIAL_COMMITTEE_MEMBERS;
    return list.concat(
      INITIAL_COMMITTEE_MEMBERS.filter(cm => !list.some(existing => existing.id === cm.id))
    );
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}campaigns`, JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}programs`, JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}metrics`, JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}stories`, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}news`, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}events`, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}reports`, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}partners`, JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}volunteers`, JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}donations`, JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}messages`, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}auditLogs`, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}committees`, JSON.stringify(committees));
  }, [committees]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}persons`, JSON.stringify(persons));
  }, [persons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}positions`, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}committeeMembers`, JSON.stringify(committeeMembers));
  }, [committeeMembers]);

  const addAudit = (action: string, entity: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: 'Administrator',
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  // Campaigns
  const addCampaign = (item: Omit<Campaign, 'id'>) => {
    const newItem: Campaign = { ...item, id: `camp-${Date.now()}` };
    setCampaigns(prev => [newItem, ...prev]);
    addAudit('Campaign Created', 'Campaign', newItem.id, `Created campaign "${item.title.en}"`);
  };

  const updateCampaign = (id: string, updated: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    addAudit('Campaign Updated', 'Campaign', id, `Updated campaign details`);
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    addAudit('Campaign Deleted', 'Campaign', id, `Deleted campaign ID ${id}`);
  };

  // Programs
  const addProgram = (item: Omit<Program, 'id'>) => {
    const newItem: Program = { ...item, id: `prog-${Date.now()}` };
    setPrograms(prev => [...prev, newItem]);
    addAudit('Program Created', 'Program', newItem.id, `Created program "${item.title.en}"`);
  };

  const updateProgram = (id: string, updated: Partial<Program>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    addAudit('Program Updated', 'Program', id, `Updated program details`);
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    addAudit('Program Deleted', 'Program', id, `Deleted program ID ${id}`);
  };

  // Metrics
  const updateMetric = (id: string, updated: Partial<ImpactMetric>) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    addAudit('Metric Updated', 'ImpactMetric', id, `Updated metric values`);
  };

  // Stories
  const addStory = (item: Omit<ImpactStory, 'id'>) => {
    const newItem: ImpactStory = { ...item, id: `story-${Date.now()}` };
    setStories(prev => [newItem, ...prev]);
    addAudit('Story Created', 'ImpactStory', newItem.id, `Created impact story`);
  };

  const updateStory = (id: string, updated: Partial<ImpactStory>) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    addAudit('Story Updated', 'ImpactStory', id, `Updated story details`);
  };

  const deleteStory = (id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
    addAudit('Story Deleted', 'ImpactStory', id, `Deleted story ID ${id}`);
  };

  // News
  const addNews = (item: Omit<NewsArticle, 'id'>) => {
    const newItem: NewsArticle = { ...item, id: `news-${Date.now()}` };
    setNews(prev => [newItem, ...prev]);
    addAudit('News Published', 'NewsArticle', newItem.id, `Created news article "${item.title.en}"`);
  };

  const updateNews = (id: string, updated: Partial<NewsArticle>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
    addAudit('News Updated', 'NewsArticle', id, `Updated news article`);
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    addAudit('News Deleted', 'NewsArticle', id, `Deleted news article ID ${id}`);
  };

  // Events
  const addEvent = (item: Omit<EventItem, 'id'>) => {
    const newItem: EventItem = { ...item, id: `event-${Date.now()}` };
    setEvents(prev => [newItem, ...prev]);
    addAudit('Event Created', 'EventItem', newItem.id, `Created event "${item.title.en}"`);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
    addAudit('Event Updated', 'EventItem', id, `Updated event details`);
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    addAudit('Event Deleted', 'EventItem', id, `Deleted event ID ${id}`);
  };

  // Gallery
  const addGalleryPhoto = (item: Omit<GalleryPhoto, 'id'>) => {
    const newItem: GalleryPhoto = { ...item, id: `gal-${Date.now()}` };
    setGallery(prev => [newItem, ...prev]);
    addAudit('Photo Added', 'GalleryPhoto', newItem.id, `Added photo to gallery`);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    addAudit('Photo Deleted', 'GalleryPhoto', id, `Deleted gallery photo`);
  };

  // Videos
  const addVideo = (item: Omit<VideoItem, 'id'>) => {
    const newItem: VideoItem = { ...item, id: `vid-${Date.now()}` };
    setVideos(prev => [newItem, ...prev]);
    addAudit('Video Added', 'VideoItem', newItem.id, `Added video item`);
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    addAudit('Video Deleted', 'VideoItem', id, `Deleted video item`);
  };

  // Reports
  const addReport = (item: Omit<TransparencyReport, 'id'>) => {
    const newItem: TransparencyReport = { ...item, id: `rep-${Date.now()}` };
    setReports(prev => [newItem, ...prev]);
    addAudit('Report Uploaded', 'TransparencyReport', newItem.id, `Uploaded report "${item.title.en}"`);
  };

  const updateReport = (id: string, updated: Partial<TransparencyReport>) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
    addAudit('Report Updated', 'TransparencyReport', id, `Updated report metadata`);
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    addAudit('Report Deleted', 'TransparencyReport', id, `Deleted report ID ${id}`);
  };

  // Partners
  const addPartner = (item: Omit<Partner, 'id'>) => {
    const newItem: Partner = { ...item, id: `part-${Date.now()}` };
    setPartners(prev => [...prev, newItem]);
    addAudit('Partner Added', 'Partner', newItem.id, `Added partner "${item.name}"`);
  };

  const updatePartner = (id: string, updated: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    addAudit('Partner Updated', 'Partner', id, `Updated partner details`);
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    addAudit('Partner Deleted', 'Partner', id, `Deleted partner ID ${id}`);
  };

  // Volunteer
  const submitVolunteerApplication = (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'> | Partial<VolunteerApplication>): string => {
    const newId = `vol-${Date.now()}`;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newApp: VolunteerApplication = {
      fullName: app.fullName || 'Anonymous Volunteer',
      email: app.email || '',
      phone: app.phone || '',
      district: app.district || 'Dhaka',
      upazila: app.upazila || '',
      age: app.age || 22,
      occupation: app.occupation || '',
      bloodGroup: app.bloodGroup || 'B+',
      skills: app.skills || [],
      areasOfInterest: app.areasOfInterest || app.interests || ['General Community Support'],
      interests: app.interests || app.areasOfInterest || ['General Community Support'],
      motivation: app.motivation || '',
      previousExperience: app.previousExperience || '',
      availability: app.availability || 'Weekends',
      message: app.message || app.motivation || '',
      consent: app.consent ?? true,
      agreedCodeOfConduct: app.agreedCodeOfConduct ?? true,
      id: newId,
      submittedAt: dateStr,
      appliedAt: dateStr,
      status: 'New'
    };
    setVolunteers(prev => [newApp, ...prev]);
    addAudit('Volunteer Application Received', 'VolunteerApplication', newId, `Application submitted by ${newApp.fullName} (${newApp.district})`);
    return newId;
  };

  const addVolunteerApplication = (app: Partial<VolunteerApplication>): string => {
    return submitVolunteerApplication(app);
  };

  const updateVolunteerStatus = (id: string, status: VolunteerApplication['status'], adminNotes?: string) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status, adminNotes: adminNotes ?? v.adminNotes } : v));
    addAudit('Volunteer Status Changed', 'VolunteerApplication', id, `Status updated to ${status}`);
  };

  const deleteVolunteerApplication = (id: string) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
    addAudit('Volunteer Deleted', 'VolunteerApplication', id, `Deleted application ID ${id}`);
  };

  // Donation
  const addDonationRecord = (donation: Partial<DonationRecord>): DonationRecord => {
    const newId = `don-${Date.now()}`;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const val = typeof donation.amount === 'number' ? donation.amount : typeof donation.amountBDT === 'number' ? donation.amountBDT : 0;
    const recNumber = donation.receiptNumber || `REC-${Date.now().toString().slice(-6)}`;

    const newRecord: DonationRecord = {
      id: newId,
      receiptNumber: recNumber,
      donorName: donation.donorName || (donation.isAnonymous ? 'Anonymous Supporter' : 'Kind Donor'),
      donorEmail: donation.donorEmail || '',
      donorPhone: donation.donorPhone || '',
      amount: val,
      amountBDT: val,
      currency: donation.currency || 'BDT',
      campaignSlug: donation.campaignSlug,
      campaignTitle: donation.campaignTitle || 'General Humanitarian Fund',
      donationType: donation.donationType || 'campaign-specific',
      paymentMethod: donation.paymentMethod || 'bKash',
      transactionId: donation.transactionId || `TRX${Date.now().toString().slice(-8)}`,
      date: dateStr,
      donatedAt: dateStr,
      status: (donation.status as any) || 'Successful',
      isAnonymous: donation.isAnonymous ?? false,
      notes: donation.notes || donation.note,
      note: donation.note || donation.notes
    };
    setDonations(prev => [newRecord, ...prev]);
    addAudit('Donation Recorded', 'DonationRecord', newId, `Donation of ${val} BDT recorded via ${newRecord.paymentMethod} (${newRecord.transactionId})`);
    return newRecord;
  };

  const submitDonation = (donation: Omit<DonationRecord, 'id' | 'date' | 'status'> | Partial<DonationRecord>): string => {
    const rec = addDonationRecord(donation);
    return rec.id;
  };

  const updateDonationStatus = (id: string, status: DonationRecord['status']) => {
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    addAudit('Donation Status Updated', 'DonationRecord', id, `Status changed to ${status}`);
  };

  // Contact
  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => {
    const newId = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id: newId,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    addAudit('Contact Message Received', 'ContactMessage', newId, `Message from ${msg.name} regarding "${msg.subject}"`);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteContactMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addAudit('Site Settings Updated', 'SiteSettings', 'GLOBAL', `Updated global site settings`);
  };

  // Committees & Leadership Operations
  const addCommittee = (item: Omit<Committee, 'id'>) => {
    const newItem: Committee = { ...item, id: `comm-${Date.now()}` };
    setCommittees(prev => [...prev, newItem]);
    addAudit('Committee Created', 'Committee', newItem.id, `Created committee "${item.name.en}"`);
  };

  const updateCommittee = (id: string, updated: Partial<Committee>) => {
    setCommittees(prev => prev.map(c => (c.id === id ? { ...c, ...updated, updatedAt: new Date().toISOString() } : c)));
    addAudit('Committee Updated', 'Committee', id, `Updated committee ID ${id}`);
  };

  const deleteCommittee = (id: string) => {
    setCommittees(prev => prev.filter(c => c.id !== id));
    setCommitteeMembers(prev => prev.filter(cm => cm.committeeId !== id));
    addAudit('Committee Deleted', 'Committee', id, `Deleted committee ID ${id}`);
  };

  const archiveCommittee = (id: string) => {
    setCommittees(prev => prev.map(c => (c.id === id ? { ...c, status: 'ARCHIVED' } : c)));
    addAudit('Committee Archived', 'Committee', id, `Archived committee ID ${id}`);
  };

  const setActiveCommittee = (id: string) => {
    setCommittees(prev => prev.map(c => {
      if (c.type === 'EXECUTIVE') {
        return c.id === id ? { ...c, status: 'ACTIVE' } : { ...c, status: 'ARCHIVED' };
      }
      return c;
    }));
    addAudit('Active Committee Switched', 'Committee', id, `Activated committee ID ${id}`);
  };

  // Persons
  const addPerson = (item: Omit<Person, 'id'>) => {
    const newItem: Person = { ...item, id: `person-${Date.now()}` };
    setPersons(prev => [...prev, newItem]);
    addAudit('Person Added', 'Person', newItem.id, `Added person "${item.fullName}"`);
  };

  const updatePerson = (id: string, updated: Partial<Person>) => {
    setPersons(prev => prev.map(p => (p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p)));
    addAudit('Person Updated', 'Person', id, `Updated person ID ${id}`);
  };

  const deletePerson = (id: string) => {
    setPersons(prev => prev.filter(p => p.id !== id));
    setCommitteeMembers(prev => prev.filter(cm => cm.personId !== id));
    addAudit('Person Deleted', 'Person', id, `Deleted person ID ${id}`);
  };

  // Positions
  const addPosition = (item: Omit<Position, 'id'>) => {
    const newItem: Position = { ...item, id: `pos-${Date.now()}` };
    setPositions(prev => [...prev, newItem]);
    addAudit('Position Created', 'Position', newItem.id, `Created position "${item.name.en}"`);
  };

  const updatePosition = (id: string, updated: Partial<Position>) => {
    setPositions(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    addAudit('Position Updated', 'Position', id, `Updated position ID ${id}`);
  };

  const deletePosition = (id: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
    addAudit('Position Deleted', 'Position', id, `Deleted position ID ${id}`);
  };

  // Committee Members
  const addCommitteeMember = (item: Omit<CommitteeMember, 'id'>) => {
    const newItem: CommitteeMember = { ...item, id: `cm-${Date.now()}` };
    setCommitteeMembers(prev => [...prev, newItem]);
    addAudit('Committee Member Added', 'CommitteeMember', newItem.id, `Added member to committee ${item.committeeId}`);
  };

  const updateCommitteeMember = (id: string, updated: Partial<CommitteeMember>) => {
    setCommitteeMembers(prev => prev.map(cm => (cm.id === id ? { ...cm, ...updated } : cm)));
    addAudit('Committee Member Updated', 'CommitteeMember', id, `Updated committee member ID ${id}`);
  };

  const deleteCommitteeMember = (id: string) => {
    setCommitteeMembers(prev => prev.filter(cm => cm.id !== id));
    addAudit('Committee Member Deleted', 'CommitteeMember', id, `Removed committee member ID ${id}`);
  };

  const reorderCommitteeMembers = (committeeId: string, orderedMemberIds: string[]) => {
    setCommitteeMembers(prev => {
      const otherMembers = prev.filter(cm => cm.committeeId !== committeeId);
      const committeeMembersMap = new Map<string, CommitteeMember>(
        prev.filter(cm => cm.committeeId === committeeId).map(m => [m.id, m])
      );
      
      const reordered: CommitteeMember[] = [];
      orderedMemberIds.forEach((id, index) => {
        const member = committeeMembersMap.get(id);
        if (member) {
          reordered.push({
            ...member,
            sortOrder: index + 1,
            serialNumber: index + 1
          });
        }
      });

      return [...otherMembers, ...reordered];
    });
    addAudit('Committee Members Reordered', 'CommitteeMember', committeeId, `Reordered ${orderedMemberIds.length} members`);
  };

  const getMembersWithDetails = (committeeId?: string) => {
    const targetMembers = committeeId 
      ? committeeMembers.filter(cm => cm.committeeId === committeeId)
      : committeeMembers;

    return targetMembers
      .map(cm => {
        const person = persons.find(p => p.id === cm.personId) || {
          id: cm.personId,
          fullName: 'Member',
          banglaName: 'সদস্য',
          englishName: 'Member',
          active: true
        };
        const position = positions.find(pos => pos.id === cm.positionId) || {
          id: cm.positionId,
          name: { en: 'Executive Member', bn: 'কার্যনির্বাহী সদস্য' },
          level: 5,
          sortOrder: 99
        };
        const committee = committees.find(c => c.id === cm.committeeId);

        return {
          ...cm,
          person,
          position,
          committee
        };
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const resetToDefaultData = () => {
    setCampaigns(INITIAL_CAMPAIGNS);
    setPrograms(INITIAL_PROGRAMS);
    setMetrics(INITIAL_IMPACT_METRICS);
    setStories(INITIAL_IMPACT_STORIES);
    setNews(INITIAL_NEWS);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    setVideos(INITIAL_VIDEOS);
    setReports(INITIAL_REPORTS);
    setPartners(INITIAL_PARTNERS);
    setVolunteers(INITIAL_VOLUNTEER_APPLICATIONS);
    setDonations(INITIAL_DONATIONS);
    setMessages([]);
    setSettings(INITIAL_SITE_SETTINGS);
    setPositions(INITIAL_POSITIONS);
    setCommittees(INITIAL_COMMITTEES);
    setPersons(INITIAL_PERSONS);
    setCommitteeMembers(INITIAL_COMMITTEE_MEMBERS);
    addAudit('System Reset', 'Database', 'ALL', 'Reset all collections to verified initial state');
  };

  const exportDatabaseJSON = () => {
    const snapshot = {
      campaigns,
      programs,
      metrics,
      stories,
      news,
      events,
      gallery,
      videos,
      reports,
      partners,
      volunteers,
      donations,
      messages,
      settings,
      auditLogs,
      committees,
      persons,
      positions,
      committeeMembers,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(snapshot, null, 2);
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.campaigns) setCampaigns(data.campaigns);
      if (data.programs) setPrograms(data.programs);
      if (data.metrics) setMetrics(data.metrics);
      if (data.stories) setStories(data.stories);
      if (data.news) setNews(data.news);
      if (data.events) setEvents(data.events);
      if (data.gallery) setGallery(data.gallery);
      if (data.videos) setVideos(data.videos);
      if (data.reports) setReports(data.reports);
      if (data.partners) setPartners(data.partners);
      if (data.volunteers) setVolunteers(data.volunteers);
      if (data.donations) setDonations(data.donations);
      if (data.messages) setMessages(data.messages);
      if (data.settings) setSettings(data.settings);
      if (data.committees) setCommittees(data.committees);
      if (data.persons) setPersons(data.persons);
      if (data.positions) setPositions(data.positions);
      if (data.committeeMembers) setCommitteeMembers(data.committeeMembers);
      addAudit('Database Imported', 'Database', 'RESTORE', 'Restored system database from JSON backup');
      return true;
    } catch (e) {
      console.error('Failed to import database JSON', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        campaigns,
        programs,
        metrics,
        stories,
        news,
        events,
        gallery,
        videos,
        reports,
        partners,
        volunteers,
        donations,
        messages,
        settings,
        auditLogs,
        committees,
        persons,
        positions,
        committeeMembers,

        addCampaign,
        updateCampaign,
        deleteCampaign,

        addProgram,
        updateProgram,
        deleteProgram,

        updateMetric,

        addStory,
        updateStory,
        deleteStory,

        addNews,
        updateNews,
        deleteNews,

        addEvent,
        updateEvent,
        deleteEvent,

        addGalleryPhoto,
        deleteGalleryPhoto,

        addVideo,
        deleteVideo,

        addReport,
        updateReport,
        deleteReport,

        addPartner,
        updatePartner,
        deletePartner,

        submitVolunteerApplication,
        addVolunteerApplication,
        updateVolunteerStatus,
        deleteVolunteerApplication,

        submitDonation,
        addDonationRecord,
        updateDonationStatus,

        submitContactMessage,
        updateMessageStatus,
        deleteContactMessage,

        addCommittee,
        updateCommittee,
        deleteCommittee,
        archiveCommittee,
        setActiveCommittee,

        addPerson,
        updatePerson,
        deletePerson,

        addPosition,
        updatePosition,
        deletePosition,

        addCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,
        reorderCommitteeMembers,
        getMembersWithDetails,

        updateSettings,
        resetToDefaultData,
        exportDatabaseJSON,
        importDatabaseJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
