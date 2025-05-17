"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Clock, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchUserHistory } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';

interface HistoryItem {
  term: string;
  timestamp: string;
}

export function UserHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUserHistory();
        setHistory(data.history);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load search history",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-72 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="h-72 flex flex-col items-center justify-center text-center px-6">
        <Clock className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-medium text-muted-foreground">No search history</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your search history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
      <h3 className="font-medium mb-4">Recent Searches</h3>
      
      {history.map((item, index) => (
        <div 
          key={index}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-accent transition-colors group"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.term}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => window.location.href = `/search?q=${encodeURIComponent(item.term)}`}
          >
            <Search className="h-3.5 w-3.5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      ))}
    </div>
  );
}