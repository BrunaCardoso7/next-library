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
  width = 60,
  height = 38,
  className,
  ...props
}: LogoProps) {
  return (
    <div className="flex items-center gap-1 flex-row">
      <a href="https://mebruna.netlify.app/" className="flex items-center gap-3 group">
        <Image
          src={src}
          width={width}
          height={height}
          className="h-6 w-auto"
          alt={alt}
          priority
        />
        <span className="font-mono font-semibold text-base text-foreground group-hover:text-primary transition-colors">
          BrunaCardoso7
        </span>
      </a>
      
      <span>|</span>
      <div className="text-md">
        <p className="text-xs text-muted-foreground">Livraria</p>
      </div>
    </div>
  )
}