import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthHook';
import { useToast } from '../../hooks/ToastHook';
import getValidationErros from '../../utils/getValidationErros';
import { Container, Content, Background, AnimatedContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import schema from './formValidation';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Verifique e-mail ou senha',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />

            <Button type="submit">Entrar</Button>

            <Link to="forgot-password">Esqueci a senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimatedContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
