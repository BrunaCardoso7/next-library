import Header from "@/components/shared/header"

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen flex flex-col">
      <main className="flex flex-col flex-1 ">{children}</main>
    </div>  
  )
}