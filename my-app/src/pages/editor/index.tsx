import { useSession } from "next-auth/react";
import styles from "./editor.module.css";

const EditorPage = () => {
  const { data: session } = useSession();

  return (
    <main className={styles.editor}>
      <section className={styles.editor__card}>
        <p className={styles.editor__eyebrow}>Editor Area</p>
        <h1 className={styles.editor__title}>
          Halaman Khusus Editor
        </h1>
        <p className={styles.editor__description}>
          Halaman ini hanya bisa diakses oleh role <b>editor</b> atau <b>admin</b>.
          Gunakan area ini untuk moderasi konten, review artikel, dan publikasi.
        </p>

        <div className={styles.editor__meta}>
          Login sebagai: <b>{session?.user?.fullname || session?.user?.email}</b> ({" "}
          <b>{session?.user?.role || "unknown"}</b>)
        </div>
      </section>
    </main>
  );
};

export default EditorPage;
