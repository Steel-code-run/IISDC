import {useCallback, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/navigation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {useAuth} from 'src/hooks/use-auth';
import {Layout as AuthLayout} from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('Имя обязательно для заполнения'),
      password: Yup
        .string()
        .max(255)
        .required('Пароль обязателен для заполнения')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const error = await auth.signIn(values.name, values.password);
        console.log(error)
        if(!error) {
            router.push('/customers');
        } else {
            throw new Error(error)
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  const handleSkip = useCallback(
    () => {
      auth.skip();
      router.push('/');
    },
    [auth, router]
  );

  return (
    <>
      <Head>
        <title>
          Авторизация
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Авторизация
              </Typography>
              {/*<Typography*/}
              {/*  color="text.secondary"*/}
              {/*  variant="body2"*/}
              {/*>*/}
              {/*  Нет аккаунта?*/}
              {/*  &nbsp;*/}
              {/*  <Link*/}
              {/*    component={NextLink}*/}
              {/*    href="/auth/register"*/}
              {/*    underline="hover"*/}
              {/*    variant="subtitle2"*/}
              {/*  >*/}
              {/*    Зарегистрироваться*/}
              {/*  </Link>*/}
              {/*</Typography>*/}
            </Stack>

            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Имя"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Пароль"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>
                {/*<FormHelperText sx={{ mt: 1 }}>*/}
                {/*  Optionally you can skip.*/}
                {/*</FormHelperText>*/}
                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Продолжить
                </Button>
                {/*<Button*/}
                {/*  fullWidth*/}
                {/*  size="large"*/}
                {/*  sx={{ mt: 3 }}*/}
                {/*  onClick={handleSkip}*/}
                {/*>*/}
                {/*  Skip authentication*/}
                {/*</Button>*/}
              </form>
            )}

          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
