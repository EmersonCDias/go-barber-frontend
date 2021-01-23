import React, { useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthHook';
import {
  Containter,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Appointment,
  Section,
} from './styles';
import logo from '../../assets/logo.svg';

const DashBoard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>

          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars.githubusercontent.com/u/19658244?s=460&u=205d8b8c6743299b4cc2b784a3c4669d9d91fe6c&v=4"
                alt="Emerson Dias"
              />

              <strong>Emerson Dias</strong>

              <span>{<FiClock />} 08:00</span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/19658244?s=460&u=205d8b8c6743299b4cc2b784a3c4669d9d91fe6c&v=4"
                  alt="Emerson Dias"
                />

                <strong>Emerson Dias</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/19658244?s=460&u=205d8b8c6743299b4cc2b784a3c4669d9d91fe6c&v=4"
                  alt="Emerson Dias"
                />

                <strong>Emerson Dias</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/19658244?s=460&u=205d8b8c6743299b4cc2b784a3c4669d9d91fe6c&v=4"
                  alt="Emerson Dias"
                />

                <strong>Emerson Dias</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/19658244?s=460&u=205d8b8c6743299b4cc2b784a3c4669d9d91fe6c&v=4"
                  alt="Emerson Dias"
                />

                <strong>Emerson Dias</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar />
      </Content>
    </Containter>
  );
};

export default DashBoard;
