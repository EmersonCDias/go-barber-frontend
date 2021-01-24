import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useToast } from '../../hooks/ToastHook';
import getValidationErros from '../../utils/getValidationErros';
import { Container, Content, Background, AnimatedContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import schema from './formValidation';
import api from '../../services/api';

interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) throw new Error();

        await api.post('password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na resetar senha.',
          description: 'Tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              name="password"
              icon={FiLock}
              placeholder="Nova senha"
              type="password"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmação da senha"
              type="password"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimatedContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ResetPassword;
