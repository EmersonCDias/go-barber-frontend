import React from 'react';
import { FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthHook';
import { Containter, Header, HeaderContent, Profile } from './styles';
import logo from '../../assets/logo.svg';

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Containter>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
    </Containter>
  );
};

export default DashBoard;
