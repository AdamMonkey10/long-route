export const COMMODITIES = [
  { id: 'food', name: 'Foodstuffs', color: '#7ec850', base: 28 },
  { id: 'ore', name: 'Raw Ore', color: '#c87840', base: 45 },
  { id: 'components', name: 'Components', color: '#5090d0', base: 75 },
  { id: 'tech', name: 'Technology', color: '#50d0c0', base: 140 },
  { id: 'luxury', name: 'Luxury Goods', color: '#d0a050', base: 190 },
  { id: 'medical', name: 'Medical Supplies', color: '#d05050', base: 110 },
  { id: 'contraband', name: 'Grey Market Goods', color: '#9050d0', base: 280 },
]

export const COMMODITY_BY_ID = Object.fromEntries(COMMODITIES.map(c => [c.id, c]))
