import Link from "next/link";
import styles from "./page.module.css";
//primary routing
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      <button className="button">
        <Link href="/">Main</Link>
      </button>
      <button className="button">
        <Link href="/Login">Login</Link>
      </button>
      <button className="button">
        <Link href="/CreateAccount">Signup</Link>
      </button>
    </main>
  );
}
