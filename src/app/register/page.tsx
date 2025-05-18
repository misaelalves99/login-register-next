// app/register/page.tsx

"use client";

import React from "react";
import RegisterForm from "../components/RegisterForm";
import styles from "./RegisterPage.module.css"; // Importando o CSS Module

const RegisterPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
