// app/login/page.tsx

"use client";

import React from "react";
import LoginForm from "../components/LoginForm";
import styles from "./LoginPage.module.css";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
