import React from 'react';

import { AuthProvider } from './contexts/AuthContext';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
// import SignUp from './pages/SingUp';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
      {/* <SignUp /> */}
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
