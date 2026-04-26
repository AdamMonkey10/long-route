// Predicate engine used by both dialogue entry routing and per-option
// visibility filters. A single shape lets the data file write conditions
// once and have them mean the same thing in either place.
//
// Supported keys (all optional; AND'd together):
//   requireFlag, requireNotFlag           — single-flag gates
//   requireFlags, requireNotFlags         — array gates
//   requireMinVisits, requireMaxVisits    — visits to THIS npc
//   requireVisited                        — array of system ids the player must have visited
//   requireMinCombine, requireMaxCombine
//   requireMinFrontier, requireMaxFrontier
//   requireMinInesTrust, requireMaxInesTrust

export function matchPredicate(state, p, npcId) {
  if (!p) return true
  const flags = state.flags || {}
  const visits = npcId != null ? (state.npcVisits?.[npcId] || 0) : 0

  if (p.requireFlag && !flags[p.requireFlag]) return false
  if (p.requireNotFlag && flags[p.requireNotFlag]) return false
  if (p.requireFlags) for (const f of p.requireFlags) if (!flags[f]) return false
  if (p.requireNotFlags) for (const f of p.requireNotFlags) if (flags[f]) return false

  if (p.requireMinVisits !== undefined && visits < p.requireMinVisits) return false
  if (p.requireMaxVisits !== undefined && visits > p.requireMaxVisits) return false

  if (p.requireVisited) {
    const v = state.visitedSystems || []
    for (const s of p.requireVisited) if (!v.includes(s)) return false
  }

  const cs = state.combineStanding || 0
  const fs = state.frontierSympathy || 0
  const it = state.inesTrust || 0

  if (p.requireMinCombine !== undefined && cs < p.requireMinCombine) return false
  if (p.requireMaxCombine !== undefined && cs > p.requireMaxCombine) return false
  if (p.requireMinFrontier !== undefined && fs < p.requireMinFrontier) return false
  if (p.requireMaxFrontier !== undefined && fs > p.requireMaxFrontier) return false
  if (p.requireMinInesTrust !== undefined && it < p.requireMinInesTrust) return false
  if (p.requireMaxInesTrust !== undefined && it > p.requireMaxInesTrust) return false

  return true
}

// Pick the first matching entry rule's node, falling back to 'root'.
export function pickEntryNode(state, npc, npcId) {
  const entries = npc?.entry || []
  for (const e of entries) {
    if (matchPredicate(state, e, npcId)) return e.node
  }
  return 'root'
}

export function isOptionVisible(state, opt, npcId) {
  return matchPredicate(state, opt, npcId)
}
