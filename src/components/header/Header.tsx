import styles from "@/styles/header.module.css";
import { Container } from "@mantine/core";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side

import { AuthenticatedHeader } from "./AuthenticatedHeader";
import { UnAuthenticatedHeader } from "./UnAuthenticatedHeader";

const fakeSession: Session = {
  user: {
    image: "abc",
    email: "paul.g@gmail.com",
    name: "Paul The Destroyer"
  },
  expires: null!

}


// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <div
        className={`nojs-show  ${styles.signedInStatus} ${
          !session && loading ? styles.loading : styles.loaded
        }`}
      >
        <Container fluid>
          {/* {session ? ( */}
            <AuthenticatedHeader session={fakeSession} />
          {/* // ) : ( */}
          {/* //   <UnAuthenticatedHeader /> */}
          {/* // )} */}
        </Container>
      </div>
    </header>
  );
}