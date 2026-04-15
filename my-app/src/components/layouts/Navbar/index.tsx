import Image from "next/image";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const displayName = session?.user?.fullname ?? session?.user?.email ?? "User";
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e40af&color=ffffff&bold=true`;
    const profileImage = session?.user?.image || fallbackAvatar;

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
                            <span>
                                Welcome, {displayName}
                            </span>
                            <Image
                                src={profileImage}
                                alt={displayName}
                                className={styles.navbar__user__image}
                                width={42}
                                height={42}
                            />
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
