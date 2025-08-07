// 変数に適用する型を定義している

/**
 * Word data structure for the scramble game
 */
export type Word = {
  id: string;
  original: string;      // Correct word/term (e.g., "div")
  mode: 'html-css' | 'ruby';
  category?: string;     // e.g., 'html-elements', 'css-properties', 'ruby-enumerable'
  hint?: string;         // Optional hint text (e.g., "HTMLで区切りを作る要素")
}

export type GameWord = Word & {
  scrambled: string;     // Dynamically generated scrambled version
}

/**
 * Game mode types
 */
export type GameMode = 'html-css' | 'ruby';