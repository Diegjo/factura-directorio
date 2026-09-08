type Props = {
  name: string;
  sitioWeb: string;
  affiliateUrl?: string;
};

export function AffiliateCta({ name, sitioWeb, affiliateUrl }: Props) {
  const href = affiliateUrl && affiliateUrl.length > 0 ? affiliateUrl : sitioWeb;
  const isSponsored = Boolean(affiliateUrl && affiliateUrl.length > 0);

  return (
    <div className="rounded-lg border border-slate-300 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-900">
        ¿Quieres conocer {name}?
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Revisa precios y planes actuales en el sitio oficial. Este enlace es un
        placeholder de afiliado; no inventamos promociones.
      </p>
      <a
        href={href}
        target="_blank"
        rel={isSponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
        className="mt-4 inline-block rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Visitar {name}
      </a>
      {isSponsored && (
        <p className="mt-2 text-xs text-slate-500">
          Enlace con rel=&quot;sponsored&quot; (afiliado placeholder).
        </p>
      )}
    </div>
  );
}
