
import React from 'react';
import { Page, User } from '../../types';
import { AppLogo, ICONS, MOCK_USER } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  label: string;
  Icon: React.FC<{className?: string}>;
  isActive: boolean;
  onClick: () => void;
}> = ({ page, label, Icon, isActive, onClick }) => (
  <a
    href={`#${page}`}
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-omni-blue/10 text-omni-blue shadow-glow-blue'
        : 'text-gray-400 hover:bg-omni-gray hover:text-white'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="font-semibold">{label}</span>
  </a>
);

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
    const { t } = useLanguage();
    const userRole = user.role === 'Admin' ? t('user.roleAdmin') : user.role === 'Manager' ? t('user.roleManager') : t('user.roleUser');
    return (
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-omni-gray-dark">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-omni-gold"/>
            <div>
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-sm text-omni-gold">{userRole}</p>
            </div>
        </div>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const navItems: { page: Page; label: string; Icon: React.FC<{className?: string}> }[] = [
    { page: 'dashboard', label: t('nav.dashboard'), Icon: ICONS.dashboard },
    { page: 'invitations', label: t('nav.invitations'), Icon: ICONS.invitations },
    { page: 'scanner', label: t('nav.scanner'), Icon: ICONS.scanner },
    { page: 'integrations', label: t('nav.integrations'), Icon: ICONS.integrations },
  ];

  return (
    <aside className="w-64 bg-omni-gray-dark flex flex-col p-4 border-r border-omni-gray/50 space-y-6">
      <div className="px-2 pt-2">
        <AppLogo />
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.page}
            page={item.page}
            label={item.label}
            Icon={item.Icon}
            isActive={currentPage === item.page}
            onClick={() => setCurrentPage(item.page)}
          />
        ))}
      </nav>

      <div>
        <div className="space-y-2">
          <NavLink
              page={'dashboard'}
              label={t('nav.settings')}
              Icon={ICONS.settings}
              isActive={false}
              onClick={() => alert('Settings clicked!')}
            />
          <NavLink
              page={'dashboard'}
              label={t('nav.logout')}
              Icon={ICONS.logout}
              isActive={false}
              onClick={logout}
            />
        </div>
        <div className="pt-4 mt-4 border-t border-omni-gray">
            <UserProfile user={MOCK_USER} />
        </div>
         <div className="text-center text-xs text-gray-500 mt-6 px-2">
              <p className="font-semibold">{t('sidebar.pro')}</p>
              <p>{t('sidebar.credits')}</p>
              <p className="mt-2 italic">{t('sidebar.quote')}</p>
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;