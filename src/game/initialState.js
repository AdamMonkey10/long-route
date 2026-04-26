import { SYSTEMS } from '../data/systems.js'
import { generateMarket } from './utils.js'

export function makeInitialState() {
  const markets = {}
  Object.keys(SYSTEMS).forEach(id => {
    markets[id] = generateMarket(id)
  })
  return {
    view: 'nameEntry',
    playerName: '',
    credits: 500,
    hull: 100,
    maxHull: 100,
    cargo: [],
    cargoMax: 20,
    weapons: 0,
    shields: 0,
    engine: 0,
    upgrades: [],
    flags: {},
    trades: [],
    totalProfit: 0,
    totalLoss: 0,
    creditsEarned: 0,
    combineStanding: 0,
    frontierSympathy: 0,
    inesTrust: 0,
    currentSystem: 'portsmith',
    currentLocation: null,
    visitedSystems: ['portsmith'],
    markets,
    npcSeen: {},
    dialogue: null,
    combat: null,
    combatLog: [],
    event: null,
    gameLog: [
      "You have inherited a ship with a name you didn't choose and a history you don't know. The Persistent Delusion. It'll do.",
    ],
    notification: null,
  }
}
