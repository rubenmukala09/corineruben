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
