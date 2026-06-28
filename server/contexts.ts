export interface ContextBlob {
  id: string
  label: string
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
    id: "team-standup",
    label: "Team Standup",
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
