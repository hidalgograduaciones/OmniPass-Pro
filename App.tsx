
import React, { useState } from 'react';
import { Page } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './components/dashboard/DashboardPage';
import InvitationsPage from './components/invitations/InvitationsPage';
import IntegrationsPage from './components/integrations/IntegrationsPage';
import ScannerPage from './components/scanner/ScannerPage';
import LoginPage from './components/auth/LoginPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'invitations':
        return <InvitationsPage />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'scanner':
        return <ScannerPage />;
      default:
        return <DashboardPage />;
    }
  };
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isScannerPage = currentPage === 'scanner';

  return (
    <div className="flex h-screen bg-omni-black text-gray-300">
      {!isScannerPage && <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isScannerPage && <Header pageTitleKey={currentPage} />}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-omni-black ${isScannerPage ? '' : 'p-4 sm:p-6 md:p-8'}`}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;