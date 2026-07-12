export type PackageDetails = {
  totalTests: number
  description: string
  categories: {
    id: string
    name: string
    count: string
    features: string[]
  }[]
  orgPrice: string
  disPrice: string
  offerPercentage: string
  extraFeatures: string[]
}

export type MiniPackage = {
  id: string
  benefits: string[]
  orgPrice: string
  disPrice: string
  offerPercent: string
  extraFeatures: string[]
}
