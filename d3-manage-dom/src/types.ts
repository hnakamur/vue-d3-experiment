export type YearRank = {
  year: number
  rank: number
  percentage_question: number
}

export type Experience = {
  id: string
  name: string
  user_count: number
  retention_percentage: number
  usage: YearRank[]
  awareness: YearRank[]
  interest: YearRank[]
  satisfaction: YearRank[]
}

export type ChartData = {
  ids: string[]
  years: number[]
  experience: Experience[]
}

export type RankingFilter = {
  id: string
  label: string
}
