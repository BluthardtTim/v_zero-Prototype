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
  avatars?: Record<string, string>  // person name → avatar filename in /images/chat/
}

export const contexts: ContextBlob[] = [
  {
    id: "italy-trip",
    label: "Italy Trip",
    searchQuery: "Italy Trip Positano Amalfiküste Gruppe Urlaub Mia Lukas Nina Felix Ben Capri Pompeji Rom Neapel",
    message:
      "Hey! Still on for the Italy trip? Thinking Rome for 3 nights then down to Amalfi for the rest. Flights look good for July 14th departure. Marco and Julia are already in, just need to confirm with you and Dee.",
    entities: {
      people: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      places: ["Positano", "Rome", "Amalfi"],
      dates: ["2026-07-14", "2026-07-18"],
      events: ["Summer group trip"],
    },
    avatars: {
      "Mia Schulz":    "mia.jpg",
      "Lukas Brenner": "lukas.jpg",
      "Nina Berger":   "nina.jpg",
      "Felix Wagner":  "felix.jpg",
      "Ben Richter":   "ben.jpg",
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
