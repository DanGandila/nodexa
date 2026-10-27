import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nodexa — Aplicații custom, CRM-uri & agenți AI',
  description:
    'Nodexa construiește aplicații web personalizate, CRM-uri și agenți AI care automatizează procesele afacerii tale. Studio de software din România.',
  openGraph: {
    title: 'nodexa — Aplicații custom, CRM-uri & agenți AI',
    description:
      'Transformăm procesele manuale în software la cheie: aplicații web custom, sisteme CRM și agenți AI care preiau munca repetitivă.',
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
