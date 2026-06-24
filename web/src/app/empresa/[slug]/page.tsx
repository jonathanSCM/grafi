import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { resolveProfileStyle } from '@/lib/profile-style';
import CatalogList from '@/components/CatalogList';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

interface Collaborator {
  slug: string;
  fullName: string;
  position: string | null;
  photo: string | null;
}

interface CompanyPublic {
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  redirectEnabled: boolean;
  theme: 'LIGHT' | 'DARK';
  backgroundType: 'THEME' | 'SOLID' | 'GRADIENT';
  backgroundColor: string | null;
  backgroundTo: string | null;
  buttonColor: string | null;
  buttonTextColor: string | null;
  textColor: string | null;
  collaborators: Collaborator[];
}

interface CatalogItem {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  link: string | null;
}

async function getCompany(slug: string): Promise<CompanyPublic | null> {
  const res = await fetch(`${API_URL}/companies/public/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getCatalog(slug: string): Promise<CatalogItem[]> {
  const res = await fetch(`${API_URL}/companies/public/${slug}/catalog`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function CompanyPublicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = await getCompany(slug);
  if (!company) notFound();

  if (company.redirectEnabled && company.website) {
    redirect(company.website);
  }

  const catalog = await getCatalog(slug);

  const style = resolveProfileStyle(company);

  return (
    <main
      className="min-h-screen flex justify-center px-4 py-12"
      style={{ ...style.backgroundStyle, color: style.textColor }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          {company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-1 ring-black/5"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-semibold shadow-lg"
              style={{ backgroundColor: style.buttonBackground, color: style.buttonTextColor }}
            >
              {company.name.charAt(0).toUpperCase()}
            </div>
          )}
          <h1 className="text-xl font-semibold tracking-tight">{company.name}</h1>
          {company.description && (
            <p className="text-sm opacity-80 text-center leading-relaxed">{company.description}</p>
          )}
          <p className="text-xs opacity-60">{company.collaborators.length} perfiles</p>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-xs rounded-full px-4 py-1.5 font-medium transition mt-1 hover:opacity-90"
              style={{ backgroundColor: style.buttonBackground, color: style.buttonTextColor }}
            >
              Visitar sitio web ↗
            </a>
          )}
        </div>

        <div className="w-full flex flex-col gap-2">
          {company.collaborators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 border transition hover:opacity-90 shadow-sm"
              style={{
                backgroundColor: style.buttonBackground,
                borderColor: style.buttonBorder,
                color: style.buttonTextColor,
              }}
            >
              {c.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.photo} alt={c.fullName} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-sm font-semibold">
                  {c.fullName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{c.fullName}</p>
                {c.position && <p className="text-xs opacity-70">{c.position}</p>}
              </div>
            </Link>
          ))}
          {company.collaborators.length === 0 && (
            <p className="text-sm opacity-50 text-center py-8">Sin perfiles públicos todavía.</p>
          )}
        </div>

        <CatalogList items={catalog} textColor={style.textColor} />
      </div>
    </main>
  );
}
