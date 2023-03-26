import { AuthLayout } from '@/components/landing/AuthLayout';
import { TextField } from '@/components/landing/Fields';
import { Button } from '@/components/buttons/Button';
import Head from 'next/head';
import Link from 'next/link';
import { APP_NAME } from '../lib/constants';

export default function Register() {
    return (
        <>
            <Head>
                <title>{`Sign Up - ${APP_NAME}`} </title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link href="/" aria-label="Home">
                        <h1 className="font-extrabold">Qwerky Studio</h1>
                    </Link>
                    <div className="mt-20">
                        <h2 className="text-lg font-semibold text-gray-900">Get started for free</h2>
                        <p className="mt-2 text-sm text-gray-700">
                            Already registered?{' '}
                            <Link href="/login" className="font-medium text-blue-600 hover:underline">
                                Sign in
                            </Link>{' '}
                            to your account.
                        </p>
                    </div>
                </div>
                <form action="#" className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2">
                    <TextField label="First name" id="first_name" name="first_name" type="text" autoComplete="given-name" required />
                    <TextField label="Last name" id="last_name" name="last_name" type="text" autoComplete="family-name" required />
                    <TextField className="col-span-full" label="Email address" id="email" name="email" type="email" autoComplete="email" required />
                    <TextField className="col-span-full" label="Password" id="password" name="password" type="password" autoComplete="new-password" required />
                    <div className="col-span-full">
                        <Button type="submit" variant="solid" color="blue" className="w-full">
                            <span>
                                Sign up <span aria-hidden="true">&rarr;</span>
                            </span>
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}
