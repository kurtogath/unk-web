type VCardProps = {
  name: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  web?: string;
};

export default function VerticalCard({
  name,
  imageSrc,
  imageAlt = "",
  href,
  className,
  web = "",
}: VCardProps) {
  const body = (
    <div
      className={`rounded-xl border border-white/15 overflow-hidden bg-black/30 cursor-pointer ${
        className ?? ""
      }`}
      onClick={() => window.open(web, "_blank", "noopener,noreferrer")}
    >
      <img src={imageSrc} alt={imageAlt} className="w-full h-56 object-cover" />
      <div className="p-3">
        <div className="text-lg font-bold">{name}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-95 transition">
      {body}
    </a>
  ) : (
    body
  );
}
