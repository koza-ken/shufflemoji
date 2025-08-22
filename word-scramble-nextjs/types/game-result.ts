export interface CorrectAnswer {
  word: string
  timeTaken: number
  answeredAt: string
}

export interface IncorrectAnswer {
  word: string
  userAnswer: string
  timeTaken: number
  answeredAt: string
}

export type GameEndReason = 'timeout' | 'wrong_answer' | 'completed'

export interface GameResultData {
  guestName?: string // 未登録ユーザーの場合のみ
  mode: 'HTML_CSS' | 'RUBY' | 'FE'
  score: number
  correctAnswers: CorrectAnswer[]
  incorrectAnswer?: IncorrectAnswer
  gameEndReason: GameEndReason
}

export interface GameRecord {
  id: string
  userId?: string
  guestName?: string
  mode: 'HTML_CSS' | 'RUBY' | 'FE'
  score: number
  correctAnswers: CorrectAnswer[]
  incorrectAnswer?: IncorrectAnswer
  gameEndReason: GameEndReason
  playedAt: Date
}

export interface GameStats {
  totalGames: number
  htmlCssGames: number
  rubyGames: number
  feGames: number
  bestHtmlCssScore: number
  bestRubyScore: number
  bestFeScore: number
  averageScore: number
}

export interface RankingEntry {
  id: string
  userName: string  // username または guestName
  score: number
  playedAt: Date
  mode: 'HTML_CSS' | 'RUBY' | 'FE'
}

export interface RankingResponse {
  htmlCssRanking: RankingEntry[]
  rubyRanking: RankingEntry[]
  feRanking: RankingEntry[]
}