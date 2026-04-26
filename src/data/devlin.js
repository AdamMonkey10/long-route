// Content for Devlin Marsh: round commentary pools, final-result text,
// and the laminated rule-card text.

export const DEVLIN_WIN_ROUND = [
  "Yes. Exactly as I calculated.",
  "Psychology. I won't explain it. You wouldn't understand the methodology.",
  "Note the hand. Note it. That is what reading your opponent looks like.",
  "I could see you were going to do that. I've been watching your tells.",
  "Devlin Marsh does not lose rounds by accident. He wins them by design.",
]

export const DEVLIN_LOSE_ROUND = [
  "Hm.",
  "...the draught. There was definitely a draught.",
  "I'm going to need you to do that again before I accept that as a deliberate choice.",
  "I allowed that. Strategically. You'll understand later.",
  "That's not — I was going to pick differently. I changed my mind at the last second. That shouldn't count.",
  "One round. One round means nothing. This is a three-round game for a reason.",
]

export const DEVLIN_DRAW_ROUND = [
  "A draw. This tells us nothing. Except that you were thinking what I was thinking. Which means I was ahead.",
  "Interesting. I let that happen.",
  "Psychological dead heat. We're evenly matched. I say this for your benefit.",
]

export const DEVLIN_FINAL_VICTORY = [
  "Well played. Honestly. For the level you're at. Some people would call this beginners' luck on your part. Those people would be wrong. It was skill on my part.",
  "The student has become the student. Again. As expected.",
  "I hope you've learned something today. I know I have. I've learned that I'm even better than I thought, which I didn't think was possible but here we are.",
  "No hard feelings. Losing to Devlin Marsh is not something to be ashamed of. Statistically speaking, almost everyone does.",
]

export const DEVLIN_BEST_OF_FIVE_PROMPT =
  "...\n...\nBest of five."

export const DEVLIN_PROTEST_INSIST_THREE =
  "I wasn't ready. There was a draught. Did you feel that draught? Significant draught. Could have affected either of us. Primarily me.\n\n[A defeated pause.]\n\nFine.\n\n[Your winnings are paid out — exactly, to the credit, no more.]\n\nFine."

export const DEVLIN_IRREGULAR_RESULT =
  "Devlin Marsh acknowledges this outcome under protest.\n\nThe protest is formal. It has been filed with himself. He will be reviewing it extensively."

export const DEVLIN_BEST_OF_FIVE_RECOVER =
  "THERE. As I said. Best of five was always correct. I'm not going to say I told you so.\n\n[He says it.]\n\nI told you so."

export const DEVLIN_PROTEST_DOUBLED =
  "[Devlin adds the additional loss to his internal formal protest.]\n\n[The protest is now substantial.]"

// Stake proposals — Devlin's voice
export const DEVLIN_STAKES = {
  low: {
    label: '50cr — Friendly Game',
    amount: 50,
    devlinPitch: "Fifty credits. Friendly game. No pressure. I won't enjoy winning this much. I will enjoy it a normal amount.",
  },
  medium: {
    label: '200cr — Now We\'re Playing',
    amount: 200,
    devlinPitch: "Two hundred credits. Now we're playing properly. This is the real game.",
  },
  high: {
    label: '500cr — Bold',
    amount: 500,
    devlinPitch: "Five hundred credits. You want to try your luck again. Bold. I respect bold. Bold people lose memorably.",
  },
  info: {
    label: 'Information — Mid-game',
    amount: 0,
    devlinPitch: "I know something. I don't know what it means. It might be worth knowing. Whoever wins, I tell you something. Winner picks the topic.",
  },
}

// Player-counter responses (Devlin speaks)
export const DEVLIN_RESPONSES = {
  low_player: "Fifty credits. Cautious. I understand caution. I respect it. I don't practise it, but I respect it.",
  high_player: "Five hundred. Confidence. I like this. This is the energy of someone who doesn't know what they're getting into. Wonderful. Let's go.",
}

// Information-stake reward when player wins it
export const DEVLIN_INFO_REWARD =
  "[Devlin leans forward, drops his voice.]\n\nThere's a courier shuttle that runs between Vantage and Cold Harbor that the Combine pretends not to know about. They're using it to move surveillance equipment. The drop happens at oh-two-hundred station time. I overheard it. I overhear a lot.\n\nDo with that what you will. The bet is paid."

// Laminated rules card text
export const DEVLIN_RULES_CARD = {
  title: 'DEVLIN MARSH ORIGINAL GAME SYSTEM',
  rules: [
    'Stone beats Blade.',
    'Blade beats Cloth.',
    'Cloth beats Stone.',
  ],
  footer: '— D.M.',
}
