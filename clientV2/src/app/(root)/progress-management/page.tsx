'use client'
import { Loader } from '@/components/componentsV2/atoms/loader'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CapexManagement: React.FC = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/progress-management/incoming')
  }, [router])
  return (
    <div className="w-[100%] h-[100%] items-center justify-center grid">
      <Loader text="Redirecting..." />
    </div>
  )
}
export default CapexManagement
