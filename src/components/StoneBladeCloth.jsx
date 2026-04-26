import { useReducer, useState, useEffect } from 'react'
import { Portrait } from './Portrait.jsx'
import { SFX } from '../game/sfx.js'
import {
  DEVLIN_WIN_ROUND,
  DEVLIN_LOSE_ROUND,
  DEVLIN_DRAW_ROUND,
  DEVLIN_FINAL_VICTORY,
  DEVLIN_BEST_OF_FIVE_PROMPT,
  DEVLIN_PROTEST_INSIST_THREE,
  DEVLIN_IRREGULAR_RESULT,
  DEVLIN_BEST_OF_FIVE_RECOVER,
  DEVLIN_PROTEST_DOUBLED,
  DEVLIN_STAKES,
  DEVLIN_RESPONSES,
  DEVLIN_INFO_REWARD,
  DEVLIN_RULES_CARD,
} from '../data/devlin.js'

// ─────────────────────────────────────────────────────────────
// Devlin's logic: 30% counter the player's last pick, 30% repeat
// his last pick, 40% random.
// ─────────────────────────────────────────────────────────────

const COUNTER = { stone: 'cloth', blade: 'stone', cloth: 'blade' }
const WINS = { stone: 'blade', blade: 'cloth', cloth: 'stone' }
const PICKS = ['stone', 'blade', 'cloth']

function devlinPick(playerLast, devlinLast) {
  const r = Math.random()
  if (r < 0.3 && playerLast) return COUNTER[playerLast]
  if (r < 0.6 && devlinLast) return devlinLast
  return PICKS[Math.floor(Math.random() * PICKS.length)]
}

function resolveRound(player, devlin) {
  if (player === devlin) return 'draw'
  return WINS[player] === devlin ? 'player' : 'devlin'
}

const PICK_LABEL = {
  stone: '🪨 STONE',
  blade: '⚔ BLADE',
  cloth: '🧻 CLOTH',
}

// ─────────────────────────────────────────────────────────────
// Internal state machine
// ─────────────────────────────────────────────────────────────

function pickFromPool(pool, used) {
  let available = pool.map((_, i) => i).filter(i => !used.includes(i))
  if (available.length === 0) {
    available = pool.map((_, i) => i)
    used = []
  }
  const idx = available[Math.floor(Math.random() * available.length)]
  return [pool[idx], [...used, idx]]
}

