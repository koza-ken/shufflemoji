import { Word, GameWord } from '../types/word';

/**
 * HTML/CSS terms database for the scramble game
 * 
 * なぜこのファイルが必要？
 * - ゲームの問題データを一箇所で管理
 * - Word型を適用してデータ構造を統一
 * - 複数コンポーネントから参照可能
 * - 問題の追加・修正が容易
 */

/**
 * 単語をランダムにシャッフルする関数
 * なぜこの関数が必要？
 * - 毎回異なる並び順で再プレイ性向上
 * - 手動でscrambledを考える手間を削減
 * - 統一的なアルゴリズムで一貫性確保
 */
const scrambleWord = (word: string): string => {
  const letters = word.split('');
  
  // Fisher-Yates shuffle algorithm
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  
  const scrambled = letters.join('');
  
  // 元の単語と同じになった場合は再シャッフル
  if (scrambled === word && word.length > 2) {
    return scrambleWord(word);
  }
  
  return scrambled;
};
export const htmlCssTerms: Word[] = [
  // HTML Elements
  {
    id: 'div-1',
    original: 'div',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTMLで最もよく使われるブロック要素。コンテンツをグループ化してレイアウトを作ったり、CSSでスタイリングするための汎用的なコンテナとして利用される。'
  },
  {
    id: 'span-1',
    original: 'span',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTMLのインライン要素で、文章の一部分だけにスタイルを適用したい時に使用する。改行されることなく文章の流れの中に配置される汎用的なコンテナ。'
  },
  {
    id: 'img-1',
    original: 'img',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'Webページに画像を表示するための要素。srcで画像ファイルのパスを指定し、altで代替テキストを設定することでアクセシビリティも向上させる。'
  },
  {
    id: 'h1-1',
    original: 'h1',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTMLの見出し要素の中で最も重要度が高いもの。ページの主タイトルに使用され、SEOや文書構造の観点から1ページに1つだけ使うのが推奨される。'
  },
  {
    id: 'header-1',
    original: 'header',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTML5で追加されたセマンティック要素。ページやセクションの導入部分を表し、ナビゲーションやサイトロゴなどを配置することが多い。'
  },
  {
    id: 'section-1',
    original: 'section',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTML5のセマンティック要素で、文書の論理的な区切りを表す。一般的に見出しとともに使用され、関連するコンテンツをグループ化する。'
  },
  {
    id: 'article-1',
    original: 'article',
    mode: 'html-css',
    category: 'html-elements',
    hint: 'HTML5で追加された要素で、独立して配信・再利用できるコンテンツを表す。ブログ記事、ニュース記事、フォーラムの投稿などに使用される。'
  },

  // CSS Properties
  {
    id: 'color-1',
    original: 'color',
    mode: 'html-css',
    category: 'css-properties',
    hint: 'テキストの文字色を指定するCSSプロパティ。16進数カラーコード、RGB値、色名などで指定でき、要素の前景色を変更する基本的なスタイル設定。'
  },
  {
    id: 'width-1',
    original: 'width',
    mode: 'html-css',
    category: 'css-properties',
    hint: '要素の幅を指定するCSSプロパティ。px、%、emなどの単位で指定でき、レスポンシブデザインやレイアウト調整に欠かせない基本的なプロパティ。'
  },
  {
    id: 'height-1',
    original: 'height',
    mode: 'html-css',
    category: 'css-properties',
    hint: '要素の高さを指定するCSSプロパティ。固定値やパーセンテージで指定でき、ボックス要素のサイズ調整やレイアウト設計に使用される。'
  },
  {
    id: 'margin-1',
    original: 'margin',
    mode: 'html-css',
    category: 'css-properties',
    hint: '要素の外側の余白を指定するCSSプロパティ。上下左右を個別に設定でき、要素間の間隔調整やページレイアウトの基本として重要な役割を果たす。'
  },
  {
    id: 'padding-1',
    original: 'padding',
    mode: 'html-css',
    category: 'css-properties',
    hint: '要素の内側の余白を指定するCSSプロパティ。コンテンツと境界線との間のスペースを調整し、読みやすさや見た目の改善に使用される。'
  },
  {
    id: 'display-1',
    original: 'display',
    mode: 'html-css',
    category: 'css-properties',
    hint: '要素の表示形式を指定するCSSプロパティ。block、inline、flex、gridなどの値があり、レイアウト設計の根幹を決める非常に重要なプロパティ。'
  }
];

/**
 * ランダムにHTML/CSS用語を取得（scrambled付き）
 * なぜこの関数が必要？
 * - ゲーム進行時に毎回異なる問題を出題
 * - データ取得ロジックを一箇所に集約
 * - scrambledを動的生成して再プレイ性向上
 */
export const getRandomHtmlCssTerm = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * htmlCssTerms.length);
  const word = htmlCssTerms[randomIndex];
  
  return {
    ...word,
    scrambled: scrambleWord(word.original)
  };
};