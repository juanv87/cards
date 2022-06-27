import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header className="grid grid-cols-12 p-5 bg-slate-400">
      <div className="col-span-6 text-white">Logo</div>
      <div className="col-span-6 text-right text-white">
        hola {user.userName}
      </div>
    </header>
  );
};
