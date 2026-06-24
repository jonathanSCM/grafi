import { notFound } from 'next/navigation';
import type { Profile } from '@/lib/types';
import ProfileView from './ProfileView';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

async function getProfile(slug: string): Promise<Profile | null> {
  const res = await fetch(`${API_URL}/profiles/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getProfile(slug);
  if (!profile) notFound();

  return <ProfileView profile={profile} />;
}
