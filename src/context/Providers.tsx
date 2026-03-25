'use client';

import { Provider } from 'react-redux';
import { reduxStore } from '../redux/reduxStore';
import { ToastProviderHeroUI } from './ToastProvider';
import SessionWrapperProvider from './SessionWrapperProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProviderHeroUI>
      <Provider store={reduxStore}>
        <SessionWrapperProvider>{children}</SessionWrapperProvider>
      </Provider>
    </ToastProviderHeroUI>
  );
}
