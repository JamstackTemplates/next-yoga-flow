import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

const ROUTES = ['/', '/timetable/', '/classes/', '/teachers/', '/new-here/', '/contact/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
