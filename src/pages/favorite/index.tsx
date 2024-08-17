import Favorites from '@/components/home/Favorite'
import { Layout } from '@/components/layout'
import React from 'react'

export default function HomePage() {
  return (
    <Layout title='Home'>
      <Favorites />
    </Layout>
  )
}
