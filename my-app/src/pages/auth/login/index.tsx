import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss";

const TampilanLogin = () => {
  const { push } = useRouter();

  const handleLogin = () => {
    // Simulasi login sementara
    document.cookie = "isLogin=true; path=/; max-age=86400; SameSite=Lax";
    push("/produk");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Masuk ke Akun</h1>
        <p className={styles.subtitle}>
          Login sementara untuk mencoba akses halaman produk.
        </p>

        <div className={styles.formMock}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="contoh@email.com"
            disabled
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="********"
            disabled
          />
        </div>

        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>

        <p className={styles.registerPrompt}>Belum punya akun?</p>
        <Link className={styles.registerLink} href="/auth/register">
          Ke Halaman Register
        </Link>
      </div>
    </div>
  );
};

export default TampilanLogin;