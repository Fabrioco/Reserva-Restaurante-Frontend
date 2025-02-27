"use client";
import { Eye, EyeSlash } from "@phosphor-icons/react";

import React from "react";

export default function Login() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [seePassword, setSeePassword] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
      if (!response.ok) {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={seePassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {seePassword ? (
            <Eye onClick={() => setSeePassword(false)} />
          ) : (
            <EyeSlash onClick={() => setSeePassword(true)} />
          )}
        </div>
        <button type="submit">{loading ? "Carregando..." : "Entrar"}</button>
      </form>
    </div>
  );
}
