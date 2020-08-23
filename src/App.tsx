import React from 'react';

import GlobalStyle from './styles/global';
// import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';

const App: React.FC = () => (
  <>
    {/* <SignIn /> */}
    <SignUp />

    <GlobalStyle />
  </>
);

export default App;