import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),
});
