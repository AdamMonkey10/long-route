export const NPCS = {
  grex: {
    id: 'grex',
    name: 'Grex',
    title: 'Dock Master',
    portrait: 'grex',
    greeting: "Name. Ship registration. Purpose of visit. In that order.",
    tree: {
      root: {
        text: "You bought the Persistent Delusion? From the Kelloway yard?\n\nPrevious owner: Edda Vance. She walked out of here seven years ago in a hurry. Owed me forty credits. I mention this not because I expect reimbursement, but because I want it on the record that I remember.",
        options: [
          { text: "Who was Edda Vance?", go: 'edda' },
          { text: "What's worth trading here?", go: 'trade' },
          { text: "That'll be all.", go: null },
        ],
      },
      edda: {
        text: "Independent trader. Good reputation. She ran information: nav charts, data cores, for whoever paid. Careful. Very careful.\n\nThen she went quiet. Then she left the ship in impound and walked through that airlock. Never came back.",
        options: [
          { text: "Did she say where she was going?", go: 'edda_where', flag: 'edda_clue_1', flagLabel: '🔍 Clue 1: Grex remembers' },
          { text: "Who else knew her?", go: 'edda_contacts' },
          { text: "Back to trading.", go: 'trade' },
        ],
      },
      edda_where: {
        text: "Last thing she said: 'Don't let them impound the ship.' Then she left.\n\nThe Combine asked about her three weeks later. Two agents. Very polished. I gave them nothing — Edda was thorough. They left a card. I filed it in the recycling unit.",
        options: [
          { text: "The Combine asked about her.", go: null },
          { text: "Who else might know?", go: 'edda_contacts' },
        ],
      },
      edda_contacts: {
        text: "Mara Solis — she's over there — they traded information sometimes. And there's an old navigator at Meridian Cross called Vasquez. If you're trying to find her — which I'd advise against — that's where I'd start.",
        options: [
          { text: "Why advise against it?", go: 'warning' },
          { text: "Thanks, Grex.", go: null },
        ],
      },
      warning: {
        text: "Because the Combine asked about her. The Combine does not ask casual questions.\n\nI am a simple man, {name}. I find it useful to notice when things are hidden and choose not to look.",
        options: [{ text: "I appreciate the advice.", go: null }],
      },
      trade: {
        text: "Components are cheap here. Ore and food are scarce. Bellhaven does good food if you don't mind the inspection queue.",
        options: [{ text: "Good to know.", go: null }],
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
    tree: {
      root: {
        text: "I don't deal in contraband. I deal in goods whose legal status is subject to ongoing philosophical debate between myself and various law enforcement agencies.",
        options: [
          { text: "I'm looking for Smee.", go: 'smee' },
          { text: "What's trading well here?", go: 'trade' },
          { text: "Just browsing.", go: null },
        ],
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
    tree: {
      root: {
        text: "Everyone who comes through thinks they're passing through. Nobody is. Meridian Cross IS the destination — they just haven't admitted it yet.",
        options: [
          { text: "Information about Edda Vance.", go: 'edda' },
          { text: "Who's the old man in the corner?", go: 'vasquez' },
          { text: "Tell me about New Geneva.", go: 'geneva' },
          { text: "Just the drink.", go: null },
        ],
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
        options: [{ text: "7741-C. Thank you.", go: null }],
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
        options: [{ text: "I'll see what I can do.", go: null }],
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
        options: [{ text: "Yes. I did.", go: null }],
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
        ],
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
        options: [
          { text: "What kind of queries?", go: 'queries' },
          { text: "She's been gone seven years.", go: 'gone' },
          { text: "Any legitimate work?", go: 'work' },
        ],
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
          { text: "What's trading here?", go: 'trade' },
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
        ],
      },
      kasey_friend: {
        text: "Excellent person. Eleven months on Iron Drift and still finding ways to be useful. Respect that enormously.\n\nTen percent on anything you sell me today. I keep my word — competitive advantage in this business.",
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
        options: [{ text: "To justify the jump gate licensing.", go: null }],
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
