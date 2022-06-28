import Link from "next/link";

export const DashMenu = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/dashboard/cards">
            <a>Cards</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/lists">
            <a>Lists</a>
          </Link>
        </li>
      </ul>
    </>
  );
};
