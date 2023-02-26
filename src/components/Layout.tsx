import { Container } from "@mantine/core";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import AccessDenied from "./errorpages/AccessDenied";
import Header from "./header/Header";
import { Text } from "@mantine/core";
import classNames from "classnames";

export default function Layout({ pageName, children }: { pageName: string; children: React.ReactNode }) {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>{pageName}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <Text className="m-5" align="center" fs="normal" fw="bolder" fz={"lg"}>
                    {pageName}
                </Text>
                <Container fluid className={classNames({ "flex justify-center": !session })}>
                    {session ? children : <AccessDenied />}
                </Container>
            </main>
        </>
    );
}
