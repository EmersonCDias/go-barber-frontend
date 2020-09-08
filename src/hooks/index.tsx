import React from 'react';

import { AuthProvider } from './AuthHook';
import { ToastProvider } from './ToastHook';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
