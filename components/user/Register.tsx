import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Router from "next/router";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { db } from "../../lib/firebase/firebase";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [name]: value });
  };
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await signUp(user.email, user.password);

      await setDoc(doc(db, "usuarios", user.email), {
        cards: "",
        email: user.email,
      });
      setLoading(false);
      Router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
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
      <form onSubmit={handleRegister}>
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
        {loading && <div>Cargando...</div>}
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
