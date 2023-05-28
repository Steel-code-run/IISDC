import {Layout as DashboardLayout} from 'src/layouts/dashboard/layout';
import {useRouter} from "next/router";
import {useUserQuery} from "../../hooks/useUserQuery";


const Page = () => {

    const router = useRouter();

    const {data} = useUserQuery('user', 0, 0, router.query.id)

    return (
        <>
            {JSON.stringify(data, null, 4)}
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
