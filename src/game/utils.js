import { SYSTEMS } from '../data/systems.js'
import { COMMODITIES } from '../data/commodities.js'

export function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateMarket(systemId) {
  const sys = SYSTEMS[systemId]
  const market = {}
  COMMODITIES.forEach(c => {
    let price = c.base
    if (sys.cheap?.includes(c.id)) price = Math.floor(price * 0.65)
    else if (sys.expensive?.includes(c.id)) price = Math.floor(price * 1.45)
    price = Math.floor(price * (0.9 + Math.random() * 0.2))
    market[c.id] = { price, qty: rng(5, 20) }
  })
  return market
}

export function travelCost(systemId, engineLevel) {
  const base = SYSTEMS[systemId].fuelCost
  const mult = engineLevel === 0 ? 1 : engineLevel === 1 ? 0.75 : 0.5
  return Math.floor(base * mult)
}

export function cargoUsed(cargo) {
  return cargo.reduce((t, c) => t + c.qty, 0)
}

export function playerFireDamage(weaponsLevel) {
  return rng(8, 14) + weaponsLevel * 10
}

export function playerFireDamageRange(weaponsLevel) {
  return { min: 8 + weaponsLevel * 10, max: 14 + weaponsLevel * 10 }
}

export function playerRepairAmount(shieldsLevel) {
  return 15 + shieldsLevel * 5
}

export function getEnemyAction(enemy, patternIdx) {
  const pattern = enemy.pattern
  const action = pattern[patternIdx % pattern.length]
  const nextAction = pattern[(patternIdx + 1) % pattern.length]
  return { current: action, next: nextAction }
}

export function formatIntent(action, damage) {
  const map = {
    attack: `⚔ Attack (~${damage} dmg)`,
    evade: '◆ Evade (half dmg)',
    defend: '◆ Defend (half dmg)',
    charge: '⚡ Charging…',
    heavy_attack: `✦ HEAVY (~${(damage * 1.8) | 0} dmg)`,
    scan: '◉ Scan manifest',
  }
  return map[action] || action
}

export function canUnlockSystem(state, sys) {
  if (!sys.locked) return true
  const r = sys.unlockReq
  if (!r) return false
  if (r.type === 'credits') return (state.creditsEarned || 0) >= r.amount || state.credits >= r.amount
  if (r.type === 'flag') return !!state.flags[r.flag]
  return false
}
