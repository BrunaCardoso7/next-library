import { BookItem } from "../../features/library/components/BookItem";

export default function LibraryPage() {
  return (
    <div className="flex flex-col flex-1 items-start px-24 justify-start bg-blue-50 font-sans dark:bg-black text-zinc-800 dark:text-zinc-200 p-8">
        <h1 className="text-2xl text-start text-zinc-700 font-bold">Recomendações de Livros</h1>
        <div className="mt-4 flex-1 w-full">
            <BookItem/>
        </div>
    </div>
  );
}
