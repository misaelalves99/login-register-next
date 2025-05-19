// app/components/RegisterForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginForm.module.css";
import FormInput from "./FormInput";

const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await register(formData.name, formData.email, formData.password);
      setMessage("✅ Conta criada com sucesso!");
      setTimeout(() => router.push("/auth"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Falha ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (platform: string) => {
    alert(`Cadastro com ${platform} ainda não implementado.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Criar Conta</h2>
        <p className={styles.subtitle}>Preencha os dados para criar sua conta.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="Nome"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
          />
          <FormInput
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crie uma senha segura"
          />

          {message && <div className={styles.errorMessage}>{message}</div>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className={styles.links}>
          <p className={styles.registerLink}>
            Já tem uma conta?{" "}
            <a href="/login" className={styles.link}>
              Entrar
            </a>
          </p>
        </div>

        <div className={styles.divider}>ou cadastre-se com</div>
        <div className={styles.socialButtons}>
          <button type="button" className={styles.google} onClick={() => handleSocialRegister("Google")}>
            <FaGoogle className={styles.icon} />
          </button>
          <button type="button" className={styles.facebook} onClick={() => handleSocialRegister("Facebook")}>
            <FaFacebookF className={styles.icon} />
          </button>
          <button type="button" className={styles.instagram} onClick={() => handleSocialRegister("Instagram")}>
            <FaInstagram className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
