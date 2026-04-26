// Faction standing model.
//
// `combineStanding` (-100..+50) tracks how the Combine sees the player.
// `frontierSympathy` (0..100) tracks how the Frontier sees them.
// Both are subtle: there is no morality system here, only consequences.

export const COMBINE_MIN = -100
export const COMBINE_MAX = 50
export const FRONTIER_MIN = 0
export const FRONTIER_MAX = 100

export function clampCombine(n) {
  return Math.max(COMBINE_MIN, Math.min(COMBINE_MAX, n | 0))
}
export function clampFrontier(n) {
  return Math.max(FRONTIER_MIN, Math.min(FRONTIER_MAX, n | 0))
}

export function applyStanding(state, { combine = 0, frontier = 0 } = {}) {
  if (!combine && !frontier) return state
  return {
    ...state,
    combineStanding: clampCombine((state.combineStanding || 0) + combine),
    frontierSympathy: clampFrontier((state.frontierSympathy || 0) + frontier),
  }
}

// Combat-chance multiplier applied at travel time.
export function combatChanceMultiplier(state, sys) {
  const cs = state.combineStanding || 0
  if (sys.faction === 'Combine' && cs <= -30) return 2
  if (sys.faction === 'Frontier' && (state.frontierSympathy || 0) >= 70) return 0
  return 1
}

// Returns 'combine_frigate' if the player should encounter a guaranteed
// frigate at this Combine system (standing < -70). Otherwise null.
export function forcedEnemy(state, sys) {
  if (sys.faction === 'Combine' && (state.combineStanding || 0) <= -70) {
    return 'combine_frigate'
  }
  return null
}

// Event payload mappings — used by RESOLVE_EVENT to translate well-known
// event/option pairs into faction deltas. Keyed by `eventId.optionIndex`.
export const EVENT_STANDING_DELTAS = {
  // Combine-friendly compliance vs evasion choices
  'checkpoint.0': { combine: 3 },                              // comply with check
  'checkpoint.1': { combine: -5 },                             // doctored manifest
  'customs_shakedown.0': { combine: 2 },                       // pay the bribe
  'customs_shakedown.1': { combine: 3 },                       // insist on process
  'propaganda_drone.1': { combine: -5 },                       // jam the signal

  // Stowaway moral fork
  'stowaway.0': { frontier: 10 },                              // shelter
  'stowaway.1': { combine: 5, frontier: -10 },                 // inform
  'stowaway.2': { frontier: 8 },                               // give them money

  // Refugee convoy
  'refugee_convoy.0': { frontier: 15 },                        // give medical
  'refugee_convoy.1': { frontier: 5 },                         // trade
}

// Patrol kill: -15 combine. Other enemies: 0. Pirate kill at low Combine
// standing might be worth a small +1 from the Combine's perspective but
// we keep that neutral for now to avoid noise.
export const COMBAT_KILL_DELTAS = {
  patrol: { combine: -15 },
  combine_frigate: { combine: -25 },
}
