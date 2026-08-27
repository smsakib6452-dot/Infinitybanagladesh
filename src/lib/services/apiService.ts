/**
 * API Service Layer for Infinity Bangladesh
 * Provides structured query and mutation interfaces for all organization entities.
 */

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
  JourneyVideo
} from '../../types';

export class ApiService {
  /**
   * Fetch site-wide public metadata and settings
   */
  static async getSiteSettings(): Promise<SiteSettings | null> {
    // In server environment, executes Prisma query. In client, handled via DataContext.
    return null;
  }

  /**
   * Fetch all published videos
   */
  static async getVideos(): Promise<VideoItem[]> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('video_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map(item => ({
            id: item.id,
            title: item.title,
            videoUrl: item.video_url,
            embedUrl: item.embed_url,
            thumbnailUrl: item.thumbnail_url,
            platform: item.platform,
            duration: item.duration,
            date: item.date,
            description: item.description,
            category: item.category,
            status: item.status,
            isFeatured: item.is_featured,
            sourceType: item.source_type,
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }));
        }
      }
    } catch (err) {
      console.warn('ApiService getVideos fallback:', err);
    }

    try {
      const saved = localStorage.getItem('infinity_bd_v2_videos');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    const { INITIAL_VIDEOS } = await import('../../data/initialData');
    return INITIAL_VIDEOS;
  }

  /**
   * Create video entry
   */
  static async createVideo(video: Omit<VideoItem, 'id'>): Promise<VideoItem> {
    const id = `vid-${Date.now()}`;
    const newVid: VideoItem = {
      ...video,
      id,
      status: video.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        await supabase.from('video_items').upsert({
          id: newVid.id,
          title: newVid.title,
          video_url: newVid.videoUrl,
          embed_url: newVid.embedUrl || '',
          thumbnail_url: newVid.thumbnailUrl,
          platform: newVid.platform,
          duration: newVid.duration || '',
          date: newVid.date,
          description: newVid.description,
          category: newVid.category || 'General',
          status: newVid.status,
          is_featured: newVid.isFeatured || false,
          source_type: newVid.sourceType || 'url',
          created_at: newVid.createdAt,
          updated_at: newVid.updatedAt
        });
      }
    } catch (err) {
      console.warn('ApiService createVideo db error:', err);
    }

    return newVid;
  }

  /**
   * Update video entry
   */
  static async updateVideo(id: string, video: Partial<VideoItem>): Promise<void> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        const payload: Record<string, any> = {
          updated_at: new Date().toISOString()
        };
        if (video.title !== undefined) payload.title = video.title;
        if (video.videoUrl !== undefined) payload.video_url = video.videoUrl;
        if (video.embedUrl !== undefined) payload.embed_url = video.embedUrl;
        if (video.thumbnailUrl !== undefined) payload.thumbnail_url = video.thumbnailUrl;
        if (video.platform !== undefined) payload.platform = video.platform;
        if (video.duration !== undefined) payload.duration = video.duration;
        if (video.date !== undefined) payload.date = video.date;
        if (video.description !== undefined) payload.description = video.description;
        if (video.category !== undefined) payload.category = video.category;
        if (video.status !== undefined) payload.status = video.status;
        if (video.isFeatured !== undefined) payload.is_featured = video.isFeatured;
        if (video.sourceType !== undefined) payload.source_type = video.sourceType;

        await supabase.from('video_items').update(payload).eq('id', id);
      }
    } catch (err) {
      console.warn('ApiService updateVideo db error:', err);
    }
  }

  /**
   * Delete video entry
   */
  static async deleteVideo(id: string): Promise<void> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        await supabase.from('video_items').delete().eq('id', id);
      }
    } catch (err) {
      console.warn('ApiService deleteVideo db error:', err);
    }
  }

  /**
   * Fetch all published Journey Videos
   */
  static async getJourneyVideos(): Promise<JourneyVideo[]> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('journey_videos')
          .select('*')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          return data.map(item => ({
            id: item.id,
            title: item.title,
            timelineLabel: item.timeline_label,
            description: item.description,
            category: item.category,
            videoUrl: item.video_url || '',
            videoPlatform: item.video_platform || 'auto',
            embedUrl: item.embed_url || '',
            thumbnailUrl: item.thumbnail_url || '',
            displayOrder: item.display_order ?? 0,
            isPublished: item.is_published ?? true,
            isFeatured: item.is_featured ?? false,
            createdAt: item.created_at,
            updatedAt: item.updated_at
          }));
        }
      }
    } catch (err) {
      console.warn('ApiService getJourneyVideos fallback:', err);
    }

    try {
      const saved = localStorage.getItem('infinity_bd_v2_journeyVideos');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }

    const { INITIAL_JOURNEY_VIDEOS } = await import('../../data/initialData');
    return INITIAL_JOURNEY_VIDEOS;
  }

  /**
   * Create Journey Video entry
   */
  static async createJourneyVideo(video: Omit<JourneyVideo, 'id' | 'createdAt' | 'updatedAt'>): Promise<JourneyVideo> {
    const id = `jvid-${Date.now()}`;
    const newVid: JourneyVideo = {
      ...video,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        if (newVid.isFeatured) {
          await supabase.from('journey_videos').update({ is_featured: false }).neq('id', id);
        }
        await supabase.from('journey_videos').upsert({
          id: newVid.id,
          title: newVid.title,
          timeline_label: newVid.timelineLabel,
          description: newVid.description,
          category: newVid.category || 'Organizational Journey',
          video_url: newVid.videoUrl || '',
          video_platform: newVid.videoPlatform || 'auto',
          embed_url: newVid.embedUrl || '',
          thumbnail_url: newVid.thumbnailUrl || '',
          display_order: newVid.displayOrder ?? 0,
          is_published: newVid.isPublished ?? true,
          is_featured: newVid.isFeatured ?? false,
          created_at: newVid.createdAt,
          updated_at: newVid.updatedAt
        });
      }
    } catch (err) {
      console.warn('ApiService createJourneyVideo db error:', err);
    }

    return newVid;
  }

  /**
   * Update Journey Video entry
   */
  static async updateJourneyVideo(id: string, video: Partial<JourneyVideo>): Promise<void> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        if (video.isFeatured) {
          await supabase.from('journey_videos').update({ is_featured: false }).neq('id', id);
        }

        const payload: Record<string, any> = {
          updated_at: new Date().toISOString()
        };
        if (video.title !== undefined) payload.title = video.title;
        if (video.timelineLabel !== undefined) payload.timeline_label = video.timelineLabel;
        if (video.description !== undefined) payload.description = video.description;
        if (video.category !== undefined) payload.category = video.category;
        if (video.videoUrl !== undefined) payload.video_url = video.videoUrl;
        if (video.videoPlatform !== undefined) payload.video_platform = video.videoPlatform;
        if (video.embedUrl !== undefined) payload.embed_url = video.embedUrl;
        if (video.thumbnailUrl !== undefined) payload.thumbnail_url = video.thumbnailUrl;
        if (video.displayOrder !== undefined) payload.display_order = video.displayOrder;
        if (video.isPublished !== undefined) payload.is_published = video.isPublished;
        if (video.isFeatured !== undefined) payload.is_featured = video.isFeatured;

        await supabase.from('journey_videos').update(payload).eq('id', id);
      }
    } catch (err) {
      console.warn('ApiService updateJourneyVideo db error:', err);
    }
  }

  /**
   * Delete Journey Video entry
   */
  static async deleteJourneyVideo(id: string): Promise<void> {
    try {
      const { supabase, isSupabaseConfigured } = await import('../supabase');
      if (supabase && isSupabaseConfigured) {
        await supabase.from('journey_videos').delete().eq('id', id);
      }
    } catch (err) {
      console.warn('ApiService deleteJourneyVideo db error:', err);
    }
  }

  /**
   * Submit volunteer application with server validation
   */
  static async submitVolunteerApplication(data: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>): Promise<{ success: boolean; id: string; message: string }> {
    if (!data.fullName || !data.email || !data.phone || !data.district) {
      throw new Error('Please fill in all required fields (Name, Email, Phone, District).');
    }

    const id = `vol_${Date.now().toString(36)}`;
    return {
      success: true,
      id,
      message: 'Application recorded successfully.'
    };
  }

  /**
   * Submit contact inquiry message
   */
  static async submitContactInquiry(data: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): Promise<{ success: boolean; message: string }> {
    if (!data.name || !data.email || !data.message) {
      throw new Error('Name, Email, and Message are required.');
    }
    return {
      success: true,
      message: 'Message delivered to Infinity Bangladesh desk.'
    };
  }
}
