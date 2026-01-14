import type { CareerMilestone, Skill, FocusArea } from '../types'

export const careerMilestones: CareerMilestone[] = [
  {
    year: 2004,
    title: 'Einstieg in die Eventbranche',
    description: 'Erste Helfertätigkeiten in der Technikgruppe des Josef Effner Gymnasiums. Selbstständiges Lernen in der Veranstaltungstechnik, hauptsächlich Licht und Ton.',
    type: 'education'
  },
  {
    year: 2006,
    title: 'Vom Helfer zum Techniker',
    description: 'Ehrenamtliche Tätigkeiten als Techniker bei Benefizveranstaltungen und in örtlichen Vereinen. Weiterentwicklung in die Gewerke Video und Rigging sowie Erfahrungen als Lichtpult- und Tonpult Operator.',
    type: 'work'
  },
  {
    year: 2010,
    title: 'Gründung TD-VT',
    description: 'Professionalisierung durch Gründung der Firma "Tobias Daschner - Veranstaltungstechnik". \nFortan Arbeit als freier Techniker und Operator.',
    type: 'milestone'
  },
  {
    year: 2011,
    title: 'Abitur & Ausbildungsbeginn',
    description: 'Mai 2011: Abitur am Josef Effner Gymnasium. September 2011: Beginn der Ausbildung zur Fachkraft für Veranstaltungstechnik bei Plazamedia TV & Film Produktion.',
    type: 'education'
  },
  {
    year: 2014,
    title: 'Ausbildungsabschluss',
    description: 'Abschluss der Ausbildung zur Fachkraft für Veranstaltungstechnik. Erweiterung der Fähigkeiten in Kameratechnik, Broadcasttechnik, IT-Infrastrukturen und Filmproduktionen.',
    type: 'education'
  },
  {
    year: 2014,
    title: 'Festanstellung Plazamedia',
    description: 'Festanstellung bei Plazamedia mit Erweiterung der Fähigkeiten in Richtung Projektleitung, Videooperator und Lichtsetzer.',
    type: 'work'
  },
  {
    year: 2019,
    title: 'Technischer Projektleiter Studio / Event',
    description: 'Festanstellung als Technischer Projektleiter bei Plazamedia. Beteiligung bei der Entwicklung von Systemen für Augmented Reality und Extended Reality im Zusammenspiel von LED-Wänden und Mehrkamera Livebetrieb.',
    type: 'milestone'
  }
]

export const skills: Skill[] = [
  {
    name: 'Projektleitung',
    category: 'projektleitung',
    tools: ['Kalkulationen', 'Kundenbetreuung', 'Gesamtprojektleitung', 'Technische Planung']
  },
  {
    name: 'CAD & Planung',
    category: 'software',
    tools: ['Vectorworks', 'ConnectCAD']
  },
  {
    name: 'Netzwerktechnik',
    category: 'netzwerk',
    tools: ['Cisco', 'HP', 'Luminex', 'Unifi']
  },
  {
    name: 'Videomischer',
    category: 'video',
    tools: ['Ascender', 'Aquilon', 'E2']
  },
  {
    name: 'Videoserver',
    category: 'video',
    tools: ['Watchout', 'Pixera']
  },
  {
    name: 'AR/XR Systeme',
    category: 'video',
    tools: ['LED-Wände', 'Mehrkamera Livebetrieb', 'Extended Reality']
  }
]

export const personalInfo = {
  name: 'Tobias Daschner',
  title: 'Projektleitung',
  phone: '+49 174 1524683',
  email: 'tobias.daschner@td-vt.de',
  portrait: '/portrait.png'
}

// Aktuelle Schwerpunkte - bewerbungsrelevant und outcome-orientiert
export const focusAreas: FocusArea[] = [
  {
    id: 'projektleitung',
    title: 'Projektleitung',
    description: 'Gesamtverantwortung für komplexe TV- und Eventproduktionen – von der Planung bis zur erfolgreichen Umsetzung.',
    tags: ['Gesamtprojektleitung', 'Technische Planung', 'Kalkulation', 'Kundenbetreuung'],
    icon: 'projektleitung'
  },
  {
    id: 'software',
    title: 'Software & CAD',
    description: 'Professionelle Planung und Visualisierung technischer Setups.',
    tags: ['Vectorworks', 'ConnectCAD', 'Signalfluss-Planung'],
    icon: 'software'
  },
  {
    id: 'netzwerk',
    title: 'Netzwerktechnik',
    description: 'Design, Aufbau und Administration stabiler (Broadcast-) Netzwerke.',
    tags: ['Cisco', 'HP', 'Luminex', 'Unifi'],
    icon: 'netzwerk'
  },
  {
    id: 'video',
    title: 'Video & Medientechnik',
    description: 'Steuerung von Video-Mischern und Medienservern auf Events und für TV.',
    tags: ['Ascender', 'Aquilon', 'E2', 'Watchout', 'Pixera'],
    icon: 'video'
  },
]
