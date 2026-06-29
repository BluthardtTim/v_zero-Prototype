export type EventType = "finance" | "images" | "chats" | "contacts" | "files" | "map" | "notes" | "articles" | "calendar"

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
      sender_avatar: "nina.jpg",
      participants_avatars: { "Mia Schulz": "mia.jpg", "Lukas Brenner": "lukas.jpg", "Nina Berger": "nina.jpg", "Felix Wagner": "felix.jpg", "Ben Richter": "ben.jpg" },
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
      sender_avatar: "mia.jpg",
      participants_avatars: { "Mia Schulz": "mia.jpg", "Lukas Brenner": "lukas.jpg", "Nina Berger": "nina.jpg", "Felix Wagner": "felix.jpg", "Ben Richter": "ben.jpg" },
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
      sender_avatar: "ben.jpg",
      participants_avatars: { "Mia Schulz": "mia.jpg", "Lukas Brenner": "lukas.jpg", "Nina Berger": "nina.jpg", "Felix Wagner": "felix.jpg", "Ben Richter": "ben.jpg" },
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
      sender_avatar: "lukas.jpg",
      participants_avatars: { "Mia Schulz": "mia.jpg", "Lukas Brenner": "lukas.jpg", "Nina Berger": "nina.jpg", "Felix Wagner": "felix.jpg", "Ben Richter": "ben.jpg" },
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
      sender_avatar: "lukas.jpg",
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
      sender_avatar: "jonas.jpg",
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
      sender_avatar: "mama.jpg",
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
  },

  // ── HAUS HOFFMANN — architect project ───────────────────────────────

  // Files
  {
    id: "project_file_bauplan",
    type: "files",
    content: "Grundrisse EG OG Hoffmann v3 Bauplaene Einfamilienhaus Starnberg Architekt Lisa",
    entities: { people: ["Lisa Kraft"] },
    raw_ref: {
      type: "file",
      name: "Grundrisse_EG_OG_Hoffmann_v3.pdf",
      format: "PDF",
      size: "4.2 MB",
      modified: "2026-07-14",
      author: "Lisa Kraft"
    }
  },
  {
    id: "project_file_lv",
    type: "files",
    content: "Leistungsverzeichnis Rohbau Hoffmann Baubeschreibung Materialspezifikation Kostenplanung",
    entities: {},
    raw_ref: {
      type: "file",
      name: "LV_Hoffmann_Rohbau.pdf",
      format: "PDF",
      size: "1.1 MB",
      modified: "2026-07-10"
    }
  },
  {
    id: "project_file_fassade",
    type: "files",
    content: "Ansichten Fassade Hoffmann Suedfassade Nordfassade Einfamilienhaus Klinker",
    entities: {},
    raw_ref: {
      type: "file",
      name: "Ansichten_Hoffmann_v2.pdf",
      format: "PDF",
      size: "2.8 MB",
      modified: "2026-07-12"
    }
  },
  {
    id: "project_file_baugenehmigung",
    type: "files",
    content: "Bauantrag Baugenehmigung Einfamilienhaus Hoffmann Starnberg Gemeinde Einreichung",
    entities: { places: ["Starnberg"] },
    raw_ref: {
      type: "file",
      name: "Bauantrag_Hoffmann_Entwurf.pdf",
      format: "PDF",
      size: "3.6 MB",
      modified: "2026-07-16"
    }
  },

  // Articles
  {
    id: "project_article_passive",
    type: "articles",
    content: "Passivhaus Standards Daemmung Waermebruecken U-Wert Energieeffizienz Gebaeudehuelle",
    entities: {},
    raw_ref: {
      type: "saved_article",
      title: "Passivhaus — Dämmlösungen im Vergleich",
      source: "Detail Magazin",
      saved: "2026-07-08"
    }
  },
  {
    id: "project_article_holzbau",
    type: "articles",
    content: "Holzrahmenbau Massivholz Konstruktion Statik moderne Holzhaeuser Einfamilienhaus Neubau",
    entities: {},
    raw_ref: {
      type: "saved_article",
      title: "Moderner Holzrahmenbau — Konstruktionsprinzipien",
      source: "DAB online",
      saved: "2026-07-05"
    }
  },
  {
    id: "project_article_foerderung",
    type: "articles",
    content: "KfW Foerderung Energieeffizientes Bauen Wohngebaeude Zuschuss Kredit Neubau",
    entities: {},
    raw_ref: {
      type: "saved_article",
      title: "KfW 261 — Förderkredit Neubau",
      source: "KfW.de",
      saved: "2026-07-11"
    }
  },

  // Notes
  {
    id: "project_note_client_meeting",
    type: "notes",
    content: "Kundengespräch Hoffmann Protokoll Maria Fenster Sued Wohnzimmer Klaus Dachterrasse Wuensche Klinker",
    entities: { people: ["Klaus Hoffmann", "Maria Hoffmann"] },
    raw_ref: {
      type: "note",
      title: "Protokoll — Kundengespräch Hoffmann",
      body: "Maria: Südfenster Wohnzimmer vergrößern (mind. 2,40 m). Klaus fragt nach Machbarkeit Dachterrasse über Garage. Klinker-Fassade bevorzugt, Farbton noch offen.",
      modified: "2026-07-15"
    }
  },
  {
    id: "project_note_revision",
    type: "notes",
    content: "Design Revision Checkliste Treppenbreite Kellertiefe Stefan Grundriss Aenderungen Nordfenster",
    entities: { people: ["Stefan Berger"] },
    raw_ref: {
      type: "note",
      title: "Revision v3 — Offene Punkte",
      body: "Treppenbreite auf 1,20 m anpassen. Kellertiefe mit Stefan klären (Hanggrundstück). Nordfenster OG: Lüftungsflügel eintragen.",
      modified: "2026-07-17"
    }
  },
  {
    id: "project_note_todo",
    type: "notes",
    content: "Bauantrag Einreichung Checkliste Unterlagen Lageplan Statik Baubeschreibung Gemeinde Starnberg",
    entities: { places: ["Starnberg"] },
    raw_ref: {
      type: "note",
      title: "Bauantrag — Einreichungs-Checkliste",
      body: "Alle Unterlagen für die Einreichung beim Bauamt Starnberg.",
      checklist: [
        { label: "Lageplan M 1:500 aktual.", done: true },
        { label: "Baubeschreibung finalisieren", done: true },
        { label: "Statiknachweis Stefan", done: false },
        { label: "Wärmebrückennachweis", done: false },
        { label: "Einreichung Gemeinde Starnberg", done: false }
      ],
      modified: "2026-07-18"
    }
  },

  // Chats
  {
    id: "project_chat_team_floor_plan",
    type: "chats",
    content: "Projekt Hoffmann Gruppe Lisa Grundriss Version 3 hochgeladen Aenderungen Suedseite Treppenbreite",
    entities: { people: ["Lisa Kraft"] },
    raw_ref: {
      type: "chat_message",
      chat: "Projekt Hoffmann 🏠",
      chat_type: "group",
      sender: "Lisa Kraft",
      participants: ["Lisa Kraft", "Stefan Berger"],
      message: "Habe gerade v3 der Grundrisse hochgeladen — das Südfenster im Wohnzimmer ist jetzt auf 2,40 m, und ich hab die Treppe schon angepasst 👍",
      timestamp: "2026-07-17T11:23:00Z",
      unread: true
    }
  },
  {
    id: "project_chat_team_schedule",
    type: "chats",
    content: "Projekt Hoffmann Gruppe Bauantrag Deadline Freitag Zeitplan Einreichung Stefan Statik Mittwoch",
    entities: {},
    raw_ref: {
      type: "chat_message",
      chat: "Projekt Hoffmann 🏠",
      chat_type: "group",
      sender: "Stefan Berger",
      participants: ["Lisa Kraft", "Stefan Berger"],
      message: "Statiknachweis ist bis Mittwoch fertig, damit ihr Freitag noch einreichen könnt.",
      timestamp: "2026-07-16T14:52:00Z",
      unread: false
    }
  },
  {
    id: "project_chat_stefan_foundation",
    type: "chats",
    content: "Stefan Berger Tragwerksplaner Gruendung Tiefe Hanggrundstück Streifenfundament Keller Bodengutachten",
    entities: { people: ["Stefan Berger"] },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Stefan Berger",
      message: "Habe das Bodengutachten ausgewertet. Wir gehen auf 1,80 m Gründungstiefe, Hangseite braucht Streifenfundament. Keller ist kein Problem.",
      timestamp: "2026-07-15T09:10:00Z",
      unread: false
    }
  },
  {
    id: "project_chat_client_facade",
    type: "chats",
    content: "Klaus Hoffmann Klient Fassade Material Klinker Sandton Entscheidung Wunsch Donnerstagstermin",
    entities: { people: ["Klaus Hoffmann"] },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Klaus Hoffmann",
      message: "Wir haben nochmal überlegt — Klinker soll es sein, am liebsten in einem warmen Sandton. Kann man das beim Donnerstagstermin zeigen?",
      timestamp: "2026-07-16T18:34:00Z",
      unread: true
    }
  },
  {
    id: "project_chat_lisa_dm",
    type: "chats",
    content: "Lisa Kraft Fenster Nordfassade Lüftungsflügel Detail Zeichnung Schnitt Abstimmung",
    entities: { people: ["Lisa Kraft"] },
    raw_ref: {
      type: "chat_message",
      chat_type: "direct",
      sender: "Lisa Kraft",
      message: "Sollen die Nordfenster OG alle Lüftungsflügel bekommen oder nur die Badezimmer? Detail fehlt noch im Schnitt.",
      timestamp: "2026-07-17T08:45:00Z",
      unread: true
    }
  },

  // Calendar
  {
    id: "project_calendar_client_presentation",
    type: "calendar",
    content: "Kundenpräsentation Hoffmann Donnerstag Fassade Optionen Besprechung Atelier Klaus Maria",
    entities: { people: ["Klaus Hoffmann", "Maria Hoffmann"], dates: ["2026-07-24T14:00"] },
    raw_ref: {
      type: "calendar_event",
      title: "Präsentation — Fassadenoptionen",
      date: "2026-07-24",
      time: "14:00",
      location: "Atelier",
      attendees: ["Klaus Hoffmann", "Maria Hoffmann"]
    }
  },
  {
    id: "project_calendar_site_visit",
    type: "calendar",
    content: "Ortsbegehung Baustelle Starnberg Stefan Hanggrundstück Montag Gruendung",
    entities: { people: ["Stefan Berger"], places: ["Starnberg"], dates: ["2026-07-21T09:00"] },
    raw_ref: {
      type: "calendar_event",
      title: "Ortsbegehung — Grundstück Starnberg",
      date: "2026-07-21",
      time: "09:00",
      location: "Grundstück Starnberg",
      attendees: ["Stefan Berger"]
    }
  },
  {
    id: "project_calendar_permit_deadline",
    type: "calendar",
    content: "Bauantrag Einreichung Deadline Freitag Gemeinde Starnberg Abgabe Frist Baugenehmigung",
    entities: { places: ["Starnberg"], dates: ["2026-07-25"] },
    raw_ref: {
      type: "calendar_event",
      title: "Bauantrag — Abgabe Gemeinde",
      date: "2026-07-25",
      location: "Gemeinde Starnberg",
      attendees: []
    }
  },

  // Sketches / Images
  {
    id: "project_sketch_grundriss",
    type: "images",
    content: "Handskizze Grundriss Erdgeschoss Raumaufteilung Wohnzimmer Kueche Schlafzimmer Konzept",
    entities: {},
    raw_ref: {
      type: "sketch",
      title: "Grundriss EG — Konzeptskizze"
    }
  },
  {
    id: "project_sketch_fassade",
    type: "images",
    content: "Skizze Suedansicht Fassade Klinker Fensteranordnung Dachneigung Entwurf Ansicht",
    entities: {},
    raw_ref: {
      type: "sketch",
      title: "Südansicht — Fassadenskizze"
    }
  },
  {
    id: "project_sketch_schnitt",
    type: "images",
    content: "Querschnitt Schnitt Gebaeude Dachstuhl Keller Hanggrundstück Raumhoehen Konstruktion",
    entities: {},
    raw_ref: {
      type: "sketch",
      title: "Schnitt A-A — Querschnitt"
    }
  },

  // Contacts
  {
    id: "project_contact_hoffmann",
    type: "contacts",
    content: "Klaus Hoffmann Bauherr Auftraggeber Klient Starnberg Kontakt Telefon",
    entities: { people: ["Klaus Hoffmann"] },
    raw_ref: {
      type: "contact",
      name: "Klaus Hoffmann",
      role: "Bauherr",
      phone: "+49 8151 4521 88",
      email: "k.hoffmann@example.de"
    }
  },
  {
    id: "project_contact_stefan",
    type: "contacts",
    content: "Stefan Berger Tragwerksplaner Statiker Ingenieur Kontakt Muenchen Buero",
    entities: { people: ["Stefan Berger"] },
    raw_ref: {
      type: "contact",
      name: "Stefan Berger",
      role: "Tragwerksplaner",
      phone: "+49 89 3321 7700",
      email: "berger@tragwerk-muenchen.de"
    }
  }
]
