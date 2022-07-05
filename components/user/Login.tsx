import Router from "next/router";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const { logIn } = useAuth();
  const [error, setError] = useState("");

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(user.email, user.password);
      Router.push("/dashboard");
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setError("😳 Cuenta no encontrada");
      }
      if (error.code === "auth/internal-error") {
        setError("😳 Error interno");
      }
      if (error.code === "auth/invalid-email") {
        setError("😖 Mail inválido");
      }
      if (error.code === "auth/weak-password") {
        setError("😕 Password débil");
      }
      if (error.code === "auth/wrong-password") {
        setError("😕 Password incorrecto");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("😅 Ya existe una cuenta con ese mail");
      }
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          placeholder="tumail@cards.com"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && (
        <p className="mt-3 text-red-700 font-semibold bg-red-300 p-3 rounded-2xl border-solid border-red-600 border-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default Login;
