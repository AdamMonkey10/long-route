export const NPCS = {
  grex: {
    id: 'grex',
    name: 'Grex',
    title: 'Dock Master',
    portrait: 'grex',
    greeting: "Name. Ship registration. Purpose of visit. In that order.",
    entry: [
      { requireMinVisits: 4, node: 'root_familiar' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "You bought the Persistent Delusion? From the Kelloway yard?\n\nPrevious owner: Edda Vance. She walked out of here seven years ago in a hurry. Owed me forty credits. I mention this not because I expect reimbursement, but because I want it on the record that I remember.",
        options: [
          { text: '"I bought her from the Kelloway yard. Came with history."', go: 'edda' },
          { text: '"What moves well through here?"', go: 'trade' },
          // Unlocked once Grex has mentioned forty credits being personal:
          { text: '"Forty credits is a specific amount to remember."', go: 'forty_credits',
            requireFlag: 'grex_edda_known' },
          // Unlocked once he mentions the agents:
          { text: '"What did the agents look like?"', go: 'agents_look',
            requireFlag: 'grex_combine_mentioned' },
          { text: '"What did you tell them?"', go: 'agents_told',
            requireFlag: 'grex_combine_mentioned' },
          { text: '[Leave without asking anything.]', go: null, flag: 'grex_quiet' },
        ],
      },
      edda: {
        text: "Independent trader. Good reputation. She ran information: nav charts, data cores, for whoever paid. Careful. Very careful.\n\nThen she went quiet. Then she left the ship in impound and walked through that airlock. Never came back.",
        flagsOnEnter: ['grex_edda_known'],
        options: [
          { text: '"Did she say where she was going?"', go: 'edda_where',
            flag: 'edda_clue_1', flagLabel: '🔍 Clue 1: Grex remembers' },
          { text: '"Who else knew her?"', go: 'edda_contacts' },
          { text: '[Back to the manifest.]', go: 'trade' },
        ],
      },
      edda_where: {
        text: "Last thing she said: 'Don't let them impound the ship.' Then she left.\n\nThe Combine asked about her three weeks later. Two agents. Very polished. I gave them nothing — Edda was thorough. They left a card. I filed it in the recycling unit.",
        flagsOnEnter: ['grex_combine_mentioned'],
        options: [
          { text: '"Who else might know?"', go: 'edda_contacts' },
          { text: '[Don\'t push. Just nod.]', go: 'root', flag: 'grex_listened' },
        ],
      },
      edda_contacts: {
        text: "Mara Solis — she's over there — they traded information sometimes. And there's an old navigator at Meridian Cross called Vasquez. If you're trying to find her — which I'd advise against — that's where I'd start.",
        options: [
          { text: '"Why advise against it?"', go: 'warning' },
          { text: '"Thanks, Grex."', go: null },
        ],
      },
      warning: {
        text: "Because the Combine asked about her. The Combine does not ask casual questions.\n\nI am a simple man, {name}. I find it useful to notice when things are hidden and choose not to look.",
        options: [{ text: '"I appreciate the advice."', go: null }],
      },
      forty_credits: {
        text: "[A thin smile.]\n\nIt's the amount that keeps it personal without making it actionable. She knew exactly what she was doing.\n\nI keep records. Most things slip. That doesn't.",
        options: [
          { text: "\"You think she'll pay one day?\"", go: 'pay_one_day' },
          { text: '[Back to it.]', go: 'root' },
        ],
      },
      pay_one_day: {
        text: "I think she might. If she's still alive. Forty credits says she's still alive — if anyone in the sector hands me forty credits with a particular look on their face, I will know.\n\nUntil then, the debt is the bookmark.",
        options: [{ text: '[Nod.]', go: 'root' }],
      },
      agents_look: {
        text: "Polished. Not Combine military polished — corporate polished. Suits cut a particular way. They didn't argue. They didn't have to.\n\nMid-thirties. One did the talking. The other watched my hands.",
        options: [{ text: '"Useful."', go: 'root', flag: 'grex_agents_described' }],
      },
      agents_told: {
        text: "Nothing they didn't already know. Edda's registration. The dates she was here. The route she usually took.\n\nI didn't tell them about the lockbox. They didn't ask, which means they didn't know to. Which means Edda was thorough.",
        options: [{ text: '"What lockbox?"', go: 'lockbox' }],
      },
      lockbox: {
        text: "I don't know. She mentioned it once, in passing. I know she had one and I know it wasn't here. That's the extent of what I know.\n\nIt's possible Mara knows. They were closer than I was.",
        options: [{ text: '[Make a note. Move on.]', go: 'root', flag: 'grex_lockbox_known' }],
      },
      trade: {
        text: "Components are cheap here. Ore and food are scarce. Bellhaven does good food if you don't mind the inspection queue.",
        options: [{ text: '"Good to know."', go: 'root' }],
      },

      // Visit 4+ — Grex notices you keep showing up.
      root_familiar: {
        text: "[He looks up sooner than he used to.]\n\nYou're back. Most traders pass through. You don't.\n\nWhat'd you find?",
        options: [
          { text: '"Pieces. Slowly."', go: 'familiar_pieces' },
          { text: '"More than I expected."', go: 'familiar_more' },
          { text: '"Less than I hoped."', go: 'familiar_less' },
          { text: '[Nothing. Just here for the manifest.]', go: 'trade' },
          { text: '[Forty credits, with a particular look on your face.]', go: 'pay_debt',
            requireMinFrontier: 1, requireFlag: 'grex_lockbox_known' },
        ],
      },
      familiar_pieces: {
        text: "Pieces is honest. People who say more than that are usually lying or selling something.\n\nTake the time. She did.",
        options: [{ text: '[Continue.]', go: 'root' }],
      },
      familiar_more: {
        text: "[A small lift of the eyebrows.]\n\nThen you're further along than the agents got. I'd say good luck, but the time for luck is probably past.",
        options: [{ text: '[Continue.]', go: 'root' }],
      },
      familiar_less: {
        text: "It's not over. She left a trail. Trails take time.\n\nThe agents took two months. You've got time.",
        options: [{ text: '[Continue.]', go: 'root' }],
      },
      pay_debt: {
        text: "[Long silence. He counts the forty credits very slowly.]\n\n...alright.\n\n[He files it under a new heading.]\n\nTell her, when you find her, that the ledger is closed. And that I would still like a drink, on her, sometime.",
        options: [{ text: '[Nod. Leave.]', go: null, flag: 'grex_debt_paid', flagLabel: '✓ Edda\'s old tab settled' }],
      },
    },
  },
  mara: {
    id: 'mara',
    name: 'Mara Solis',
    title: 'Independent Trader',
    portrait: 'mara',
    greeting: "Oh! Sorry — I was watching the dock — nevermind. Can I help?",
    tree: {
      root: {
        text: "Haverlock's in a drought year. Anyone carrying food there makes about forty percent above standard.\n\nI'm not going — my customs relationship with Haverlock is complicated. Slightly off-spec grain. Last season.",
        options: [
          { text: "You knew Edda Vance?", go: 'edda' },
          { text: "Other market tips?", go: 'tips' },
          { text: "Thanks for the grain tip.", go: null },
        ],
      },
      edda: {
        text: "We traded information. She was careful. Very careful.\n\nWhich is why I noticed when she stopped being careful.",
        options: [
          { text: "What do you mean?", go: 'careless', flag: 'edda_clue_2', flagLabel: "🔍 Clue 2: Mara's warning" },
          { text: "Do you know where she went?", go: 'where' },
        ],
      },
      careless: {
        text: "Six months before she disappeared, she started asking questions openly. About the Combine's licensing during the Frontier Wars.\n\nShe sent me a data core two weeks before she vanished. 'Keep it safe. Don't read it.' It's in a lockbox on The Sump — talk to someone called Smee. Tell him I sent you.",
        options: [
          { text: "I'll find Smee.", go: null },
          { text: "What was she looking for?", go: 'looking' },
        ],
      },
      looking: {
        text: "She didn't say. But she paid fifty credits for a fifteen-year-old shipping manifest. A week later, the Combine sent people asking the same questions.\n\nI told them: I just know about grain prices.",
        options: [{ text: "The Combine again.", go: null }],
      },
      where: {
        text: "Kessel Expanse. She was obsessed with it. Something about pre-war navigation records. I don't know more than that.",
        options: [{ text: "Understood.", go: null }],
      },
      tips: {
        text: "The Consortium buys components at premium — corporate projects. New Geneva pays well for medical. The Wreck takes anything at any price.",
        options: [{ text: "Thanks.", go: null }],
      },
    },
  },
  duchess: {
    id: 'duchess',
    name: 'The Duchess',
    title: 'Proprietor',
    portrait: 'duchess',
    greeting: "You're not from here. I can tell because you look like you can see properly. What do you want?",
    entry: [
      { requireFlag: 'sump_conflict_resolved', node: 'root_after_resolution' },
      { requireFlag: 'sump_conflict_escalated', node: 'root_after_escalation' },
      { requireFlag: 'chose_two_fingers', requireNotFlags: ['sump_conflict_resolved', 'sump_conflict_escalated'],
        node: 'root_confrontation' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I don't deal in contraband. I deal in goods whose legal status is subject to ongoing philosophical debate between myself and various law enforcement agencies.",
        flagsOnEnter: ['duchess_trust'],
        options: [
          { text: "I'm looking for Smee.", go: 'smee' },
          { text: "What's trading well here?", go: 'trade' },
          { text: "Anyone here who actually understands the structural reports?", go: 'petra_intro' },
          { text: "Just browsing.", go: null },
        ],
      },
      petra_intro: {
        text: "[A long, careful look.]\n\nThat's a particular question. If you're asking it, you're either a Combine inspector — which you aren't — or you've been thinking about the cracks.\n\nEngineering Level. Petra runs it. Tell her I sent you. She won't trust you on the strength of that, but she will let you in.",
        options: [{ text: "Thank you.", go: null,
          flag: 'petra_intro', flagLabel: '🛠 Petra — Engineering Level' }],
      },
      smee: {
        text: "Bay 7, lower docks. He's not well — cave-in last month. What do you want with Smee?",
        options: [
          { text: "Mara Solis sent me.", go: 'mara_sent' },
          { text: "Just a message.", go: 'vague' },
        ],
      },
      mara_sent: {
        text: "Mara. Right. Bay 7. And if whatever you're collecting causes me problems, I'll be very irritated. I manage irritation by charging significantly above market rate.",
        options: [{ text: "Understood.", go: null }],
      },
      vague: {
        text: "Bay 7. The Sump is small. 'Just a message' means I know the contents in twelve hours.",
        options: [{ text: "Fair point.", go: null }],
      },
      trade: {
        text: "Ore cheap. Food and medical premium. Real money: Kessel pays triple for anything not on the manifest. The Wreck buys everything, no questions.",
        options: [{ text: "Thanks.", go: null }],
      },

      root_confrontation: {
        text: "[She doesn't pretend to be casual this time.]\n\nYou've been buying from the boy. Two-Fingers. He sells cheaper because he's reckless and because he owes me — has owed me since before he could spell the word 'principal.'\n\nSo. The way I see it: you can settle this, or it settles itself. Settling itself is bad for everyone, including the people on this asteroid who don't know there's anything to settle.\n\nWhat do you want to do?",
        options: [
          { text: '"How much would settle the debt?"', go: 'conf_amount' },
          { text: '"The Chaplain will mediate."', go: 'conf_chaplain',
            requireFlag: 'chaplain_trust' },
          { text: '"This isn\'t my fight."', go: 'conf_walk' },
          { text: '"Tell me your version of the debt."', go: 'conf_version' },
        ],
      },
      conf_version: {
        text: "Fifteen years ago he and his father ran a freight crew off this rock. They lost a shipment that wasn't theirs to lose. The father paid me back in full. The boy didn't pay back his half — said he wasn't bound by his father's debts.\n\n[A pause.]\n\nThe father died eight years ago. The boy still hasn't paid. Five hundred credits. He has had fifteen years to find five hundred credits.\n\nIf you want to know more, ask him. Ask the Chaplain. The Chaplain was there.",
        options: [
          { text: '"How much would settle the debt?"', go: 'conf_amount' },
          { text: '"I\'ll think about it."', go: null },
        ],
      },
      conf_amount: {
        text: "Five hundred. The original sum. Not a credit more, not for fifteen years of patience.\n\nIf you pay it for him, the matter closes. He owes you, not me. That seems fairer than the alternative.",
        options: [
          { text: '[Pay 500cr.]', go: 'conf_paid', costCredits: 500 },
          { text: '"That\'s a lot of credits."', go: null },
        ],
      },
      conf_paid: {
        text: "[The transfer goes through. She nods, slowly, almost imperceptibly.]\n\nThe matter is closed. The boy owes you, which is your problem now. I'd suggest you collect what you can in goodwill. Money never quite arrives.\n\n[Quieter.]\n\nThank you, Captain. You didn't have to.",
        flagsOnEnter: ['sump_conflict_resolved'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 5, flag: 'sump_paid_msg', flagLabel: '✓ Sump debt closed' }],
      },
      conf_chaplain: {
        text: "[A long, considering look.]\n\nThe Chaplain. Of course.\n\nIf he's willing, I'll listen. He was there. He knows whose version of the truth has the right shape.\n\nFetch him.",
        options: [
          { text: '[Bring the Chaplain.]', go: 'conf_chaplain_done',
            requireFlag: 'chaplain_mediated', flag: 'sump_conflict_resolved',
            flagLabel: '✓ Chaplain mediated' },
          { text: '"He needs to agree first."', go: null },
        ],
      },
      conf_chaplain_done: {
        text: "[The Chaplain stands, mostly silent, between you and the Duchess. He says perhaps thirty words. The Duchess listens. The boy is fetched. He listens too.]\n\n[Eventually:]\n\nThe debt is renegotiated. Forgiveness on the principal in exchange for the boy doing six months of work for me at cost. He looks like he might cry. He does not.\n\n[A small bow to the Chaplain, gracious.]\n\nThank you, Captain.",
        flagsOnEnter: ['sump_conflict_resolved'],
        options: [{ text: '[Leave them to it.]', go: null,
          frontierDelta: 8 }],
      },
      conf_walk: {
        text: "[A long, flat look.]\n\nThen it settles itself. He'll be gone within the week. He hasn't the spine for it, and he hasn't paid in fifteen years.\n\nDon't say I gave you no chance.",
        flagsOnEnter: ['sump_conflict_escalated', 'two_fingers_left'],
        options: [{ text: '[Leave.]', go: null }],
      },

      root_after_resolution: {
        text: "[A small, dry smile.]\n\nThings are quieter than they were. Thank you for that.",
        options: [
          { text: "What's trading well here?", go: 'trade' },
          { text: '[Leave.]', go: null },
        ],
      },
      root_after_escalation: {
        text: "[She doesn't smile this time. The other half of her bay is empty.]\n\nThe boy is gone. The matter is closed. There were better ways to close it. We are where we are.\n\nWhat do you need?",
        options: [
          { text: "What's trading well here?", go: 'trade' },
          { text: '[Leave.]', go: null },
        ],
      },
    },
  },
  smee: {
    id: 'smee',
    name: 'Smee',
    title: 'Miner (Injured)',
    portrait: 'smee',
    greeting: "...who are you? If you're from management, leave. If you're a doctor, also leave — I can't pay.",
    tree: {
      root: {
        text: "Not management. Fine. Go ahead.",
        options: [
          { text: "Mara Solis sent me.", go: 'mara_sent' },
          { text: "How are you holding up?", go: 'health' },
          { text: "Wrong bay, sorry.", go: null },
        ],
      },
      mara_sent: {
        text: "Mara said someone might come.\n\n[Presses a data core into your hand]\n\nDon't open it on any Combine network. It's encrypted — Edda's own encryption. You'll need her key to read it. Last I heard, the key was somewhere in the Kessel Expanse.",
        options: [
          { text: "Thank you. This matters.", go: 'thanks', flag: 'edda_clue_3', flagLabel: '🔍 Clue 3: The data core', giveItem: 'data_core' },
          { text: "What was Edda to you?", go: 'relationship' },
        ],
      },
      thanks: {
        text: "Just get it somewhere it matters. Edda thought what she found was worth disappearing for.\n\nI hope she was right.",
        options: [{ text: "I'll find out.", go: null }],
      },
      relationship: {
        text: "Old friend. Same Belt colony. She got a ship. Got out. I got a very close personal relationship with a structural support beam.\n\nShe believed the truth mattered. I find that quality both admirable and operationally reckless.",
        options: [{ text: "Take the data core. I'll find out.", go: 'mara_sent' }],
      },
      health: {
        text: "Two ribs. One kneecap. The optimism was gone before the cave-in.\n\nGot medical supplies? I'll trade information.",
        options: [
          { text: "What kind of information?", go: 'info' },
          { text: "No supplies right now.", go: null },
        ],
      },
      info: {
        text: "Three jump routes not on any Combine chart. Which dock inspectors can be paid to look elsewhere. And: Iron Drift has a listening post that reports to Vantage. Foreman Okafor doesn't know. Everyone else does.",
        options: [{ text: "I'll come back with supplies.", go: null }],
      },
    },
  },
  otto: {
    id: 'otto',
    name: 'Otto',
    title: 'Barkeep, Meridian Cross',
    portrait: 'otto',
    greeting: "Sit down. What are you drinking. That was not a question.",
    entry: [
      // After visiting three search-pattern systems, Otto reads it from across the bar.
      { requireVisited: ['portsmith', 'sump', 'iron_drift'], requireNotFlag: 'otto_intro',
        node: 'root_search_pattern' },
      { node: 'root' },
    ],
    tree: {
      root_search_pattern: {
        text: "[Before you sit down.]\n\nYou've been busy. Portsmith, The Sump, Iron Drift — that's not a trade route. That's a search pattern.\n\nDrink first. Then tell me what you're looking for.",
        options: [
          { text: '"Edda Vance."', go: 'edda', flag: 'otto_intro', flagLabel: '🗝 Otto knows what you\'re after' },
          { text: '"It\'s personal."', go: 'sp_personal' },
          { text: '"Let\'s start with the drink."', go: 'sp_drink' },
        ],
      },
      sp_personal: {
        text: "[He sets the glass down.]\n\nPersonal is fair. Personal stays personal. But if you change your mind, you know where I am.",
        options: [{ text: '[Drink.]', go: 'root' }],
      },
      sp_drink: {
        text: "Wise. Most things go better with the drink first.\n\n[He pours. The glass is cleaner than you expected.]",
        options: [
          { text: '"Thank you."', go: 'root' },
          { text: '"Edda Vance."', go: 'edda', flag: 'otto_intro' },
        ],
      },
      root: {
        text: "Everyone who comes through thinks they're passing through. Nobody is. Meridian Cross IS the destination — they just haven't admitted it yet.",
        options: [
          { text: "Information about Edda Vance.", go: 'edda', flag: 'otto_intro' },
          { text: "Who's the old man in the corner?", go: 'vasquez' },
          { text: "Tell me about New Geneva.", go: 'geneva' },
          { text: '"How\'s Devlin Marsh been?"', go: 'r_devlin_grudge',
            requireMinPlayerWinsVsDevlin: 3 },
          { text: '"Devlin Marsh been in?"', go: 'r_devlin_friend',
            requireMinDevlinWinsVsPlayer: 2 },
          { text: "Just the drink.", go: null },
        ],
      },
      r_devlin_grudge: {
        text: "Devlin Marsh. He's been here every day this week.\n\nHe's moved from 'explaining what happened' to 'articulating a theory of fairness as it relates to games of skill.'\n\nI've started charging him a listening fee. He's paying it. This tells you something about how much he needs to talk about this.",
        options: [{ text: '[Nod. Drink.]', go: null }],
      },
      r_devlin_friend: {
        text: "Your friend Marsh.\n\n[A look.]\n\nHe came in this morning. Told me you and he go way back. That you have an 'ongoing professional relationship of mutual benefit.'\n\nHe seemed very pleased about this. He also asked if you'd left anything for him. Messages. Credits. 'As friends sometimes do.'\n\nI told him no.\n\nHe said you'd probably forgot. He didn't seem bothered.\n\nThis was somehow worse.",
        options: [{ text: '[Pay for the drink. Leave.]', go: null }],
      },
      edda: {
        text: "She drank here. Tipped well. She was after old Combine cargo manifests — Frontier Wars era.\n\nI pointed her at Vasquez. He keeps records the way other people keep grudges: obsessively and with full emotional investment.",
        options: [
          { text: "Tell me about Vasquez.", go: 'vasquez' },
          { text: "What was she looking for?", go: 'specific' },
        ],
      },
      specific: {
        text: "She wouldn't say. Paid fifty credits for a fifteen-year-old shipping manifest. A week later, two polished Combine agents sat exactly where you're sitting.\n\nI told them: I just pour the drinks.",
        options: [{ text: "Tell me about Vasquez.", go: 'vasquez' }],
      },
      vasquez: {
        text: "Former Combine navigator. Retired involuntarily — kept records of things they'd rather forget. Been here since, drinking steadily and annotating with increasingly hostile marginalia.\n\nHe'll talk if you feed him. Literally.",
        options: [{ text: "I'll try that.", go: null }],
      },
      geneva: {
        text: "New Geneva is where people go to look important without doing anything. Ambassador Flyte is the one to talk to — she knows where every body is buried, figuratively and possibly literally.\n\nShe doesn't talk to traders. Find a reason she'd want to.",
        options: [{ text: "Thanks.", go: null }],
      },
      trade: {
        text: "Meridian is the clearinghouse. Luxury goods sell well. We produce nothing except gossip, which I provide free of charge.",
        options: [{ text: "Good to know.", go: null }],
      },
    },
  },
  old_nav: {
    id: 'old_nav',
    name: 'Vasquez',
    title: 'Former Navigator',
    portrait: 'old_nav',
    greeting: "...",
    tree: {
      root: {
        text: "...",
        options: [
          { text: "Otto says you might help. About Edda Vance.", go: 'check_food' },
          { text: "Sorry — wrong person.", go: null },
        ],
      },
      check_food: {
        text: "Otto talks too much.\n\n[Studies you]\n\n...do you have food? Real food. Not station rations.",
        options: [
          { text: "[Give 2 food] Here.", go: 'with_food', requireCargo: 'food', requireQty: 2, costCargo: 'food', costQty: 2 },
          { text: "No, sorry.", go: 'no_food' },
        ],
      },
      with_food: {
        text: "[Eats with complete dignity]\n\nEdda found an anomaly in Frontier Wars shipping records. Weapons-grade components shipped to Frontier Faction stations through Combine intermediaries. During the period the Combine claimed to be neutral.\n\nThey didn't just profit from the war. They armed both sides.",
        options: [
          { text: "Is there proof?", go: 'proof' },
          { text: "That would explain everything.", go: 'conclusion' },
        ],
      },
      proof: {
        text: "She was looking for source records at the Kessel Expanse archive — originals, stored before the Combine shut it down.\n\nIf those records still exist, they're enough to collapse the Combine's legitimacy entirely. Which is why Edda disappeared.",
        options: [
          { text: "I have her data core. Going to Kessel.", go: 'resolve' },
          { text: "Where exactly?", go: 'location' },
        ],
      },
      location: {
        text: "Navigation archive, coordinates 7-7-Alpha. Declared decommissioned in 2054. The keeper, a woman named Isha, was still running it ten years ago.",
        options: [{ text: "Thank you.", go: null }],
      },
      conclusion: {
        text: "It explains why they wanted her gone. Why they kept asking. And why, seven years later, it's still dangerous enough that they haven't stopped looking.",
        options: [{ text: "I'm going to Kessel.", go: 'resolve' }],
      },
      resolve: {
        text: "[Nods slowly]\n\nBraver than I am. Or considerably more foolish.\n\nKessel archive. Keeper named Isha. If she trusts you, she'll have Edda's key.\n\nGood luck.",
        options: [{ text: "Thank you.", go: null }],
      },
      no_food: {
        text: "...[Turns away]\n\nCome back when you have something worth talking over.",
        options: [{ text: "I will.", go: null }],
      },
    },
  },
  becker: {
    id: 'becker',
    name: 'Old Becker',
    title: 'Farmer-Trader',
    portrait: 'becker',
    greeting: "You're a trader? Perfect. I need forty crates off my hands before the inspector arrives.",
    tree: {
      root: {
        text: "Drought year, but I hoarded last season's grain. Inspector calls it manipulation. I call it forward planning.\n\nFood cheap from me. Very expensive at Portsmith and The Sump.",
        options: [
          { text: "What do you need in return?", go: 'needs' },
          { text: "Other tips?", go: 'tips' },
          { text: "I'll buy some food.", go: null },
        ],
      },
      needs: {
        text: "Tech components. My harvesting equipment is held together with ingenuity and strong language, and both are wearing thin.",
        options: [{ text: "I'll see what I can do.", go: null }],
      },
      tips: {
        text: "New Cascadia pays premium for organics. 'Reconnecting with nature' — expensive food and talking about it at dinner parties.\n\nAlso: the Consortium pays absurd rates for medical. Something going on inside there.",
        options: [{ text: "Thanks.", go: null }],
      },
    },
  },
  agatha: {
    id: 'agatha',
    name: 'Agatha Sorn',
    title: 'Retired Administrator',
    portrait: 'agatha',
    greeting: "Sit down. I'll put the kettle on. The kettle's broken but the gesture matters.",
    tree: {
      root: {
        text: "Thirty-one years in the Combine's administrative division. Do you know what that means? I know where the files are.\n\nNot the public files. The other ones.",
        options: [
          { text: "What files?", go: 'files' },
          { text: "What brings you out here?", go: 'why' },
          { text: "What's worth trading from Bellhaven?", go: 'trade' },
        ],
      },
      files: {
        text: "The Frontier Wars authorisation records. There's a filing system for logistics that shouldn't exist if the Combine was neutral. I didn't understand what I was looking at until much later.\n\nA trader came through asking the same questions, about four years after the war. I told her what I'd seen. She had a name — Edda Vance.",
        options: [
          { text: "I'm looking for Edda too.", go: 'edda' },
          { text: "What did you tell her?", go: 'told' },
        ],
      },
      edda: {
        text: "Then you're asking the right questions. She was going after the source records at Kessel. Whether she got there — I don't know. She was careful.\n\nI'll tell you what I told her: the Consortium was the logistics arm. Secondary records, if they exist, are in Consortium archives. Talk to a woman called Mirela Voss. Tell her Agatha says 7741-C.",
        options: [{ text: "7741-C. Thank you.", go: null, flag: 'agatha_met', flagLabel: '📁 Archive route: ask for Mirela Voss' }],
      },
      told: {
        text: "That the weapons requisitions were authorised through a Consortium subsidiary. Filed under a supply contract number nobody was likely to look up.\n\nWhich is how bureaucracy works. Things aren't hidden. They're just misfiled.",
        options: [{ text: "Thank you.", go: null }],
      },
      why: {
        text: "Retirement. Fresh air. A garden I am systematically killing due to forty years of indoor living.\n\nAlso, Bellhaven is the only colony the Combine hasn't fully assimilated yet. It's nice to be somewhere things aren't entirely decided.",
        options: [{ text: "Fair enough.", go: null }],
      },
      trade: {
        text: "Food and ore in abundance. What we lack: everything else. Tech, medical, luxury — bring anything manufactured and colonists will pay generously.",
        options: [{ text: "Good to know.", go: null }],
      },
    },
  },
  okafor: {
    id: 'okafor',
    name: 'Foreman Okafor',
    title: 'Shift Foreman, Iron Drift',
    portrait: 'okafor',
    greeting: "You're not here to work, which means you want something. Go ahead.",
    tree: {
      root: {
        text: "Iron Drift runs on ore and pragmatism. We dig, we smelt, we ship. We don't ask where it goes, they don't ask how we get it out.",
        options: [
          { text: "Trade opportunities?", go: 'trade' },
          { text: "What's at Farside Station?", go: 'farside' },
          { text: "Tell me about the listening post.", go: 'listen' },
        ],
      },
      trade: {
        text: "Ore, obviously. Processed components. We're critically short on medical — three workers on restricted duty because we've got no analgesics.\n\nBring medical supplies and I'll pay above market. That's not negotiation, that's fact.",
        options: [
          { text: "I'll see what I can do.", go: null },
          { text: "Who'd I be helping, exactly?", go: 'trade_who' },
        ],
      },
      trade_who: {
        text: "Doctor Vasanta. Medical Bay's down corridor four. She runs the whole bay on optimism and rationed bandages. Tell her I sent you, she'll see you.\n\n[Quieter.]\n\nIf you're going down there: she's been short on a piece of specific equipment for three years. You'll know it when she mentions it.",
        options: [{ text: "I'll find her.", go: null,
          flag: 'vasanta_intro', flagLabel: '⚕ Dr. Vasanta — Medical Bay' }],
      },
      farside: {
        text: "Officially closed. Unofficially — none of my business. The people who stop there occasionally buy ore. They pay cash and don't want receipts. I find this professionally adequate.\n\nDon't tell Vantage I said that.",
        options: [{ text: "Said what?", go: null }],
      },
      listen: {
        text: "[Long pause]\n\n...where did you hear that?\n\nThere's equipment in section 7 I was told to classify as 'geological survey instruments.' It transmits. I don't know to where. I don't ask. The people who installed it had Combine credentials.\n\nI have 8,000 workers. I make pragmatic decisions.",
        options: [
          { text: "Doesn't that bother you?", go: 'bother' },
          { text: "I understand.", go: null },
        ],
      },
      bother: {
        text: "[Quietly]\n\nEvery single day. But Iron Drift needs the licensing. And licensing comes from the Combine.\n\nNow. Did you want to buy some ore?",
        options: [
          { text: "Yes. I did.", go: null },
          { text: "Does anyone else watch what it does?", go: 'bother_else' },
        ],
      },
      bother_else: {
        text: "[A pause. He looks past you, then back.]\n\nLinnea, in the Geology Lab. Officially she counts rocks. Unofficially, she's been counting transmissions for years. I don't ask. She doesn't tell. She's also better than I am at noticing things.\n\nIf you decide to speak to her, I will not have told you to.",
        options: [{ text: "I never heard of her.", go: null,
          flag: 'linnea_intro', flagLabel: '🔬 Linnea — Geology Lab' }],
      },
    },
  },
  kasey: {
    id: 'kasey',
    name: 'Kasey',
    title: 'Miner, Iron Drift',
    portrait: 'kasey',
    greeting: "Oh hey! You're a trader? Actual trader? From outside?",
    tree: {
      root: {
        text: "Sorry, it's just — I've been on-station for eleven months. The most exciting thing was a drill bit shattering. Nobody was hurt but it was genuinely exciting.\n\nDo you have any news? From anywhere?",
        options: [
          { text: "Where would you like to start?", go: 'news' },
          { text: "Tell me about The Wreck.", go: 'wreck' },
          { text: "Any tips for a trader?", go: 'trade' },
        ],
      },
      news: {
        text: "[Listens with complete intensity]\n\nThat's incredible. All of it.\n\nOkay — The Wreck is three days out by the back route. Rook runs the trading floor. Tell her Kasey says hello — she'll add a ten percent premium. We have an arrangement.",
        options: [{ text: "What kind of arrangement?", go: 'arrangement' }],
      },
      arrangement: {
        text: "I find her buyers. She gives me a cut. Eleven months on Iron Drift, you get creative about income streams.\n\nAlso she's great. Absolute menace at cards. Play cards with her — it's a fantastic experience.",
        options: [{ text: "I'll pass on the cards.", go: null }],
      },
      wreck: {
        text: "Technically a decommissioned colony ship. Technically. It's been there so long it has its own culture, currency, and apparently very good noodles.\n\nThey operate outside Combine jurisdiction because technically nobody is there, technically. Everyone finds this arrangement satisfactory.",
        options: [{ text: "Good to know.", go: null }],
      },
      trade: {
        text: "Ore always flowing. Contraband makes best margins if you know Farside. For safe profits: medical supplies in, ore and components out. Very reliable. Very boring. I say that with love.",
        options: [{ text: "Thanks.", go: null }],
      },
    },
  },
  chen: {
    id: 'chen',
    name: 'Director Chen',
    title: 'Regional Director, The Consortium',
    portrait: 'chen',
    greeting: "Welcome. The Consortium is always pleased to facilitate legitimate commerce.",
    tree: {
      root: {
        text: "The Consortium provides infrastructure, licensing, logistics oversight, and dispute resolution.\n\nWe are, in short, the reason commerce functions. You're welcome.",
        options: [
          { text: "What's the Consortium's role in the Frontier Wars?", go: 'wars' },
          { text: "What work is available?", go: 'work' },
          { text: "What's worth trading here?", go: 'trade' },
        ],
      },
      wars: {
        text: "[Smile doesn't shift]\n\nThe Consortium provided logistical coordination to both humanitarian and commercial operations during that difficult period.\n\nIs there something specific you're looking for?",
        options: [
          { text: "Weapons contracts. Manifests. 2051 to 2053.", go: 'manifests' },
          { text: "Never mind.", go: null },
        ],
      },
      manifests: {
        text: "[Pause of exactly two seconds]\n\nI'm not sure I understand the question. If you have concerns about historical procurement, the Combine's oversight committee is the appropriate channel.\n\nI'd strongly suggest that channel.",
        options: [
          { text: "That sounds like a threat.", go: 'threat' },
          { text: "Of course. Thank you.", go: null },
        ],
      },
      threat: {
        text: "It sounds like helpful administrative guidance. The Consortium is always helpful.\n\nSafe travels, Captain. We'll be watching.",
        options: [{ text: "I'll bet you will.", go: null }],
      },
      work: {
        text: "Standard cargo contracts. Tech output to inner systems. Competitive rates, reliable payment, no complications.\n\nAssuming you keep your questions similarly uncomplicated.",
        options: [{ text: "Understood.", go: null }],
      },
      trade: {
        text: "Technology and components are our primary exports. We buy raw materials and food. Standard rates. The Consortium doesn't negotiate.",
        options: [{ text: "I'll check the market.", go: null }],
      },
    },
  },
  mirela: {
    id: 'mirela',
    name: 'Mirela Voss',
    title: 'Consortium Archivist',
    portrait: 'mirela',
    greeting: "I'm — sorry, I can't really talk here. Are you — did someone send you?",
    tree: {
      root: {
        text: "If Agatha sent you, say the number.",
        options: [
          { text: "7741-C.", go: 'agatha_sent' },
          { text: "Nobody sent me.", go: 'no_send' },
        ],
      },
      agatha_sent: {
        text: "[Exhales]\n\nOkay. Good. I've been here twelve years and I've been looking for a reason to leave for eleven of them.\n\nI can get you the secondary manifests — the ones showing the Consortium's actual role in 2051 to 2053. Not the filed versions. The real ones. But I need something first.",
        options: [
          { text: "Name it.", go: 'needs' },
          { text: "How do you know I can be trusted?", go: 'trust' },
        ],
      },
      needs: {
        text: "Medical supplies. For me. I have a condition the Consortium's health plan doesn't cover because they classified it as 'preexisting.'\n\nBring me a six-month supply and I'll copy the 7741-C files. You'll understand everything.",
        options: [
          { text: "[Deliver medical supplies]", go: 'delivered', requireCargo: 'medical', requireQty: 3, costCargo: 'medical', costQty: 3, flag: 'consortium_files', flagLabel: '📁 Consortium records obtained' },
          { text: "I'll get back to you.", go: null },
        ],
      },
      delivered: {
        text: "[Takes the supplies]\n\nThank you. You have no idea.\n\n[Presses a data chip into your hand]\n\nThe 7741-C files. Every weapons contract, every shipping manifest, every authorisation signature. The Consortium was the mechanism. The Combine was the author. It's all there.\n\nI'll be on the next ship to Bellhaven. Don't come back here.",
        options: [{ text: "Good luck.", go: null }],
      },
      trust: {
        text: "You don't. And I don't know if I can trust you. But I've been sitting on these files for three years and nobody came looking.\n\nYou came looking. That's enough.",
        options: [{ text: "What do you need?", go: 'needs' }],
      },
      no_send: {
        text: "I'm sorry — wrong person.\n\n[Turns away, clearly disappointed]",
        options: [
          { text: "Wait — Agatha sent me.", go: 'agatha_sent' },
          { text: "No problem.", go: null },
        ],
      },
    },
  },
  flyte: {
    id: 'flyte',
    name: 'Ambassador Flyte',
    title: 'Senior Diplomat, New Geneva',
    portrait: 'flyte',
    greeting: "A trader. How refreshing. We mostly get politicians. At least you're honest about what you want.",
    tree: {
      root: {
        text: "New Geneva exists because everyone needs somewhere to pretend to cooperate. I've been facilitating this pretense for twenty-three years.\n\nWhat brings an independent trader to the diplomatic quarter?",
        flagsOnEnter: ['flyte_met'],
        options: [
          { text: "I'm investigating the Frontier Wars.", go: 'wars' },
          { text: "What's the trade situation?", go: 'trade' },
          { text: "Tell me about the political landscape.", go: 'politics' },
        ],
      },
      wars: {
        text: "[Sets down her glass very precisely]\n\nThe official position: they arose from resource competition and factional tensions.\n\nThe unofficial position — which I hold in my personal capacity, meaning I'll deny this conversation — is that they were arranged. I have no proof. I have, however, been a diplomat for twenty-three years, and arranged things have a particular texture.",
        options: [
          { text: "I'm gathering proof. Edda Vance.", go: 'edda' },
          { text: "Who would benefit?", go: 'benefit' },
        ],
      },
      edda: {
        text: "Vance came through here four years ago. Very thorough. I told her about a Consortium subsidiary called Threshold Logistics — she didn't know. Threshold was dissolved in 2054. Records went to Consortium secure archive, Level Seven. Mirela Voss is the archivist.\n\nAlso: talk to Barker Ness. He's a journalist. He knows what to do with what you find.",
        options: [{ text: "Thank you, Ambassador.", go: null }],
      },
      benefit: {
        text: "Who benefits from twelve years of jump gate fee revenue? Who now controls every transit point in the sector?\n\nI leave that as an exercise for the reader.",
        options: [{ text: "The Combine.", go: null }],
      },
      politics: {
        text: "The Combine controls the infrastructure. The independents control the resentment. The Frontier Faction controls the parts of space nobody else wants — which turns out to be strategically significant.\n\nNew Geneva controls the conversation about all of this. We consider it a fair trade.",
        options: [{ text: "What's your actual position?", go: null }],
      },
      trade: {
        text: "Medical and luxury goods sell well here — diplomats maintain standards. We export very little. The primary commodity in New Geneva is information, and that doesn't fit on your cargo manifest.",
        options: [{ text: "Understood.", go: null }],
      },
    },
  },
  barker: {
    id: 'barker',
    name: 'Barker Ness',
    title: 'Journalist',
    portrait: 'barker',
    greeting: "You've got the look of someone who knows something. Sit down.",
    tree: {
      root: {
        text: "Barker Ness. Independent journalist, currently banned from six Combine-controlled systems, which I consider a professional achievement.\n\nI've been writing about the Frontier Wars for four years. I have a lot of pieces. I'm missing the centre.",
        options: [
          { text: "What are you missing?", go: 'missing' },
          { text: "What do you know?", go: 'knows' },
          { text: "I might have what you need.", go: 'have' },
          { text: "[Hand over Petra's report from the Sump.]", go: 'petra_report',
            requireFlag: 'petra_ignored',
            requireNotFlag: 'petra_resolved' },
          { text: "Old Maren wants to know your outlet list, for testimony.",
            go: 'outlets_confirm',
            requireFlag: 'maren_quest_known',
            requireNotFlag: 'barker_outlets_confirmed' },
        ],
      },
      outlets_confirm: {
        text: "[He doesn't pause to consider.]\n\nThirty-two independent outlets, six of them outside Combine licensing entirely. The list is committed. They've published worse from less.\n\nTell Maren the outlets are ready. When she's prepared to testify, I record same-day, publish within the hour.",
        flagsOnEnter: ['barker_outlets_confirmed'],
        options: [{ text: "I will. Thank you.", go: null,
          flag: 'barker_outlets_msg', flagLabel: '📰 Barker: outlet list confirmed' }],
      },
      petra_report: {
        text: "[He reads the wafer's contents on his terminal. His expression goes from professional interest to something quieter.]\n\nEighteen months. Forty thousand people. Combine's Mining Oversight Office filed the engineer's escalation in a drawer.\n\n[He looks up.]\n\nI'll have this published in three independent outlets by tomorrow. The Combine cannot now claim ignorance. Whether they evacuate the asteroid is the next question — but at least the question is a public one now.\n\nThank you, Captain. This is exactly what I'm here for.",
        flagsOnEnter: ['petra_resolved'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 10, flag: 'petra_published_msg', flagLabel: '✓ Petra\'s report published' }],
      },
      missing: {
        text: "Authenticated source documents. Combine records from 2051 to 2053. I have testimonies, manifests, two former Combine employees on background.\n\nNone of it publishable without primary documents. They can say it's fabricated.",
        options: [
          { text: "I'm working on getting those.", go: 'working' },
          { text: "What happens when you publish?", go: 'publish' },
        ],
      },
      working: {
        text: "Then we should keep in touch.\n\nIf you get authenticated records — especially anything with Combine executive signatures — bring them here first. Don't give them to any official body.\n\nGive them to me. I'll make sure they can't be buried.",
        options: [{ text: "How do I know you'll actually publish?", go: 'trust' }],
      },
      trust: {
        text: "Because I'm banned from six systems and I'm still here. If I were going to drop it, I'd have stopped three years and two death threats ago.\n\nAlso I'm a journalist. Constitutionally incapable of sitting on a good story.",
        options: [{ text: "Fair enough.", go: null }],
      },
      knows: {
        text: "The Combine licensed both sides' weapons procurement through Threshold Logistics. Subsidiary dissolved immediately after the war. Records transferred to Combine-controlled archives.\n\nI know a former navigator at Meridian Cross with the routing data. An archivist at the Consortium with financial records. I just can't get anyone on the record.",
        options: [{ text: "I've talked to both of them.", go: 'impressed' }],
      },
      impressed: {
        text: "[Long pause]\n\nThen you're further along than I am. What are you planning to do with what you find?",
        options: [
          { text: "Bring it to you.", go: 'bring' },
          { text: "Still working that out.", go: null },
        ],
      },
      bring: {
        text: "Good. That's the right answer.\n\nIf you get the Kessel records and Consortium files, bring them here. I can verify, authenticate, and publish within forty-eight hours. Once it's published, the Combine can't unring that bell.",
        options: [{ text: "I'll be back.", go: null }],
      },
      have: {
        text: "[Leans forward]\n\nTell me.",
        options: [
          { text: "Not yet. Still gathering.", go: null },
          { text: "I have consortium files.", go: 'knows' },
        ],
      },
      publish: {
        text: "[Quietly]\n\nEverything changes. Jump gate fees get challenged. Combine legitimacy gets challenged. Frontier Faction gets vindicated. Thirteen years of treaties built on a lie have to be renegotiated.\n\nIt'll be a very loud few years. Worth it.",
        options: [{ text: "Good.", go: null }],
      },
    },
  },
  pellandra: {
    id: 'pellandra',
    name: 'Commissioner Pellandra',
    title: 'Combine Trade Officer',
    portrait: 'pellandra',
    greeting: "Your ship is unusual. Is it registered? I'll need to see your papers.",
    tree: {
      root: {
        text: "The Persistent Delusion. Previously registered to one Edda Vance. Outstanding administrative queries against that registration.",
        flagsOnEnter: ['pellandra_met'],
        options: [
          { text: "What kind of queries?", go: 'queries' },
          { text: "She's been gone seven years.", go: 'gone' },
          { text: "Any legitimate work?", go: 'work' },
          { text: "[Hand over Petra's report.]", go: 'petra_report',
            requireFlag: 'petra_message_carry',
            requireNotFlag: 'petra_message_delivered' },
        ],
      },
      petra_report: {
        text: "[She takes the data wafer with the precise grip of someone who handles many wafers and remembers none of them.]\n\nA structural concern from The Sump. Yes. We are aware. The Combine's Mining Oversight Office will review it on the established schedule.\n\n[A faint smile.]\n\nThank you, Captain. Your civic engagement is noted.\n\n[She files it, in the precise sense of the word: a drawer opens, the wafer goes into it, the drawer closes.]",
        flagsOnEnter: ['petra_message_delivered'],
        options: [{ text: '[Leave.]', go: null }],
      },
      queries: {
        text: "Administrative. As I said.\n\n[Long pause]\n\nYou might do well to stick to established routes. Traders who operate in stable, monitored lanes tend to have very long and uneventful careers.",
        options: [
          { text: "That sounds like a suggestion.", go: 'suggestion' },
          { text: "I appreciate the advice.", go: null },
        ],
      },
      suggestion: {
        text: "A friendly one. The Combine is not an adversary to independent traders — we're a framework. Frameworks are comfortable. Comfortable is preferable to the alternative.",
        options: [{ text: "Understood.", go: null }],
      },
      gone: {
        text: "[Smiles slightly]\n\nPaperwork doesn't disappear because people do. Our memory is very long.\n\nSomething to keep in mind.",
        options: [{ text: "I'll remember that.", go: null }],
      },
      work: {
        text: "Cargo runs. Standard rates. Nothing complicated. If complicated things appeal to you, I'd suggest they appeal less.",
        options: [{ text: "I'll pass.", go: null }],
      },
    },
  },
  commander: {
    id: 'commander',
    name: 'Commander Yells',
    title: 'Station Commander, Vantage',
    portrait: 'commander',
    greeting: "State your business. Quickly.",
    tree: {
      root: {
        text: "An independent trader at a military outpost. Very confident or very lost.",
        options: [
          { text: "Trading. Looking for opportunities.", go: 'trade' },
          { text: "I've heard about Cold Harbor.", go: 'cold_harbor', flag: 'vantage_contact', flagLabel: '⚠️ Vantage contact made' },
          { text: "Just passing through.", go: null },
        ],
      },
      trade: {
        text: "We take ore and components. Standard rate. Contraband on the manifest — I'd know before you landed.",
        options: [
          { text: "Noted.", go: null },
          { text: "What do you know about Cold Harbor?", go: 'cold_harbor', flag: 'vantage_contact', flagLabel: '⚠️ Vantage contact made' },
        ],
      },
      cold_harbor: {
        text: "Cold Harbor is beyond our jurisdiction. It exists because it's not worth the ships to clear it out. If you're going — don't mention Vantage.\n\nThat's all I'll say.",
        options: [{ text: "Fair enough.", go: null }],
      },
    },
  },
  sable: {
    id: 'sable',
    name: 'Sable',
    title: 'Relay Engineer, Ashmore',
    portrait: 'sable',
    greeting: "You're not scheduled. Nothing from this direction is scheduled. How did you get the approach vector?",
    tree: {
      root: {
        text: "Ashmore Relay is supposed to be automated. I'm supposed to be maintenance. What I actually am is the only person who knows that everything transmitted in this sector passes through my equipment.",
        options: [
          { text: "I'm a trader. Looking for a port.", go: 'trader' },
          { text: "What do you hear on those transmissions?", go: 'transmissions' },
          { text: "Anything to trade?", go: 'trade' },
          { text: "Maren at The Wreck wants to know if a 32-outlet route is clean.",
            go: 'route_confirm',
            requireFlag: 'maren_quest_known',
            requireNotFlag: 'sable_route_confirmed' },
        ],
      },
      transmissions: {
        text: "[Long pause]\n\nI'm not supposed to answer that. But the encryption on certain traffic has a signature I recognise — Combine Executive level. And some of it is recent. It includes a ship name I've now heard twice.\n\nPersistent Delusion.",
        options: [
          { text: "They know I'm here.", go: 'known' },
          { text: "What are they saying?", go: 'content' },
        ],
      },
      known: {
        text: "They know you exist. The content is encrypted above my clearance, but the routing is clear — going to Combine Central, not any regional office.\n\nWhatever you're doing, it's attracting attention at the top.",
        options: [{ text: "Good to know.", go: null }],
      },
      content: {
        text: "I can't decrypt it. But traffic spiked when you entered the sector, and again when you visited New Geneva. There's a standing watch on any traffic mentioning Edda Vance.\n\nSomeone senior is tracking this personally.",
        options: [{ text: "Thank you for telling me.", go: 'why_tell' }],
      },
      why_tell: {
        text: "Because I've been sitting on this relay for six years and I'd like to think I still have capacity for choosing whose side I'm on.\n\nAlso I'm deeply bored. Don't discount that.",
        options: [{ text: "Fair enough.", go: null }],
      },
      trader: {
        text: "There's a market. Modest. Mostly Vantage supply runs.\n\nIf you want a quiet port that nobody is actively monitoring — which might be useful — Ashmore is about as quiet as it gets.",
        options: [{ text: "That's exactly what I needed.", go: null }],
      },
      trade: {
        text: "Components in quantity — everything that runs the relay. Food and medical I'd pay above rate for. It's just me out here.\n\nI'd also trade information. I have a lot of it.",
        options: [{ text: "Tell me about the transmissions.", go: 'transmissions' }],
      },
      route_confirm: {
        text: "[She listens to the request. Nods slowly.]\n\nThirty-two outlets, simultaneous publish. Yes — I can route that. The Combine won't be able to suppress it once it leaves my relay. By the time they notice the burst, it's already in print on twenty different stations.\n\nTell Maren the route is clean. I'll handle the technical end when Barker is ready to send.",
        flagsOnEnter: ['sable_route_confirmed'],
        options: [{ text: "I will. Thank you.", go: null,
          flag: 'sable_route_msg', flagLabel: '📡 Sable: route confirmed' }],
      },
    },
  },
  ghost: {
    id: 'ghost',
    name: 'Ghost',
    title: 'Information Broker, Farside',
    portrait: 'ghost',
    greeting: "I was told to expect you. I wasn't told by whom. That's usually how it works.",
    tree: {
      root: {
        text: "Farside has no official population. I am therefore not here and you are not speaking to me. This conversation cannot be logged because it isn't happening.\n\nWhat can the absence of information do for your absence here?",
        options: [
          { text: "I'm looking for Edda Vance.", go: 'edda' },
          { text: "What can you tell me about the Combine?", go: 'combine' },
          { text: "I'm looking for medical equipment for Iron Drift.", go: 'equipment',
            requireFlag: 'vasanta_quest' },
          { text: "What's trading here?", go: 'trade' },
        ],
      },
      equipment: {
        text: "[A long, thoughtful look.]\n\nA pulmonary calibrator, model 7-V. Yes. The Combine pharmacy stopped stocking it because the company that made it lost its licensing. The company is still operating, however, on a station that doesn't appear on any map. We have an arrangement.\n\n[He produces a small case from nowhere obvious.]\n\nThis is yours. Take it to Vasanta. Tell her it didn't come from me. Tell her it didn't come from anyone.",
        options: [
          { text: "[Take the case.]", go: null,
            flag: 'farside_equipment_held', flagLabel: '⚕ Calibrator: en route to Iron Drift' },
        ],
      },
      edda: {
        text: "Vance. Yes. She used Farside as a waypoint seven years ago. Left a message — not for me, but I read it anyway; professional instinct.\n\nThe message said: 'If anyone comes looking, tell them Cold Harbor. Tell them ask for no one. They'll know what that means.'",
        options: [
          { text: "Ask for no one.", go: 'no_one' },
          { text: "She was heading to Cold Harbor?", go: 'cold_harbor' },
        ],
      },
      no_one: {
        text: "Yes. Cold Harbor. There's a contact there who goes by no name. Operates through intermediaries. Has done so since the war.\n\nEdda trusted this contact completely. That's notable because Edda didn't trust anyone completely.",
        options: [{ text: "Thank you.", go: null }],
      },
      cold_harbor: {
        text: "That was the destination. Cold Harbor is the only place in this sector the Combine hasn't put eyes on. Which makes it the only place she could actually be safe.",
        options: [{ text: "Then that's where I'm going.", go: null }],
      },
      combine: {
        text: "The Combine has listening posts at Iron Drift and two other locations I won't specify. Standing surveillance on fourteen independent traders, including you, as of three weeks ago.\n\nThey're watching Kessel Expanse very carefully. Someone went there recently and they noticed.",
        options: [{ text: "That was probably me.", go: null }],
      },
      trade: {
        text: "Farside trades in things that don't officially exist. If that's your market, everything's available at a premium.\n\nConventionally: ore and not much else.",
        options: [{ text: "I'll look at the market.", go: null }],
      },
    },
  },
  rook: {
    id: 'rook',
    name: 'Rook',
    title: 'Trading Floor, The Wreck',
    portrait: 'rook',
    greeting: "Come in! Sit down! What have you got and what do you want for it?",
    tree: {
      root: {
        text: "The Wreck doesn't discriminate on origin, legality, or provenance. We buy things. We sell things. Very few questions.\n\nKasey sends people sometimes. If you know Kasey, ten percent on the buy rate.",
        options: [
          { text: "Kasey says hello.", go: 'kasey_friend' },
          { text: "What are you buying?", go: 'buying' },
          { text: "What do you know about Cold Harbor?", go: 'cold_harbor' },
          { text: '"You know a Devlin Marsh?"', go: 'r_devlin',
            requireFlag: 'devlin_asked_favour' },
        ],
      },
      r_devlin: {
        text: "[Pause.]\n\nHe sent a message. Said you'd vouch for him. Said you were good friends. Said he was 'well-regarded.'\n\nI've heard of Devlin Marsh.\n\nHe is regarded. The regard is specific.\n\n[A small smile.]\n\nI'll take a meeting. For you. Not for him.\n\nDon't tell him I said that. He'll make it into a story.",
        options: [{ text: '[Nod. Won\'t breathe a word.]', go: null,
          flag: 'devlin_rook_meeting', flagLabel: '🃏 Rook will take the meeting (for you)' }],
      },
      kasey_friend: {
        text: "Excellent person. Eleven months on Iron Drift and still finding ways to be useful. Respect that enormously.\n\nTen percent on anything you sell me today. I keep my word — competitive advantage in this business.\n\n[A nod, almost imperceptible.]\n\nIf you ever need work done that the Combine wouldn't license, my mechanic Cass is in the engineering crawl. Tell her I sent you.",
        flagsOnEnter: ['rook_trust'],
        options: [{ text: "What are you buying?", go: 'buying' }],
      },
      buying: {
        text: "Everything. Honestly, everything. Contraband, ore, components, luxury, tech, medical — four thousand people who need all of it.\n\nWe pay above standard on medical right now. Short on the good stuff.",
        options: [{ text: "I can work with that.", go: null }],
      },
      cold_harbor: {
        text: "Cold Harbor is the serious one. The Wreck is functional lawlessness. Cold Harbor is principled lawlessness. There's a distinction.\n\nThere's a contact there — nobody's ever seen them directly. Handles significant things. If you're going for a reason, say you're looking for an old ship. They'll know what you mean.",
        options: [{ text: "An old ship.", go: null }],
      },
    },
  },
  motes: {
    id: 'motes',
    name: 'Captain Motes',
    title: 'Retired Privateer',
    portrait: 'motes',
    greeting: "You're new. Don't get used to it — The Wreck changes people. Usually for the better.",
    tree: {
      root: {
        text: "I ran a privateer operation for fifteen years. Then the Frontier Wars ended and I didn't need to run anymore. Now I live on a decommissioned colony ship and I grow herbs. The universe is strange.",
        options: [
          { text: "Privateer for whom?", go: 'privateer' },
          { text: "What do you know about the Frontier Wars?", go: 'wars' },
          { text: "Advice for a trader?", go: 'advice' },
        ],
      },
      privateer: {
        text: "For whoever paid. Frontier Faction, mostly. Weapon interdiction — we stopped Combine supply convoys. Or tried to.\n\nThe trouble was they had more convoys than anyone expected. The resupply lines made no tactical sense unless you were shipping to both sides.",
        options: [
          { text: "The Combine was supplying the Frontier Faction?", go: 'supplying' },
          { text: "Did you ever meet Edda Vance?", go: 'edda' },
        ],
      },
      supplying: {
        text: "I didn't figure it out until after. Seven years of thinking about it.\n\nThey were supplying us with enough to keep us going. Not enough to win. Every time we got close to a decisive engagement, we'd be suddenly short on something critical. And the Combine would offer a 'humanitarian' ceasefire.\n\nThe war lasted thirteen years because they needed it to.",
        flagsOnEnter: ['motes_trust'],
        options: [
          { text: "To justify the jump gate licensing.", go: null },
          { text: '"Who else here knows the wars from your side?"', go: 'r_who_else' },
        ],
      },
      r_who_else: {
        text: "Two of us, properly. Old Maren wrote the only Frontier-side history of it that anyone bothered. Seven hundred pages. Unpublished — Combine licensing rules.\n\nThere's also a medic on this ship who saw the specific weapons that, officially, never arrived here. They go by Doctor. No last name.\n\nI'd suggest you let them know I sent you. Both of them. They don't open their doors otherwise.",
        options: [{ text: "Thank you, Captain.", go: null }],
      },
      edda: {
        text: "Once. She came to The Wreck about eight years ago. Asked me everything I just told you.\n\nShe had a theory. I had a story. We traded. She went to Kessel. I heard nothing after — until rumours started that she'd found something, that the Combine was looking, that she was alive and hiding.\n\nI hoped she made it.",
        options: [{ text: "I think she did.", go: null }],
      },
      wars: {
        text: "I ran interdiction for the Frontier Faction during the hot years. What I saw never added up until much later: we were always just barely losing. Like something was calibrating us.",
        options: [{ text: "Tell me more.", go: 'supplying' }],
      },
      advice: {
        text: "Don't be predictable. Vary your routes. Combine surveillance has patterns and those patterns have gaps.\n\nAlso: The Wreck pays above market on almost everything.",
        options: [{ text: "Good advice.", go: null }],
      },
    },
  },
  isha: {
    id: 'isha',
    name: 'Keeper Isha',
    title: 'Archive Keeper, Kessel',
    portrait: 'isha',
    greeting: "We're not open. We're never open. How did you get here?",
    tree: {
      root: {
        text: "The archive is officially decommissioned. Has been for twenty years. I keep it running because the records are important and someone has to.\n\nWho sent you?",
        options: [
          { text: "Nobody. I'm following Edda Vance's trail.", go: 'edda', requireFlag: 'edda_clue_3' },
          { text: "I'm just a trader.", go: 'just_trader' },
        ],
      },
      edda: {
        text: "...\n\n[A long silence]\n\nEdda is alive. I shouldn't tell you that. I'm telling you anyway because you're here, which means you've been thorough.\n\nShe left her decryption key with me. Said someone would come. Said they'd know about the data core.\n\nDo you have it?",
        options: [
          { text: "[Show data core] Yes.", go: 'has_core', requireFlag: 'has_data_core', flag: 'decryption_complete', flagLabel: '🔓 Data core decrypted' },
          { text: "I'm still trying to get it.", go: 'no_core' },
        ],
      },
      has_core: {
        text: "[Inserts the key]\n\nThe data core opens.\n\nCombine shipping manifests, 2051 to 2053. Weapons components, both sides. Authenticated, timestamped, unforgeable.\n\nThe Combine manufactured the Frontier Wars. Fifteen years of conflict to justify claiming control of every jump gate in the sector. The proof has been sitting here, waiting.\n\nEdda is at Cold Harbor. She's been waiting too.",
        options: [
          { text: "I need to get to Cold Harbor.", go: null, flag: 'truth_revealed', flagLabel: '📡 The truth is known' },
        ],
      },
      no_core: {
        text: "Not done yet. The core is somewhere in The Sump — Edda left it with a contact there.\n\nI'll be here. The archive will be here. We've been here for twenty years. A little longer won't matter.",
        options: [{ text: "I'll be back.", go: null }],
      },
      just_trader: {
        text: "Then you're in the wrong system. The Kessel Expanse hasn't been on established trade routes for twenty years.\n\nLeave the same way you came.",
        options: [{ text: "I'll do that.", go: null }],
      },
    },
  },
  yolanda: {
    id: 'yolanda',
    name: 'Yolanda Fitch',
    title: 'Customs Agent',
    portrait: 'yolanda',
    greeting: "Manifest, registration, port of last call. In that order. The queue's behind you.",
    entry: [
      // If your Combine standing has dropped past -20, she stops talking.
      { requireMaxCombine: -21, requireFlag: 'yolanda_seen', node: 'root_closed' },
      // If she has just learned about your standing dropping, she opens v6 — formal caution.
      { requireMinVisits: 2, requireMaxCombine: -10, node: 'root_caution' },
      // Trust ladder.
      { requireMinVisits: 5, requireFlag: 'yolanda_warm', node: 'root_logs' },
      { requireMinVisits: 4, node: 'root_v4' },
      { requireMinVisits: 3, node: 'root_v3' },
      { requireMinVisits: 2, node: 'root_v2' },
      { node: 'root' },
    ],
    tree: {
      // Visit 1: by the book.
      root: {
        text: "Welcome to Portsmith. Persistent Delusion — flagged for routine secondary checks. This is normal. It is also tedious.\n\n[She processes your paperwork at the speed of someone who has done this 11,000 times.]\n\nYou're cleared. Proceed.",
        flagsOnEnter: ['yolanda_seen'],
        options: [
          { text: '"What are the secondary checks for?"', go: 'r1_what' },
          { text: '"Thanks."', go: null },
          { text: '[Comply silently.]', go: null },
        ],
      },
      r1_what: {
        text: "Standard procedure for vessels with prior administrative queries. Yours has several. I am not authorised to discuss them.\n\n[She doesn't look up.]",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },

      // Visit 2: she's slightly faster. Possible to thaw with an offhand remark.
      root_v2: {
        text: "Persistent Delusion. Again. Hello.\n\n[She processes your forms with the air of someone who could write them with her eyes closed.]\n\nThis section is faster than usual. Don't tell my supervisor.",
        options: [
          { text: '"Long shift?"', go: 'r2_shift' },
          { text: '"Anything new on the file?"', go: 'r2_file' },
          { text: '[Don\'t take the bait. Just thanks.]', go: null },
        ],
      },
      r2_shift: {
        text: "Twelve hours on, four hours off. The ratio is illegal in three jurisdictions. Combine licensing is not one of them.\n\n[A pause.]\n\nDon't say I said that.",
        options: [
          { text: '"Your secret\'s safe."', go: 'r2_thaw' },
          { text: '"I\'ll keep moving."', go: null },
        ],
      },
      r2_thaw: {
        text: "[A small smile, very fast.]\n\nNext time — bring something other than freight to talk about. There are eight people on this concourse who have actual conversations. None of them work in this office.",
        options: [{ text: '"Noted."', go: null }],
      },
      r2_file: {
        text: "Nothing I can share. Officially.\n\n[She looks at the file. Then at you. Then back at the file.]\n\nIf I were to give advice — which I am not — someone is paying close attention to where this ship goes. But of course I'm not giving you that advice.",
        options: [{ text: '"Of course not."', go: null }],
      },

      // Visit 3: small talk. Earn rapport.
      root_v3: {
        text: "[A small nod as you arrive.]\n\nCaptain. Manifest. You can stop making me ask.\n\n[She processes faster than the queue requires.]",
        options: [
          { text: '"How\'s the office?"', go: 'r3_office' },
          { text: '"Anything I should know about today\'s checks?"', go: 'r3_checks' },
          { text: '"Forty credits says the kettle is broken."', go: 'r3_kettle' },
          { text: '[Smile. Leave.]', go: null },
        ],
      },
      r3_office: {
        text: "Same eight people. Same bad coffee. The plant on counter four died last week. Nobody has decided whose fault it is.\n\n[She tilts her head a fraction.]\n\nThank you for asking. Most people don't.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      r3_checks: {
        text: "Nothing flagged today. Tomorrow might be different.\n\n[Quieter.]\n\nThere are flags going up across the sector. Not for you specifically. For the kind of route you're flying.",
        options: [{ text: '"Understood."', go: null }],
      },
      r3_kettle: {
        text: "[An actual laugh, brief and surprised.]\n\nIt is. The kettle is broken. We've had three forms in to fix it and one of them was filed twice.\n\n...you'll do, Captain. You'll do.",
        options: [{ text: '[Leave smiling.]', go: null, flag: 'yolanda_warmer' }],
      },

      // Visit 4: she's properly warm now. The Combine watch comes up.
      root_v4: {
        text: "[She doesn't bother with the manifest this time.]\n\nYou're back. The queue can wait for once.\n\nWhat can I do for you, Captain?",
        options: [
          { text: '"What\'s the Combine flagging on me?"', go: 'r4_flags' },
          { text: '"How are you?"', go: 'r4_personal' },
          { text: '"Tell me about your job."', go: 'r4_job' },
          { text: '[Just here for the manifest.]', go: null },
        ],
      },
      r4_flags: {
        text: "[Lower voice.]\n\nYour ship is on a watch list. Not the public one. The other one. Combine Executive — three levels above me — has standing orders to be alerted when you dock.\n\nThe alert is informational, not enforcement. They want to know where you go. They are not, currently, telling anyone to stop you.\n\nThis suggests they want to follow you to something.",
        options: [{ text: '"I appreciate it."', go: null,
          flag: 'combine_attention', flagLabel: '👁 Combine is watching' }],
      },
      r4_personal: {
        text: "Bored. Underpaid. Furious in a quiet, professional way.\n\n[She gestures at the office.]\n\nFifteen years of this. It pays. It's secure. I can't decide if that's worse or better.",
        options: [
          { text: '"Maybe not for long."', go: 'r4_warm', flag: 'yolanda_warm',
            flagLabel: '🤝 Yolanda is willing to share what she\'s found' },
          { text: '[Don\'t push.]', go: null, flag: 'yolanda_warm',
            flagLabel: '🤝 Yolanda noticed you didn\'t push' },
        ],
      },
      r4_warm: {
        text: "[A long look.]\n\nMaybe not. Come back. There's something I'd like to show you, but not at the desk.",
        options: [{ text: '"I\'ll be back."', go: null }],
      },
      r4_job: {
        text: "Officially: I process cargo paperwork. Unofficially: I read every manifest and I notice when one of them is lying.\n\n[Beat.]\n\nThat used to be a private hobby. Then it became three years of notes.",
        options: [
          { text: '"What kind of notes?"', go: 'r4_notes' },
          { text: '[Leave it alone for now.]', go: null, flag: 'yolanda_warm' },
        ],
      },
      r4_notes: {
        text: "[Quietly.]\n\nNotes. The kind that are worth nothing on their own. Possibly worth something to someone with the rest of the picture.\n\nCome back. I want to think about whether to give them to you.",
        options: [{ text: '[Leave.]', go: null, flag: 'yolanda_warm' }],
      },

      // Visit 5+ (with yolanda_warm): she shares the logs.
      root_logs: {
        text: "[She doesn't even pretend to look at the manifest.]\n\nFive visits. That's enough for me. I've decided.\n\n[She slides a folded sheet across the counter.]\n\nThree years of notes. Names of ships, dates, a cross-reference column. Half of it makes sense if you've been to the right systems. The rest will make sense to someone who's been to the systems I haven't.\n\nIt's yours. I copied it slowly so the office monitor wouldn't notice.",
        options: [
          { text: '"This matters. Thank you."', go: null,
            flag: 'yolanda_logs', flagLabel: '📓 Yolanda\'s anomaly logs' },
          { text: '"Why give them to me?"', go: 'logs_why',
            flag: 'yolanda_logs', flagLabel: '📓 Yolanda\'s anomaly logs' },
        ],
      },
      logs_why: {
        text: "[A flat look.]\n\nBecause if I give them to my supervisor they get filed. If I give them to the Combine they get classified. If I sit on them they stay private until I retire and then they get binned.\n\nYou go places. They might mean something where you're going.\n\nThat's worth more than the safer options.",
        options: [{ text: '[Take them. Leave.]', go: null }],
      },

      // Standing too low: she shuts you down.
      root_closed: {
        text: "[She processes the manifest without looking up.]\n\nYour ship has accumulated several formal cautions. I am not in a position to discuss them informally.\n\nYou are cleared. Have a productive trade.\n\n[She does not make eye contact.]",
        options: [{ text: '[Leave.]', go: null }],
      },

      // Standing dipping: formal caution dialogue (between visits 2-4 if combine has slipped).
      root_caution: {
        text: "[She looks up with the controlled tone of someone reading from a card.]\n\nI need to log a formal caution against your registration. You can contest it. I would suggest you do not make it worse before you do.\n\nSit down.",
        options: [
          { text: '[Sit. Listen.]', go: 'caution_listen' },
          { text: '"What\'s the caution for?"', go: 'caution_for' },
          { text: '[Walk out anyway.]', go: null, combineDelta: -3 },
        ],
      },
      caution_listen: {
        text: "Three flagged events in your travel record. Customs evasion, signal interference, encounter with a patrol cutter that ended in damage to that cutter.\n\nNone of these are conclusive. All of them are noted.\n\n[Quieter.]\n\nIf you can avoid attracting more, the cautions can be dropped. If not — they cannot.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      caution_for: {
        text: "I just told you. Three separate flagged events. The Combine reviews them quarterly.\n\nIf I am being completely honest — and I am paid not to be — the system is more interested in patterns than incidents. You can become uninteresting again.",
        options: [{ text: '[Leave.]', go: null }],
      },
    },
  },

  the_kid: {
    id: 'the_kid',
    name: 'The Kid',
    title: 'Concourse Regular',
    portrait: 'the_kid',
    greeting: "You're new. New ships pay better.",
    entry: [
      { requireFlag: 'kid_edda', node: 'root_after_edda' },
      { requireFlag: 'kid_met', node: 'root_known' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I run errands. Fast. Cheap. Don't ask questions about the cargo, mister. Or miss. Or whatever.",
        options: [
          { text: "What's your name?", go: 'first_name' },
          { text: "How old are you?", go: 'first_age' },
          { text: "I don't need errands.", go: 'first_dismiss', flag: 'kid_met' },
        ],
      },
      first_name: {
        text: "Don't have one. Or, I do, but I'm not telling. The dock master called me 'Hey' for two years. It works.\n\nWhat's your ship called?",
        options: [
          { text: "Persistent Delusion.", go: 'first_ship' },
          { text: "Why do you want to know?", go: 'first_curious' },
        ],
      },
      first_ship: {
        text: "[A small pause.]\n\nThat's a good name.\n\n...\n\nGood luck, mister.",
        options: [
          { text: "You okay?", go: 'first_okay', flag: 'kid_met' },
          { text: "Thanks.", go: null, flag: 'kid_met' },
        ],
      },
      first_curious: {
        text: "Just curious. Lots of ships come through. Some of them are interesting. Most aren't.",
        options: [
          { text: "Mine?", go: 'first_ship' },
          { text: "I'll let you get on with it.", go: null, flag: 'kid_met' },
        ],
      },
      first_okay: {
        text: "I'm fine. Always fine. People who aren't fine don't last on Portsmith and I've been here forever. So. Fine.",
        options: [{ text: "Take care.", go: null, flag: 'kid_met' }],
      },
      first_dismiss: {
        text: "Suit yourself. I'll be here.",
        options: [{ text: "I bet.", go: null }],
      },
      first_age: {
        text: "Old enough.",
        options: [{ text: "Right.", go: null, flag: 'kid_met' }],
      },

      root_known: {
        text: "Hey, Persistent Delusion. Back again.\n\n[The kid sizes you up. They are very good at sizing people up.]\n\nYou're not running cargo. Not really. You're running... something. What?",
        options: [
          { text: "I'm trying to find someone.", go: 'known_find' },
          { text: "I'm trading.", go: 'known_trade' },
          { text: "It's complicated.", go: 'known_complicated' },
        ],
      },
      known_trade: {
        text: "Sure. Sure. Trader. Right. The trader who keeps coming back to ask the dock master about the previous owner.",
        options: [
          { text: "Maybe I'm trying to find someone.", go: 'known_find' },
          { text: "Mind your business.", go: null },
        ],
      },
      known_complicated: {
        text: "Everyone says that. It's never as complicated as people think.",
        options: [
          { text: "I'm trying to find someone.", go: 'known_find' },
          { text: "Maybe so.", go: null },
        ],
      },
      known_find: {
        text: "[The kid goes still.]\n\nWho?",
        options: [
          { text: "Edda Vance.", go: 'known_edda', flag: 'kid_edda', flagLabel: '🔍 The Kid remembers Edda' },
        ],
      },
      known_edda: {
        text: "[A long pause. The kid sits down, which they don't usually do.]\n\nShe used to give me food.\n\nLast time I saw her — three weeks before she went — she stopped right where you are. Pressed a credit chip into my hand. Said: 'If anyone asks where I went, tell them I went somewhere it'd take a person to find me.'\n\nI didn't get it for years. Then I figured it out. She wanted someone like you to come ask.",
        options: [
          { text: "Was that the last thing she said?", go: 'known_last' },
          { text: "Thank you.", go: 'known_thanks' },
        ],
      },
      known_last: {
        text: "She also said: 'Tell them I'm sorry I didn't pay Grex.'\n\n[A very small smile.]\n\nShe knew people would come. She was making jokes at the door. That was Edda.",
        options: [{ text: "I'll be back.", go: null }],
      },
      known_thanks: {
        text: "[The kid shrugs.]\n\nDon't thank me. Find her.",
        options: [{ text: "I will.", go: null }],
      },

      root_after_edda: {
        text: "[The kid raises an eyebrow.]\n\nAny news?",
        options: [
          { text: "Still working on it.", go: 'after_working' },
          { text: "Just stopping by.", go: null },
        ],
      },
      after_working: {
        text: "[A nod.]\n\nKeep working. I'll be here.",
        options: [{ text: "Thanks, Kid.", go: null }],
      },
    },
  },

  ines: {
    id: 'ines',
    name: 'Ines',
    title: 'Junior Attaché, Combine Embassy',
    portrait: 'ines',
    greeting: "Welcome to the embassy. May I see your registration?",
    entry: [
      // The confrontation: two alerts have fired and she hasn't yet committed.
      { requireFlags: ['ines_alert_1', 'ines_alert_2'],
        requireNotFlag: 'ines_resolved',
        node: 'confrontation' },
      { requireMinVisits: 3, node: 'root_v3' },
      { requireMinVisits: 2, node: 'root_v2' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[She holds out her hand for the manifest. The handshake is a formality; the registration check is the actual purpose.]\n\nThe Persistent Delusion. Previously registered to one Edda Vance. Several outstanding administrative queries. Standard procedure to verify a transfer of ownership.\n\n[She doesn't look up.]",
        flagsOnEnter: ['ines_seen'],
        options: [
          { text: '"Just routine trade."', go: 'r1_routine' },
          { text: '"Why does my registration always come up?"', go: 'r1_why' },
          { text: '[Comply in silence.]', go: 'r1_silent', inesTrustDelta: 5 },
        ],
      },
      r1_routine: {
        text: "Yes. Quite. The registration shows trade routes and your trade routes are... varied.\n\n[A small pause.]\n\nVery well. Cleared.",
        options: [{ text: '[Leave.]', go: null, inesTrustDelta: 2 }],
      },
      r1_why: {
        text: "[She looks up.]\n\nBecause it has standing queries. As I said.\n\n[Beat.]\n\n...if you have specific concerns about your file, the public-records office on the third floor handles those. I am not in a position to discuss the queries themselves.",
        options: [
          { text: '"Understood."', go: null, inesTrustDelta: 3 },
          { text: '"They\'re about the previous owner, aren\'t they?"', go: 'r1_previous', inesTrustDelta: 5 },
        ],
      },
      r1_previous: {
        text: "[She sets the stamp down.]\n\nI am not in a position to confirm or deny the contents of an active query.\n\n[She looks at you again. There's something in her face that wasn't there a moment ago.]\n\nGood day, Captain.",
        options: [{ text: '[Leave.]', go: null, inesTrustDelta: 5 }],
      },
      r1_silent: {
        text: "[She processes the paperwork without looking up. The stamp comes down with a precise thud.]\n\nCleared. Have a productive trade.",
        options: [{ text: '[Leave.]', go: null }],
      },

      root_v2: {
        text: "[She looks up sooner this time. The registration check is faster.]\n\nCaptain. The Persistent Delusion. Same outstanding queries. Same procedure.\n\n[She processes silently for a moment, then.]\n\nYou've been to four systems since I last saw you. I notice these things.",
        options: [
          { text: '"Just trading."', go: 'r2_trading' },
          { text: '"You read the registration logs?"', go: 'r2_logs' },
          { text: '"Should I be worried that you notice?"', go: 'r2_worried' },
        ],
      },
      r2_trading: {
        text: "Of course.\n\n[She doesn't look convinced. She also doesn't push.]",
        options: [{ text: '[Leave.]', go: null }],
      },
      r2_logs: {
        text: "All staff do. It's the most boring part of the job and the only part where you can find anything genuinely interesting.\n\n[A pause.]\n\nIf I were not standing here in this uniform, I might say I'd been finding interesting things.",
        options: [
          { text: '"Like what?"', go: 'r2_like_what', inesTrustDelta: 5 },
          { text: '"Interesting how?"', go: 'r2_interesting' },
          { text: '[Don\'t push.]', go: null, inesTrustDelta: 8 },
        ],
      },
      r2_like_what: {
        text: "[She glances at the door.]\n\nA pattern of administrative queries that don't reconcile with the public record. I am not at liberty to elaborate. The fact that I am saying this much would be considered a breach.\n\nThank you for not asking again.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r2_interesting: {
        text: "Inconsistencies. Boring inconsistencies. The kind that don't matter unless you're looking, and shouldn't matter even then.\n\n[A small shrug.]\n\nIt's an academic interest. I am very junior.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r2_worried: {
        text: "[A short laugh.]\n\nNo. I'm a registration clerk. I notice things in the way you'd notice if a regular at your bar started coming in on different days.\n\nIt's not surveillance. It's a habit.",
        options: [{ text: '[Leave.]', go: null }],
      },

      root_v3: {
        text: "[The registration check is a formality now — she stamps it and slides it back without checking.]\n\nCaptain.\n\n[She looks at the door, then at you.]\n\nIs there anything you wanted to talk about that wasn't on the manifest? Strictly off the record.",
        options: [
          { text: '"You first."', go: 'r3_you_first' },
          { text: '"What\'s being said about my ship?"', go: 'r3_ship', inesTrustDelta: 5 },
          { text: '"I knew the previous owner."', go: 'r3_knew', inesTrustDelta: 10,
            flag: 'ines_alert_1', flagLabel: '⚠ Ines is paying close attention' },
          { text: '"Nothing I can share yet."', go: 'r3_nothing', inesTrustDelta: 5 },
        ],
      },
      r3_you_first: {
        text: "[A quick smile.]\n\nFair. I joined two years ago. I have a degree. I'm twenty-two. The job description said diplomatic policy work; the actual job is mostly stamping forms and watching for irregularities.\n\nYou're an irregularity. I've decided you're an interesting one.",
        options: [{ text: '"That\'s either a compliment or a problem."', go: 'r3_either' }],
      },
      r3_either: {
        text: "[A longer smile.]\n\nIt could be both.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r3_ship: {
        text: "[She lowers her voice.]\n\nThe alerts are old. The standing watch is new — it was activated when you arrived in the sector. Renewed weekly.\n\nThat means someone above me wants to know where you are. Not to stop you, currently. Just to know.\n\nI'm not supposed to tell you that.",
        options: [
          { text: '"Why are you telling me?"', go: 'r3_why_tell' },
          { text: '[Take it in. Leave.]', go: null, inesTrustDelta: 5 },
        ],
      },
      r3_why_tell: {
        text: "[A pause.]\n\nBecause when I joined, the briefing said the Combine's regional administration is transparent and audit-friendly. And then I started reading the actual files.\n\nBecause if you're not the bad person here, I'd like to know.",
        options: [{ text: '[Leave thoughtfully.]', go: null, inesTrustDelta: 10 }],
      },
      r3_knew: {
        text: "[She goes very still.]\n\nEdda Vance was — is — a person of significant interest. Knowing her is not, in itself, a crime.\n\n[Beat.]\n\nIs there more?",
        options: [
          { text: '"Yes. But not here."', go: 'r3_not_here' },
          { text: '"I\'m looking for what she found."', go: 'r3_looking',
            flag: 'ines_alert_2', flagLabel: '⚠ Second alert tripped' },
        ],
      },
      r3_not_here: {
        text: "[A long look.]\n\nI'd rather you trust me than rush this. Come back.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r3_looking: {
        text: "[Absolute stillness.]\n\nI think I need to stop talking now. Come back when you've decided what you want from me.\n\nClear the embassy.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r3_nothing: {
        text: "[She nods.]\n\nThat's also fine. Some things keep better when shared less.\n\nThe stamp is on your manifest. Have a productive trade.",
        options: [{ text: '[Leave.]', go: null }],
      },

      // The conversation that has no good option.
      confrontation: {
        text: "[She doesn't ask for the manifest. She looks at the door, then at you.]\n\nThe Persistent Delusion. Edda Vance's ship. She disappeared seven years ago. The Combine has standing queries against her registration. Which means standing queries against you.\n\n[She looks at you directly for the first time.]\n\nI'm supposed to report this conversation. I'm standing here not reporting it.\n\nI would like to understand why I'm doing that.",
        flagsOnEnter: ['ines_resolved'],
        options: [
          { text: '"I\'ll tell you everything. From the beginning."', go: 'cf_everything' },
          { text: '"You already know why."', go: 'cf_already_know' },
          { text: '"I can\'t tell you. But you\'re not wrong."', go: 'cf_not_wrong' },
          { text: '"Report it if you need to."', go: 'cf_report' },
        ],
      },
      cf_everything: {
        text: "[She listens. The story takes thirty minutes. She does not interrupt once.]\n\n...\n\n[The room is very quiet. She stares at the desk. You cannot read her face.]",
        options: [
          { text: '[Wait for her to decide.]', go: null, inesOutcome: 'random' },
        ],
      },
      cf_already_know: {
        text: "[A pause that feels longer than it is.]\n\nYes. I do.\n\n[She closes her file. Picks up the stamp. Sets it down again.]\n\nThe registration is approved. Have a productive trade, Captain.\n\n[Quieter, almost to herself.]\n\nI'll find a way to be useful. Just don't make me decide too much, too fast.",
        options: [{ text: '[Leave. Quietly.]', go: null,
          flag: 'ines_asset', flagLabel: '🤝 Ines: inside source' }],
      },
      cf_not_wrong: {
        text: "[She closes her eyes for a moment. Opens them.]\n\nThank you for not asking me to choose more than I have to.\n\nThe registration is approved. Whenever you come through, ask for me. I will tell you what I can.\n\nDon't make this a habit.",
        options: [{ text: '[Leave.]', go: null,
          flag: 'ines_asset', flagLabel: '🤝 Ines: inside source' }],
      },
      cf_report: {
        text: "[A long silence.]\n\n[She picks up the stamp. Stamps the manifest. Slides it back.]\n\nNo, Captain. I won't report it. I will, however, remember that you offered.\n\n[Softer.]\n\nIt makes a difference.",
        options: [{ text: '[Leave.]', go: null,
          flag: 'ines_asset', flagLabel: '🤝 Ines: inside source' }],
      },
    },
  },

  rennick: {
    id: 'rennick',
    name: 'Rennick',
    title: 'Retired Salvager',
    portrait: 'rennick',
    greeting: "...",
    entry: [
      { requireFlag: 'rennick_v3', node: 'root_v3' },
      { requireFlag: 'rennick_v2', node: 'root_v2' },
      { requireFlag: 'rennick_v1', node: 'root_v1' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[An older man on the bench, watching nothing in particular. He doesn't look up as you approach.]\n\nMost people walk past.",
        options: [
          { text: "I'm not most people.", go: 'first_open' },
          { text: "Sorry to bother you.", go: 'first_pass' },
        ],
      },
      first_open: {
        text: "[He glances at you. Looks back at the concourse.]\n\nMaybe. Maybe not. We'll see.\n\nWhat are you, then?",
        options: [
          { text: "A trader. New here.", go: 'first_trader', flag: 'rennick_v1' },
          { text: "Just curious about you.", go: 'first_curious', flag: 'rennick_v1' },
        ],
      },
      first_trader: {
        text: "Trader. Right. Plenty of those.\n\nI used to be a salvager. Twenty years. Found things. Forgot some. Remember most.\n\n[He looks at his hands.]\n\nCome back tomorrow. If you do.",
        options: [{ text: "I will.", go: null }],
      },
      first_curious: {
        text: "[He makes a small noise that might be a laugh.]\n\nCurious people find things. Not always what they wanted to find.\n\n...come back tomorrow. If you remember.",
        options: [{ text: "I will.", go: null }],
      },
      first_pass: {
        text: "[He nods, fractionally.]",
        options: [{ text: "[Walk away.]", go: null }],
      },

      root_v1: {
        text: "[He's there. He's always there.]\n\nYou came back. Most don't.",
        options: [
          { text: "What did you do, before?", go: 'v1_history' },
          { text: "What are you waiting for?", go: 'v1_waiting' },
          { text: "I just like the bench.", go: 'v1_bench', flag: 'rennick_v2' },
        ],
      },
      v1_history: {
        text: "Salvage. Twenty years. Independent rigs, mostly — the ones that drift. Found a lot of dead ships. A few alive ones with dead crews. Two, three things I shouldn't have found.\n\nI stopped. Came here. Sit. Watch.\n\nAsk me again tomorrow.",
        options: [{ text: "I will.", go: null }],
      },
      v1_waiting: {
        text: "Someone to do something about what I found.\n\n[A pause.]\n\nMight be you. Might not. You're early to tell. Come back tomorrow.",
        options: [{ text: "Tomorrow.", go: null }],
      },
      v1_bench: {
        text: "[He looks at you properly for the first time.]\n\nThat's the right answer. Come back tomorrow and I'll tell you why.",
        options: [{ text: "I will.", go: null }],
      },

      root_v2: {
        text: "[He's smoking now. He wasn't, before.]\n\nThird time. That's persistence. Or stubbornness. Often the same.\n\nAlright. I'll tell you.",
        options: [
          { text: "Tell me.", go: 'v2_tell' },
          { text: "Maybe later.", go: null },
        ],
      },
      v2_tell: {
        text: "Twenty years ago, salvaging in deep space. Off the registered routes. I was looking for a debris field someone had paid me to map.\n\nWhat I found instead was a station. Operational. Lights on. Combine military insignia. Running dark — no transponder, no comms.\n\nI did not announce myself. I do not know if I was seen. I left, very fast, and did not file the coordinates.\n\nIt's been there twenty years. It's still there. I check, sometimes.",
        options: [
          { text: "Where?", go: 'v2_where', flag: 'rennick_coords', flagLabel: '🗺 Rennick\'s coordinates' },
          { text: "Why didn't you report it?", go: 'v2_why_not' },
        ],
      },
      v2_where: {
        text: "[He hands you a slip of paper. Coordinates, hand-written, exact.]\n\nDon't go alone. Don't go without a reason. Don't go at all, if you've got the sense.\n\nBut you might have the reason. So there it is.",
        options: [{ text: "Thank you.", go: null, flag: 'rennick_v3' }],
      },
      v2_why_not: {
        text: "Who would I report it to? The Combine? Whose station it isn't?\n\nI'm not stupid. I'm just old.",
        options: [
          { text: "Where is it?", go: 'v2_where', flag: 'rennick_coords', flagLabel: '🗺 Rennick\'s coordinates' },
          { text: "Fair enough.", go: null, flag: 'rennick_v3' },
        ],
      },

      root_v3: {
        text: "[He nods at you, almost a friend.]\n\nYou're going somewhere with what I gave you. Or you're not. Either way, it's not my problem any more.",
        options: [
          { text: "Anything else I should know?", go: 'v3_more' },
          { text: "Thanks for trusting me.", go: 'v3_thanks' },
        ],
      },
      v3_thanks: {
        text: "Don't thank me. Use it.\n\n...if you do, the bench will still be here. Come tell me how it went.",
        options: [{ text: "I will.", go: null }],
      },
      v3_more: {
        text: "There's a cartographer at Meridian who buys system locations like that one. She's been looking for it for years. If you don't go yourself, sell it to her. She'll know what to do.\n\nThat's all. I'm out of stories.",
        options: [{ text: "Understood.", go: null }],
      },
    },
  },

  devlin: {
    id: 'devlin',
    name: 'Devlin Marsh',
    title: 'Professional Gambler',
    portrait: 'devlin',
    greeting: "[A man at his own corner, alone, wearing the face of someone who has convinced himself things are going well.]",
    entry: [
      // After game complete: passive coda. Player walks past, Devlin nods.
      { requireFlag: 'game_complete', node: 'root_coda' },
      // Late-game special encounter — only fires once per playthrough.
      { requireFlag: 'devlin_payoff_grudge', requireNotFlag: 'devlin_grudge_resolved', node: 'root_payoff_grudge' },
      { requireFlag: 'devlin_payoff_friendship', requireNotFlag: 'devlin_friendship_resolved', node: 'root_payoff_friendship' },
      // Player has lost N times vs Devlin → loss-state greetings (he's "winning").
      { requireMinDevlinWinsVsPlayer: 3, node: 'root_loss_3' },
      { requireMinDevlinWinsVsPlayer: 2, node: 'root_loss_2' },
      { requireMinDevlinWinsVsPlayer: 1, node: 'root_loss_1' },
      // Player has won N times vs Devlin → win-state greetings (he's "wronged").
      { requireMinPlayerWinsVsDevlin: 3, node: 'root_win_3' },
      { requireMinPlayerWinsVsDevlin: 2, node: 'root_win_2' },
      { requireMinPlayerWinsVsDevlin: 1, node: 'root_win_1' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "Ah. New face.\n\nDevlin Marsh. Professional gambler, student of human nature, exceptional judge of character.\n\n[Gestures at the empty seats around him.]\n\nI prefer my own company. By choice. People find my ability to read them uncomfortable. Understandable.\n\nDo you play Stone, Blade, Cloth?",
        options: [
          { text: '"Never heard of it."', go: 'r_invented' },
          { text: '"Rock paper scissors?"', go: 'r_offended' },
          { text: '"What are the stakes?"', go: 'r_stakes' },
          { text: '"I\'ll pass."', go: 'r_pass' },
        ],
      },
      r_invented: {
        text: "Extraordinary. I invented it.\n\nSit down. I'll explain.\n\n[He produces a laminated card. The card is laminated. It is detailed. It is, structurally, the same as several other games you may have heard of, but he is going to be very put out if you mention this.]\n\nReady?",
        options: [
          { text: '"Let\'s play."', go: 'r_play' },
          { text: '"Maybe later."', go: 'r_pass' },
        ],
      },
      r_offended: {
        text: "[Long pause.]\n\nI'm going to pretend you didn't say that and we're going to start this interaction again.\n\nDo you play Stone, Blade, Cloth?",
        options: [
          { text: '"...sure. Let\'s play."', go: 'r_play' },
          { text: '"Right. Sorry. Carry on."', go: 'r_pass' },
        ],
      },
      r_stakes: {
        text: "Straight to business. I like that. Efficiency.\n\nWe'll discuss stakes once I've assessed your skill level. Which will take approximately one round. I'm very quick.",
        options: [
          { text: '"Deal me in."', go: 'r_play' },
          { text: '"On second thought."', go: 'r_pass' },
        ],
      },
      r_pass: {
        text: "Your prerogative. The offer stands. I'll be here.\n\n[He is always here.]\n\nI'm always here.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r_play: {
        // The dialogue option triggers OPEN_GAMBLING via the reducer hook.
        text: "Excellent. Let's see what you've got.",
        options: [{ text: '[Sit down at the table.]', go: null, openGambling: true }],
      },

      // ── Loss-state greetings (Devlin has won previously) ──
      root_loss_1: {
        text: "My friend! Sit down. Same table as last time — I've kept it.\n\nReady for a rematch? I've developed some new strategies since we played. Not that I needed them. But I've developed them anyway. For completeness.",
        options: [
          { text: '"Deal me in."', go: 'r_play' },
          { text: '"Maybe another time."', go: 'r_pass' },
        ],
      },
      root_loss_2: {
        text: "[Standing up slightly as you approach.]\n\nMy associate! My good friend!\n\nI was telling people about you just yesterday. Describing your playing style. Very instructive for them.\n\nI may have also mentioned that you lost. This was relevant context.\n\nPlay again?",
        options: [
          { text: '"Sure. One more."', go: 'r_play' },
          { text: '"Not today."', go: 'r_pass' },
        ],
      },
      root_loss_3: {
        text: "[Waves you over immediately.]\n\nI need a favour. Small favour. The kind of favour that good friends do for each other automatically.\n\nYou know Rook at The Wreck? I'd like an introduction. You could tell her I'm well-regarded. I am well-regarded.\n\n[A beat.]\n\nIn certain contexts.\n\nPlay first, favour after. Same stakes as usual?",
        options: [
          { text: '"I\'ll think about Rook. Deal me in."', go: 'r_play',
            flag: 'devlin_asked_favour', flagLabel: '🃏 Devlin wants an intro to Rook' },
          { text: '"Not today, Devlin."', go: 'r_pass' },
        ],
      },

      // ── Win-state greetings (player has won previously) ──
      root_win_1: {
        text: "You.\n\n[Pause.]\n\nI've been thinking about our last game. There are some irregularities I'd like to discuss. Primarily the draught.",
        options: [
          { text: '"There was no draught, Devlin."', go: 'r_no_draught' },
          { text: '"Want to try again?"', go: 'r_play' },
          { text: '[Leave him to it.]', go: null },
        ],
      },
      r_no_draught: {
        text: "[A long, dignified silence.]\n\nThat is a matter of professional disagreement. We will not resolve it here.\n\nDo you want to play or not.",
        options: [
          { text: '"Yes."', go: 'r_play' },
          { text: '"Not today."', go: 'r_pass' },
        ],
      },
      root_win_2: {
        text: "[Elaborate, performative pleasantness.]\n\nHow wonderful to see you. You're looking well. That's a nice ship. How are things going.\n\n[Each sentence delivered with the warmth of a man defusing a bomb inside himself.]\n\nWould you like to play again.",
        options: [
          { text: '"Sure. Let\'s play."', go: 'r_play' },
          { text: '"Maybe another time."', go: 'r_pass' },
        ],
      },
      root_win_3: {
        text: "I want it known that I don't bear grudges. Devlin Marsh does not bear grudges.\n\nI'm simply noting, for the record, that the record exists, and that I have it, and that it shows some irregular outcomes that have not yet been satisfactorily explained.\n\nGood to see you. Play again?",
        options: [
          { text: '"Sure."', go: 'r_play' },
          { text: '"Take care, Devlin."', go: 'r_pass' },
        ],
      },

      // ── Late-game payoff (player has grudge) ──
      root_payoff_grudge: {
        text: "[He's not at his table. He's standing. This is unusual.]\n\nI have information.\n\nI want it noted that I am providing this information as a person of integrity and not because of any ongoing... situation... between us regarding certain game outcomes. This is professional. This is me being professional.\n\n[A pause.]\n\nI may also want a small acknowledgment. Not an apology. I'm not asking for an apology. Just an acknowledgment that the atmospheric conditions at Meridian Cross are not always conducive to optimal performance and that this is a known variable.\n\n[He looks at you.]\n\nTwo Combine agents were asking about your ship at the Vantage approach corridor. Very polished. Very specific questions. They mentioned Edda Vance by name.\n\nI happened to overhear. I happen to overhear a lot. Nobody pays attention to a man who is known for talking about himself.\n\n[Another pause.]\n\nThat information is worth something. I'm not charging you for it. I'm providing it freely. As a person of integrity. I'd like that noted.",
        options: [
          { text: '"Thank you, Devlin. Genuinely."', go: 'r_payoff_thanks' },
          { text: '"What do you want, Devlin?"', go: 'r_payoff_what' },
          { text: '[Say nothing. Wait.]', go: 'r_payoff_silent' },
        ],
      },
      r_payoff_thanks: {
        text: "[His expression does something complicated.]\n\nRight. Good. Yes. Well.\n\n[A long pause.]\n\nThe draught was real, you know. I'm not saying it changed anything. I'm saying it was real.\n\n[He nods. Walks away. Probably to his table. Maybe somewhere else. Hard to say.]",
        options: [{ text: '[Leave.]', go: null,
          flag: 'devlin_grudge_resolved', flagLabel: '🃏 Devlin: grudge softened',
          frontierDelta: 3 }],
      },
      r_payoff_what: {
        text: "I want—\n\n[He stops himself.]\n\nNothing. I want nothing. I want you to know that I am capable of wanting nothing and choosing to help anyway. Some people are like that. I am one of those people.\n\n[He clearly wanted something.]\n\nWatch the Vantage approach.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      r_payoff_silent: {
        text: "[He holds your gaze for a moment.]\n\n...you're doing that on purpose.\n\n[He tells you anyway. The information is the same. He leaves slightly faster than he meant to.]",
        options: [{ text: '[Leave.]', go: null }],
      },

      // ── Late-game payoff (player owes Devlin / he's the friend) ──
      root_payoff_friendship: {
        text: "[He looks pleased. More pleased than usual. This is concerning.]\n\nFinal game. You and me. Proper stakes.\n\nI've been studying your patterns. I know what you're going to pick. I've known for three games. I've been building to this. This is my moment.\n\n[He sets down a very specific amount of credits — enough to matter, not enough to be ruinous.]\n\nI want everything you're carrying. Or — and I know this sounds specific — I want you to tell Rook at The Wreck that I'm genuinely well-regarded.\n\nNot as a favour. As a factual statement. Because after I win this, I will genuinely be well-regarded. By you. Because you lost to me again. Peer recognition.",
        options: [
          { text: '[Play the final game.]', go: null, openGambling: true,
            gamblingFinal: true },
          { text: '"Not today, Devlin."', go: 'r_payoff_refuse' },
        ],
      },
      r_payoff_refuse: {
        text: "...\n\nRight.\n\n[He picks up the credits slowly.]\n\nRight.\n\nIf you change your mind. I'll be at my table.\n\n[He is always at his table.]\n\nGood luck with whatever you're doing.\n\n[Pause.]\n\nYou're going to win, aren't you. Whatever it is. You have the look. I can read people.\n\n[He goes back to his table.]",
        options: [{ text: '[Leave.]', go: null }],
      },

      // ── Game-complete coda ──
      root_coda: {
        text: "[Devlin is at his table. Someone else is sitting with him. Listening.]\n\n[He sees you. He nods once. Doesn't stand. Doesn't call out. Just nods.]\n\n[Then he turns back to whoever is with him and continues talking.]\n\n[You catch one phrase as you pass:]\n\n\"—and the thing about Stone, Blade, Cloth is that it's not about the hand you show, it's about the hand you don't show—\"\n\n[He is wrong about this in the context of the game he is describing. He may not be wrong about it in general. It's hard to tell with Devlin Marsh.]",
        options: [{ text: '[Walk on.]', go: null }],
      },
    },
  },

  yusuf: {
    id: 'yusuf',
    name: 'Yusuf',
    title: "Otto's Brother",
    portrait: 'yusuf',
    greeting: "[A quieter man behind the same bar. Same drinks. The room sounds different at this hour.]\n\nOtto's gone home. I take the night. What can I get you?",
    entry: [
      { requireMinVisits: 3, node: 'root_v3' },
      { requireMinVisits: 2, node: 'root_v2' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[He pours without asking. The glass is the same as Otto's. The pour is fractionally smaller and fractionally more careful.]\n\nMost people think Otto's the brother who notices things. Otto thinks so too. It's a useful arrangement.",
        options: [
          { text: '"What do you notice that he doesn\'t?"', go: 'r_notice' },
          { text: '"How long have you been doing this?"', go: 'r_long' },
          { text: '[Drink. Listen.]', go: null },
        ],
      },
      r_notice: {
        text: "Patterns. The same booth, the same two people, same time every fifteen days. Three traders who never sit together, then one day they all do, and the next morning a particular commodity is up four percent.\n\nI don't volunteer it. People don't ask the night barkeep.\n\nThe people who do ask — I usually trade with them.",
        options: [
          { text: '"Trade what for what?"', go: 'r_trade' },
          { text: '[Take it in.]', go: null },
        ],
      },
      r_trade: {
        text: "Information. I keep records — patterns I've noticed, things I've overheard, the rough shape of who-meets-whom-and-why. Most of it is uninteresting. Some of it isn't.\n\nThere's a man called Silas who runs a book in the side room. He buys what I sell. If you're interested in either of us, ask. He's careful. I'm patient.",
        options: [
          { text: '"Tell me about Silas."', go: 'r_silas' },
          { text: '[Note it. Drink.]', go: null },
        ],
      },
      r_silas: {
        text: "Bookmaker. He'll take a bet on anything quantifiable, including some things you wouldn't think were quantifiable until he quantifies them.\n\nHe's in the side room when he's working. He's working most nights. Tell him I sent you, you'll get a fair first hand.",
        options: [
          { text: '[Ask him.]', go: null,
            flag: 'silas_intro', flagLabel: '🎲 Silas — bookmaker, side room' },
        ],
      },
      r_long: {
        text: "Fifteen years. Otto sixteen — he'll never let me forget the year.\n\n[A small smile.]\n\nWe came here together looking for work. It became this. It's a fair life. I notice things.",
        options: [
          { text: '"What things?"', go: 'r_notice' },
          { text: '[Leave him to it.]', go: null },
        ],
      },

      root_v2: {
        text: "[A nod as you sit. The pour is faster.]\n\nGood to see you. What can I do?",
        options: [
          { text: '"Are there charts in this place that aren\'t on the manifest?"', go: 'r_charts' },
          { text: '"Anything specific you\'ve noticed about my arrival?"', go: 'r_arrival' },
          { text: '"How\'s Otto?"', go: 'r_otto' },
          { text: '"Has Marsh been in?"', go: 'r_marsh',
            requireMinPlayerWinsVsDevlin: 2 },
          { text: '[Drink.]', go: null },
        ],
      },
      r_marsh: {
        text: "Marsh was in last night. Three hours.\n\nSame story seventeen times with minor variations. The variations were getting larger. By the end there was a structural integrity issue with the table that he felt had materially affected the outcome.\n\nI let him talk. It was slow.\n\nHe's not a bad person. He's a specific kind of person.",
        options: [{ text: '[Drink.]', go: null }],
      },
      r_charts: {
        text: "[A long, considering look.]\n\nThere's a Chart Room three doors down. The proprietor doesn't take walk-ins. She takes referrals.\n\nI'm referring you. Don't make me regret it.",
        options: [
          { text: '"I won\'t."', go: null,
            flag: 'cartographer_intro', flagLabel: '🗺 The Chart Room — by referral' },
        ],
      },
      r_arrival: {
        text: "[Quietly.]\n\nA Combine agent walked through twice in the last week — same agent, both times, in different uniforms. They asked the day staff about the Persistent Delusion. They didn't ask me.\n\nI noticed. That's all. Be careful.",
        options: [{ text: '[Nod. Take it in.]', go: null }],
      },
      r_otto: {
        text: "Loud. Cheerful. Convinced he is the more observant brother. Two of those things are true.\n\n[A flicker of a smile.]\n\nWhat would you like to drink?",
        options: [{ text: '[Whatever is honest.]', go: null }],
      },

      root_v3: {
        text: "[He's already pouring before you sit.]\n\nThird night this rotation. You're a regular now. By Otto's standards, that means you have a tab. By mine, it means I'll tell you a true thing if you ask for one.",
        options: [
          { text: '"What do you know about Edda Vance?"', go: 'r_edda' },
          { text: '"Anything else I should know?"', go: 'r_else' },
          { text: '[Drink. Don\'t push.]', go: null, frontierDelta: 2 },
        ],
      },
      r_edda: {
        text: "[He doesn't pretend it's a small question.]\n\nShe came through twice. The first time she was new and asking. The second time she was certain and leaving. Both times she came in at eleven and left at one.\n\nThe second time, the booth in the corner had two suits in it pretending to be patrons. They followed her out. She lost them by the courier shuttle.\n\nShe was good. They were better-funded.",
        options: [{ text: '[Drink. Listen.]', go: null }],
      },
      r_else: {
        text: "[A slow shrug.]\n\nThe sector is quietly nervous. Independent traders are checking their flags more often. Combine paperwork has gone up twelve percent in the last six months — I count, because it crosses my bar in the form of complaints.\n\nWhatever's about to happen is closer than it was last year.",
        options: [{ text: '[Take it in.]', go: null }],
      },
    },
  },

  silas: {
    id: 'silas',
    name: 'Silas',
    title: 'Bookmaker',
    portrait: 'silas',
    greeting: "[A small office, cards spread on a green-felt table that has seen most of human pattern recognition unfold across it.]\n\nYusuf sent you. Of course. Sit down. What's your shape?",
    entry: [
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I take bets on most things. Trade prices, ship arrivals, the next Combine inspection schedule, whether a particular face will reappear at Yusuf's bar within seven days.\n\nThe books are mine. The records are also mine. Surprisingly, the latter are more valuable than the former.",
        options: [
          { text: '"What are the odds I survive what I\'m doing?"', go: 'r_odds' },
          { text: '"Am I being tracked?"', go: 'r_tracked' },
          { text: '"What are the odds the Combine\'s lying about something?"', go: 'r_combine' },
          { text: '"Why is your record-keeping more valuable than your book?"', go: 'r_records' },
          { text: '"What are people saying about me?"', go: 'r_devlin',
            requireMinPlayerWinsVsDevlin: 1 },
          { text: '[Leave.]', go: null },
        ],
      },
      r_odds: {
        text: "[He looks at you for a long moment, calculating.]\n\nWith what I currently know about you — twelve to one against. With what you might tell me — better. Possibly considerably better.\n\nThe odds aren't a prediction. They're a reflection of how much I know. Talk to me, and the odds improve. Don't, and they don't.",
        options: [
          { text: '"Maybe later."', go: null },
        ],
      },
      r_tracked: {
        text: "[He flips to a particular page in a small notebook.]\n\nYes. By Combine Executive. Standing watch since you entered the sector. Renewal weekly.\n\nEvery time you dock at a Combine system, a flag goes up. Every time you leave, a flag drops. They're not stopping you. They want to know where you go. This costs them attention they could be spending elsewhere, which suggests they think you're worth that attention.",
        options: [
          { text: '"How do you know?"', go: 'r_records' },
          { text: '"What do I owe you?"', go: 'r_owe' },
        ],
      },
      r_combine: {
        text: "[A grin, slow and entirely without surprise.]\n\nSix to one. Against.\n\n[He doesn't elaborate.]",
        options: [
          { text: '"Those are terrible odds."', go: 'r_combine_terrible' },
          { text: '"Six to one against what, exactly?"', go: 'r_combine_what' },
        ],
      },
      r_combine_terrible: {
        text: "Yes. But they're accurate.\n\n[He turns the page in his book.]",
        options: [{ text: '[Leave.]', go: null }],
      },
      r_combine_what: {
        text: "Against the Combine telling the truth about any particular thing. Adjustable depending on the question, but the baseline is six to one. I update the baseline annually. It hasn't moved in eleven years.",
        options: [{ text: '[Leave with that.]', go: null }],
      },
      r_records: {
        text: "Every bet ever placed in this office is recorded. Bets are people telling me what they think they know. Aggregate fifteen years of those, and you have, accidentally, the most accurate intelligence model in the sector.\n\nIt is a side effect. The book makes me a living. The records would, if I sold them, make me a target.\n\nI don't sell them.",
        options: [
          { text: '"What do you do with them?"', go: 'r_what_do' },
          { text: '"Am I being tracked?"', go: 'r_tracked' },
        ],
      },
      r_what_do: {
        text: "I notice things, mostly. I tell Yusuf when something interesting moves. He tells me when something interesting walks into his bar.\n\n[A glance.]\n\nIf you become interesting enough, perhaps I'll write a chapter on you.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r_owe: {
        text: "Nothing. The first hand is free. Yusuf sent you, which means I owe you a courtesy. The next hand: information for information.\n\nCome back when you've got something to trade.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r_devlin: {
        text: "Someone's been talking about you. Marsh. The gambler. He has a detailed account of a game of Stone, Blade, Cloth — his version of events features an unusual amount of atmospheric interference.\n\nI don't believe him. Nobody does. I've adjusted your odds slightly anyway. In your favour, actually — anyone who beats Marsh and has him this bothered is clearly paying attention.\n\nHe's beaten you, hasn't he?",
        options: [
          { text: '"Marsh has been talking?"', go: null },
          { text: '[Nod. Leave.]', go: null },
        ],
      },
    },
  },

  cartographer: {
    id: 'cartographer',
    name: 'The Cartographer',
    title: 'Chart Room',
    portrait: 'cartographer',
    greeting: "[A woman bent over a table covered in charts, some rolled, some flat. She does not look up immediately.]\n\nYou're here because someone you trust referred you. Sit. Tell me what you have or what you want.",
    entry: [
      { requireFlag: 'cartographer_charts', node: 'root_done' },
      { requireFlag: 'installation_confirmed', node: 'root_returned' },
      { requireFlag: 'rennick_coords', node: 'root_with_coords' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I deal in charts. Specifically: charts of locations the Combine prefers nobody chart. I don't sell to walk-ins; I trade, and only with people who have something I want.\n\nMy current want is small and specific: confirmation that a particular system exists. The Combine's records list it as a 'data entry error.' My instruments suggest otherwise. I cannot leave this room to verify.\n\nIf you can verify it, the back-routes are yours.",
        options: [
          { text: '"What back-routes?"', go: 'r_back_routes' },
          { text: '"Tell me about the system."', go: 'r_system' },
          { text: '"You\'re with the Free Cartographers\' Association?"', go: 'r_compendium' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_compendium: {
        text: "[A small smile.]\n\nField contributor. The Association lets me work the sector independently in exchange for entries. I write more entries than they print. They print the ones that won't get them sued.\n\nThe Compendium is a useful cover. Nobody investigates a cartographer.\n\n[She gestures at the table.]\n\nThe charts that matter aren't in the Compendium. They're here. The Compendium is for the Combine's auditors. The Association understands the difference and is, in its quiet way, on our side.",
        options: [{ text: '[Note it. Leave.]', go: null,
          flag: 'compendium_known', flagLabel: '📑 Free Cartographers\' Association — quietly on our side' }],
      },
      r_system: {
        text: "Coordinates redacted from official charts. Last reported sighting twenty years ago by a salvager who has since refused to discuss it. I have a bracket of where the system *should* be — if it is anywhere.\n\nIf you happen to acquire those coordinates from someone other than me, you would be doing both of us a favour by going to look.",
        options: [
          { text: '[Note it. Leave.]', go: null },
        ],
      },
      r_back_routes: {
        text: "Unlisted jump corridors. Twenty percent off published fuel cost on every route, permanently. The Combine's official routes are designed for surveillance and inefficiency. Mine are designed for fuel.\n\nYours when you bring me confirmation.",
        options: [
          { text: '[Note it.]', go: null },
        ],
      },

      root_with_coords: {
        text: "[She looks up, sharp.]\n\nYou have something for me. A set of coordinates. Don't tell me where you got them; I would rather guess.\n\nWhat I need from you isn't the coordinates. I need someone who has *been* there. Will you go?",
        options: [
          { text: '[Take the coordinates and go.]', go: 'r_journey' },
          { text: '"Not yet. I\'ll think about it."', go: null },
        ],
      },
      r_journey: {
        text: "[You leave Meridian on an unscheduled jump. The coordinates lead, after a careful approach, to a system not on any official chart.\n\nThere is a station there. Combine military insignia. Lights on. Running dark — no transponder, no comms.\n\nYou observe from a distance that is, you decide, far enough. You log the configuration of its emissions. You leave without being seen, or at least without being interrupted.\n\nYou return to Meridian.]",
        flagsOnEnter: ['installation_confirmed'],
        options: [
          { text: '"It exists."', go: 'r_returned_msg',
            flag: 'installation_confirmed_msg', flagLabel: '✅ Uncharted Combine station: confirmed' },
        ],
      },

      root_returned: {
        text: "[She listens to your account without interrupting. When you finish, she folds your description into a pocket of her coat.]\n\nThank you. That is — a great deal more than I expected to receive in my lifetime.\n\nThe back-routes are yours. The chart is on the rear wall; learn it before you leave the room. I do not give copies.",
        options: [
          { text: '[Study the chart. Leave.]', go: 'r_done' },
        ],
      },
      r_returned_msg: {
        text: "[She hears you out, completely still until you finish.]\n\nThank you, Captain. You'll want to come back when I have your reward ready — I need to confirm the configuration you described, which will take me a day. Come back tomorrow.",
        options: [
          { text: '[Nod. Leave.]', go: null },
        ],
      },
      r_done: {
        text: "[The chart is intricate. You read it carefully. It maps eleven systems, three of which are not on any Combine reference. Two routes between them save twenty percent fuel on average. You can keep these in your head.]",
        options: [
          { text: '[Leave with the routes memorised.]', go: null,
            flag: 'cartographer_charts', frontierDelta: 5,
            flagLabel: '🗺 Back-routes acquired — fuel costs reduced' },
        ],
      },
      root_done: {
        text: "[She nods at you with the brisk recognition of one professional acknowledging another.]\n\nThe routes work. You've been using them. Good.\n\nIs there anything else?",
        options: [
          { text: '[Just stopping in.]', go: null },
        ],
      },
    },
  },

  hadley: {
    id: 'hadley',
    name: 'Hadley',
    title: 'Archivist, New Geneva',
    portrait: 'hadley',
    greeting: "[A small reading room. Soft light. A woman in her sixties looking up from a sheaf of papers with an expression of cautious interest.]\n\nFlyte vouched for you. That is, I'll note, sufficient. What can I help you find?",
    entry: [
      { requireFlag: 'hadley_list', node: 'root_done' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I am New Geneva's archivist. I have read every diplomatic communication, every official statement, every treaty negotiated in this sector for the last forty years.\n\nI am not, technically, supposed to share what I notice. I have not, technically, been asked to.",
        options: [
          { text: '"Have you noticed inconsistencies in the Combine\'s account of the Frontier Wars?"', go: 'r_inconsistencies' },
          { text: '"Why do you stay, if the work is so quiet?"', go: 'r_stay' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_inconsistencies: {
        text: "[She closes the folder she was reading. Turns to face you directly.]\n\nSeventeen.\n\nSeventeen specific inconsistencies between the Combine's official account of the Frontier Wars and the diplomatic record. Some are dates that don't reconcile. Some are signatures on documents that, by other documents, the signatory could not have been present to sign. Some are statements made publicly that contradict, very precisely, statements made at closed sessions four months earlier.\n\nNone of them, in isolation, would prove anything. Together, they describe a story that the public account is concealing.",
        options: [
          { text: '"Will you give me the list?"', go: 'r_list' },
          { text: '"Why haven\'t you published?"', go: 'r_why_not' },
        ],
      },
      r_list: {
        text: "[She slides a small data wafer across the table.]\n\nAll seventeen, with citation. The citations matter — without them, it's a list of allegations. With them, it's an indictment.\n\nDo something useful with it. I have been waiting forty years for someone to ask.",
        flagsOnEnter: ['hadley_list'],
        options: [
          { text: '[Take it. Promise to.]', go: null,
            frontierDelta: 8, flag: 'hadley_list_msg', flagLabel: '📜 Hadley\'s 17 inconsistencies' },
        ],
      },
      r_why_not: {
        text: "Because no one asked. Diplomatic archivists do not, generally, publish. We provide context to the people who request it. Nobody requested context on this until you walked in.\n\n[A small, dry smile.]\n\nForty years is a long time to be patient. I am very patient.",
        options: [
          { text: '"Will you give me the list?"', go: 'r_list' },
        ],
      },
      r_stay: {
        text: "Because the records are here, and someone has to know what they say, and the people who could replace me would be hand-picked for not noticing what I notice.\n\nIt is not patience. It is stubbornness, dressed for work.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      root_done: {
        text: "[She nods, briskly.]\n\nI hear from Barker that the work continues. Carry on, Captain.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
    },
  },

  brennan: {
    id: 'brennan',
    name: 'Consul Brennan',
    title: 'Frontier Faction Mission',
    portrait: 'brennan',
    greeting: "[A man behind a desk in a small embassy. He is wearing a tie that, on closer inspection, is the formal pattern of a faction that lost the war thirteen years ago.]\n\nWelcome to the Frontier Mission. I am Consul Brennan. Please sit.",
    entry: [
      { requireFlag: 'brennan_testimony', node: 'root_done' },
      { requireMinFrontier: 50, node: 'root_open' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I have been here for six years, technically negotiating reparations on behalf of the Frontier Faction.\n\n[He folds his hands. The fold is precise.]\n\nIn six years, no reparations have been paid. No timetable for reparations has been established. No new framework for negotiating reparations has been agreed.\n\nThis is, formally, a successful posting.",
        options: [
          { text: '"Why do you keep doing it?"', go: 'r_why' },
          { text: '"What would change things?"', go: 'r_change' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_why: {
        text: "Because the alternative is for there to be no Frontier Faction representative at New Geneva. Six years of polite obstruction is preferable to six years of administrative absence, on the grounds that I am still in the room.\n\nThis is the consolation. It is not large.",
        options: [
          { text: '"What would change things?"', go: 'r_change' },
        ],
      },
      r_change: {
        text: "Leverage. Diplomacy without leverage is asking politely; six years of asking politely has made this clear.\n\nThe Combine has assumed for thirteen years that the Frontier account of the wars cannot be supported. If that assumption is shown to be wrong — publicly, with documentation — leverage exists. Negotiations resume. Reparations become a real category again.\n\nWithout that, this office is a courtesy. Diplomacy as a kind of museum.",
        options: [
          { text: '"I\'m working on the documentation."', go: 'r_working' },
          { text: '[Leave with that.]', go: null },
        ],
      },
      r_working: {
        text: "[A long, careful look.]\n\nThen you have my full and unofficial cooperation. I cannot give you what I have without a reason to believe it will reach print.\n\nIf you can convince me that the publication is real — that it will land where it cannot be buried — I will give you my testimony. The Frontier records you don't have. The names of the people I met during the war who never made it home.",
        options: [
          { text: '"Barker Ness will publish across thirty-two outlets. Sable will route it. The story will hold."', go: 'r_convinced',
            requireFlags: ['barker_outlets_confirmed', 'sable_route_confirmed'] },
          { text: '"Soon. I\'m gathering the pieces."', go: null },
        ],
      },
      r_convinced: {
        text: "[He stands. Crosses to a small safe. Opens it. Takes out a thin folder. Sets it on the desk.]\n\nMy testimony. Six years' worth of names, dates, accounts. A list of seventy-three people the Frontier lost to actions the Combine officially never authorised.\n\n[He sits.]\n\nWhen Barker is ready, I am ready. Thank you for coming.",
        flagsOnEnter: ['brennan_testimony'],
        options: [
          { text: '[Nod. Leave with the folder.]', go: null,
            frontierDelta: 12, flag: 'brennan_testimony_msg', flagLabel: '⚖ Brennan\'s testimony — 73 names' },
        ],
      },

      root_open: {
        text: "[He nods, more openly than the first time.]\n\nWhat you've been doing has reached me, in the limited ways things reach this office. I'm grateful. Sit.",
        options: [
          { text: '"Will you give me your testimony?"', go: 'r_working' },
          { text: '"Just stopping in."', go: null },
        ],
      },
      root_done: {
        text: "[He nods, tightly.]\n\nWhen Barker calls.",
        options: [{ text: '[Leave.]', go: null }],
      },
    },
  },

  cass: {
    id: 'cass',
    name: 'Cass',
    title: 'Mechanic, Engineering Crawl',
    portrait: 'cass',
    greeting: "[Mid-thirties, hands black with grease, working on something that has no business being functional and is anyway.]\n\nYou're in my crawl. Rook sent you. Welcome.",
    tree: {
      root: {
        text: "I do modifications. Not the ones the Combine licenses — the other ones. Better, in some honest ways. Different in others.\n\nI take payment in components. Not credits. The Combine traces credits.\n\nWhat are you here for?",
        options: [
          { text: '"Show me what you have."', go: 'r_show' },
          { text: '"How do you keep this ship running?"', go: 'r_running' },
          { text: '"What\'s the towel for?"', go: 'r_towel' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_show: {
        text: "List's on the wall, opposite the bench. Pick one. Or two. Pay in components. Walk out lighter and quieter than when you walked in.",
        options: [{ text: '[Look at the modifications.]', go: null }],
      },
      r_running: {
        text: "By appointment, mostly. The Wreck wasn't built to stand still and the longer it does the more inventive my modifications get.\n\nThere's a blueprint in my head that doesn't exist anywhere on paper. If I die, the engines stop within forty-eight hours.\n\n[A grin.]\n\nDon't tell anyone.",
        options: [{ text: '[You won\'t.]', go: null }],
      },
      r_towel: {
        text: "[She glances at the shelf. The inventory list reads, near the top: 'towel (1).']\n\nYou always know where you are if you've got your towel. Don't ask me why. Just do.",
        options: [{ text: '[Leave it.]', go: null }],
      },
    },
  },

  maren: {
    id: 'maren',
    name: 'Old Maren',
    title: 'Historian, The Wreck',
    portrait: 'maren',
    greeting: "[An older woman at a desk piled with handwritten paper. The piles are organised in a system only she understands.]\n\nMotes told me you might come.",
    entry: [
      { requireFlag: 'maren_will_testify', node: 'root_committed' },
      { requireFlags: ['sable_route_confirmed', 'barker_outlets_confirmed'], node: 'root_both' },
      { requireFlag: 'sable_route_confirmed', node: 'root_route' },
      { requireFlag: 'barker_outlets_confirmed', node: 'root_outlets' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[She gestures at the room. Books on every surface. Stacks of paper that are clearly a manuscript — dense, handwritten, thousands of pages.]\n\nMotes doesn't trust easily. The fact that he sent you is more meaningful to me than my polite tone might suggest.",
        options: [
          { text: '"What is all this?"', go: 'r_pages' },
          { text: '"I want you to testify."', go: 'r_testify' },
          { text: '[Stand a moment with the room. Then leave.]', go: null },
        ],
      },
      r_pages: {
        text: "Seven hundred pages of the Frontier Wars from the side that lost. I wrote them because no one else would. Nine years.\n\nThey are unpublished. They are unpublishable. Combine licensing rules are extensive and creative.\n\nIf I am asked to testify in person — to a journalist, in public — it might give the pages a context.",
        options: [{ text: '"I want you to testify."', go: 'r_testify' }],
      },
      r_testify: {
        text: "I will, but only if I know it will reach people. Two confirmations.\n\nFirst: that the transmission route is clean. Sable, at Ashmore Relay, can verify. Second: that the outlets that will publish are real and committed. Barker, at New Geneva, can confirm the list.\n\nBring me both, and I will testify on whatever schedule you and Barker need.",
        flagsOnEnter: ['maren_quest_known'],
        options: [{ text: '"I\'ll bring both."', go: null }],
      },
      root_route: {
        text: "[She glances up.]\n\nSable's confirmation is solid. The route is clean. Now Barker's outlet list.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      root_outlets: {
        text: "[She glances up.]\n\nBarker's outlet list is ready. Now Sable's route confirmation.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
      root_both: {
        text: "[She looks at you for a long moment. Then nods once, decisively.]\n\nVery well. I will testify. Bring Barker my address when he's ready to record. Until then — thank you, Captain.\n\n[A small smile, the first you've seen from her.]\n\nThirty years of writing toward something that wouldn't reach anyone. You've made it reach.",
        flagsOnEnter: ['maren_will_testify'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 10, flag: 'maren_committed_msg', flagLabel: '✓ Maren will testify' }],
      },
      root_committed: {
        text: "[She's writing a new page when you come in. She does not look up.]\n\nThe testimony is yours when Barker calls for it. Nothing is wasted now.",
        options: [{ text: '[Leave her to it.]', go: null }],
      },
    },
  },

  the_doctor: {
    id: 'the_doctor',
    name: 'The Doctor',
    title: 'Medical Bay, The Wreck',
    portrait: 'the_doctor',
    greeting: "[A medic in a worn coat, no name tag. They look up briefly.]\n\nWhat's the injury?",
    entry: [
      { requireFlag: 'doctor_will_testify', node: 'root_committed' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[They wait. They are good at waiting.]\n\nNo injury, then. Which is interesting, because the only people who come to my bay without an injury are people who want something that isn't medicine.\n\nWhat is it?",
        options: [
          { text: '"I want you to testify about the wars."', go: 'r_testify' },
          { text: '"Just looking around."', go: null },
        ],
      },
      r_testify: {
        text: "[A long, careful look.]\n\nThirteen years of frontier medicine. Specific weapons-injuries. Specific ones, on patients whose paperwork said the weapons that caused them weren't shipped to our side of the war.\n\nI have what you need. I cannot testify. Not without immunity. The Combine will end me the day my name is in print.",
        options: [
          { text: '"What if Barker publishes? You\'d be famous, not silent."', go: 'r_explain' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_explain: {
        text: "[They consider this. Long.]\n\n...continue.",
        options: [
          { text: '"If your testimony is part of a story they can\'t suppress, the cost of acting against you becomes higher than the cost of leaving you alone. Publication functions as immunity."', go: 'r_accept' },
        ],
      },
      r_accept: {
        text: "[They breathe out, slowly.]\n\nYou're right. I have known this. I have been waiting for someone else to say it.\n\nWhen Barker calls for it, I will testify. Bring me his timeline when you have it.",
        flagsOnEnter: ['doctor_will_testify'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 8, flag: 'doctor_committed_msg', flagLabel: '✓ The Doctor will testify' }],
      },
      root_committed: {
        text: "[They nod once.]\n\nWhen Barker calls.",
        options: [{ text: '[Leave.]', go: null }],
      },
    },
  },

  petra: {
    id: 'petra',
    name: 'Petra',
    title: 'Structural Engineer, The Sump',
    portrait: 'petra',
    greeting: "[A small office, three monitors, a stack of pressure readouts.]\n\nThe Duchess sent you. Which means you're either useful or about to become a problem. Which is it?",
    entry: [
      { requireFlag: 'petra_resolved', node: 'root_resolved' },
      { requireFlag: 'petra_ignored', node: 'root_ignored' },
      { requireFlag: 'petra_message_delivered', node: 'root_delivered' },
      { requireFlag: 'petra_message', node: 'root_carrying' },
      { requireMinVisits: 2, node: 'root_v2' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[She stops typing.]\n\nSixty years of mining. Eighteen months of structural margin. The classified reports — which I wrote, and which I have read — are unambiguous about both numbers.\n\nNobody has read the reports. They are classified. The classification is also classified.\n\nI would like a third party to know.",
        options: [
          { text: '"How long, exactly?"', go: 'r_when' },
          { text: '"What do you need from me?"', go: 'r_need' },
          { text: '"Why hasn\'t this been escalated?"', go: 'r_why_not' },
        ],
      },
      r_when: {
        text: "Thursdays.\n\n[She does not elaborate.]",
        options: [
          { text: '"Right."', go: null },
          { text: '"What do you need from me?"', go: 'r_need' },
        ],
      },
      r_why_not: {
        text: "Because the procedure for escalating a classified structural finding is to file a Form 14-Bravo, in triplicate, with the Combine's Mining Oversight Office. Which I have done. Eleven times.\n\nI have received eleven receipts.\n\nThis is the procedure working as intended.",
        options: [
          { text: '"What do you need from me?"', go: 'r_need' },
        ],
      },
      r_need: {
        text: "Carry a sealed report to the Combine engineering office at New Cascadia. Hand it to whoever takes registrations. Wait for an answer.\n\n[She slides a data wafer across.]\n\nThey will ignore it. I would like to be able to say I tried before I do the thing I'm going to do next.",
        flagsOnEnter: ['petra_message'],
        options: [
          { text: '"What\'s the next thing?"', go: 'r_next' },
          { text: '[Take the wafer.]', go: null,
            flag: 'petra_message_carry', flagLabel: '📎 Petra\'s sealed report' },
        ],
      },
      r_next: {
        text: "If New Cascadia ignores it — when New Cascadia ignores it — I'll ask you to carry it louder. Somewhere it cannot be filed. Somewhere it gets read.\n\nWe'll talk again then.",
        options: [
          { text: '[Take the wafer.]', go: null,
            flag: 'petra_message_carry', flagLabel: '📎 Petra\'s sealed report' },
        ],
      },

      root_v2: {
        text: "[She glances up.]\n\nStill thinking, or did you decide?",
        options: [
          { text: '"What do you need?"', go: 'r_need' },
          { text: '[Leave.]', go: null },
        ],
      },
      root_carrying: {
        text: "[A small nod at the wafer in your pocket.]\n\nNew Cascadia. Combine engineering. Don't open it. Don't lose it. Tell them it's from me, then watch what they do.",
        options: [{ text: '[Nod.]', go: null }],
      },
      root_delivered: {
        text: "[She looks up, something close to hope on her face.]\n\nThey took it?",
        options: [
          { text: '"They filed it."', go: 'r_filed' },
        ],
      },
      r_filed: {
        text: "[A long, controlled breath.]\n\nOf course they did.\n\nThen we go louder. Take the wafer to a journalist — Barker Ness at New Geneva. He's banned from six systems for caring about exactly this kind of thing. He'll know what to do.",
        flagsOnEnter: ['petra_ignored'],
        options: [
          { text: '"I\'ll take it to him."', go: null,
            flag: 'petra_message_carry', flagLabel: '📎 Petra\'s report (try again)' },
        ],
      },
      root_ignored: {
        text: "[She nods at you as you come in.]\n\nThe wafer with you?\n\nBarker Ness, New Geneva. He'll publish it where it can't be filed away.",
        options: [{ text: '[Leave.]', go: null }],
      },
      root_resolved: {
        text: "[She stands when you come in this time.]\n\nThe report is published. Three independent outlets carried it within the hour. The Combine cannot now claim ignorance. Whether they evacuate the asteroid is another question — but at least the question now exists.\n\n[She grips your shoulder, briefly. It's the warmest she's been.]\n\nThank you, Captain.",
        flagsOnEnter: ['petra_section_7'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 15, flag: 'petra_resolved_msg', flagLabel: '✓ Petra\'s report is public' }],
      },
    },
  },

  two_fingers: {
    id: 'two_fingers',
    name: 'Two-Fingers',
    title: 'Fence',
    portrait: 'two_fingers',
    greeting: "[A young man at a folding table, three crates beside him, chewing something he definitely should not be chewing in a pressurised environment.]\n\nDuchess sent you? She always sends them to me eventually.",
    entry: [
      { requireFlag: 'sump_conflict_resolved', node: 'root_after_resolution' },
      { requireFlag: 'sump_conflict_escalated', node: 'root_gone' },
      { requireFlag: 'chose_two_fingers', node: 'root_returning' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I do prices. The Duchess does narratives. People who prefer prices to narratives prefer me.\n\nWhat are you here for? I assume something specific. People come to my table for specific things.",
        options: [
          { text: '"What\'s your deal?"', go: 'r_deal' },
          { text: '"Why are your prices so good?"', go: 'r_prices' },
          { text: '"The Duchess says you owe her."', go: 'r_duchess' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_deal: {
        text: "[A grin, sharp.]\n\nMy deal is: ten percent under whatever the Duchess is charging. Same goods, sometimes literally the same goods. I'm faster, I'm hungrier, and I'm not afraid of customs the way she is.\n\nFair warning: doing business with me means doing business with me. The Duchess takes it personally.",
        options: [
          { text: '"I\'ll keep that in mind."', go: null },
          { text: '"Fine. I\'ll deal with you."', go: 'r_deal_set',
            flag: 'chose_two_fingers', flagLabel: '⚠ The Duchess will hear about this' },
        ],
      },
      r_deal_set: {
        text: "[A grin, considerably brighter.]\n\nGood man. Or — good captain, whichever. Come back when you've got something. I'll have something for you.",
        options: [{ text: '[Leave.]', go: null }],
      },
      r_prices: {
        text: "Lower overhead. I don't have a bay. I don't pay for a bay. I have a folding table.\n\nAlso — and this is between us — I'm working off something. The principal won't change. Working it off doesn't make it bigger.",
        options: [
          { text: '"Working off what?"', go: 'r_working_off' },
          { text: '"Fine. I\'ll deal with you."', go: 'r_deal_set',
            flag: 'chose_two_fingers' },
        ],
      },
      r_working_off: {
        text: "[The grin slips. Briefly.]\n\nA debt. Old one. My father's, technically. Mine, since he died. The Duchess tells one version. I tell another. The Chaplain saw what actually happened.\n\nIf you're curious — go ask the Chaplain. I'd rather you heard it from him than from either of us.",
        options: [
          { text: '"I\'ll talk to the Chaplain."', go: null },
          { text: '"Fine. I\'ll deal with you."', go: 'r_deal_set',
            flag: 'chose_two_fingers' },
        ],
      },
      r_duchess: {
        text: "Yes. And the Chaplain says I don't, and I trust the Chaplain to remember things accurately. If you want the truth — ask him. If you want a version that benefits the person you're talking to, ask either of us.",
        options: [{ text: '[Leave.]', go: null }],
      },

      root_returning: {
        text: "[He nods at you as you come in.]\n\nBack already? You make decisions fast.\n\nWhat's the trade?",
        options: [
          { text: '"How worried are you about the Duchess?"', go: 'r_worried' },
          { text: '[Just here for the goods.]', go: null },
        ],
      },
      r_worried: {
        text: "[A pause. Then the grin again, slightly weaker.]\n\nProfessionally, not at all. Personally, every time I close my eyes.\n\nI hope you settle it before she does. Because she will, if you don't.",
        options: [{ text: '[Nod.]', go: null }],
      },

      root_after_resolution: {
        text: "[He's working at the same folding table — but now there's a crate stamped 'D' tucked discreetly behind him.]\n\nThe Duchess and I have an arrangement. I'm working it off properly. You did me a kindness, Captain.\n\nWhat can I do for you?",
        options: [
          { text: '"Just stopping in."', go: null },
          { text: '"Thanks."', go: null },
        ],
      },
      root_gone: {
        text: "[The folding table is gone. So is the chair. So is Two-Fingers.]\n\n[A scrap of paper on the floor reads, in sloping handwriting: 'Sorry. Tell the Chaplain.']",
        options: [{ text: '[Leave it.]', go: null }],
      },
    },
  },

  chaplain: {
    id: 'chaplain',
    name: 'The Chaplain',
    title: 'No Denomination Specified',
    portrait: 'chaplain',
    greeting: "[An older man, perhaps fifty, in a small room with two chairs and a kettle.]\n\nSit, if you'd like. The kettle is on. It is almost always on.",
    entry: [
      { requireFlag: 'chaplain_mediated', node: 'root_after_mediation' },
      { requireFlag: 'chaplain_trust', node: 'root_trusted' },
      { requireMinVisits: 2, node: 'root_v2' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[He pours, doesn't ask whether you want one. Hands it across.]\n\nI listen, mostly. People come here, talk for a little while, leave. They don't always come back. They don't always need to.\n\nWhat brings you to my chair?",
        options: [
          { text: '"What do you do here?"', go: 'r_do' },
          { text: '"Why no denomination?"', go: 'r_denomination' },
          { text: '[Sit. Drink the tea. Say nothing.]', go: 'r_silent' },
        ],
      },
      r_do: {
        text: "I keep records of what people choose to be. Not who they say they are — what they do, when they think no one is looking.\n\n[He takes a slow sip.]\n\nIt's a strange ministry. It seems to be needed.",
        options: [
          { text: '"You watch me, then?"', go: 'r_watch' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_denomination: {
        text: "Because the people who come here have already decided what they think the universe is for. Adding mine to the conversation would not help anyone.\n\nI listen. I notice. Occasionally I make tea.",
        options: [
          { text: '[Sit a while.]', go: 'r_silent' },
          { text: '[Leave.]', go: null },
        ],
      },
      r_silent: {
        text: "[The tea is good. It is a weak honest tea, made with care. He does not fill the silence.]\n\n[After a while, he speaks.]\n\nYou listen well. Not many do.",
        options: [
          { text: '[Stand. Nod. Leave.]', go: null, flag: 'chaplain_trust',
            flagLabel: '🤝 The Chaplain trusts you' },
        ],
      },
      r_watch: {
        text: "[A small, fond smile.]\n\nI watch the Sump. You happen to be in it.\n\nI know about the boy and his table. I know what version of the Duchess's story is true and which is comfortable. I know — though no one has asked me — what choices you have made off-station, because the universe is small and people talk.\n\nWhen you have time for it, I will tell you what I know. Until then: drink the tea.",
        options: [
          { text: '[Drink. Listen.]', go: 'r_silent' },
          { text: '[Leave.]', go: null },
        ],
      },

      root_v2: {
        text: "[He nods as you come in. Pours.]\n\nBack again. Good.",
        options: [
          { text: '"Tell me about Two-Fingers and the Duchess."', go: 'r_truth' },
          { text: '"Have you been watching?"', go: 'r_watching' },
          { text: '[Hand over the old Frontier scrip.]', go: 'r_scrip',
            requireFlag: 'frontier_scrip',
            requireNotFlag: 'compartment_resolved' },
          { text: '[Sit. Drink. Be quiet.]', go: 'r_silent' },
        ],
      },
      r_scrip: {
        text: "[He takes the bundle. Looks at it for a long, careful moment. Then sets it on the table.]\n\nWhere did you find this?\n\n[He doesn't wait for the answer.]\n\nNo — that's the wrong question. The right one is who you are. Edda left this for someone like you. The note suggested it would find its way to me eventually.\n\nIt has.",
        flagsOnEnter: ['compartment_resolved'],
        options: [
          { text: '"What does it mean?"', go: 'r_scrip_mean' },
          { text: '[Wait.]', go: 'r_scrip_mean' },
        ],
      },
      r_scrip_mean: {
        text: "Old Frontier scrip is unspendable. The currency was withdrawn thirteen years ago. What it is now, in practical terms, is a token. A way of saying: I know who I am, I know who you are, I trust you with the rest.\n\nEdda was Frontier-born. She never said so. The scrip was the way she would say so without saying so.\n\n[He folds the bundle into his coat.]\n\nThank you for bringing it. There's a little more I can tell you, now that I know who Edda thought you might be.",
        options: [
          { text: '[Ask him.]', go: 'r_scrip_more',
            frontierDelta: 5, flag: 'chaplain_scrip_msg',
            flagLabel: '🎟 Chaplain has the scrip — Frontier-born' },
        ],
      },
      r_scrip_more: {
        text: "Edda came to me twice. The first time was the conversation about tea. The second was the night before she left — she sat for forty minutes without speaking, drank two cups, set the empty one down, and said: 'If anyone comes asking, tell them what they need. They'll know what they need by what they bring.'\n\nYou brought the scrip. You needed to know that she was one of us. She was. She is, if she's still alive. I think she is.\n\n[A small bow of the head.]\n\nGo well, Captain.",
        options: [
          { text: '[Bow back. Leave.]', go: null },
        ],
      },
      r_truth: {
        text: "Fifteen years ago his father lost a shipment that wasn't his to lose. The boy's father paid back what he could, which was half. The other half, he asked the boy to take on, when the boy was ten years old.\n\nThe boy said no. He said no with the certainty children can manage. The father died unreconciled.\n\nThe Duchess remembers the half. She does not remember the conversation, because she did not have to live it.\n\n[A pause.]\n\nNeither version is quite the truth. The truth is messier.",
        options: [
          { text: '"Will you mediate?"', go: 'r_mediate' },
          { text: '[Sit with it.]', go: null,
            flag: 'chaplain_trust', flagLabel: '🤝 The Chaplain trusts you' },
        ],
      },
      r_watching: {
        text: "[A long, kind look.]\n\nYes.\n\n[He sets down the cup.]\n\nI think — for what it's worth — that you are doing better than you give yourself credit for. The universe has not been kind to you, and you have not been unkind in return.\n\nThat is unusual. I notice it.",
        options: [
          { text: '[Nod. Sit a moment.]', go: null,
            flag: 'chaplain_trust', frontierDelta: 3,
            flagLabel: '🤝 The Chaplain trusts you' },
        ],
      },
      r_mediate: {
        text: "Yes. If they will both sit. The Duchess has, in fifteen years, never once asked me. The boy has not, either. But if you bring it to them on my behalf — they will sit.\n\nGo. I will follow.",
        options: [
          { text: '[Go to the Duchess.]', go: null,
            flag: 'chaplain_mediated', flagLabel: '🤝 Chaplain has agreed to mediate' },
        ],
      },

      root_trusted: {
        text: "[He nods. Pours.]\n\nThe kettle is always on.",
        options: [
          { text: '"Tell me about Two-Fingers and the Duchess."', go: 'r_truth' },
          { text: '"Will you mediate?"', go: 'r_mediate' },
          { text: '[Sit. Drink.]', go: null },
        ],
      },
      root_after_mediation: {
        text: "[He looks tired but not unhappy.]\n\nThe boy is still here. The Duchess is still angry. Neither of those is a small achievement.\n\nThank you, Captain.",
        options: [{ text: '[Leave.]', go: null }],
      },
    },
  },

  vasanta: {
    id: 'vasanta',
    name: 'Dr. Vasanta',
    title: 'Station Medic, Iron Drift',
    portrait: 'vasanta',
    greeting: "[She doesn't look up. She is mid-stitch.]\n\nFirst aid kit's by the door. Take what you need. Leave what you don't.",
    entry: [
      { requireFlag: 'vasanta_resolved', node: 'root_resolved' },
      { requireFlag: 'farside_equipment_held', node: 'root_delivering' },
      { requireFlag: 'vasanta_quest', node: 'root_quest' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[The room is one bed and a cabinet. The cabinet is too small. The room is too small. Vasanta is pragmatic about both.]\n\nI'm Vasanta. I run this. I run all of this. There's an inventory list on the wall. The list is shorter than it should be.",
        options: [
          { text: '"What do you need?"', go: 'r_need' },
          { text: '"You\'re running this on what?"', go: 'r_running' },
          { text: '[Look around quietly.]', go: 'r_quiet' },
        ],
      },
      r_need: {
        text: "Specific equipment. A pulmonary calibrator, model 7-V or later. The Combine pharmacy stopped stocking it three years ago. The replacements are inferior — three patients a year die who shouldn't.\n\nThere's a man at Farside who deals in things the Combine won't stock. Goes by Ghost. If you can get me one, I will be in your debt and so will the eight thousand patients I'll keep alive.\n\n[She finishes the stitch.]\n\nNo pressure.",
        flagsOnEnter: ['vasanta_quest'],
        options: [
          { text: '"I\'ll see what I can do."', go: null },
          { text: '"What\'s in it for me?"', go: 'r_inwhat' },
        ],
      },
      r_inwhat: {
        text: "[She finally looks up.]\n\nMy gratitude. Iron Drift's gratitude. A working calibrator. Eight thousand fewer respiratory failures over the next decade.\n\nIf those don't satisfy: I have a coil of pre-war copper wiring nobody's claimed. Worth, on a good day, more than the equipment. It's yours when you bring the calibrator.",
        options: [{ text: '"Done."', go: null }],
      },
      r_running: {
        text: "Optimism, mostly. Optimism and a stockpile of bandages I have been rationing for two years.\n\nThis is what they don't tell you about frontier medicine: it's not the lack of equipment that wears you down. It's the people who didn't need to be hurt.",
        options: [{ text: '[Nod.]', go: null }],
      },
      r_quiet: {
        text: "[A patient on the bed is asleep. Younger than you'd expect. The bandages on his hands are fresh.]\n\n[Vasanta sees you noticing.]\n\nDrill bit shattered. He'll keep both hands. The next one we don't have the equipment for, we won't.",
        options: [
          { text: '"Tell me what you need."', go: 'r_need' },
          { text: '[Leave quietly.]', go: null },
        ],
      },

      root_quest: {
        text: "[She glances up.]\n\nFarside. Ghost. Pulmonary calibrator. Don't tell anyone what it's for.",
        options: [
          { text: '"Still looking."', go: null },
          { text: '"How are the patients?"', go: 'r_patients' },
        ],
      },
      r_patients: {
        text: "Surviving. The way frontier medicine surviving works — narrowly, with creativity, and at considerable cost to the medic.\n\nBring me the calibrator and there'll be three more of them.",
        options: [{ text: '[Nod.]', go: null }],
      },

      root_delivering: {
        text: "[She looks at you. Then at the case in your hand.]\n\nIs that what I think it is?",
        options: [
          { text: '[Hand it over.]', go: 'r_delivered' },
          { text: '[Hold it back, just for a moment. Smile.]', go: 'r_delivered' },
        ],
      },
      r_delivered: {
        text: "[She takes the case. She does not, immediately, open it. She looks at it. Then at you.]\n\n...this works. Thank you, Captain.\n\n[A small package — copper wiring, neatly bundled — slides across the desk.]\n\nNot many people would have made the trip. The eight thousand will not know. I will.",
        flagsOnEnter: ['vasanta_resolved'],
        options: [
          { text: '[Take the wiring. Leave.]', go: null,
            frontierDelta: 10, flag: 'vasanta_resolved_msg', flagLabel: '✓ Vasanta has the calibrator' },
        ],
      },

      root_resolved: {
        text: "[She nods at you with the familiar fatigue of someone very tired and very glad to see you anyway.]\n\nThe calibrator is working. Three patients are alive who wouldn't be.\n\nThank you.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
    },
  },

  linnea: {
    id: 'linnea',
    name: 'Linnea',
    title: 'Station Geologist, Iron Drift',
    portrait: 'linnea',
    greeting: "[A stack of paper printouts. A precision pencil. She is annotating.]",
    entry: [
      { requireFlag: 'linnea_quest', node: 'root_data_given' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "I'm Linnea. I'm officially the geologist. Officially, I monitor the asteroid's mineral content.\n\n[She glances at the door.]\n\nUnofficially, I monitor what Section 7 transmits. I have done so for four years. I have eleven thousand pages of metadata and no idea what to do with it.",
        options: [
          { text: '"What does it transmit?"', go: 'r_what' },
          { text: '"Why are you telling me?"', go: 'r_why' },
          { text: '"Show me what you have."', go: 'r_show' },
          { text: '[Don\'t pry. Leave her to her work.]', go: null },
        ],
      },
      r_what: {
        text: "I don't know. The signals are encrypted above any clearance I'll ever hold. What I have is metadata: timing, frequency, duration, the events that trigger spikes.\n\nThe spikes correlate with Combine fleet movements two systems away. They correlate with executive transmissions through Ashmore. They correlate, three times in four years, with the disappearance of independent traders.\n\nIt is not nothing.",
        options: [
          { text: '"Why are you telling me?"', go: 'r_why' },
          { text: '"Give me what you have."', go: 'r_show' },
        ],
      },
      r_why: {
        text: "Because you've come further than the others. Because you ask Okafor about the listening post and don't immediately leave. Because the eight thousand people on this station will not benefit from my eleven thousand pages until someone uses them.\n\n[She slides a data chip across.]\n\nThis is everything. It's encrypted with a key I'll send to Sable at Ashmore. If she trusts you, she'll decrypt it.",
        options: [
          { text: '[Take it.]', go: null,
            flag: 'linnea_quest', flagLabel: "📡 Linnea's transmission metadata" },
        ],
      },
      r_show: {
        text: "[She slides a data chip across. The chip is not labeled.]\n\nEverything I have. Encrypted. Sable at Ashmore can decrypt it — I'll forward her the key.\n\n[Quieter.]\n\nSection 7's transmissions have been ramping up. I don't know what's coming. I'd like for someone to.",
        options: [
          { text: '"You\'ll be safe?"', go: 'r_safe' },
          { text: '[Take it. Leave.]', go: null,
            flag: 'linnea_quest', flagLabel: "📡 Linnea's transmission metadata" },
        ],
      },
      r_safe: {
        text: "[A short laugh, no humour in it.]\n\nNobody who works in the Geology Lab is safe. We just don't talk about it.\n\nGo.",
        options: [
          { text: '[Take it. Leave.]', go: null,
            flag: 'linnea_quest', flagLabel: "📡 Linnea's transmission metadata" },
        ],
      },

      root_data_given: {
        text: "[She nods at the empty space on her desk where the chip used to sit.]\n\nIt's with you now. Whatever you do with it, it'll be more than I could.",
        options: [{ text: '[Leave.]', go: null }],
      },
    },
  },

  dayo: {
    id: 'dayo',
    name: 'Dayo Okafor',
    title: 'Wants To Leave, Iron Drift',
    portrait: 'dayo',
    greeting: "[A teenager at the end of the long table, eating reheated noodles with the focus of someone about to do something inadvisable.]",
    entry: [
      { requireFlag: 'dayo_resolved', node: 'root_done' },
      { requireFlag: 'dayo_r3', node: 'root_after_r3' },
      { requireFlag: 'dayo_l3_done', node: 'root_l3_done' },
      { requireFlag: 'dayo_r2', node: 'root_after_r2' },
      { requireFlag: 'dayo_l2_done', node: 'root_l2_done' },
      { requireFlag: 'dayo_r1', node: 'root_after_r1' },
      { requireFlag: 'dayo_l1_done', node: 'root_l1_done' },
      { requireFlag: 'dayo_l1', node: 'root_carrying' },
      { node: 'root' },
    ],
    tree: {
      root: {
        text: "[The teenager looks up.]\n\nYou're a trader, right? Like, an actual one, with a ship and stuff?\n\n[They don't wait for an answer.]\n\nMy uncle's on New Cascadia. Tomas Okafor. I've been writing him letters. The mail run is twelve weeks. You'd be there in days.",
        options: [
          { text: '"How old are you?"', go: 'r_age' },
          { text: '"What do you want?"', go: 'r_what' },
          { text: '[Eat your noodles, kid.]', go: null },
        ],
      },
      r_age: {
        text: "Old enough to want to leave. Not old enough to do it without my dad signing the form.\n\n[Beat.]\n\nHe won't sign the form. So.",
        options: [
          { text: '"What do you want from me?"', go: 'r_what' },
        ],
      },
      r_what: {
        text: "[They produce an envelope. Real paper. The address is hand-written.]\n\nTake this to my uncle. The Distillery on New Cascadia. He works the back office. He's the only person I've got who isn't on this rock.\n\nNo charge. I haven't got any credits.",
        options: [
          { text: '[Take the letter.]', go: 'r_taken',
            flag: 'dayo_l1', flagLabel: "✉ Dayo's letter (1 of 3)" },
          { text: '"Find someone else."', go: 'r_dismiss' },
        ],
      },
      r_taken: {
        text: "[Genuine surprise.]\n\nReally? Just like that?\n\n[Recovers fast.]\n\nThanks. He'll know what to do with it. Bring back whatever he writes me. Or — if there's nothing for me — anything for my dad.\n\n[Quieter.]\n\nDad won't talk to him. They don't talk. You'll see why.",
        options: [{ text: '[Nod.]', go: null }],
      },
      r_dismiss: {
        text: "[A flat shrug.]\n\nFine. I'll keep eating the noodles.\n\n[They go back to the bowl. Conversation ended.]",
        options: [{ text: '[Leave.]', go: null }],
      },

      root_carrying: {
        text: "[They glance at you, then at where the letter would be in your pocket.]\n\nStill got it?",
        options: [
          { text: '[Nod.]', go: null },
          { text: '"What\'s the deal between him and your dad?"', go: 'r_deal' },
        ],
      },
      r_deal: {
        text: "[A long pause.]\n\nDad won't say. Uncle won't say. Whatever it was, it was thirty years ago and they're both still angry.\n\nI was hoping you'd find out.",
        options: [{ text: '[Leave with the letter.]', go: null }],
      },

      // After delivering letter 1 (uncle's reply received)
      root_after_r1: {
        text: "[They look up sharply when you walk in.]\n\nYou went?",
        options: [
          { text: '[Hand over the reply.]', go: 'r_returned_1' },
          { text: '[Hold onto it. Say nothing.]', go: 'r_keep_1' },
        ],
      },
      r_returned_1: {
        text: "[They open it carefully. Read. Read again. Their face does several things, none of them happy.]\n\n[Eventually.]\n\nHe wrote back. He's never written back before.\n\n[They fold it and put it away.]\n\nIf you'll do another — there's more I want to ask him.",
        flagsOnEnter: ['dayo_l1_done'],
        options: [{ text: '[Wait for the next letter.]', go: null }],
      },
      r_keep_1: {
        text: "[They look at you. Then at the reply you didn't hand over.]\n\nIf you've read it, just say. I'd rather know.",
        options: [
          { text: '"I read it."', go: 'r_read_1', flag: 'letters_opened',
            flagLabel: '👁 You read the letter' },
          { text: '"I haven\'t read it."', go: 'r_not_read_1' },
        ],
      },
      r_read_1: {
        text: "[A pause.]\n\n...okay. What did it say.",
        options: [
          { text: '[Tell them what the uncle wrote.]', go: 'r_told_1' },
          { text: '[Keep the contents to yourself for now.]', go: 'r_kept_1' },
        ],
      },
      r_told_1: {
        text: "[They listen. They are very still.]\n\n...thanks for telling me. That's not what I wanted, but it's something I needed.\n\nNext one I'll write a different question.",
        flagsOnEnter: ['dayo_l1_done'],
        options: [{ text: '[Wait.]', go: null }],
      },
      r_kept_1: {
        text: "[A short, sharp nod.]\n\nFair. I'll read it later.\n\n[They take it.]",
        flagsOnEnter: ['dayo_l1_done'],
        options: [{ text: '[Leave.]', go: null }],
      },
      r_not_read_1: {
        text: "[Genuine relief.]\n\nThanks. Most people would have.\n\n[They take it.]",
        flagsOnEnter: ['dayo_l1_done'],
        options: [{ text: '[Leave.]', go: null }],
      },

      // Cycle 2 prompt
      root_l1_done: {
        text: "[A folded sheet, ready.]\n\nSecond one. He answered the easy questions. This one's harder.",
        options: [
          { text: '[Take it.]', go: null,
            flag: 'dayo_l2', flagLabel: "✉ Dayo's letter (2 of 3)" },
          { text: '"Take a breath. Are you sure?"', go: 'r_sure_2' },
        ],
      },
      r_sure_2: {
        text: "[They look at you properly, maybe for the first time.]\n\nNo. But asking is better than not.",
        options: [
          { text: '[Take the letter.]', go: null,
            flag: 'dayo_l2', flagLabel: "✉ Dayo's letter (2 of 3)" },
        ],
      },

      // After cycle 2
      root_after_r2: {
        text: "[They've been waiting for this one.]\n\nWhat'd he say?",
        options: [
          { text: '[Hand over the reply.]', go: 'r_returned_2' },
          { text: '"I read it."', go: 'r_read_2', flag: 'letters_opened',
            flagLabel: '👁 You read the letter' },
        ],
      },
      r_returned_2: {
        text: "[They read. They sit with it for a long time.]\n\n...he says it was about money. He says my dad was right to be angry. He says he should have apologised twenty years ago and never did.\n\n[Quieter.]\n\nThanks.",
        flagsOnEnter: ['dayo_l2_done'],
        options: [{ text: '[Wait for the third.]', go: null }],
      },
      r_read_2: {
        text: "[A nod.]\n\nWhat did it say.",
        options: [
          { text: '[Tell them.]', go: 'r_told_2' },
        ],
      },
      r_told_2: {
        text: "[A long silence.]\n\n...money. Of course it was money.\n\nThanks. One more letter and I think I'll have what I need.",
        flagsOnEnter: ['dayo_l2_done'],
        options: [{ text: '[Wait.]', go: null }],
      },

      // Cycle 3 prompt
      root_l2_done: {
        text: "[The third letter is short. They don't seal this one — leave it open in the envelope.]\n\nLast one. Tell him I'm coming. Whether he answers the form or not.",
        options: [
          { text: '[Take it.]', go: null,
            flag: 'dayo_l3', flagLabel: "✉ Dayo's letter (3 of 3)" },
        ],
      },

      // After cycle 3
      root_after_r3: {
        text: "[They're standing this time, not eating, when you walk in.]\n\nWell?",
        options: [
          { text: '[Hand over the final reply.]', go: 'r_returned_3' },
          { text: '"I read it."', go: 'r_read_3', flag: 'letters_opened',
            flagLabel: '👁 You read the letter' },
        ],
      },
      r_returned_3: {
        text: "[They read it standing. Twice.]\n\n[They fold it. Put it inside their jacket. Fold their arms.]\n\nHe says he'll sign the form. He says he should have done it twenty years ago for my dad. He says I should come.\n\n[A breath.]\n\nThank you, Captain. I owe you one. I'll find a way to pay it.",
        flagsOnEnter: ['dayo_l3_done', 'dayo_resolved'],
        options: [{ text: '[Nod.]', go: null,
          frontierDelta: 5, flag: 'dayo_resolved_msg', flagLabel: '✓ Dayo: leaving Iron Drift' }],
      },
      r_read_3: {
        text: "[They wait for it.]",
        options: [
          { text: '[Tell them: he\'ll sign the form.]', go: 'r_told_3' },
        ],
      },
      r_told_3: {
        text: "[A long, slow exhale.]\n\n...okay.\n\n[Quieter.]\n\nOkay. Thanks.",
        flagsOnEnter: ['dayo_l3_done', 'dayo_resolved'],
        options: [{ text: '[Nod. Leave.]', go: null,
          frontierDelta: 5, flag: 'dayo_resolved_msg', flagLabel: '✓ Dayo: leaving Iron Drift' }],
      },

      root_l3_done: {
        text: "[They're packing. Not much — a small bag.]\n\nNext ship to Cascadia. Tell my dad if you see him before I do. He'll be angry. That's fine.",
        options: [{ text: '[Nod. Leave them to it.]', go: null }],
      },
      root_done: {
        text: "[The seat at the end of the table is empty.]\n\n[The noodle bowl is still there.]",
        options: [{ text: '[Leave it.]', go: null }],
      },
    },
  },

  dayo_uncle: {
    id: 'dayo_uncle',
    name: 'Tomas Okafor',
    title: 'Back Office, The Distillery',
    portrait: 'dayo_uncle',
    greeting: "[A man behind a small desk in the back of the distillery's tasting room. Same jaw as the foreman; thirty years more tired.]",
    entry: [
      { requireFlag: 'dayo_l3', requireNotFlag: 'dayo_r3', node: 'root_l3' },
      { requireFlag: 'dayo_l2', requireNotFlag: 'dayo_r2', node: 'root_l2' },
      { requireFlag: 'dayo_l1', requireNotFlag: 'dayo_r1', node: 'root_l1' },
      { requireFlag: 'dayo_resolved', node: 'root_done' },
      { node: 'root_idle' },
    ],
    tree: {
      root_idle: {
        text: "[He looks up, polite, distant.]\n\nWelcome to the back office. The distillery's tour starts at the front. I do the books.",
        options: [{ text: '[Leave.]', go: null }],
      },

      root_l1: {
        text: "[He looks up, sees the envelope in your hand. Goes very still.]\n\n...is that from Dayo?",
        options: [
          { text: '[Hand it over.]', go: 'r1_hand' },
        ],
      },
      r1_hand: {
        text: "[He reads. Reads again. Sits back.]\n\n...he's still on Iron Drift.\n\n[Quietly.]\n\nI thought he'd have left by now. I thought my brother would have signed.\n\n[He writes a reply. Three pages. Folds it.]\n\nFor Dayo. Not my brother. Don't show my brother.",
        options: [
          { text: '[Take the reply.]', go: null,
            flag: 'dayo_r1', flagLabel: "✉ Tomas's reply (1 of 3)" },
        ],
      },

      root_l2: {
        text: "[He stands when you come in this time.]\n\nThe second one. He's writing me, properly. Twenty years of nothing and now he writes me twice in two weeks.\n\n[He takes it. Sits to read.]",
        options: [
          { text: '[Wait.]', go: 'r2_wait' },
        ],
      },
      r2_wait: {
        text: "[He reads slowly. Pauses several times. Eventually puts the letter down and writes a reply, longer than the first. He folds it carefully.]\n\nThis one — he asked the harder thing. I owed him the harder answer.\n\nIt was about money. Tell my brother that, if you see him. Not the details. Just the word.",
        options: [
          { text: '[Take the reply.]', go: null,
            flag: 'dayo_r2', flagLabel: "✉ Tomas's reply (2 of 3)" },
        ],
      },

      root_l3: {
        text: "[He doesn't read this one straight away. He looks at the envelope for a long time.]\n\n...he's coming.\n\n[He opens it. It's short. He reads it twice. Sets it aside.]",
        options: [
          { text: '[Wait.]', go: 'r3_wait' },
        ],
      },
      r3_wait: {
        text: "[He writes for ten minutes. The reply is one page. He signs it twice — once at the bottom, once at the top.]\n\nThe second signature is the form. Tell him I should have signed it the day his father refused to. Tell him there's a room for him here whenever the next ship is.\n\n[He hands it across.]\n\nThank you for carrying these. I had given up on the post.",
        options: [
          { text: '[Take the reply.]', go: null,
            flag: 'dayo_r3', flagLabel: "✉ Tomas's reply (3 of 3)" },
        ],
      },

      root_done: {
        text: "[He smiles, briefly, properly.]\n\nDayo arrived three days ago. He's working the front of the distillery. He's terrible at it. He's also happier than I have seen anyone be at being terrible at something.\n\nThank you, Captain.",
        options: [{ text: '[Nod. Leave.]', go: null }],
      },
    },
  },

  edda: {
    id: 'edda',
    name: 'Edda Vance',
    title: 'The Reason You Are Here',
    portrait: 'edda',
    greeting: "...you found me. I wasn't sure anyone would.",
    tree: {
      root: {
        text: "Seven years. Seven years hiding at the end of the sector, in a place the Combine can't reach, waiting for the proof to find its way to someone who could use it.\n\nAnd here you are. With my ship.",
        options: [
          { text: "Here I am. With your ship.", go: 'ship' },
          { text: "What happens now?", go: 'now' },
          { text: "Are you all right?", go: 'alright' },
        ],
      },
      ship: {
        text: "[Small smile]\n\nI sold it on purpose. The forwarding address was specific to a type: someone thorough enough to trace it back.\n\nI needed someone who would ask questions. Not someone I chose — someone who chose themselves, by being the kind of person who asks questions about a ship with a history.\n\nYou were the right person.",
        options: [{ text: "What happens now?", go: 'now' }],
      },
      now: {
        text: "That depends on what you have. If you have the data core, and the Consortium files, and Barker Ness at New Geneva — it happens now. We transmit everything simultaneously to every independent news outlet in the sector.\n\nThe Combine can't silence them all. Enough will get through.\n\nAfter that — it gets complicated. But complicated is better than buried.",
        options: [
          { text: "[Transmit everything]", go: 'publish', requireFlag: 'consortium_files' },
          { text: "I still need the Consortium files.", go: 'files_needed' },
        ],
      },
      publish: {
        text: "[You transmit everything — data core, Consortium manifests, Vasquez's testimony, Motes' account, all of it — simultaneously, to thirty-two outlets across the sector]\n\nEdda watches the transmission queue run down.\n\n'Thirteen years,' she says. 'Thirteen years of war, and then seven years of silence. That's over now.'\n\nShe looks out at the stars for a long moment.\n\n'Thank you. Take the ship back. You've earned it.'\n\nOutside, the sector has just become considerably louder.",
        options: [
          { text: "The Long Route. Complete.", go: null, flag: 'game_complete', flagLabel: '✨ The Long Route — Completed' },
        ],
      },
      files_needed: {
        text: "Get the Consortium files. Talk to Mirela Voss at the Consortium archive — mention Agatha Sorn, mention 7741-C. She's been waiting.\n\nCome back when you have them. I've waited seven years. A little longer is fine.",
        options: [{ text: "I'll be back.", go: null }],
      },
      alright: {
        text: "[Considers this seriously]\n\nYes. Surprisingly. Hiding is not a comfortable life, but it's a life, and there are worse things than being alive and invisible while you wait for the world to catch up.\n\nI got very good at cards. The people here don't ask questions.\n\nAnd now you're here, which means the waiting is over. What do you have?",
        options: [{ text: "Everything. Let's finish this.", go: 'now' }],
      },
    },
  },
}
