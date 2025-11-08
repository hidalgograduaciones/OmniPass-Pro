import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AppLogo } from '../../constants';
import Button from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login('mock-auth-token');
    } else {
        alert(t('login.alertEnterCredentials'));
    }
  };
  
  const handleGoogleLogin = () => {
    login('mock-google-auth-token');
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-omni-black p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <AppLogo />
        </div>
        <div className="bg-omni-gray-dark border border-omni-gray rounded-xl p-8 shadow-2xl shadow-omni-blue/10">
          <h2 className="text-2xl font-bold text-center text-white mb-2">{t('login.welcome')}</h2>
          <p className="text-center text-gray-400 mb-6">{t('login.signInToAccess')}</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">{t('login.emailPlaceholder')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-omni-blue text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">{t('login.passwordPlaceholder')}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                className="w-full bg-omni-gray border border-omni-gray-light rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-omni-blue text-white"
                required
              />
            </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-omni-blue focus:ring-omni-blue bg-omni-gray"/>
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">{t('login.rememberMe')}</label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-omni-blue hover:text-omni-blue/80">{t('login.forgotPassword')}</a>
                </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {t('login.signIn')}
            </Button>
          </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-omni-gray"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-omni-gray-dark text-gray-500">{t('login.orContinueWith')}</span>
                </div>
              </div>

              <div className="mt-6">
                 <Button onClick={handleGoogleLogin} variant="ghost" className="w-full">
                     <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" >
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.487-11.187-8.166l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.591,44,30.035,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                     </svg>
                    {t('login.signInWithGoogle')}
                 </Button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
