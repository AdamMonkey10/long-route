import { SYSTEMS } from '../data/systems.js'
import { COMMODITIES } from '../data/commodities.js'
import { ENEMIES } from '../data/enemies.js'
import { EVENTS } from '../data/events.js'
import { UPGRADES } from '../data/upgrades.js'
import {
  rng,
  generateMarket,
  travelCost,
  cargoUsed,
  playerFireDamage,
  playerRepairAmount,
  getEnemyAction,
} from './utils.js'
import {
  applyStanding,
  combatChanceMultiplier,
  forcedEnemy,
  EVENT_STANDING_DELTAS,
  COMBAT_KILL_DELTAS,
} from './standings.js'
import { pickEntryNode } from './dialogue.js'

const LOG_LIMIT = 60
const TRADES_LIMIT = 100

const prepend = (msg, log) => [msg, ...log].slice(0, LOG_LIMIT)

export function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state

    case 'NEW_GAME':
      return action.state

    case 'SET_NAME':
      return { ...state, playerName: action.name, view: 'map' }

    case 'GO_LOCATION': {
      let ns = { ...state, view: 'station', currentLocation: action.id }
      const eff = action.effect
      // visitEffect on the location is applied once per location id, tracked
      // via flag — so re-entering doesn't keep stacking penalties.
      if (eff && !state.flags?.[`visited_${state.currentSystem}_${action.id}`]) {
        ns.flags = { ...ns.flags, [`visited_${state.currentSystem}_${action.id}`]: true }
        if (eff.flag) {
          ns.flags = { ...ns.flags, [eff.flag]: true }
          ns.gameLog = prepend(`⚠ ${eff.flag.replace(/_/g, ' ')} flagged.`, ns.gameLog)
        }
        if (eff.combine || eff.frontier) {
          ns = applyStanding(ns, { combine: eff.combine || 0, frontier: eff.frontier || 0 })
        }
      }
      return ns
    }
    case 'BACK_TO_CONCOURSE':
      return { ...state, view: 'station', currentLocation: null }

    case 'NOTIFY':
      return { ...state, notification: action.msg }
    case 'CLEAR_NOTIFY':
      return { ...state, notification: null }

    case 'GOTO_MAP':
      return { ...state, view: 'map', dialogue: null }
    case 'GOTO_STATION':
      return { ...state, view: 'station', currentLocation: action.location ?? null }
    case 'GOTO_LOG':
      return { ...state, view: 'log' }
    case 'GOTO_LEDGER':
      return { ...state, view: 'ledger' }
    case 'GOTO_SETTINGS':
      return { ...state, view: 'settings' }

    case 'START_TRAVEL': {
      const sys = SYSTEMS[action.to]
      const cost = travelCost(action.to, state.engine)
      if (state.credits < cost) {
        return { ...state, notification: `Not enough credits for fuel (need ${cost})` }
      }
      const forced = forcedEnemy(state, sys)
      const effectiveChance = sys.combatChance * combatChanceMultiplier(state, sys)
      const combatRoll = Math.random() * 100
      let event = null
      let combat = null

      if (forced) {
        const eType = ENEMIES.find(e => e.id === forced)
        if (eType) {
          const enemy = { ...eType, hull: eType.maxHull, patternIdx: 0 }
          combat = { enemy, playerAP: 3, playerEvading: false, turn: 1, log: [eType.intro] }
        }
      }

      if (!combat && combatRoll < effectiveChance) {
        const enemyTypes = ENEMIES.filter(e =>
          sys.faction === 'Combine' ? e.id === 'patrol' : e.id !== 'patrol',
        )
        const eType = enemyTypes[rng(0, enemyTypes.length - 1)]
        const enemy = { ...eType, hull: eType.maxHull, patternIdx: 0 }
        combat = {
          enemy,
          playerAP: 3,
          playerEvading: false,
          turn: 1,
          log: [eType.intro],
        }
      } else if (!combat) {
        event = EVENTS[rng(0, EVENTS.length - 1)]
      }
      const newMarkets = { ...state.markets, [action.to]: generateMarket(action.to) }
      const visited = state.visitedSystems.includes(action.to)
        ? state.visitedSystems
        : [...state.visitedSystems, action.to]
      const log = prepend(
        `Jumped to ${sys.name}. Fuel cost: ${cost} credits.`,
        state.gameLog,
      )
      return {
        ...state,
        credits: state.credits - cost,
        currentSystem: action.to,
        currentLocation: null,
        visitedSystems: visited,
        markets: newMarkets,
        view: combat ? 'combat' : event ? 'event' : 'station',
        combat: combat || null,
        event: event || null,
        combatLog: combat ? [combat.log[0]] : [],
        gameLog: log,
      }
    }

    case 'RESOLVE_EVENT': {
      const opt = action.option
      let ns = { ...state, event: null, view: 'station', currentLocation: null }
      const addLog = msg => {
        ns.gameLog = prepend(msg, ns.gameLog)
      }

      // Apply faction standing deltas keyed off "<eventId>.<optionIdx>"
      const deltaKey = `${state.event?.id}.${action.optionIdx}`
      const delta = EVENT_STANDING_DELTAS[deltaKey]
      if (delta) ns = applyStanding(ns, delta)

      if (opt.type === 'hull') {
        ns.hull = Math.max(1, state.hull + opt.value)
        addLog(opt.msg)
      } else if (opt.type === 'credits') {
        ns.credits = Math.max(0, state.credits + opt.value)
        addLog(opt.msg)
      } else if (opt.type === 'pay') {
        ns.credits = Math.max(0, state.credits - opt.value)
        addLog(opt.msg)
      } else if (opt.type === 'gamble') {
        if (Math.random() > 0.45) {
          if (opt.win.credits) ns.credits = Math.max(0, ns.credits + opt.win.credits)
          if (opt.win.hull) ns.hull = Math.min(state.maxHull, ns.hull + opt.win.hull)
          addLog(opt.win.msg)
        } else {
          if (opt.lose.credits) ns.credits = Math.max(0, ns.credits + opt.lose.credits)
          if (opt.lose.hull) ns.hull = Math.max(1, ns.hull + opt.lose.hull)
          addLog(opt.lose.msg)
        }
      } else if (opt.type === 'flag') {
        ns.flags = { ...state.flags, [opt.flag]: true }
        addLog(opt.msg)
      } else if (opt.type === 'info_trade') {
        const cargoItem = state.cargo.find(c => c.id === opt.need)
        if (cargoItem && cargoItem.qty >= opt.qty) {
          ns.cargo = state.cargo
            .map(c => (c.id === opt.need ? { ...c, qty: c.qty - opt.qty } : c))
            .filter(c => c.qty > 0)
          addLog(opt.msg)
        } else {
          addLog(`You don't have enough ${opt.need} to trade.`)
        }
      } else if (opt.type === 'give_cargo') {
        const ci = state.cargo.find(c => c.id === opt.id)
        if (!ci || ci.qty < opt.qty) {
          return { ...state, notification: `Need ${opt.qty}× ${opt.id}.` }
        }
        ns.cargo = state.cargo
          .map(c => (c.id === opt.id ? { ...c, qty: c.qty - opt.qty } : c))
          .filter(c => c.qty > 0)
        addLog(opt.msg)
      } else if (opt.type === 'add_cargo') {
        const used = cargoUsed(state.cargo)
        if (used + opt.qty > state.cargoMax) {
          return { ...state, notification: 'Not enough cargo space.' }
        }
        const comm = COMMODITIES.find(c => c.id === opt.id) || { name: opt.id, color: '#808080' }
        const existing = state.cargo.find(c => c.id === opt.id)
        ns.cargo = existing
          ? state.cargo.map(c => (c.id === opt.id ? { ...c, qty: c.qty + opt.qty } : c))
          : [...state.cargo, { id: opt.id, name: comm.name, qty: opt.qty, buyPrice: 0, color: comm.color }]
        addLog(opt.msg)
      } else {
        addLog(opt.msg || 'You continue on your way.')
      }
      return ns
    }

    case 'BUY': {
      const market = state.markets[state.currentSystem]
      const item = market[action.id]
      const comm = COMMODITIES.find(c => c.id === action.id)
      const qty = action.qty
      const cost = item.price * qty
      if (state.credits < cost) return { ...state, notification: 'Not enough credits.' }
      if (cargoUsed(state.cargo) + qty > state.cargoMax) {
        return { ...state, notification: 'Not enough cargo space.' }
      }
      if (item.qty < qty) return { ...state, notification: 'Not enough stock available.' }

      const existing = state.cargo.find(c => c.id === action.id)
      const newCargo = existing
        ? state.cargo.map(c =>
            c.id === action.id
              ? {
                  ...c,
                  qty: c.qty + qty,
                  // weighted-average buy price across stacks
                  buyPrice: Math.round(
                    (c.buyPrice * c.qty + item.price * qty) / (c.qty + qty),
                  ),
                }
              : c,
          )
        : [...state.cargo, { id: action.id, name: comm.name, qty, buyPrice: item.price, color: comm.color }]
      const newMarket = { ...market, [action.id]: { ...item, qty: item.qty - qty } }
      const log = prepend(
        `Bought ${qty}× ${comm.name} for ${cost}cr at ${item.price}cr/unit.`,
        state.gameLog,
      )
      const trade = {
        type: 'buy',
        id: action.id,
        name: comm.name,
        color: comm.color,
        qty,
        price: item.price,
        total: cost,
        system: SYSTEMS[state.currentSystem].name,
      }
      return {
        ...state,
        credits: state.credits - cost,
        cargo: newCargo,
        markets: { ...state.markets, [state.currentSystem]: newMarket },
        gameLog: log,
        trades: [trade, ...(state.trades || [])].slice(0, TRADES_LIMIT),
      }
    }

    case 'SELL': {
      const market = state.markets[state.currentSystem]
      const item = market[action.id]
      const comm = COMMODITIES.find(c => c.id === action.id)
      const cargoItem = state.cargo.find(c => c.id === action.id)
      if (!cargoItem) return state
      const qty = Math.min(action.qty, cargoItem.qty)
      if (qty <= 0) return state
      const revenue = item.price * qty
      const profit = (item.price - cargoItem.buyPrice) * qty
      const newCargo = state.cargo
        .map(c => (c.id === action.id ? { ...c, qty: c.qty - qty } : c))
        .filter(c => c.qty > 0)
      const newMarket = { ...market, [action.id]: { ...item, qty: item.qty + qty } }
      const profitStr = profit >= 0 ? `+${profit}` : `${profit}`
      const log = prepend(
        `Sold ${qty}× ${comm.name} for ${revenue}cr (${profitStr} profit).`,
        state.gameLog,
      )
      const earned = state.creditsEarned + Math.max(0, profit)
      const trade = {
        type: 'sell',
        id: action.id,
        name: comm.name,
        color: comm.color,
        qty,
        price: item.price,
        buyPrice: cargoItem.buyPrice,
        profitPerUnit: item.price - cargoItem.buyPrice,
        total: revenue,
        profit,
        system: SYSTEMS[state.currentSystem].name,
      }
      const nTP = (state.totalProfit || 0) + (profit > 0 ? profit : 0)
      const nTL = (state.totalLoss || 0) + (profit < 0 ? -profit : 0)
      return {
        ...state,
        credits: state.credits + revenue,
        cargo: newCargo,
        markets: { ...state.markets, [state.currentSystem]: newMarket },
        gameLog: log,
        creditsEarned: earned,
        trades: [trade, ...(state.trades || [])].slice(0, TRADES_LIMIT),
        totalProfit: nTP,
        totalLoss: nTL,
      }
    }

    case 'REPAIR': {
      const amt = action.amt
      const cost = amt * 5
      if (state.credits < cost) return { ...state, notification: 'Not enough credits.' }
      if (state.hull >= state.maxHull) {
        return { ...state, notification: 'Hull is already at maximum.' }
      }
      const newHull = Math.min(state.maxHull, state.hull + amt)
      const log = prepend(
        `Repaired ${newHull - state.hull} hull points for ${cost} credits.`,
        state.gameLog,
      )
      return { ...state, credits: state.credits - cost, hull: newHull, gameLog: log }
    }

    case 'BUY_UPGRADE': {
      const upg = UPGRADES.find(u => u.id === action.id)
      if (!upg) return state
      if (state.credits < upg.cost) return { ...state, notification: 'Not enough credits.' }
      if (upg.req && !state.upgrades.includes(upg.req)) {
        return { ...state, notification: 'Prerequisite upgrade required.' }
      }
      if (state.upgrades.includes(upg.id)) {
        return { ...state, notification: 'Already installed.' }
      }
      let ns = { ...state, credits: state.credits - upg.cost, upgrades: [...state.upgrades, upg.id] }
      if (upg.effect === 'cargo') ns = { ...ns, cargoMax: ns.cargoMax + upg.value }
      else if (upg.effect === 'engine') ns = { ...ns, engine: ns.engine + upg.value }
      else if (upg.effect === 'weapons') ns = { ...ns, weapons: ns.weapons + upg.value }
      else if (upg.effect === 'shields') ns = { ...ns, shields: ns.shields + upg.value }
      else if (upg.effect === 'hull') {
        ns = {
          ...ns,
          maxHull: ns.maxHull + upg.value,
          hull: Math.min(ns.hull + upg.value, ns.maxHull + upg.value),
        }
      }
      const log = prepend(`Installed: ${upg.name}.`, state.gameLog)
      return { ...ns, gameLog: log }
    }

    case 'START_DIALOGUE': {
      // Increment visit count BEFORE entry matching so `requireMinVisits: N`
      // means "this is at least your Nth visit including the current one".
      const npc = action.npc
      const npcId = action.npcId
      const visits = (state.npcVisits?.[npcId] || 0) + 1
      const staged = {
        ...state,
        npcVisits: { ...state.npcVisits, [npcId]: visits },
      }
      const startNode = pickEntryNode(staged, npc, npcId)
      const root = npc?.tree?.[startNode]
      let ns = {
        ...staged,
        view: 'dialogue',
        dialogue: { npcId, nodeId: startNode },
        npcSeen: { ...state.npcSeen, [npcId]: true },
      }
      if (root?.flagsOnEnter) {
        for (const f of root.flagsOnEnter) {
          ns.flags = { ...ns.flags, [f]: true }
        }
      }
      return ns
    }

    case 'CHOOSE_OPTION': {
      const opt = action.option
      if (!opt) return { ...state, view: 'station', dialogue: null }
      if (opt.requireCargo) {
        const c = state.cargo.find(x => x.id === opt.requireCargo)
        if (!c || c.qty < opt.requireQty) {
          return {
            ...state,
            notification: `You need ${opt.requireQty} ${opt.requireCargo} for this.`,
          }
        }
      }
      let ns = { ...state }
      if (opt.costCargo) {
        ns.cargo = ns.cargo
          .map(c => (c.id === opt.costCargo ? { ...c, qty: c.qty - opt.costQty } : c))
          .filter(c => c.qty > 0)
      }
      if (opt.flag) {
        ns.flags = { ...ns.flags, [opt.flag]: true }
        ns.gameLog = prepend(opt.flagLabel || `Discovery: ${opt.flag}`, ns.gameLog)
      }
      if (opt.combineDelta || opt.frontierDelta) {
        ns = applyStanding(ns, {
          combine: opt.combineDelta || 0,
          frontier: opt.frontierDelta || 0,
        })
      }
      if (opt.inesTrustDelta) {
        ns = { ...ns, inesTrust: (ns.inesTrust || 0) + opt.inesTrustDelta }
      }
      if (opt.giveItem === 'data_core') {
        ns.flags = { ...ns.flags, has_data_core: true }
        ns.gameLog = prepend(
          "[You receive Edda's encrypted data core. It's surprisingly light for something this important.]",
          ns.gameLog,
        )
      }

      // Ines confrontation roll: telling her everything is genuinely 50/50.
      if (opt.inesOutcome === 'random') {
        if (Math.random() < 0.5) {
          ns.flags = { ...ns.flags, ines_asset: true }
          ns.gameLog = prepend('🤝 Ines decided to trust you. (Inside source.)', ns.gameLog)
        } else {
          ns.flags = { ...ns.flags, ines_reported: true }
          ns = applyStanding(ns, { combine: -30 })
          ns.gameLog = prepend('⚠ Ines reported the conversation. Combine standing fell hard.', ns.gameLog)
        }
      }

      // Fire flagsOnEnter for the destination node, if the action passes the
      // NPC tree along (DialogueScreen does so).
      if (opt.go && action.npc?.tree?.[opt.go]?.flagsOnEnter) {
        for (const f of action.npc.tree[opt.go].flagsOnEnter) {
          ns.flags = { ...ns.flags, [f]: true }
        }
      }

      if (!opt.go) return { ...ns, view: 'station', dialogue: null }
      return { ...ns, dialogue: { npcId: ns.dialogue.npcId, nodeId: opt.go } }
    }

    case 'COMBAT_ACTION': {
      if (!state.combat) return state
      const newCombat = { ...state.combat }
      let newCombatLog = [...state.combatLog]
      let workingHull = state.hull

      const { current: enemyAct } = getEnemyAction(newCombat.enemy, newCombat.enemy.patternIdx)

      if (action.act === 'fire') {
        if (newCombat.playerAP < 1) return { ...state, notification: 'Not enough AP.' }
        const dmg = playerFireDamage(state.weapons)
        const dodged = enemyAct === 'evade' || enemyAct === 'defend'
        const actualDmg = dodged ? Math.floor(dmg * 0.5) : dmg
        newCombat.enemy = {
          ...newCombat.enemy,
          hull: Math.max(0, newCombat.enemy.hull - actualDmg),
        }
        newCombat.playerAP -= 1
        newCombatLog = [
          `Your fire: ${actualDmg} damage${dodged ? ' (evaded!)' : ''}.`,
          ...newCombatLog,
        ]
      } else if (action.act === 'overload') {
        if (newCombat.playerAP < 2) return { ...state, notification: 'Need 2 AP for overload.' }
        const dmg = playerFireDamage(state.weapons) * 2
        const dodged = enemyAct === 'evade' || enemyAct === 'defend'
        const actualDmg = dodged ? Math.floor(dmg * 0.5) : dmg
        newCombat.enemy = {
          ...newCombat.enemy,
          hull: Math.max(0, newCombat.enemy.hull - actualDmg),
        }
        newCombat.playerAP -= 2
        newCombatLog = [
          `OVERLOAD: ${actualDmg} damage${dodged ? ' (evaded!)' : ''}!`,
          ...newCombatLog,
        ]
      } else if (action.act === 'evade') {
        if (newCombat.playerAP < 1) return { ...state, notification: 'Not enough AP.' }
        newCombat.playerEvading = true
        newCombat.playerAP -= 1
        newCombatLog = ['Evasive manoeuvre: half damage this turn.', ...newCombatLog]
      } else if (action.act === 'repair') {
        if (newCombat.playerAP < 2) return { ...state, notification: 'Need 2 AP for repairs.' }
        const repAmt = playerRepairAmount(state.shields)
        workingHull = Math.min(state.maxHull, state.hull + repAmt)
        newCombat.playerAP -= 2
        newCombatLog = [`Emergency repair: +${repAmt} hull.`, ...newCombatLog]
      } else if (action.act === 'end_turn') {
        const enemy = newCombat.enemy
        const dmgBase = enemy.damage + (state.shields > 0 ? -state.shields * 3 : 0)
        if (enemyAct === 'attack') {
          let incoming = Math.max(2, dmgBase + rng(-3, 5))
          if (newCombat.playerEvading) incoming = Math.floor(incoming * 0.5)
          workingHull = Math.max(0, workingHull - incoming)
          newCombatLog = [
            `${enemy.name} attacks: ${incoming} damage${newCombat.playerEvading ? ' (you evaded: half)' : ''}.`,
            ...newCombatLog,
          ]
        } else if (enemyAct === 'heavy_attack') {
          let incoming = Math.max(2, Math.floor(dmgBase * 1.8) + rng(-3, 5))
          if (newCombat.playerEvading) incoming = Math.floor(incoming * 0.5)
          workingHull = Math.max(0, workingHull - incoming)
          newCombatLog = [
            `${enemy.name} HEAVY STRIKE: ${incoming} damage!`,
            ...newCombatLog,
          ]
        } else if (enemyAct === 'scan') {
          newCombatLog = [
            `${enemy.name} scans your manifest. Thinks about this. Attacks anyway.`,
            ...newCombatLog,
          ]
        } else {
          newCombatLog = [`${enemy.name} ${enemyAct}s. No damage.`, ...newCombatLog]
        }
        newCombat.enemy = { ...newCombat.enemy, patternIdx: newCombat.enemy.patternIdx + 1 }
        newCombat.playerAP = 3
        newCombat.playerEvading = false
        newCombat.turn = newCombat.turn + 1
      }

      // Victory
      if (newCombat.enemy.hull <= 0) {
        const reward = newCombat.enemy.credits
        const log = prepend(
          reward > 0
            ? `Victory! ${newCombat.enemy.name} disabled. Salvage: ${reward} credits.`
            : `${newCombat.enemy.name} stands down. No salvage.`,
          state.gameLog,
        )
        let after = {
          ...state,
          combat: null,
          combatLog: [],
          hull: workingHull,
          credits: state.credits + reward,
          view: 'station',
          currentLocation: null,
          gameLog: log,
        }
        const killDelta = COMBAT_KILL_DELTAS[newCombat.enemy.id]
        if (killDelta) after = applyStanding(after, killDelta)
        return after
      }

      // Defeat
      if (workingHull <= 0) {
        const log = prepend(
          `The ${newCombat.enemy.name} overwhelms you. Emergency landing. Hull critical. You lose your cargo.`,
          state.gameLog,
        )
        return {
          ...state,
          combat: null,
          combatLog: [],
          hull: 10,
          cargo: [],
          view: 'station',
          currentLocation: null,
          gameLog: log,
          notification: 'SHIP CRITICAL — All cargo lost. Pay for repairs immediately.',
        }
      }

      return {
        ...state,
        hull: workingHull,
        combat: newCombat,
        combatLog: newCombatLog.slice(0, 8),
      }
    }

    default:
      return state
  }
}
