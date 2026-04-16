import { Skeleton } from '@/components/ui/skeleton'

export default function AboutLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4 mx-auto mt-2" />
        </div>

        {/* Stats Skeleton */}
        <div className="bg-primary py-16 mb-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-12 w-24 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-5 w-32 mx-auto bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <Skeleton className="aspect-video rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>

        {/* Values Skeleton */}
        <div className="bg-surface py-16 mb-16">
          <div className="container-custom">
            <Skeleton className="h-8 w-48 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-background p-6 rounded-2xl text-center">
                  <Skeleton className="w-14 h-14 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
