import Router from "next/router";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });

  const { signUp } = useAuth();

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      Router.push("/dashboard");
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError("😳 Error interno");
      }
      if (error.code === "auth/invalid-email") {
        setError("😖 Mail inválido");
      }
      if (error.code === "auth/weak-password") {
        setError("😕 Password débil");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("😅 Ya existe una cuenta con ese mail");
      }
    }
    console.log(user);
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
        <button type="submit">Registrar</button>
      </form>
      {error && (
        <p className="mt-3 text-red-700 font-semibold bg-red-300 p-3 rounded-2xl border-solid border-red-600 border-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default Register;
