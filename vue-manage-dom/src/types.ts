export type YearRankKey = 'year' | 'rank' | 'percentage_question'

export type YearRank = {
  [key in YearRankKey]: number
}

export type ExperienceRankKey = 'usage' | 'awareness' | 'interest' | 'satisfaction'

export type Experience = {
  id: string
  name: string
  user_count: number
  retention_percentage: number
} & {
  [key in ExperienceRankKey]: YearRank[]
}

export type ChartData = {
  ids: string[]
  years: number[]
  experience: Experience[]
}

export type RankingFilter = {
  id: ExperienceRankKey
  label: string
}

export type Awareness = {
  id: string
  name: string
  awareness_percentage: number
}
