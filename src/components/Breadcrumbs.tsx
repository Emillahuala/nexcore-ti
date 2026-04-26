'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;

  const paths = pathname.split('/').filter((p) => p);

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6 mb-4 text-sm text-gray-500">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const isLast = index === paths.length - 1;
          const label = path.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={path} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:text-blue-600 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
