import * as Yup from 'yup';

export default Yup.object().shape({
  password: Yup.string().min(6, 'Senha é obrigatória'),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas são diferentes',
  ),
});
