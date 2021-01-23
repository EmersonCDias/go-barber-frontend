import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
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
import api from '../../services/api';

interface Appointments {
  id: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

interface MonthAvailability {
  day: number;
  available: boolean;
}

const DashBoard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers) setSelectedDate(day);
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability/`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(({ data }) => setMonthAvailability(data));
  }, [currentMonth, user.id]);

  useEffect(() => {
    api
      .get('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(({ data }) => setAppointments(data));
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const checkDateIsToday = useMemo(() => isToday(selectedDate), [selectedDate]);
  const dayFormatted = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);
  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

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
            {checkDateIsToday && <span>{checkDateIsToday && 'Hoje'}</span>}
            <span>{dayFormatted}</span>
            <span>{selectedWeekDay}</span>
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

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Containter>
  );
};

export default DashBoard;