const initial = (isFinal) => ({
  phase: 'stakes',                    // 'stakes' | 'playing' | 'between' | 'protest' | 'final'
  stake: null,                         // { kind, amount }
  round: 1,
  maxRounds: 3,
  playerScore: 0,
  devlinScore: 0,
  lastPlayerPick: null,
  lastDevlinPick: null,
  lastResult: null,                    // 'player' | 'devlin' | 'draw' | null
  commentary: '',
  usedWinPool: [],
  usedLosePool: [],
  usedDrawPool: [],
  finalTitle: '',
  finalCopy: '',
  protestStage: 0,                     // 0 = not yet | 1 = "Best of five." | 2 = paid out
  isFinal: !!isFinal,
})

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STAKE':
      return { ...state, stake: action.stake, phase: 'playing' }

    case 'PICK': {
      const player = action.pick
      const devlin = devlinPick(state.lastPlayerPick, state.lastDevlinPick)
      const result = resolveRound(player, devlin)
      const playerScore = state.playerScore + (result === 'player' ? 1 : 0)
      const devlinScore = state.devlinScore + (result === 'devlin' ? 1 : 0)

      let commentary = ''
      let usedWin = state.usedWinPool
      let usedLose = state.usedLosePool
      let usedDraw = state.usedDrawPool
      if (result === 'devlin') {
        const [m, used] = pickFromPool(DEVLIN_WIN_ROUND, state.usedWinPool)
        commentary = m; usedWin = used
      } else if (result === 'player') {
        const [m, used] = pickFromPool(DEVLIN_LOSE_ROUND, state.usedLosePool)
        commentary = m; usedLose = used
      } else {
        const [m, used] = pickFromPool(DEVLIN_DRAW_ROUND, state.usedDrawPool)
        commentary = m; usedDraw = used
      }

      return {
        ...state,
        round: state.round, // increments on continue
        playerScore,
        devlinScore,
        lastPlayerPick: player,
        lastDevlinPick: devlin,
        lastResult: result,
        commentary,
        usedWinPool: usedWin,
        usedLosePool: usedLose,
        usedDrawPool: usedDraw,
        phase: 'between',
      }
    }

    case 'CONTINUE': {
      const nextRound = state.round + 1
      // End of agreed rounds
      if (nextRound > state.maxRounds) {
        // Score check
        if (state.playerScore > state.devlinScore) {
          // Player won — Devlin protests for best-of-five (only at maxRounds=3)
          if (state.maxRounds === 3 && !state.isFinal) {
            return { ...state, phase: 'protest', protestStage: 1 }
          }
          // best-of-five already played, or final game: finalize
          const protested = state.maxRounds === 5
          return {
            ...state,
            phase: 'final',
            finalTitle: state.isFinal ? 'AN UPSET' : protested ? 'AN IRREGULAR RESULT' : 'AN IRREGULAR RESULT',
            finalCopy: state.isFinal
              ? "[He sits down very slowly. He doesn't say anything for a long time. Then:] 'I had it. I had you. I had the read.' [He pays. Exactly. He doesn't say best of five. This is somehow the saddest thing he's ever done.]"
              : protested
                ? DEVLIN_PROTEST_DOUBLED
                : DEVLIN_IRREGULAR_RESULT,
          }
        }
        // Devlin won (or drew / he keeps the table on a tie)
        const [m] = pickFromPool(DEVLIN_FINAL_VICTORY, [])
        return {
          ...state,
          phase: 'final',
          finalTitle: 'VICTORY (FOR DEVLIN MARSH)',
          finalCopy: m,
        }
      }
      return { ...state, round: nextRound, phase: 'playing', lastResult: null, commentary: '' }
    }

    case 'INSIST_THREE':
      return { ...state, phase: 'final', finalTitle: 'AN IRREGULAR RESULT', finalCopy: DEVLIN_PROTEST_INSIST_THREE + '\n\n' + DEVLIN_IRREGULAR_RESULT, protestStage: 2 }

    case 'ACCEPT_FIVE':
      return {
        ...state,
        phase: 'playing',
        round: state.round + 1,
        maxRounds: 5,
        lastResult: null,
        commentary: '',
      }

    default:
      return state
  }
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export function StoneBladeCloth({ state, dispatch }) {
  const [g, dispatchLocal] = useReducer(reducer, state.gambling?.isFinal, initial)

  // Trigger SFX on result transitions.
  useEffect(() => {
    if (g.phase !== 'between') return
    if (g.lastResult === 'player') SFX.winRound()
    else if (g.lastResult === 'devlin') SFX.loseRound()
  }, [g.phase, g.lastResult, g.round])

  useEffect(() => {
    if (g.phase !== 'final') return
    if (g.playerScore > g.devlinScore) SFX.devlinLoses()
    else SFX.devlinWins()
  }, [g.phase])

  // Devlin's expression hint based on score
  let devlinExp = 'professional neutrality'
  if (g.devlinScore > g.playerScore) devlinExp = 'slight smugness'
  else if (g.playerScore > g.devlinScore) devlinExp = 'slight wrongedness'

  const onClose = (winner) => {
    dispatch({
      type: 'CLOSE_GAMBLING',
      outcome: winner ? {
        winner,
        stake: g.stake,
        isFinal: g.isFinal,
      } : { winner: 'none' },
    })
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse at top, #1a0d05 0%, #050201 70%)',
        zIndex: 80,
        overflowY: 'auto',
        padding: '20px 14px 240px',
        fontFamily: "'Space Mono', ui-monospace, monospace",
      }}
    >
      <div style={{ maxWidth: 540, margin: '0 auto' }}>
        <Header phase={g.phase} round={g.round} maxRounds={g.maxRounds} player={g.playerScore} devlin={g.devlinScore} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '90px 1fr',
            gap: 12,
            marginBottom: 16,
            alignItems: 'flex-start',
          }}
        >
          <div>
            <Portrait id="devlin" size={84} />
            <div style={{ color: '#7a5028', fontSize: 9, marginTop: 4, textAlign: 'center', letterSpacing: 1 }}>
              {devlinExp.toUpperCase()}
            </div>
          </div>
          <DevlinSpeech g={g} />
        </div>

        {g.phase === 'stakes' && <StakesPanel onPick={(stake) => dispatchLocal({ type: 'SET_STAKE', stake })} onWalkAway={() => onClose(null)} state={state} />}

        {g.phase === 'playing' && <PickPanel onPick={(p) => dispatchLocal({ type: 'PICK', pick: p })} />}

        {g.phase === 'between' && <BetweenPanel g={g} onContinue={() => dispatchLocal({ type: 'CONTINUE' })} />}

        {g.phase === 'protest' && <ProtestPanel onAccept={() => dispatchLocal({ type: 'ACCEPT_FIVE' })} onInsist={() => dispatchLocal({ type: 'INSIST_THREE' })} />}

        {g.phase === 'final' && <FinalPanel g={g} onClose={() => onClose(g.playerScore > g.devlinScore ? 'player' : 'devlin')} />}

        <RulesCard />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function Header({ phase, round, maxRounds, player, devlin }) {
  return (
    <div style={{ marginBottom: 14, textAlign: 'center' }}>
      <div style={{ color: '#c08040', fontSize: 18, letterSpacing: 4, marginBottom: 4 }}>
        STONE, BLADE, CLOTH
      </div>
      <div style={{ color: '#7a5028', fontSize: 9, letterSpacing: 2, fontStyle: 'italic', marginBottom: 10 }}>
        A GAME OF PURE PSYCHOLOGY. NO LUCK INVOLVED WHATSOEVER.
      </div>
      {phase !== 'stakes' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a08060', fontSize: 11, letterSpacing: 1 }}>
          <span>ROUND {round} OF {maxRounds}</span>
          <span>YOU {player} — DEVLIN {devlin}</span>
        </div>
      )}
    </div>
  )
}

