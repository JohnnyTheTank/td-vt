import type { CareerMilestone, Skill } from '../types'

export const careerMilestones: CareerMilestone[] = [
  {
    year: 2004,
    title: 'Erste Schritte',
    description: 'Erste Helfertätigkeiten in der Technikgruppe des Josef Effner Gymnasiums. Selbstständiges Lernen in der Veranstaltungstechnik, hauptsächlich Licht und Ton.',
    type: 'education'
  },
  {
    year: 2005,
    title: 'Ehrenamtliche Arbeit',
    description: 'Erste ehrenamtliche Tätigkeiten als Techniker bei Benefizveranstaltungen und in örtlichen Vereinen. Weiterentwicklung in Video, Rigging sowie als Lichtpult- und Tonpult Operator.',
    type: 'work'
  },
  {
    year: 2010,
    title: 'Gründung TD-VT',
    description: 'Professionalisierung durch Gründung der Firma TD-VT. Fortan Arbeit als freier Techniker und Operator.',
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
    title: 'Technischer Projektleiter',
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
    name: 'Lichttechnik',
    category: 'licht',
    tools: ['Grand MA 1', 'Grand MA 2', 'Grand MA 3']
  },
  {
    name: 'AR/XR Systeme',
    category: 'video',
    tools: ['LED-Wände', 'Mehrkamera Livebetrieb', 'Extended Reality']
  }
]

export const personalInfo = {
  name: 'Tobias Daschner',
  title: 'Technischer Projektleiter Studio / Event',
  phone: '0174 1524683',
  email: 'tobi@td-vt.de',
  portrait: '/portrait.png'
}
