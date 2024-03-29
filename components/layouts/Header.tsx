import Router from "next/router";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "../Logo";

export const Header = () => {
  const { user, logOut, loadingUser } = useAuth();
  const handleLogOut = async () => {
    await logOut();
    Router.push("/");
  };
  return (
    <header className="grid grid-cols-12 p-5 bg-gray-800">
      <div className="col-span-6 text-white">
        <Logo />
      </div>
      <div className="col-span-6 text-right text-white">
        {loadingUser && "Cargando..."}
        {user === null ? "No hay user" : user.email}
        {user && <button onClick={handleLogOut}>Log Out</button>}
      </div>
    </header>
  );
};
