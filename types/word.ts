// Game word and character type definitions

/**
 * Word data structure for the scramble game
 */
export type Word = {
  id: string;
  original: string;      // Correct word/term (e.g., "div")
  mode: 'html-css' | 'ruby' | 'fe';
  category?: string;     // e.g., 'html-elements', 'css-properties', 'ruby-enumerable'
  hint?: string;         // Optional hint text (e.g., "HTMLで区切りを作る要素")
  fullName?: string;     // Full name for abbreviations (FE mode only)
  fullNameJa?: string;   // Japanese full name for abbreviations (FE mode only)
}

export type GameWord = Word & {
  scrambled: string;     // Dynamically generated scrambled version
}

/**
 * Game mode types
 */
export type GameMode = 'html-css' | 'ruby' | 'fe';

export type AllChars = {
  char: string;
  id: string;
  isSelected: boolean;
}

export interface SelectedChars {
  char: string;
  id: string;
}

export type QuestionList = GameWord[];

/**
 * Game result for database storage
 */
export interface GameResult {
  streak: number;
  mode: 'html-css' | 'ruby' | 'fe';
  totalTime: number;
  completedAt: Date;
  wordsCompleted: Word[];
}