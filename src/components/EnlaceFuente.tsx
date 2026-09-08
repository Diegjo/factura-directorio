type Props = {
  url: string;
  nombre?: string;
};

export function EnlaceFuente({ url, nombre }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-ink-faint underline decoration-dotted underline-offset-2 hover:text-brand"
    >
      Fuente: {nombre ?? new URL(url).hostname.replace(/^www\./, "")} ↗
    </a>
  );
}
