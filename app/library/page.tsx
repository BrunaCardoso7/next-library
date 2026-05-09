'use client'

import { SearchInput } from "@/components/shared/inputsearch";
import { BookItem } from "../../features/library/components/BookItem";
import { useBooksQuery } from "@/features/library/hooks/useBookQuery";
import Load from "@/components/shared/load";
import { toastError } from "@/components/shared/toast";
import { BookList } from "@/features/library/components/BookList";


export default function LibraryPage() {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useBooksQuery()

  if (isError) {
    toastError(error.message)
  }

  // Agregar todas as páginas em um único array
  const allBooks = data?.pages.flatMap(page => page.books) || []

  return (
    <div className="min-h-screen flex flex-1 w-full flex-col mx-auto items-center mt-8 justify-start bg-blue-50 font-sans dark:bg-black text-zinc-800 dark:text-zinc-200">
        <div className="w-full max-w-4xl flex flex-col item-start justify-start gap-8">
          <h1 className="text-2xl text-start text-zinc-700 font-bold ">Recomendações de Livros</h1>
            <SearchInput onSearch={(term) => console.log(term)} />
            <Load isLoading={isLoading}/>
            <BookList 
              data={allBooks} 
              onLoadMore={fetchNextPage}
              hasMore={hasNextPage || false}
              isLoading={isFetchingNextPage}
            />
        </div>
    </div>
  );
}
 