'use client'

import { useState } from "react";
import { SearchInput } from "@/components/shared/inputsearch";
import { useBooksQuery } from "@/features/library/hooks/useBookQuery";
import { useSearchBooks } from "@/features/library/hooks/useSearchBooks";
import Load from "@/components/shared/load";
import { BookList } from "@/features/library/components/BookList";
import { useOnboardingContext } from "@/features/onboarding/providers/onboarding-provider";


export default function LibraryPage() {
  const { data } = useOnboardingContext()
  const id_onboarding_user = data?.id ?? 1
  const role = data?.ie_role ?? 'visitor'

  console.log('ID do usuário de onboarding:', id_onboarding_user) 
  console.log('ID do usuário de onboarding:', data.id) 
  const [searchTerm, setSearchTerm] = useState('')  

  const { data: allBooksData, isLoading: isLoadingAll, isError: isErrorAll, error: errorAll, hasNextPage, fetchNextPage, isFetchingNextPage } = useBooksQuery({
    id_onboarding_user,
    ie_role: role,
  })

  const { books: searchResults } = useSearchBooks(searchTerm, id_onboarding_user)

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