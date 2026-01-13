export interface Project {
  id: number
  period: string
  year: number
  month: string
  name: string
  client: string
  category: ProjectCategory
}

export type ProjectCategory = 
  | 'tv'        // TV-Produktionen (BR, ZDF, Sport1, etc.)
  | 'streaming' // Streaming (Netflix, Paramount+, etc.)
  | 'corporate' // Firmenevents (BMW, Audi, MAN, etc.)
  | 'event'     // Gala, Messe, Konzert
  | 'film'      // Filmproduktionen

export interface CareerMilestone {
  year: number
  title: string
  description: string
  type: 'education' | 'work' | 'milestone'
}

export interface Skill {
  name: string
  category: SkillCategory
  tools?: string[]
}

export type SkillCategory = 
  | 'projektleitung'
  | 'video'
  | 'licht'
  | 'netzwerk'
  | 'software'
