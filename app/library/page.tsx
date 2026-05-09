'use client'

import { useState } from "react";
import { SearchInput } from "@/components/shared/inputsearch";
import { BookItem } from "../../features/library/components/BookItem";
import { useBooksQuery } from "@/features/library/hooks/useBookQuery";
import { useSearchBooks } from "@/features/library/hooks/useSearchBooks";
import Load from "@/components/shared/load";
import { toastError } from "@/components/shared/toast";
import { BookList } from "@/features/library/components/BookList";


export default function LibraryPage() {
  // TODO: pegar do contexto de autenticação
  const id_onboarding_user = 1
  
  const [searchTerm, setSearchTerm] = useState('')

  // Query para listar todos os livros
  const { data: allBooksData, isLoading: isLoadingAll, isError: isErrorAll, error: errorAll, hasNextPage, fetchNextPage, isFetchingNextPage } = useBooksQuery({
    id_onboarding_user
  })

  // Query para buscar por título (do cache local)
  const { books: searchResults } = useSearchBooks(searchTerm, id_onboarding_user)

  // Define qual dado usar baseado se há busca ou não
  const isSearching = searchTerm.trim().length > 0
  const allBooks = isSearching ? searchResults : (allBooksData?.pages?.flatMap((page: any) => page.books) ?? [])

  return (
    <div className="min-h-screen flex flex-1 w-full flex-col mx-auto items-center mt-8 justify-start bg-blue-50 font-sans dark:bg-black text-zinc-800 dark:text-zinc-200">
        <div className="w-full max-w-4xl flex flex-col item-start justify-start gap-8">
          <h1 className="text-2xl text-start text-zinc-700 font-bold ">Recomendações de Livros</h1>
            <SearchInput 
              onSearch={setSearchTerm}
              resultsCount={allBooks.length}
            />
            <Load isLoading={isLoadingAll}/>
            <BookList 
              data={allBooks} 
              onLoadMore={isSearching ? undefined : fetchNextPage}
              hasMore={isSearching ? false : (hasNextPage || false)}
              isLoading={isSearching ? false : isFetchingNextPage}
              id_onboarding_user={id_onboarding_user}
            />
        </div>
    </div>
  );
}
 