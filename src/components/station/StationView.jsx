import { SYSTEMS } from '../../data/systems.js'
import { getCurrentLocation, canVisitLocation } from '../../game/utils.js'
import { ConcourseView } from './ConcourseView.jsx'
import { LocationView } from './LocationView.jsx'

export function StationView({ state, dispatch }) {
  const sys = SYSTEMS[state.currentSystem]
  if (!sys) return null

  const loc = getCurrentLocation(state, sys)
  // If the saved currentLocation references a no-longer-visitable location
  // (e.g. a hidden one whose unlock got rolled back), bail to the concourse.
  if (loc && !canVisitLocation(state, loc)) {
    return <ConcourseView state={state} dispatch={dispatch} sys={sys} />
  }

  return loc
    ? <LocationView state={state} dispatch={dispatch} sys={sys} loc={loc} />
    : <ConcourseView state={state} dispatch={dispatch} sys={sys} />
}
