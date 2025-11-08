
import React from 'react';
import { ICONS, MOCK_USER } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  pageTitleKey: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitleKey }) => {
  const { t } = useLanguage();
  const SearchIcon = ICONS.search;
  const BellIcon = ICONS.bell;

  const pageTitle = t(`nav.${pageTitleKey}`);

  return (
    <header className="bg-omni-gray-dark/50 backdrop-blur-sm border-b border-omni-gray/50 p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
            className="bg-omni-gray border border-omni-gray-light rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-omni-blue transition-all"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <LanguageSwitcher />
        
        <button className="text-gray-400 hover:text-white relative">
          <BellIcon className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-omni-blue animate-pulse"></span>
        </button>

        <div className="flex items-center space-x-2">
            <img src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} className="w-9 h-9 rounded-full border-2 border-omni-gray-light"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