function DevlinSpeech({ g }) {
  let text = ''
  if (g.phase === 'stakes') {
    text = "Stakes first. Then technique. Then the inevitable conclusion. Pick your poison."
  } else if (g.phase === 'playing') {
    text = g.round === 1
      ? "First round. I'll go easy on you. Briefly."
      : "[Watching you.]"
  } else if (g.phase === 'between') {
    text = g.commentary
  } else if (g.phase === 'protest') {
    text = DEVLIN_BEST_OF_FIVE_PROMPT
  } else if (g.phase === 'final') {
    text = g.finalCopy
  }
  return (
    <div
      style={{
        background: '#1a0a05',
        border: '1px solid #5a3018',
        borderRadius: 6,
        padding: '10px 12px',
        color: '#d0a070',
        fontSize: 12,
        lineHeight: 1.7,
        fontStyle: 'italic',
        whiteSpace: 'pre-line',
        minHeight: 80,
      }}
    >
      {text || '[He waits.]'}
    </div>
  )
}

function StakesPanel({ onPick, onWalkAway, state }) {
  const visible = ['low', 'medium', 'high', 'info'].filter(k => {
    if (k === 'high') return (state.devlin?.gamesPlayed || 0) >= 1 || (state.devlin?.playerWins || 0) >= 1
    if (k === 'medium') return (state.devlin?.gamesPlayed || 0) >= 1
    if (k === 'info') return (state.devlin?.gamesPlayed || 0) >= 2
    return true
  })
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
      {visible.map(k => {
        const s = DEVLIN_STAKES[k]
        const canAfford = k === 'info' ? true : (state.credits || 0) >= s.amount
        return (
          <button
            key={k}
            onClick={() => canAfford && onPick({ kind: k, amount: s.amount })}
            disabled={!canAfford}
            style={{
              background: canAfford ? '#1a0a05' : '#0a0402',
              border: '1px solid #5a3018',
              color: canAfford ? '#d0a070' : '#5a3018',
              padding: '12px 14px',
              borderRadius: 6,
              cursor: canAfford ? 'pointer' : 'default',
              fontSize: 12,
              textAlign: 'left',
              lineHeight: 1.5,
              fontFamily: 'inherit',
            }}
          >
            <div style={{ color: canAfford ? '#c08040' : '#3a2010', fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>
              ▶ {s.label}
            </div>
            <div style={{ fontStyle: 'italic' }}>{s.devlinPitch}</div>
            {!canAfford && k !== 'info' && (
              <div style={{ color: '#a04040', fontSize: 10, marginTop: 4 }}>
                Not enough credits.
              </div>
            )}
          </button>
        )
      })}
      <button
        onClick={onWalkAway}
        style={{
          background: 'none',
          border: '1px solid #3a2010',
          color: '#7a5028',
          padding: '10px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 11,
          letterSpacing: 1,
          marginTop: 4,
          fontFamily: 'inherit',
        }}
      >
        [Walk away from the table.]
      </button>
    </div>
  )
}

function PickPanel({ onPick }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
      {PICKS.map(p => (
        <button
          key={p}
          onClick={() => onPick(p)}
          style={{
            background: '#1a0a05',
            border: '1px solid #5a3018',
            color: '#d0a070',
            padding: '14px 6px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 13,
            letterSpacing: 2,
            fontFamily: 'inherit',
          }}
        >
          {PICK_LABEL[p]}
        </button>
      ))}
    </div>
  )
}

