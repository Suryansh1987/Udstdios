"use client";

import { useEffect, useState } from 'react';
import { fetchTopSearches } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface TopSearch {
  term: string;
  count: number;
}

export function TopSearchesBanner() {
  const [topSearches, setTopSearches] = useState<TopSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTopSearches = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTopSearches();
        setTopSearches(data.topSearches);
      } catch (error) {
        console.error('Failed to load top searches', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopSearches();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-muted py-2">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
          <span className="text-xs text-muted-foreground">Loading top searches...</span>
        </div>
      </div>
    );
  }

  if (topSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Trending:</span>
          {topSearches.map((search, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs hover:bg-secondary transition-colors cursor-pointer"
              onClick={() => window.location.href = `/search?q=${encodeURIComponent(search.term)}`}
            >
              {search.term}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}