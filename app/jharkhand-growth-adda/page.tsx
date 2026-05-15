import type { Metadata } from 'next'
import { SITE } from '@/lib/data'
import JGAClient from './JGAClient'

export const metadata: Metadata = {
  title: 'Jharkhand Growth Adda™ — Local Connections. Digital Growth.',
  description:
    'A free community for Jharkhand business owners, founders and professionals to connect, learn, collaborate and grow digitally. Join 10,000+ businesses.',
  keywords: [
    'Jharkhand business community', 'Ranchi business network', 'Jharkhand Growth Adda',
    'digital marketing Jharkhand', 'business owners Ranchi', 'local business network Jharkhand',
    'Jharkhand entrepreneur community', 'Scalify Labs community',
  ],
  alternates: { canonical: `${SITE.url}/jharkhand-growth-adda` },
  openGraph: {
    title: 'Jharkhand Growth Adda™ — Local Connections. Digital Growth.',
    description: 'Free community for Jharkhand business owners to connect, learn and grow digitally. Join now.',
    url: `${SITE.url}/jharkhand-growth-adda`, type: 'website', siteName: SITE.name,
  },
}

export default function JGAPage() {
  return <JGAClient />
}
