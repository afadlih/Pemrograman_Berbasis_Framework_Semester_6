import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__brand}>MyApp</div>
            <div className={styles.navbar__right}>
                {session ? (
                    <>
                        <div className={styles.navbar__user}>
                            Welcome, {session.user?.fullname ?? session.user?.email ?? "User"}
                        </div>
                        <button
                            className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <button
                        className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
                        onClick={() => signIn()}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
