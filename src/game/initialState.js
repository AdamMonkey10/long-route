import { SYSTEMS } from '../data/systems.js'
import { generateMarket } from './utils.js'
import { makeInitialArc7 } from './arc7.js'

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
    combatChanceMod: 0,
    fuelMod: 0,
    hiddenCompartment: false,
    currentSystem: 'portsmith',
    currentLocation: null,
    visitedSystems: ['portsmith'],
    markets,
    npcSeen: {},
    npcVisits: {},
    dialogue: null,
    combat: null,
    combatLog: [],
    event: null,
    gameLog: [
      "You have inherited a ship with a name you didn't choose and a history you don't know. The Persistent Delusion. It'll do.",
    ],
    notification: null,
    arc7: makeInitialArc7(),
    devlin: {
      gamesPlayed: 0,
      playerWins: 0,
      devlinWins: 0,
      grudgeLevel: 0,
      friendshipLevel: 0,
      finalGamePlayed: false,
      finalGameOutcome: null,
      reappearedFlag: false,
    },
    gambling: null,
  }
}
