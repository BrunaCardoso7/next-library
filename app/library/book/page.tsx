import { BookForm } from "@/features/library/components/BookForm";

export default function LibraryPage() {
  return (
    <div className="flex flex-col flex-1 h-screen items-start m-auto overflow-hidden gap-12 justify-center font-sans dark:bg-black text-zinc-800 dark:text-zinc-200 p-8">
        <div className="flex-1 h-full flex items-start justify-center">
            <BookForm/>
        </div>
    </div>
  );
}
