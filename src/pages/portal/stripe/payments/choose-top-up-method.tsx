import { NormalButton } from '@/components/buttons/NormalButton';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useRouter } from 'next/router';

export { getServerSideProps } from '@/lib/get-server-side-props/authentication';

export default function ChooseTopUpMethod() {
    const router = useRouter();

    const onClick = () => {
        router.push('/portal/stripe/payments/manual-top-up');
    };

    return (
        <DashboardLayout pageName="Choose Top-up Method">
            <div className="m-12 flex w-full flex-row justify-around">
                <NormalButton onClick={onClick}>Manual Top up</NormalButton>
                <NormalButton disabled={true}>Enable Auto-top up</NormalButton>
            </div>
        </DashboardLayout>
    );
}
