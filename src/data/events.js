export const EVENTS = [
  {
    id: 'debris',
    text: "Your nav system flags a debris field — the remnants of something that used to be a ship and is now in the process of being everywhere simultaneously.",
    options: [
      { text: "Navigate carefully (risk 10 hull)", type: 'hull', value: -10, msg: "You pick through the debris. Your shields take the difference." },
      { text: "Go around (cost 50cr)", type: 'credits', value: -50, msg: "The long way round. Safe. Expensive." },
    ],
  },
  {
    id: 'distress',
    text: "A distress signal. Weak, old, cycling. Could be genuine. Could be a trap. The odds are roughly even, which is to say the odds are not good.",
    options: [
      { text: "Investigate (gamble)", type: 'gamble', win: { credits: 200, msg: "An automated cargo pod, drifting. 200cr salvage." }, lose: { hull: -15, msg: "A trap. You take fire before breaking free." } },
      { text: "Log and move on", type: 'nothing', msg: "You log it and continue. Probably fine." },
    ],
  },
  {
    id: 'checkpoint',
    text: "A Combine checkpoint. Not on your charts. They've set it up since the last time anyone updated those charts, which was evidently a while ago.",
    options: [
      { text: "Comply — let them check", type: 'nothing', msg: "They wave you through with the energy of people who've been standing in space for eight hours." },
      { text: "Transmit doctored manifest (gamble)", type: 'gamble', win: { msg: "They buy it. You breathe again." }, lose: { credits: -200, msg: "200cr fine. They let you go, which you'd call a win." } },
    ],
  },
  {
    id: 'anomaly',
    text: "Your nav system throws an error: coordinates that don't exist in the Combine database. An unlisted system. It's there on your instruments but not on any map.",
    options: [
      { text: "Log the anomaly", type: 'flag', flag: 'anomaly_logged', msg: "You log the coordinates. Could be useful." },
      { text: "Ignore it", type: 'nothing', msg: "You continue on your registered course." },
    ],
  },
  {
    id: 'fault',
    text: "The port engine makes a sound that isn't in any manual. This is less reassuring than it sounds, as the manual covers a remarkable range of sounds.",
    options: [
      { text: "Emergency repair (100cr)", type: 'pay', value: 100, msg: "Fixed. Probably. The sound stops." },
      { text: "Limp on and hope", type: 'hull', value: -20, msg: "It holds. The sound gets worse." },
    ],
  },
  {
    id: 'broker',
    text: "A small vessel hails you. Information broker — they want food. In space, everyone needs food eventually.",
    options: [
      { text: "Trade 2 food for market intel", type: 'info_trade', need: 'food', qty: 2, msg: "A solid tip about nearby prices. The broker seems satisfied." },
      { text: "Decline and continue", type: 'nothing', msg: "They drift off." },
    ],
  },
  {
    id: 'derelict',
    text: "A derelict freighter, running dark. Hull intact, no life signs, cargo door open. Could be salvage. Could be a very obvious trap.",
    options: [
      { text: "Board and salvage (gamble)", type: 'gamble', win: { credits: 350, msg: "Cargo hold half-full. 350cr salvageable. The trap, if there was one, was for someone else." }, lose: { hull: -25, msg: "Automated defence system. Very old, very angry. You get out. Barely." } },
      { text: "Mark on charts and leave", type: 'flag', flag: 'derelict_marked', msg: "You mark the coordinates. Someone will want that eventually." },
    ],
  },
  {
    id: 'stowaway',
    text: "Third hour of transit. You find someone in your cargo bay. Young, clearly terrified, eating your emergency rations with the focus of someone who hasn't eaten in two days.",
    options: [
      { text: "Let them stay — drop at destination", type: 'credits', value: -20, msg: "They eat more rations. On arrival they press 20cr into your hand. 'It's all I have.' You don't argue." },
      { text: "Contact Combine authorities", type: 'credits', value: 150, msg: "You feel terrible about this. The Combine pays the informant bonus. You feel worse." },
      { text: "Give 50cr and point to Bellhaven", type: 'credits', value: -50, msg: "They go. You don't ask what they were running from. Some questions are better unasked." },
    ],
  },
  {
    id: 'bounty',
    text: "An unmarked ship hails you and demands a 'transit toll.' This is piracy, but they've said it very politely, which is almost more unsettling.",
    options: [
      { text: "Pay the toll (150cr)", type: 'credits', value: -150, msg: "They take the money and leave. Professional. You hate that." },
      { text: "Refuse and evade (risk hull)", type: 'hull', value: -18, msg: "You outrun them. Not easily. Your hull shows it." },
      { text: "Attempt to negotiate (gamble)", type: 'gamble', win: { credits: 0, msg: "They're actually reasonable. You talk them down to 50cr and pay it." }, lose: { credits: -200, hull: -10, msg: "They weren't reasonable. 200cr and a hull hit." } },
    ],
  },
  {
    id: 'spacewhale',
    text: "Your sensors register something enormous. Not a ship — too organic. A creature the size of a small moon, moving through the void with improbable grace. Your nav computer has no classification. Your crew has no words.\n\nIt looks at you.\n\nYou look back.\n\nIt moves on.",
    options: [
      { text: "Log the encounter", type: 'flag', flag: 'whale_seen', msg: "You log it. The entry reads: 'Something impossible. Very beautiful. Continued on course.' You add nothing else." },
      { text: "Follow it briefly", type: 'nothing', msg: "You follow for eleven minutes. Then it accelerates and is simply gone. You sit with that for a while." },
    ],
  },
  {
    id: 'refugee_convoy',
    text: "A convoy of civilian transports, running without Combine transponders. Five ships, overloaded. Someone leans out of an airlock holding a sign: MEDICAL SUPPLIES.",
    options: [
      { text: "Give 2 medical supplies", type: 'give_cargo', id: 'medical', qty: 2, msg: "They take it with visible relief. The convoy moves on. You feel genuinely good about this." },
      { text: "Trade medical for ore (gamble)", type: 'gamble', win: { credits: 120, msg: "They have more ore than expected. Fair exchange." }, lose: { credits: -30, msg: "They're grateful but poor. They give you what they have." } },
      { text: "Wave and continue", type: 'nothing', msg: "You continue. You don't look back." },
    ],
  },
  {
    id: 'black_market_tip',
    text: "A scrambled transmission on a frequency you weren't supposed to know about. Someone you've never met, speaking very quickly: a system, a commodity, a price. Then silence.",
    options: [
      { text: "Note it and investigate", type: 'flag', flag: 'market_tip', msg: "Good data. One of the tips turns out to be genuinely useful." },
      { text: "Ignore it", type: 'nothing', msg: "You delete the transmission. Some invitations aren't worth accepting." },
    ],
  },
  {
    id: 'solar_flare',
    text: "Unexpected solar activity. Navigation becomes creative. You have two options and about ninety seconds to decide.",
    options: [
      { text: "Power down shields, ride it out", type: 'hull', value: -12, msg: "The radiation hits before you can compensate. Your hull takes the difference." },
      { text: "Emergency burn out of zone (80cr)", type: 'pay', value: 80, msg: "Clean escape. Expensive fuel burn. Worth it." },
    ],
  },
  {
    id: 'equipment_auction',
    text: "An automated distress beacon leads you to a maintenance drone with a fault. Aboard it: crated components that fell off someone's manifest. Sitting there, unclaimed, technically salvageable under frontier law.",
    options: [
      { text: "Take the components", type: 'add_cargo', id: 'components', qty: 4, msg: "Four crates of components. Yours now, legally, sort of, by frontier salvage custom." },
      { text: "Report to nearest station", type: 'credits', value: 50, msg: "The station gives you a finder's fee. Small but clean." },
    ],
  },
  {
    id: 'combine_funeral',
    text: "A Combine military convoy, running with full escort — a warship carrying its dead. They hail you: cut engines and observe the transit.\n\nIt takes eleven minutes. Nobody speaks.",
    options: [
      { text: "Observe respectfully", type: 'nothing', msg: "The convoy passes. Whatever the war was, people died in it. That part was real." },
      { text: "Log the escort configuration", type: 'flag', flag: 'combine_military_data', msg: "You note the escort configuration. Intel. Someone might want it." },
    ],
  },
  {
    id: 'medical_emergency',
    text: "A mining vessel hails: crew member with a critical injury. They have nothing. Will you help?",
    options: [
      { text: "Give medical supplies (1 medical)", type: 'give_cargo', id: 'medical', qty: 1, msg: "Their medic gets to work. They give you a routing coordinate that turns out to be useful." },
      { text: "Can't spare supplies", type: 'nothing', msg: "You move on. You think about this for a while." },
    ],
  },
  {
    id: 'information_swap',
    text: "A courier vessel hails you, wants to trade: they have market data on three systems, you have market data on three systems. Fair exchange.",
    options: [
      { text: "Accept the trade", type: 'flag', flag: 'courier_intel', msg: "Good data. One of the tips turns out to be genuinely useful." },
      { text: "Decline", type: 'nothing', msg: "They shrug and continue on their route." },
    ],
  },
  {
    id: 'customs_shakedown',
    text: "A Combine customs vessel boards you for 'routine inspection.' The inspector makes it extremely clear that routine inspections can go very smoothly or very slowly.",
    options: [
      { text: "Pay the implied bribe (100cr)", type: 'pay', value: 100, msg: "The inspection takes four minutes. Everything is in order. You both pretend this was about regulations." },
      { text: "Insist on proper process", type: 'nothing', msg: "Six hours later, they find nothing and let you go. Worth it, probably." },
      { text: "Complain to their supervisor (gamble)", type: 'gamble', win: { credits: 100, msg: "The supervisor is appalled. You get an apology and a refund." }, lose: { credits: -200, msg: "The supervisor is the inspector's brother. You discover this after the fine." } },
    ],
  },
  {
    id: 'smuggler_tip',
    text: "An independent on a parallel course flashes a specific light pattern — smuggler code for 'friendly.' They're heading the same direction. Want company?",
    options: [
      { text: "Fall into convoy formation (gamble)", type: 'gamble', win: { credits: 0, msg: "Good conversation, shared route avoiding a Combine checkpoint. Useful." }, lose: { hull: -8, msg: "They led you straight into a pirate ambush. Not maliciously. They were also ambushed." } },
      { text: "Continue separately", type: 'nothing', msg: "You wave and continue your own route." },
    ],
  },
  {
    id: 'propaganda_drone',
    text: "A Combine communications drone intercepts your course and begins broadcasting. The message is four minutes long, very professional, and entirely about how the Frontier Wars were a tragedy caused by frontier extremism.\n\nIt does not mention weapons contracts.",
    options: [
      { text: "Listen politely", type: 'nothing', msg: "The drone completes its broadcast and departs. You feel mildly irritated." },
      { text: "Jam the signal (gamble)", type: 'gamble', win: { msg: "The jamming works. Silence. Bliss." }, lose: { credits: -100, msg: "The drone has a trace function. 100cr fine for signal interference." } },
    ],
  },
  {
    id: 'nav_ghost',
    text: "For forty-two minutes, your nav computer shows a second ship on an identical course — matching your speed, your heading, your micro-corrections. Then it's gone. Your sensors show nothing.",
    options: [
      { text: "Run full diagnostic", type: 'nothing', msg: "The diagnostic finds nothing wrong. This is not entirely reassuring." },
      { text: "Attempt contact", type: 'flag', flag: 'ghost_contact', msg: "You transmit on all channels. Something transmits back — one second of static, then nothing. You keep that to yourself." },
    ],
  },
  {
    id: 'cargo_opportunity',
    text: "A freighter dumps its cargo — too heavy, engine trouble. They can't take it. It's yours if you want it, drifting free in accessible space.",
    options: [
      { text: "Collect ore", type: 'add_cargo', id: 'ore', qty: 5, msg: "Five crates of ore, free to a good home." },
      { text: "Collect food", type: 'add_cargo', id: 'food', qty: 4, msg: "Four units of foodstuffs. The freighter crew wave as they limp away." },
      { text: "Leave it — probably cursed", type: 'nothing', msg: "You watch it drift. Probably the right call." },
    ],
  },
  {
    id: 'old_war_wreck',
    text: "A war-era destroyer, completely intact, wedged into an asteroid field. Combine markings — but painted over. Under the paint: Frontier Faction insignia. Under that: Combine markings again.",
    options: [
      { text: "Board and document", type: 'flag', flag: 'war_wreck_documented', msg: "You document it carefully. The ship was running Combine colours when it died. The Frontier insignia is painted over top, hastily, as if someone needed it to look a certain way." },
      { text: "Leave it alone", type: 'nothing', msg: "Some things should stay where they fell." },
    ],
  },
  {
    id: 'ghost_ship',
    text: "An old colony transport drifting without power. You board it. The logs are intact.\n\nThe last entry reads: 'Combine escort confirmed our route. We don't understand why they're still following us.'\n\nThe date is two weeks into the Frontier Wars.",
    options: [
      { text: "Copy the logs", type: 'flag', flag: 'colony_logs', msg: "The logs are thorough. They confirm a Combine military escort that shouldn't exist during the 'neutral' period." },
      { text: "Leave the ship to history", type: 'nothing', msg: "Some things you don't disturb." },
    ],
  },
  {
    id: 'auction',
    text: "A salvage vessel signals: they've recovered an upgrade component from a derelict warship. Selling to the first reasonable offer. Auction in one hour.",
    options: [
      { text: "Bid 200cr (gamble)", type: 'gamble', win: { credits: -200, msg: "You win the auction. The component is worth considerably more. A good day." }, lose: { credits: -200, msg: "You win but overpaid. Still, good component. Ish." } },
      { text: "Pass", type: 'nothing', msg: "You continue on your way. Someone else's lucky day." },
    ],
  },
]
