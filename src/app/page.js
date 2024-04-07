import styles from "./page.module.css";
import Link from "next/link";

//primary routing
export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/">Main</Link>
      <Link href="/Login">Login</Link>
    </main>
  );
}
