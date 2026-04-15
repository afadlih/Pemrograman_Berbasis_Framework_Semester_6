import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./register.module.css";

const TampilanRegister = () => {
  const { push } = useRouter();

  const handleRegister = () => {
    // logic register disini
    push("/produk");
  };

  return (
    <div className={styles.register}>
      <h1>Halaman Register</h1>
      <button onClick={() => handleRegister()}>Register</button> <br />
      {/* Navigasi ke halaman Login */}
      <Link href="/auth/login">Ke Halaman Login</Link>
    </div>
  );
};

export default TampilanRegister;