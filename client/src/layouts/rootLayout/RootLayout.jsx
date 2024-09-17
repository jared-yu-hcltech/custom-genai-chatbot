import { Link, Outlet, useLocation } from 'react-router-dom';
import './rootLayout.css';
import { SignedIn, UserButton, ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ModelMenu from '../../components/modelMenu/ModelMenu';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className='rootLayout'>
          <header>
            <Link to="/" className='logo'>
              <img src='/hcltechicon.png' alt='' />
              <span>Gen AI Chatbot</span>
            </Link>
            {isDashboardRoute && <ModelMenu />}
            <div className="user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;