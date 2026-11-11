'use client'

import { useRowLabel } from '@payloadcms/ui'

export const ItemRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ label?: string }>()
  return (
    <div className="item-row-label" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span>{data?.label || `Item ${(rowNumber ?? 0) + 1}`}</span>
      <span>right-aligned</span>
    </div>
  )
}
