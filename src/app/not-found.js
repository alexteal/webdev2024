import Link from 'next/link';
import styles from './not-found.module.css'; // Assuming you have CSS modules set up

export default function NotFound() {
  return (
    <section className={styles.sup}>

   
    <div className={styles.container}>
      <h1 className={styles.header}>404 - Page Not Found</h1>
      <br></br>
      <img src="https://httpstatusdogs.com/img/404.jpg"></img>
      <br></br>
      <p className={styles.description}>
        We can't seem to find the page you're looking for.
      </p>
      <Link className ={styles.homeLink} href="/">
        Go back home
      </Link>
     
    </div>
    </section>
  );
}