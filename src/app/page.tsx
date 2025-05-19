// app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <main className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bem-vindo ao Nosso E-commerce</h1>
        <p className={styles.description}>Explore nossos produtos incríveis!</p>
        <button className={styles.heroButton} onClick={handleNavigate}>
          Ver Produtos
        </button>
      </section>
    </main>
  );
};

export default HomePage;
