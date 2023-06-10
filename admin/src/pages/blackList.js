import {Layout as DashboardLayout} from "../layouts/dashboard/layout";


const Page = () => {


    return (
        <>
            black list
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page