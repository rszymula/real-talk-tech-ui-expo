import { companies } from "./DiscoverService"

const promos = [
  {
    id: 1,
    companyId: 1,
    previous: 12,
    current: 10.8,
    units: "/user/month",
  },  
]

export const getCompaniesWithPromos = (page = 0, count = 5) => {
  const paginated = promos.filter((promo, idx) => idx >= page * count && idx < (page + 1) * count)
  const res = paginated.map(promo => ({
    ...promo,
    ...companies.find(company => company.id === promo.companyId)
  }))
  return res;
}
