export interface Project {
  id: number
  period: string
  year: number
  month: string
  name: string
  client: string
}

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

export interface FocusArea {
  id: string
  title: string
  description: string
  tags: string[]
  icon: 'projektleitung' | 'video' | 'licht' | 'netzwerk' | 'software'
}
