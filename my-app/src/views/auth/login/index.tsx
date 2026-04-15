import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "./login.module.scss";

const TampilanLogin = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl =
    typeof query.callbackUrl === "string" ? query.callbackUrl : "/produk";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setIsLoading(false);
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setError("Email atau password salah");
        setIsLoading(false);
        return;
      }

      await push(result.url || callbackUrl);
      setIsLoading(false);
    } catch {
      setError("Terjadi kesalahan, coba lagi");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);

    try {
      // OAuth providers are handled by redirect flow in NextAuth.
      await signIn("google", {
        callbackUrl,
      });
      setIsGoogleLoading(false);
    } catch {
      setError("Terjadi kesalahan saat login Google");
      setIsGoogleLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setError("");
    setIsGitHubLoading(true);

    try {
      await signIn("github", {
        callbackUrl,
      });
      setIsGitHubLoading(false);
    } catch {
      setError("Terjadi kesalahan saat login GitHub");
      setIsGitHubLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__card}>
        <div className={styles.login__header}>
          <p className={styles.login__eyebrow}>Welcome Back</p>
          <h1 className={styles.login__title}>Halaman Login</h1>
          <p className={styles.login__subtitle}>
            Masuk untuk melanjutkan ke halaman produk dan fitur aplikasi.
          </p>
        </div>

        {error && <p className={styles.login__error}>{error}</p>}

        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.login__field}>
            <label htmlFor="email" className={styles.login__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="contoh@email.com"
              className={styles.login__input}
              autoComplete="email"
            />
          </div>

          <div className={styles.login__field}>
            <label htmlFor="password" className={styles.login__label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              className={styles.login__input}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={styles.login__button}
            disabled={isLoading || isGoogleLoading || isGitHubLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={styles.login__buttonGoogle}
            disabled={isLoading || isGoogleLoading || isGitHubLoading}
          >
            {isGoogleLoading ? "Loading..." : "Sign in with Google"}
          </button>

          <button
            type="button"
            onClick={handleGitHubSignIn}
            className={styles.login__buttonGitHub}
            disabled={isLoading || isGoogleLoading || isGitHubLoading}
          >
            {isGitHubLoading ? "Loading..." : "Sign in with GitHub"}
          </button>
        </form>

        <p className={styles.login__footer}>
          Belum punya akun? <Link href="/auth/register">Ke Halaman Register</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanLogin;