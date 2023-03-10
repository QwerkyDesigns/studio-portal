import { Button } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';

export const AuthButton = () => {
    const { data: session } = useSession();
    return (
        <Button
            onClick={(e) => {
                e.preventDefault();
                if (session) {
                    signOut();
                } else {
                    signIn();
                }
            }}
        >
            {session ? 'Sign Out' : 'Sign In'}
        </Button>
    );
};
