import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteImage {
  id: string;
  section: string;
  storage_path: string;
  url: string;
  alt_text: string;
  sort_order: number;
}

export const useSiteImages = (section: string) => {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('site_images')
        .select('*')
        .eq('section', section)
        .order('sort_order', { ascending: true });
      if (data) setImages(data as SiteImage[]);
      setLoading(false);
    };
    fetch();
  }, [section]);

  return { images, loading };
};

export interface StoryEvent {
  id: string;
  title: string;
  title_fr: string | null;
  title_es: string | null;
  description: string;
  description_fr: string | null;
  description_es: string | null;
  date_label: string;
  date_label_fr: string | null;
  date_label_es: string | null;
  icon: string;
  sort_order: number;
}

export const useStoryEvents = () => {
  const [events, setEvents] = useState<StoryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('story_events')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setEvents(data as StoryEvent[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { events, loading };
};

export interface FaqItem {
  id: string;
  question: string;
  question_fr: string | null;
  question_es: string | null;
  answer: string;
  answer_fr: string | null;
  answer_es: string | null;
  sort_order: number;
}

export const useFaqs = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setFaqs(data as FaqItem[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { faqs, loading };
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s: { key: string; value: string }) => { map[s.key] = s.value; });
        setSettings(map);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { settings, loading };
};

export interface VenueScheduleItem {
  id: string;
  time: string;
  icon: string;
  label: string;
  label_fr: string | null;
  label_es: string | null;
  color: string;
  sort_order: number;
}

export interface VenueHotel {
  id: string;
  name: string;
  stars: number;
  distance: string;
  price: string;
  url: string;
  description: string;
  sort_order: number;
}

export interface VenueTransport {
  id: string;
  type: string;
  icon: string;
  description: string;
  description_fr: string | null;
  description_es: string | null;
  sort_order: number;
}

export const useVenueData = () => {
  const [schedule, setSchedule] = useState<VenueScheduleItem[]>([]);
  const [hotels, setHotels] = useState<VenueHotel[]>([]);
  const [transport, setTransport] = useState<VenueTransport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [scheduleRes, hotelsRes, transportRes] = await Promise.all([
        supabase.from('venue_schedule').select('*').order('sort_order'),
        supabase.from('venue_hotels').select('*').order('sort_order'),
        supabase.from('venue_transport').select('*').order('sort_order'),
      ]);
      if (scheduleRes.data) setSchedule(scheduleRes.data as VenueScheduleItem[]);
      if (hotelsRes.data) setHotels(hotelsRes.data as VenueHotel[]);
      if (transportRes.data) setTransport(transportRes.data as VenueTransport[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { schedule, hotels, transport, loading };
};
