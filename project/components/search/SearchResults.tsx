"use client";

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
  selectedImages: string[];
  onToggleSelect: (id: string) => void;
}

export function SearchResults({ 
  results, 
  isLoading, 
  selectedImages,
  onToggleSelect 
}: SearchResultsProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No results found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((image) => (
        <div 
          key={image.id} 
          className="group relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div 
            className={cn(
              "absolute inset-0 bg-background/70 flex items-center justify-center z-10 opacity-0 transition-opacity",
              selectedImages.includes(image.id) && "opacity-100"
            )}
          >
            <CheckCircle2 className="w-12 h-12 text-primary animate-in zoom-in-50 duration-300" />
          </div>
          
          {!loadedImages[image.id] && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          
          <Image
            src={image.urls.regular}
            alt={image.alt_description || 'Unsplash image'}
            fill
            className={cn(
              "object-cover transition-all duration-300 group-hover:scale-105",
              !loadedImages[image.id] && "opacity-0"
            )}
            onLoad={() => handleImageLoad(image.id)}
          />
          
          <div 
            className="absolute inset-0 cursor-pointer z-20"
            onClick={() => onToggleSelect(image.id)}
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-[1]">
            <div className="flex items-center gap-2">
              {image.user.profile_image && (
                <img 
                  src={image.user.profile_image.small} 
                  alt={image.user.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <p className="text-xs text-white truncate">
                {image.user.name}
              </p>
            </div>
          </div>
          
          <div className="absolute top-2 right-2 z-[1]">
            <input
              type="checkbox"
              checked={selectedImages.includes(image.id)}
              onChange={() => onToggleSelect(image.id)}
              className="sr-only"
              id={`checkbox-${image.id}`}
            />
            <label 
              htmlFor={`checkbox-${image.id}`}
              className={cn(
                "w-5 h-5 rounded-full border-2 border-white flex items-center justify-center",
                selectedImages.includes(image.id) ? "bg-primary" : "bg-transparent",
                "opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer"
              )}
            >
              {selectedImages.includes(image.id) && (
                <CheckCircle2 className="w-4 h-4 text-white" />
              )}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}