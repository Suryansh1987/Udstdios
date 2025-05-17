import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { TopSearchesBanner } from '@/components/search/TopSearchesBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <TopSearchesBanner />
        
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ImageHub
            </span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
            Search and discover beautiful images from Unsplash
          </p>
          
          <div className="mt-12 w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}