import Image from "next/image"

type LogoProps = React.ComponentProps<"div"> & {
  src: string
  alt?: string
  width?: number
  height?: number
}

export function Logo({
  src,
  alt = "Logo",
  width = 100,
  height = 38,
  className,
  ...props
}: LogoProps) {
  return (
    <div className="flex items-center gap-1 flex-row">

      <Image
        src={src}
        width={width}
        height={height}
        className="h-8 w-auto"
        alt={alt}
        priority
      />
      <span>|</span>
      <div className="text-md">
        <p className="text-xs text-muted-foreground">Livraria</p>
      </div>
    </div>
  )
}