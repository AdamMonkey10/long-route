import { useReducer, useEffect, useCallback, useRef, useState } from 'react'
import { reducer } from './game/reducer.js'
import { makeInitialState } from './game/initialState.js'
import { saveGame, loadGame } from './game/save.js'

import { HUD } from './components/HUD.jsx'
import { NameEntry } from './components/NameEntry.jsx'
import { GalaxyMap } from './components/GalaxyMap.jsx'
import { StationView } from './components/station/StationView.jsx'
import { DialogueScreen } from './components/DialogueScreen.jsx'
import { CombatScreen } from './components/CombatScreen.jsx'
import { EventScreen } from './components/EventScreen.jsx'
import { LogScreen } from './components/LogScreen.jsx'
import { LedgerScreen } from './components/LedgerScreen.jsx'
import { SettingsScreen } from './components/SettingsScreen.jsx'
import { ShipLogScreen } from './components/ShipLogScreen.jsx'
import { Arc7Panel } from './components/Arc7Panel.jsx'
import { StoneBladeCloth } from './components/StoneBladeCloth.jsx'
import { Notification } from './components/Notification.jsx'

function init() {
  return makeInitialState()
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, init)
  const [hasSave, setHasSave] = useState(() => !!loadGame())
  const [savedAt, setSavedAt] = useState(() => loadGame()?.ts || null)
  const saveTimer = useRef(null)
  const skipFirstSave = useRef(true)
  // Per-session ephemeral state — does NOT persist across reloads.
  // Tracks which Guide entries have been auto-shown this session.
  const sessionStateRef = useRef({ seenGuide: new Set() })

  // Debounced auto-save: skip while still on the name entry screen.
  useEffect(() => {
    if (state.view === 'nameEntry') return
    if (skipFirstSave.current) {
      skipFirstSave.current = false
      return
    }
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      // Don't persist transient UI fields
      const { notification, ...persistable } = state
      if (saveGame(persistable)) {
        setSavedAt(Date.now())
        setHasSave(true)
      }
    }, 600)
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [state])

  // Auto-clear notifications
  useEffect(() => {
    if (!state.notification) return
    const t = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFY' }), 3000)
    return () => clearTimeout(t)
  }, [state.notification])

  const wrappedDispatch = useCallback(action => {
    dispatch(action)
  }, [])

  const handleContinue = useCallback(() => {
    const data = loadGame()
    if (!data?.state) return
    skipFirstSave.current = true // avoid immediate re-save
    dispatch({ type: 'LOAD_STATE', state: data.state })
  }, [])

  const handleNewGame = useCallback(() => {
    skipFirstSave.current = true
    const fresh = makeInitialState()
    fresh.view = 'nameEntry'
    dispatch({ type: 'NEW_GAME', state: fresh })
    setHasSave(!!loadGame())
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text)' }}>
      <Notification message={state.notification} />

      {state.view === 'nameEntry' ? (
        <NameEntry
          dispatch={wrappedDispatch}
          hasSave={hasSave}
          onContinue={handleContinue}
        />
      ) : (
        <>
          <HUD state={state} dispatch={wrappedDispatch} />
          {/* Padding-bottom leaves room for the persistent ARC-7 panel.
              Collapsed it's ~28px, expanded up to ~40vh — content can scroll
              under either; the explicit padding keeps the natural bottom in
              view. */}
          <div style={{ paddingBottom: state.arc7?.collapsed ? 50 : 220, position: 'relative' }}>
            {state.view === 'map' && <GalaxyMap state={state} dispatch={wrappedDispatch} />}
            {state.view === 'station' && (
              <StationView
                state={state}
                dispatch={wrappedDispatch}
                sessionState={sessionStateRef.current}
              />
            )}
            {state.view === 'dialogue' && (
              <DialogueScreen state={state} dispatch={wrappedDispatch} />
            )}
            {state.view === 'combat' && (
              <CombatScreen state={state} dispatch={wrappedDispatch} />
            )}
            {state.view === 'event' && (
              <EventScreen state={state} dispatch={wrappedDispatch} />
            )}
            {state.view === 'log' && <LogScreen state={state} dispatch={wrappedDispatch} />}
            {state.view === 'ledger' && (
              <LedgerScreen state={state} dispatch={wrappedDispatch} />
            )}
            {state.view === 'settings' && (
              <SettingsScreen
                state={state}
                dispatch={wrappedDispatch}
                onNewGame={handleNewGame}
                savedAt={savedAt}
              />
            )}
            {state.view === 'shiplog' && (
              <ShipLogScreen state={state} dispatch={wrappedDispatch} />
            )}
            {state.view === 'gambling' && (
              <StoneBladeCloth state={state} dispatch={wrappedDispatch} />
            )}
          </div>
          <Arc7Panel state={state} dispatch={wrappedDispatch} />
        </>
      )}
    </div>
  )
}
