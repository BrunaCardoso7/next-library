import Header from "@/components/shared/header"

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-col flex-1 bg-blue-50 overflow-y-auto">{children}</main>
    </div>  
  )
}