'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<{
    text: string
    color: string
    is_active: boolean
  } | null>(null)

  useEffect(() => {
    async function fetchAnnouncement() {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'announcement_bar')
        .single()

      if (data?.value) {
        setAnnouncement(data.value as { text: string; color: string; is_active: boolean })
      }
    }

    fetchAnnouncement()
  }, [])

  if (!announcement?.is_active || !announcement.text) {
    return null
  }

  return (
    <motion.div
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      className="w-full py-2.5 px-4 text-center text-sm font-medium text-white"
      style={{ backgroundColor: announcement.color || '#E94560' }}
    >
      <p>{announcement.text}</p>
    </motion.div>
  )
}
