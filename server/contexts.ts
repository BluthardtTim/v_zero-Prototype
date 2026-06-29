export interface ContextBlob {
  id: string
  label: string
  searchQuery: string
  message: string
  entities: {
    people?: string[]
    places?: string[]
    dates?: string[]
    events?: string[]
  }
}

export const contexts: ContextBlob[] = [
  {
    id: "italy-trip",
    label: "Italy Trip",
    searchQuery: "Italy Trip summer group of friends Amalfi Rome",
    message:
      "Hey! Still on for the Italy trip? Thinking Rome for 3 nights then down to Amalfi for the rest. Flights look good for July 14th departure. Marco and Julia are already in, just need to confirm with you and Dee.",
    entities: {
      people: ["Marco", "Julia", "Dee"],
      places: ["Rome", "Amalfi"],
      dates: ["July 14"],
      events: ["Summer group trip"],
    },
  },
  {
    id: "haus-hoffmann",
    label: "Haus Hoffmann",
    searchQuery: "architect house building project client floor plan permit construction engineer",
    message:
      "Quick update on the Hoffmann house project — Lisa finished the updated floor plans v3 and Stefan confirmed the foundation depth for the sloped site. Klaus and Maria want to meet Thursday to review the facade options before we submit the building permit on Friday.",
    entities: {
      people: ["Lisa", "Stefan", "Klaus", "Maria"],
      places: ["Starnberg"],
      dates: ["2026-07-24T14:00", "2026-07-25"],
      events: ["Client presentation", "Permit submission"],
    },
  },
  {
    id: "team-standup",
    label: "Team Standup",
    searchQuery: "team standup meeting product sprint planning blockers",
    message:
      "Reminder: weekly product standup is at 9:30am today. Same as every Monday — quick round on blockers, then a look at the sprint board before planning kicks off.",
    entities: {
      people: ["Product team"],
      places: [],
      dates: ["Today, 9:30am", "Every Monday"],
      events: ["Weekly standup"],
    },
  },
  {
    id: "birthday-dinner",
    label: "Birthday Dinner",
    searchQuery: "birthday dinner surprise party friends restaurant Berlin",
    message:
      "Don't forget — Sarah's surprise birthday dinner is next Saturday at the Italian place in Berlin Mitte. Tom booked the back room. Lena, Noah, and Priya are helping coordinate, just keep it quiet until then!",
    entities: {
      people: ["Sarah", "Tom", "Lena", "Noah", "Priya"],
      places: ["Berlin"],
      dates: ["Next Saturday"],
      events: ["Surprise birthday dinner"],
    },
  },
]
