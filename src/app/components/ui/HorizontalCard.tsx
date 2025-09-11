type HCardProps = {
  title: string;
  subtitle?: string;
  description?: string | React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  variant?: "image-left" | "image-right" | "overlay";
  className?: string;
};

export default function HorizontalCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt = "",
  href,
  variant = "image-left",
  className,
}: HCardProps) {
  const Content = (
    <div
      className={`rounded-xl border border-white/15 overflow-hidden bg-black/30 ${
        className ?? ""
      }`}
    >
      {/* variantes con grid */}
      {(variant === "image-left" || variant === "image-right") && (
        <div className={`grid md:grid-cols-2`}>
          {/* imagen */}
          <div className={`${variant === "image-right" ? "md:order-2" : ""}`}>
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-48 md:h-full w-full object-cover"
            />
          </div>
          {/* texto */}
          <div className="p-5 flex flex-col justify-center gap-2">
            {subtitle && (
              <span className="text-xs uppercase tracking-widest opacity-70">
                {subtitle}
              </span>
            )}
            <h3 className="text-2xl font-bold">{title}</h3>
            {description && (
              <div className="text-sm opacity-80">{description}</div>
            )}
          </div>
        </div>
      )}

      {/* overlay */}
      {variant === "overlay" && (
        <div className="relative h-56 md:h-64">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full p-6 flex flex-col justify-center">
            {subtitle && (
              <span className="text-xs uppercase tracking-widest opacity-80">
                {subtitle}
              </span>
            )}
            <h3 className="text-3xl font-extrabold">{title}</h3>
            {description && (
              <div className="mt-2 text-sm max-w-lg opacity-90">
                {description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-95 transition">
      {Content}
    </a>
  ) : (
    Content
  );
}
