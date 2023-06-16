import Head from 'next/head';
import {Box, Container, Stack, Typography} from '@mui/material';
import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import SettingsParsers from "../sections/settings/settings-parsers";

const Page = () => (
    <>
        <Head>
            <title>
                Settings | Devias Kit
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Typography variant="h4">
                        Настройки
                    </Typography>
                    <SettingsParsers/>
                    {/*<SettingsNotifications/>*/}
                    {/*<SettingsPassword/>*/}
                </Stack>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
