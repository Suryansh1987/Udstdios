"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { SearchForm } from '@/components/search/SearchForm';
import { SearchResults } from '@/components/search/SearchResults';
import { UserHistory } from '@/components/search/UserHistory';
import { TopSearchesBanner } from '@/components/search/TopSearchesBanner';
import { searchImages } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();
  const { toast } = useToast();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setSearchQuery(query);
    setSelectedImages([]);

    try {
      const data = await searchImages(query);
      setSearchResults(data.results);
      setTotalResults(data.total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to search images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const toggleImageSelection = useCallback((imageId) => {
    setSelectedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect will happen in useEffect
  }

  return (
    <main className="min-h-screen bg-background">
      <TopSearchesBanner />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Image Search
              </h1>
              <p className="text-muted-foreground mt-1">
                Search for high-quality images from Unsplash
              </p>
            </div>

            <SearchForm onSearch={handleSearch} />

            {searchQuery && (
              <div className="mt-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  You searched for <span className="font-medium">&quot;{searchQuery}&quot;</span> – {totalResults} results
                </p>

                <p className="text-sm font-medium mt-2 sm:mt-0">
                  Selected: {selectedImages.length} images
                </p>
              </div>
            )}

            <SearchResults
              results={searchResults}
              isLoading={isLoading}
              selectedImages={selectedImages}
              onToggleSelect={toggleImageSelection}
            />
          </div>

          <div className="md:w-1/4">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <Tabs defaultValue="history">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                  <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
                </TabsList>

                <TabsContent value="history">
                  <UserHistory />
                </TabsContent>

                <TabsContent value="account">
                  <div className="flex flex-col items-center py-4">
                    {user?.photo && (
                      <img
                        src={user.photo}
                        alt={user.displayName || 'User photo'}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    )}
                    <h3 className="mt-4 font-medium">{user?.displayName}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Signed in with {user?.provider}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
