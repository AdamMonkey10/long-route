import {
  ARC7_BOOT,
  ARC7_DESTINATIONS,
  ARC7_ACTIONS,
  ARC7_FLAGS,
  ARC7_RANDOM_POOL,
  ARC7_EXODUS_FINAL,
  FLAG_TRIGGER_KEYS,
} from '../data/arc7.js'
import { SYSTEMS } from '../data/systems.js'

// ─────────────────────────────────────────────────────────────
// Initial state
// ─────────────────────────────────────────────────────────────

export function makeInitialArc7() {
  return {
    currentMessage: null,
    hasNew: false,
    jumpCount: 0,
    collapsed: false,
    triggeredFlags: [],
    randomPoolUsed: [],
    combatHullCritFired: false,
    lastSystem: null,
  }
}

// ─────────────────────────────────────────────────────────────
// Internal: write a message into state.arc7
// ─────────────────────────────────────────────────────────────

export function setArc7(state, message, opts = {}) {
  if (!message) return state
  const arc7 = state.arc7 || makeInitialArc7()
  return {
    ...state,
    arc7: {
      ...arc7,
      currentMessage: message,
      hasNew: true,
      jumpCount: opts.isJump ? (arc7.jumpCount || 0) + 1 : arc7.jumpCount || 0,
      lastSystem: opts.system !== undefined ? opts.system : arc7.lastSystem,
    },
  }
}

// Fire a one-shot trigger by key. If the key is already in triggeredFlags,
// this is a no-op.
export function setArc7Once(state, key, message, opts = {}) {
  const arc7 = state.arc7 || makeInitialArc7()
  if ((arc7.triggeredFlags || []).includes(key)) return state
  const next = {
    ...state,
    arc7: { ...arc7, triggeredFlags: [...(arc7.triggeredFlags || []), key] },
  }
  return setArc7(next, message, opts)
}

// ─────────────────────────────────────────────────────────────
// Public helpers used by the reducer
// ─────────────────────────────────────────────────────────────

export function arc7Boot(state) {
  return setArc7Once(state, 'boot', ARC7_BOOT, { system: SYSTEMS[state.currentSystem]?.name })
}

// Fire a jump message. Order:
//   1. If leaving Exodus after game_complete → final message (sticky)
//   2. Destination first/revisit
//   3. Random transit observation
//
// `wasVisited` should reflect whether the player had visited this system
// BEFORE this jump (so the post-arrival state.visitedSystems already
// contains the destination — we want the previous-visit truth).
export function arc7Jump(state, sysId, wasVisited, fromSystemId) {
  const sysName = SYSTEMS[sysId]?.name || null
  const from = fromSystemId !== undefined ? fromSystemId : state.currentSystem

  // Exodus exit after game_complete: final farewell. Sticky — once shown,
  // becomes the permanent message.
  if (state.flags?.game_complete && from === 'exodus' && sysId !== 'exodus') {
    return setArc7Once(state, 'exodus_final', ARC7_EXODUS_FINAL, { isJump: true, system: sysName })
  }

  const dest = ARC7_DESTINATIONS[sysId]
  const visited = wasVisited === undefined ? state.visitedSystems?.includes(sysId) : wasVisited

  if (dest) {
    if (!visited && dest.first) {
      return setArc7(state, dest.first, { isJump: true, system: sysName })
    }
    if (visited && dest.revisit) {
      return setArc7(state, dest.revisit, { isJump: true, system: sysName })
    }
  }

  // Random transit observation, no-repeat-until-all-shown.
  const used = state.arc7?.randomPoolUsed || []
  let available = ARC7_RANDOM_POOL.map((_, i) => i).filter(i => !used.includes(i))
  let nextUsed = used
  if (available.length === 0) {
    available = ARC7_RANDOM_POOL.map((_, i) => i)
    nextUsed = []
  }
  const idx = available[Math.floor(Math.random() * available.length)]
  const msg = ARC7_RANDOM_POOL[idx]
  const after = {
    ...state,
    arc7: { ...(state.arc7 || makeInitialArc7()), randomPoolUsed: [...nextUsed, idx] },
  }
  return setArc7(after, msg, { isJump: true, system: sysName })
}

// Combat-related triggers
export function arc7CombatStart(state) {
  return setArc7({
    ...state,
    arc7: { ...(state.arc7 || makeInitialArc7()), combatHullCritFired: false },
  }, ARC7_ACTIONS.combatStart)
}

export function arc7CombatVictory(state, hull) {
  // Reset hull-crit tracker for next combat
  return setArc7({
    ...state,
    arc7: { ...(state.arc7 || makeInitialArc7()), combatHullCritFired: false },
  }, ARC7_ACTIONS.combatVictory(hull))
}

export function arc7ShipCritical(state) {
  return setArc7({
    ...state,
    arc7: { ...(state.arc7 || makeInitialArc7()), combatHullCritFired: false },
  }, ARC7_ACTIONS.shipCritical)
}

export function arc7HullCritical(state) {
  if (state.arc7?.combatHullCritFired) return state
  return setArc7({
    ...state,
    arc7: { ...(state.arc7 || makeInitialArc7()), combatHullCritFired: true },
  }, ARC7_ACTIONS.hullCritical)
}

// Trade triggers (one-shot per kind)
export function arc7FirstBuy(state) {
  return setArc7Once(state, 'first_buy', ARC7_ACTIONS.firstBuy)
}

export function arc7FirstSellProfit(state, amount) {
  return setArc7Once(state, 'first_sell_profit', ARC7_ACTIONS.firstSellProfit(amount))
}

export function arc7FirstSellLoss(state, amount) {
  return setArc7Once(state, 'first_sell_loss', ARC7_ACTIONS.firstSellLoss(amount))
}

export function arc7Upgrade(state, upgradeName) {
  return setArc7(state, ARC7_ACTIONS.buyUpgrade(upgradeName))
}

// ─────────────────────────────────────────────────────────────
// Wrapper: detects newly-set mystery flags and fires their messages.
// Skips if the reducer already updated arc7 in this action.
// ─────────────────────────────────────────────────────────────

export function applyArc7Reactions(prev, next) {
  if (next === prev) return next
  if (next.arc7?.currentMessage !== prev.arc7?.currentMessage) return next

  for (const key of FLAG_TRIGGER_KEYS) {
    if (next.flags?.[key] && !prev.flags?.[key]) {
      const msg = ARC7_FLAGS[key]
      if (msg) return setArc7Once(next, key, msg)
    }
  }
  return next
}
