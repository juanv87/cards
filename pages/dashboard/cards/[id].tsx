import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, FC } from "react";
import IconTag from "../../../components/icons/IconTag";
import { ContainerDashBoard } from "../../../components/layouts/ContainerDashBoard";
import { Header } from "../../../components/layouts/Header";
import { dbEntries } from "../../../database";
import { Entry, EntryStatus } from "../../../interfaces/entry";

interface Props {
  entry: Entry;
}

const CardPage: FC<Props> = ({ entry }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<EntryStatus>("pending");
  const [touched, setTouched] = useState(false);
  console.log("entry", entry);
  const { title, phrase, list, description } = entry;
  return (
    <>
      <Header />
      <ContainerDashBoard>
        <header className="mt-10 flex flex-col items-start">
          <Link href={`/dashboard/lists/${list}`}>
            <a className="text-white">
              <div className="flex items-center rounded-full bg-slate-500 px-2 py-1">
                <IconTag size="30" color="white" />
                <span className="mr-2">{list}</span>
              </div>
            </a>
          </Link>
          <h1 className="text-5xl font-semibold mt-5 mb-2">{title}</h1>
          <h2 className="text-2xl">{description}</h2>
        </header>
        <div
          className="content text-lg pb-5 text-gray-800 max-w-full pr-5 mt-5"
          dangerouslySetInnerHTML={{
            __html: phrase,
          }}
        />
      </ContainerDashBoard>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/dashboard/cards",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default CardPage;
