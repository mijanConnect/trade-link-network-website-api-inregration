


import LeadDetailsComponents from '@/components/trade-person/leadsComponents/LeadDetailsComponents'
import React from 'react'

export const Metadata = {
  title: 'Lead Details',
  description: 'Lead Details',
  keywords: 'Lead Details ',
  authors: [{ name: 'TradeLink Network' }],
robots: {
  index: false,
  follow: false,
}
  ,
  openGraph: {
    title: 'Lead Details',
    description: 'Lead Details',
    url: 'https://www.tradelinknetwork.com/leads/[leadId]',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Details',
    description: 'Lead Details',
    images: ['https://www.tradelinknetwork.com/leads/[leadId].png'],
  },
}

const LeadDetailPage = () => {
  return (
    <div>
        <LeadDetailsComponents />
    </div>
  )
}

export default LeadDetailPage