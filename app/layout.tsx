import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  // Abstract where we position (description), specific where people search
  // (title, service cards) — "CRM" is a high-intent search term worth keeping.
  title: 'nodexa — Aplicații custom, CRM-uri și agenți AI',
  description:
    'Nodexa construiește software pe măsură pentru companii în creștere din România — ca să servești mai mulți clienți fără să îți dublezi echipa.',
  openGraph: {
    title: 'nodexa — Aplicații custom, CRM-uri și agenți AI',
    description:
      'Procesele care funcționau la 5 oameni se rup la 25. Construim software care ține pasul cu creșterea ta.',
    locale: 'ro_RO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
