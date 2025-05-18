// app/recover-password/page.tsx

'use client';

import React from 'react';
import RecoverPasswordForm from '../components/RecoverPasswordForm';
import styles from './RecoverPasswordPage.module.css'; // Importando o CSS Module

const RecoverPasswordPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageHeader}>Recuperar Senha</h1>
      <RecoverPasswordForm />
    </div>
  );
};

export default RecoverPasswordPage;
