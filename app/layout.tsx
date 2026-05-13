import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { SITE } from '@/lib/data'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Digital Marketing Agency Ranchi`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'digital marketing agency ranchi',
    'seo services ranchi',
    'google ads ranchi',
    'meta ads jharkhand',
    'whatsapp marketing india',
    'scalify labs',
  ],
  authors: [{ name: SITE.founder }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Digital Marketing Agency Ranchi`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Digital Marketing Agency Ranchi`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