function BetweenPanel({ g, onContinue }) {
  const result = g.lastResult
  const colour = result === 'player' ? '#80c060' : result === 'devlin' ? '#c04030' : '#a08060'
  const label = result === 'player' ? 'YOU TOOK THE ROUND' : result === 'devlin' ? 'DEVLIN TAKES THE ROUND' : 'DRAW'
  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          background: '#1a0a05',
          border: `1px solid ${colour}`,
          borderRadius: 6,
          padding: 12,
          textAlign: 'center',
          marginBottom: 10,
        }}
      >
        <div style={{ color: colour, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>{label}</div>
        <div style={{ color: '#a08060', fontSize: 11 }}>
          You played <span style={{ color: '#d0a070' }}>{PICK_LABEL[g.lastPlayerPick]}</span>
          {'  '}·{'  '}
          Devlin played <span style={{ color: '#d0a070' }}>{PICK_LABEL[g.lastDevlinPick]}</span>
        </div>
      </div>
      <button
        onClick={onContinue}
        style={{
          width: '100%',
          background: '#0a2a4a',
          border: '1px solid #2a5a8a',
          color: '#4aafe0',
          padding: '12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 11,
          letterSpacing: 2,
          fontFamily: 'inherit',
        }}
      >
        {g.round >= g.maxRounds ? 'SETTLE THE GAME →' : 'NEXT ROUND →'}
      </button>
    </div>
  )
}

function ProtestPanel({ onAccept, onInsist }) {
  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={onInsist}
        style={{
          background: '#1a0a05',
          border: '1px solid #5a3018',
          color: '#d0a070',
          padding: '12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 12,
          textAlign: 'left',
          fontFamily: 'inherit',
          lineHeight: 1.5,
        }}
      >
        ▶ "It was best of three. We agreed."
      </button>
      <button
        onClick={onAccept}
        style={{
          background: '#1a0a05',
          border: '1px solid #5a3018',
          color: '#d0a070',
          padding: '12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 12,
          textAlign: 'left',
          fontFamily: 'inherit',
          lineHeight: 1.5,
        }}
      >
        ▶ "Sure. Best of five."
      </button>
    </div>
  )
}

function FinalPanel({ g, onClose }) {
  const playerWon = g.playerScore > g.devlinScore
  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          background: '#1a0a05',
          border: `1px solid ${playerWon ? '#80c060' : '#c04030'}`,
          borderRadius: 6,
          padding: 12,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            color: playerWon ? '#80c060' : '#c04030',
            fontSize: 12,
            letterSpacing: 3,
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          {g.finalTitle}
        </div>
        <div style={{ color: '#a08060', fontSize: 11, textAlign: 'center' }}>
          Final score: YOU {g.playerScore} — DEVLIN {g.devlinScore}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          width: '100%',
          background: '#0a2a4a',
          border: '1px solid #2a5a8a',
          color: '#4aafe0',
          padding: '12px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 11,
          letterSpacing: 2,
          fontFamily: 'inherit',
        }}
      >
        LEAVE THE TABLE
      </button>
    </div>
  )
}

function RulesCard() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ marginTop: 18 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: '1px dashed #5a3018',
          color: '#7a5028',
          padding: '6px 10px',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 10,
          letterSpacing: 2,
          fontFamily: 'inherit',
        }}
      >
        {open ? '— LAMINATED RULES CARD' : '+ LAMINATED RULES CARD'}
      </button>
      {open && (
        <div
          style={{
            background: '#f0e8c0',
            color: '#3a2010',
            border: '4px solid rgba(58,32,16,0.2)',
            borderRadius: 8,
            padding: 14,
            marginTop: 8,
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            lineHeight: 1.7,
            position: 'relative',
            transform: 'rotate(-1deg)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: 3, marginBottom: 8 }}>
            {DEVLIN_RULES_CARD.title}
          </div>
          <ul style={{ margin: '0 0 8px 18px', padding: 0 }}>
            {DEVLIN_RULES_CARD.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <div style={{ textAlign: 'right', fontSize: 11, fontStyle: 'italic' }}>
            {DEVLIN_RULES_CARD.footer}
          </div>
        </div>
      )}
    </div>
  )
}
