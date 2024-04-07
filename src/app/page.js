import styles from "./page.module.css";
import Link from "next/link";

//primary routing
export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/Login">Login</Link>
      <Link href="/">Main</Link>
    </main>
  );
}
