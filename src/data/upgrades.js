export const UPGRADES = [
  { id: 'cargo_1', name: 'Expanded Hold I', desc: 'Adds 10 cargo slots.', cost: 800, effect: 'cargo', value: 10, req: null },
  { id: 'cargo_2', name: 'Expanded Hold II', desc: 'Another 10 slots. Now you have absolutely no excuse.', cost: 1800, effect: 'cargo', value: 10, req: 'cargo_1' },
  { id: 'cargo_3', name: 'Expanded Hold III', desc: 'A third expansion. The Persistent Delusion is now primarily a warehouse.', cost: 3200, effect: 'cargo', value: 10, req: 'cargo_2' },
  { id: 'engine_1', name: 'Engine Upgrade I', desc: 'Cuts travel cost 25%.', cost: 1000, effect: 'engine', value: 1, req: null },
  { id: 'engine_2', name: 'Engine Upgrade II', desc: 'Further 25% reduction. Handles less like a refrigerator.', cost: 2200, effect: 'engine', value: 1, req: 'engine_1' },
  { id: 'weapons_1', name: 'Twin Cannon Array', desc: 'Standard twin cannons. +9–11 base damage per shot.', cost: 900, effect: 'weapons', value: 1, req: null },
  { id: 'weapons_2', name: 'Military Surplus Cannon', desc: 'Legal status: complicated. Effectiveness: satisfying.', cost: 2000, effect: 'weapons', value: 1, req: 'weapons_1' },
  { id: 'shields_1', name: 'Shield Generator I', desc: '−3 incoming damage/turn. +5 repair per fix.', cost: 950, effect: 'shields', value: 1, req: null },
  { id: 'shields_2', name: 'Shield Generator II', desc: 'Military-grade. The Combine frowns on this. Part of the appeal.', cost: 2100, effect: 'shields', value: 1, req: 'shields_1' },
  { id: 'armour', name: 'Hull Plating', desc: 'Adds 25 maximum hull. Heavy. Worth it.', cost: 1600, effect: 'hull', value: 25, req: null },
  { id: 'scanner', name: 'Deep Scanner', desc: 'Reveals enemy hull totals and highlights rare market anomalies.', cost: 1400, effect: 'scanner', value: 1, req: null },

  // Cass's modifications — only purchasable from Cass at The Wreck. Paid in
  // components (cargo commodity) rather than credits.
  { id: 'silent_running', name: 'Silent Running',
    desc: "Engine baffling. The ship is much quieter on approach. Reduces hyperspace encounter chance ~15%.",
    componentCost: 15, effect: 'combat_chance', value: -0.15, req: null, availableAt: 'cass' },
  { id: 'hidden_compartment', name: 'Hidden Compartment',
    desc: "Five extra cargo slots. Contraband stowed here is not detected on inspection.",
    componentCost: 20, effect: 'hidden_cargo', value: 5, req: null, availableAt: 'cass' },
  { id: 'deep_sensor_array', name: 'Deep Sensor Array',
    desc: "Reveals enemy hull totals in combat. (Equivalent to Combine-licensed Deep Scanner; cheaper, paid in parts.)",
    componentCost: 12, effect: 'scanner', value: 1, req: null, availableAt: 'cass' },
  { id: 'stripped_weight', name: 'Stripped Weight',
    desc: "Removes non-essential mass. All hyperspace fuel costs reduced 10% permanently.",
    componentCost: 25, effect: 'fuel_mod', value: 0.1, req: null, availableAt: 'cass' },
]
