// components/auth/RecoverPasswordForm.tsx

'use client';

import React, { useState } from 'react';
import { validateEmail } from '../../app/utils/validate';
import styles from './RecoverPasswordForm.module.css';

const RecoverPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage('Password recovery email sent!');
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <form onSubmit={handleRecoverPassword} className={styles.formContainer}>
      <div>
        <label htmlFor="email" className={styles.block}>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
          placeholder="Enter your email"
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Recover Password
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default RecoverPasswordForm;
