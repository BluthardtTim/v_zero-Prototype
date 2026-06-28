export type EventType = "finance" | "images" | "chats" | "contacts" | "files" | "map"

export interface ContextEvent {
  id: string
  type: EventType
  content: string
  entities: Record<string, unknown>
  raw_ref: Record<string, unknown>
}

export const events: ContextEvent[] = [

  // ── FINANCE — shared expenses (Splitwise-style) ──────────────────

  {
    id: "finance_dinner_positano",
    type: "finance",
    content: "Gemeinsames Abendessen Trattoria da Vincenzo Positano von Mia bezahlt 186 Euro auf 5 Personen aufgeteilt noch offen",
    entities: {
      people: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      places: ["Trattoria da Vincenzo", "Positano"],
      amounts: [{ value: 186, currency: "EUR" }]
    },
    raw_ref: {
      type: "expense",
      title: "Trattoria da Vincenzo",
      category: "food",
      amount: 186,
      currency: "EUR",
      paid_by: "Mia Schulz",
      split_between: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      share_per_person: 37.2,
      status: "open",
      date: "2026-07-15"
    }
  },

  {
    id: "finance_hotel_positano",
    type: "finance",
    content: "Babbo Apartments Positano Unterkunft von Lukas bezahlt 940 Euro fuer die Gruppe schon ausgeglichen",
    entities: {
      people: ["Lukas Brenner", "Mia Schulz", "Nina Berger", "Felix Wagner", "Ben Richter"],
      places: ["Babbo Apartments", "Positano"],
      amounts: [{ value: 940, currency: "EUR" }]
    },
    raw_ref: {
      type: "expense",
      title: "Babbo Apartments Positano",
      category: "accommodation",
      amount: 940,
      currency: "EUR",
      paid_by: "Lukas Brenner",
      split_between: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      share_per_person: 188,
      status: "settled",
      date: "2026-07-14"
    }
  },

  {
    id: "finance_train_rome_naples",
    type: "finance",
    content: "Zugtickets Rom nach Neapel von Nina bezahlt 64 Euro fuer die Gruppe noch offen",
    entities: {
      people: ["Nina Berger", "Mia Schulz", "Lukas Brenner", "Felix Wagner", "Ben Richter"],
      places: ["Rom", "Neapel"],
      amounts: [{ value: 64, currency: "EUR" }]
    },
    raw_ref: {
      type: "expense",
      title: "Zug Rom → Neapel",
      category: "transport",
      amount: 64,
      currency: "EUR",
      paid_by: "Nina Berger",
      split_between: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      share_per_person: 12.8,
      status: "open",
      date: "2026-07-13"
    }
  },

  {
    id: "finance_boat_capri",
    type: "finance",
    content: "Bootstour Capri Blue Grotto von Felix bezahlt 220 Euro fuer die Gruppe schon ausgeglichen",
    entities: {
      people: ["Felix Wagner", "Mia Schulz", "Lukas Brenner", "Nina Berger", "Ben Richter"],
      places: ["Capri", "Blue Grotto"],
      amounts: [{ value: 220, currency: "EUR" }]
    },
    raw_ref: {
      type: "expense",
      title: "Bootstour Capri",
      category: "activity",
      amount: 220,
      currency: "EUR",
      paid_by: "Felix Wagner",
      split_between: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      share_per_person: 44,
      status: "settled",
      date: "2026-07-17"
    }
  },

  // ── IMAGES — photo metadata ───────────────────────────────────────

  {
    id: "images_sunset_positano",
    type: "images",
    content: "Foto Sonnenuntergang Klippen Positano Italien Gruppe am Abend zusammen",
    entities: {
      people: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      places: ["Positano", "Amalfiküste"],
      dates: ["2026-07-15"]
    },
    raw_ref: {
      type: "photo",
      title: "Sunset über Positano",
      date: "2026-07-15",
      location: "Positano, Amalfiküste",
      participants: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      thumbnail: "positano_sunset.png"
    }
  },

  {
    id: "images_dinner_group",
    type: "images",
    content: "Foto gemeinsames Abendessen Trattoria da Vincenzo Positano Gruppe am Tisch",
    entities: {
      people: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      places: ["Trattoria da Vincenzo", "Positano"],
      dates: ["2026-07-15"]
    },
    raw_ref: {
      type: "photo",
      title: "Dinner bei Vincenzo",
      date: "2026-07-15",
      location: "Trattoria da Vincenzo, Positano",
      participants: ["Mia Schulz", "Lukas Brenner", "Nina Berger", "Felix Wagner", "Ben Richter"],
      thumbnail: "trattoria_dinner.png"
    }
  },

  {
    id: "images_capri_grotto",
    type: "images",
    content: "Foto Bootstour Capri Blue Grotto Felix und Ben im Boot",
    entities: {
      people: ["Felix Wagner", "Ben Richter"],
      places: ["Capri", "Blue Grotto"],
      dates: ["2026-07-17"]
    },
    raw_ref: {
      type: "photo",
      title: "Blue Grotto Bootstour",
      date: "2026-07-17",
      location: "Capri",
      participants: ["Felix Wagner", "Ben Richter"],
      thumbnail: "capri_grotto.png"
    }
  },

  {
    id: "images_pompeii_ruins",
    type: "images",
    content: "Foto Ausgrabungen Pompeji Ruinen Gruppe Sightseeing Tagesausflug",
    entities: {
      people: ["Mia Schulz", "Nina Berger"],
      places: ["Pompeji"],
      dates: ["2026-07-16"]
    },
    raw_ref: {
      type: "photo",
      title: "Pompeji Ausgrabungen",
      date: "2026-07-16",
      location: "Pompeji",
      participants: ["Mia Schulz", "Nina Berger"],
      thumbnail: "pompeii_ruins.png"
    }
  },

  // ── CHATS — group chat messages ───────────────────────────────────

  {
    id: "chats_boat_capri_plan",
    type: "chats",
    content: "Gruppenchat Italy Trip Nina fragt wer am Mittwoch mit zur Bootstour Capri Blue Grotto kommt Felix bestaetigt zwei Plaetze",
    entities: {
      people: ["Nina Berger", "Felix Wagner"],
      places: ["Capri", "Blue Grotto"],
      dates: ["2026-07-17"]
    },
    raw_ref: {
      type: "chat_message",
      chat: "Italy Trip 🇮🇹",
      sender: "Nina Berger",
      message: "Wer kommt morgen mit zur Bootstour nach Capri?",
      reply_from: "Felix Wagner",
      reply_message: "Wir zwei sind dabei!",
      timestamp: "2026-07-16T19:42:00",
      unread: 2,
      chat_thumbnail: "capri_selfie.jpg"
    }
  },

  {
    id: "chats_dinner_reservation",
    type: "chats",
    content: "Gruppenchat Italy Trip Mia teilt Reservierung Trattoria da Vincenzo Positano 20 Uhr fuer fuenf Personen",
    entities: {
      people: ["Mia Schulz"],
      places: ["Trattoria da Vincenzo", "Positano"],
      dates: ["2026-07-15"]
    },
    raw_ref: {
      type: "chat_message",
      chat: "Italy Trip 🇮🇹",
      sender: "Mia Schulz",
      message: "Tisch ist reserviert, 20 Uhr bei Vincenzo 🍝",
      timestamp: "2026-07-15T14:10:00",
      unread: 0,
      chat_thumbnail: "dinner_view.jpg"
    }
  },

  {
    id: "chats_packing_reminder",
    type: "chats",
    content: "Gruppenchat Italy Trip Ben erinnert an Check-out Babbo Apartments Positano um 10 Uhr Koffer bereitstellen",
    entities: {
      people: ["Ben Richter"],
      places: ["Babbo Apartments", "Positano"],
      dates: ["2026-07-18"]
    },
    raw_ref: {
      type: "chat_message",
      chat: "Italy Trip 🇮🇹",
      sender: "Ben Richter",
      message: "Checkout morgen 10 Uhr nicht verschlafen 😅",
      timestamp: "2026-07-17T21:05:00",
      unread: 1
    }
  },

  {
    id: "chats_pompeii_plan",
    type: "chats",
    content: "Gruppenchat Italy Trip Lukas schlaegt Tagesausflug Pompeji vor alle sind dabei Abfahrt frueh morgens",
    entities: {
      people: ["Lukas Brenner", "Mia Schulz", "Nina Berger"],
      places: ["Pompeji"],
      dates: ["2026-07-16"]
    },
    raw_ref: {
      type: "chat_message",
      chat: "Italy Trip 🇮🇹",
      sender: "Lukas Brenner",
      message: "Pompeji morgen? Wäre mega — bin ab 9 Uhr ready 🏛️",
      reply_from: "Mia Schulz",
      reply_message: "Ja!! Ich bin so dabei",
      timestamp: "2026-07-15T20:30:00",
      unread: 0
    }
  },

  {
    id: "chats_dm_lukas_payment",
    type: "chats",
    content: "Direktnachricht Lukas Brenner Abrechnung Abendessen Positano 37 Euro noch offen bitte ueberweisen",
    entities: {
      people: ["Lukas Brenner"],
      places: ["Positano"],
      amounts: [{ value: 37.2, currency: "EUR" }]
    },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Lukas Brenner",
      message: "Hey, hast du die Abrechnung schon gesehen? Schuldest mir noch € 37,20 fürs Abendessen 😊",
      timestamp: "2026-07-17T10:15:00",
      unread: 1
    }
  },

  {
    id: "chats_dm_jonas_bouldern",
    type: "chats",
    content: "Direktnachricht Jonas Mueller Bouldern morgen Abend einladen klettern Sport",
    entities: {
      people: ["Jonas Müller"]
    },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Jonas Müller",
      message: "Wir gehen morgen Abend bouldern — kommst du mit? 🧗",
      timestamp: "2026-07-17T18:45:00",
      unread: 1
    }
  },

  {
    id: "chats_dm_mom",
    type: "chats",
    content: "Direktnachricht Mama Familie Urlaub anrufen wie laeuft es alles gut",
    entities: {
      people: ["Mama"]
    },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Mama",
      message: "Wie läuft der Urlaub? Ruf mich kurz an wenn du Zeit hast 😊",
      timestamp: "2026-07-16T16:20:00",
      unread: 2
    }
  },

  // ── CONTACTS — trip-relevant contacts ─────────────────────────────

  {
    id: "contacts_airbnb_host_positano",
    type: "contacts",
    content: "Kontakt Giulia Esposito Gastgeberin Babbo Apartments Positano Airbnb Host Telefonnummer",
    entities: {
      people: ["Giulia Esposito"],
      places: ["Positano"]
    },
    raw_ref: {
      type: "contact",
      name: "Giulia Esposito",
      role: "Airbnb Host — Babbo Apartments",
      phone: "+39 333 123 4567",
      source: "Airbnb"
    }
  },

  {
    id: "contacts_hertz_naples",
    type: "contacts",
    content: "Kontakt Hertz Neapel Mietwagen Station Ansprechpartner Telefonnummer",
    entities: {
      places: ["Neapel"]
    },
    raw_ref: {
      type: "contact",
      name: "Hertz Naples Airport",
      role: "Mietwagen-Station",
      phone: "+39 081 780 5790",
      source: "Hertz"
    }
  },

  {
    id: "contacts_trattoria_vincenzo",
    type: "contacts",
    content: "Kontakt Trattoria da Vincenzo Positano Restaurant Reservierungsnummer",
    entities: {
      places: ["Trattoria da Vincenzo", "Positano"]
    },
    raw_ref: {
      type: "contact",
      name: "Trattoria da Vincenzo",
      role: "Restaurant — Reservierungen",
      phone: "+39 089 875 257",
      source: "Restaurant"
    }
  },

  // ── FILES — booking references ────────────────────────────────────

  {
    id: "files_airbnb_positano",
    type: "files",
    content: "AirBnB Buchungsbestätigung Babbo Apartments Positano vier Naechte Bestaetigung PDF",
    entities: {
      places: ["Positano"],
      dates: ["2026-07-14", "2026-07-18"]
    },
    raw_ref: {
      type: "booking",
      title: "Babbo Apartments — Positano",
      source: "Airbnb",
      document_type: "booking_confirmation",
      filename: "Airbnb_Positano_Confirmation.pdf",
      check_in: "2026-07-14",
      check_out: "2026-07-18"
    }
  },

  {
    id: "files_airbnb_rome",
    type: "files",
    content: "AirBnB Buchungsbestätigung Apartment Trastevere Rom zwei Naechte Bestaetigung PDF",
    entities: {
      places: ["Rom", "Trastevere"],
      dates: ["2026-07-12", "2026-07-14"]
    },
    raw_ref: {
      type: "booking",
      title: "Apartment Trastevere — Rom",
      source: "Airbnb",
      document_type: "booking_confirmation",
      filename: "Airbnb_Rome_Confirmation.pdf",
      check_in: "2026-07-12",
      check_out: "2026-07-14"
    }
  },

  {
    id: "files_car_rental_naples",
    type: "files",
    content: "Mietwagen Bestaetigung Neapel Hertz Mietvertrag PDF fuer die Gruppe",
    entities: {
      places: ["Neapel"],
      dates: ["2026-07-14", "2026-07-18"]
    },
    raw_ref: {
      type: "booking",
      title: "Mietwagen — Neapel",
      source: "Hertz",
      document_type: "rental_agreement",
      filename: "Hertz_Naples_RentalAgreement.pdf",
      pickup: "2026-07-14",
      dropoff: "2026-07-18"
    }
  },

  // ── MAP — saved places ────────────────────────────────────────────

  {
    id: "map_trattoria_positano",
    type: "map",
    content: "Trattoria da Vincenzo Positano gespeichert Restaurant Amalfikueste",
    entities: {
      places: ["Trattoria da Vincenzo", "Positano"]
    },
    raw_ref: {
      type: "saved_place",
      name: "Trattoria da Vincenzo",
      category: "restaurant",
      city: "Positano",
      lat: 40.6280,
      lng: 14.4848
    }
  },

  {
    id: "map_spiaggia_grande",
    type: "map",
    content: "Spiaggia Grande Strand Positano gespeichert Beach Amalfikueste",
    entities: {
      places: ["Spiaggia Grande", "Positano"]
    },
    raw_ref: {
      type: "saved_place",
      name: "Spiaggia Grande",
      category: "beach",
      city: "Positano",
      lat: 40.6271,
      lng: 14.4859
    }
  },

  {
    id: "map_babbo_apartments",
    type: "map",
    content: "Babbo Apartments Positano gespeichert Unterkunft Amalfikueste",
    entities: {
      places: ["Babbo Apartments", "Positano"]
    },
    raw_ref: {
      type: "saved_place",
      name: "Babbo Apartments",
      category: "accommodation",
      city: "Positano",
      lat: 40.6293,
      lng: 14.4838
    }
  }
]
