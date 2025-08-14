import { GameWord, Word } from '@/types/word';

/**
 * 単語をランダムにシャッフルする関数
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

/**
 * Ruby methods and concepts for the scramble game
 */
export const rubyMethods: Word[] = [
  // Array Methods
  {
    id: 'map-1',
    original: 'map',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の各要素に対してブロック内の処理を実行し、その結果を新しい配列として返すイテレータメソッド'
  },
  {
    id: 'each-1',
    original: 'each',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列やハッシュの各要素に対してブロック内の処理を実行する基本的な繰り返し処理メソッド'
  },
  {
    id: 'select-1',
    original: 'select',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ブロック内の条件式がtrueを返す要素だけを抜き出して新しい配列を作成するフィルタメソッド'
  },
  {
    id: 'reject-1',
    original: 'reject',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ブロック内の条件式がfalseを返す要素だけを抜き出してselectの逆の動作をするメソッド'
  },
  {
    id: 'find-1',
    original: 'find',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ブロック内の条件式がtrueになる最初の要素を発見して返すサーチメソッド（detectとも呼ばれる）'
  },
  {
    id: 'reduce-1',
    original: 'reduce',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素を順次処理して一つの値に集約する累積演算メソッド（injectとも呼ばれる）'
  },

  // String Methods
  {
    id: 'gsub-1',
    original: 'gsub',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内の指定したパターン（正規表現や文字列）にマッチする全ての箇所を新しい文字列に置換するメソッド'
  },
  {
    id: 'downcase-1',
    original: 'downcase',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内のアルファベットの大文字をすべて小文字に変換した新しい文字列を返すメソッド'
  },
  {
    id: 'upcase-1',
    original: 'upcase',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内のアルファベットの小文字をすべて大文字に変換した新しい文字列を返すメソッド'
  },
  {
    id: 'strip-1',
    original: 'strip',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列の先頭と末尾にある空白文字（スペース、タブ、改行など）を取り除いた新しい文字列を返すメソッド'
  },
  {
    id: 'split-1',
    original: 'split',
    mode: 'ruby',
    category: 'ruby',
    hint: '指定した区切り文字やパターンで文字列を分割し、分割された部分文字列を要素とする配列を返すメソッド'
  },
  {
    id: 'chomp-1',
    original: 'chomp',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列の末尾にある改行文字（\nや\r\n）を一つだけ取り除いた新しい文字列を返すメソッド'
  },

  // Hash Methods
  {
    id: 'keys-1',
    original: 'keys',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュ（連想配列）に含まれるすべてのキーを配列の形で取得できるメソッド'
  },
  {
    id: 'values-1',
    original: 'values',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュ（連想配列）に含まれるすべての値を配列の形で取得できるメソッド'
  },
  {
    id: 'merge-1',
    original: 'merge',
    mode: 'ruby',
    category: 'ruby',
    hint: '元のハッシュに別のハッシュの内容を結合して新しいハッシュを作成するメソッド（重複キーは後者が優先）'
  },

  // Additional Ruby Methods (Part 1: Basic Collection Methods)
  {
    id: 'length-1',
    original: 'length',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列や文字列、ハッシュなどのコレクションオブジェクトの要素数や文字数を取得するメソッド'
  },
  {
    id: 'empty-1',
    original: 'empty',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列、文字列、ハッシュが空（要素数が0）かどうかを判定してtrueまたはfalseを返すメソッド'
  },
  {
    id: 'include-1',
    original: 'include',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列や文字列に指定した値や文字列が含まれているかどうかを判定するメソッド'
  },
  {
    id: 'times-1',
    original: 'times',
    mode: 'ruby',
    category: 'ruby',
    hint: '数値オブジェクトに対して指定した回数だけブロック内の処理を繰り返し実行するメソッド'
  },
  {
    id: 'size-1',
    original: 'size',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列、文字列、ハッシュの要素数や文字数を返すメソッド（lengthの別名）'
  },
  {
    id: 'first-1',
    original: 'first',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の最初の要素を取得するメソッド（引数で複数個も指定可能）'
  },
  {
    id: 'last-1',
    original: 'last',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の最後の要素を取得するメソッド（引数で複数個も指定可能）'
  },
  {
    id: 'push-1',
    original: 'push',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の末尾に要素を追加するメソッド（<<演算子と同じ動作）'
  },
  {
    id: 'pop-1',
    original: 'pop',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の末尾の要素を取り出して削除するメソッド（スタック操作）'
  },
  {
    id: 'shift-1',
    original: 'shift',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の先頭の要素を取り出して削除するメソッド（キュー操作）'
  },
  {
    id: 'unshift-1',
    original: 'unshift',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の先頭に要素を追加するメソッド（shiftの逆操作）'
  },
  {
    id: 'join-1',
    original: 'join',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素を指定した区切り文字で連結して一つの文字列を作成するメソッド'
  },
  {
    id: 'reverse-1',
    original: 'reverse',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列や文字列の要素順序を逆転させた新しいオブジェクトを返すメソッド'
  },
  {
    id: 'sort-1',
    original: 'sort',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素を昇順にソートした新しい配列を返すメソッド'
  },
  {
    id: 'uniq-1',
    original: 'uniq',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列から重複した要素を除去してユニークな要素のみの新しい配列を返すメソッド'
  },
  {
    id: 'flatten-1',
    original: 'flatten',
    mode: 'ruby',
    category: 'ruby',
    hint: '多次元配列を一次元配列に平坦化した新しい配列を返すメソッド'
  },
  {
    id: 'compact-1',
    original: 'compact',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列からnil要素を除去した新しい配列を返すメソッド'
  },

  // Part 2: String Methods Extended
  {
    id: 'sub-1',
    original: 'sub',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内で最初にマッチしたパターンのみを置換するメソッド（gsubの単発版）'
  },
  {
    id: 'start_with-1',
    original: 'start_with',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列が指定した文字列で始まるかどうかを判定するメソッド'
  },
  {
    id: 'end_with-1',
    original: 'end_with',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列が指定した文字列で終わるかどうかを判定するメソッド'
  },
  {
    id: 'slice-1',
    original: 'slice',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列や配列の指定した位置や範囲の部分を切り出すメソッド'
  },
  {
    id: 'match-1',
    original: 'match',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列が正規表現パターンにマッチするかを調べてMatchDataオブジェクトを返すメソッド'
  },
  {
    id: 'scan-1',
    original: 'scan',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列から正規表現にマッチする全ての部分を配列として抽出するメソッド'
  },
  {
    id: 'capitalize-1',
    original: 'capitalize',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列の最初の文字を大文字に、残りを小文字にした新しい文字列を返すメソッド'
  },
  {
    id: 'chars-1',
    original: 'chars',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列を一文字ずつに分割して文字の配列として返すメソッド'
  },
  {
    id: 'lines-1',
    original: 'lines',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列を行ごとに分割して各行を要素とする配列を返すメソッド'
  },
  {
    id: 'tr-1',
    original: 'tr',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内の指定した文字を別の文字に変換するメソッド（文字の対応表による変換）'
  },
  {
    id: 'squeeze-1',
    original: 'squeeze',
    mode: 'ruby',
    category: 'ruby',
    hint: '文字列内の連続する同じ文字を一つにまとめた新しい文字列を返すメソッド'
  },

  // Part 3: Numeric Methods
  {
    id: 'abs-1',
    original: 'abs',
    mode: 'ruby',
    category: 'ruby',
    hint: '数値の絶対値を返すメソッド（負数の場合は正数に変換）'
  },
  {
    id: 'round-1',
    original: 'round',
    mode: 'ruby',
    category: 'ruby',
    hint: '浮動小数点数を指定した桁数で四捨五入した値を返すメソッド'
  },
  {
    id: 'ceil-1',
    original: 'ceil',
    mode: 'ruby',
    category: 'ruby',
    hint: '浮動小数点数を切り上げて最も近い大きい整数を返すメソッド'
  },
  {
    id: 'floor-1',
    original: 'floor',
    mode: 'ruby',
    category: 'ruby',
    hint: '浮動小数点数を切り下げて最も近い小さい整数を返すメソッド'
  },
  {
    id: 'zero-1',
    original: 'zero',
    mode: 'ruby',
    category: 'ruby',
    hint: '数値が0かどうかを判定してtrueまたはfalseを返すメソッド'
  },
  {
    id: 'to_s-2',
    original: 'to_s',
    mode: 'ruby',
    category: 'ruby',
    hint: '数値を文字列に変換するメソッド（基数指定も可能）'
  },
  {
    id: 'between-1',
    original: 'between',
    mode: 'ruby',
    category: 'ruby',
    hint: '値が指定した範囲内にあるかどうかを判定するメソッド'
  },
  {
    id: 'even-1',
    original: 'even',
    mode: 'ruby',
    category: 'ruby',
    hint: '整数が偶数かどうかを判定してtrueまたはfalseを返すメソッド'
  },
  {
    id: 'odd-1',
    original: 'odd',
    mode: 'ruby',
    category: 'ruby',
    hint: '整数が奇数かどうかを判定してtrueまたはfalseを返すメソッド'
  },
  {
    id: 'sample-1',
    original: 'sample',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列からランダムに要素を選択して返すメソッド（複数個の指定も可能）'
  },
  {
    id: 'shuffle-1',
    original: 'shuffle',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素をランダムに並び替えた新しい配列を返すメソッド'
  },
  {
    id: 'zip-1',
    original: 'zip',
    mode: 'ruby',
    category: 'ruby',
    hint: '複数の配列を組み合わせて、対応する位置の要素をまとめた配列の配列を作成するメソッド'
  },
  {
    id: 'transpose-1',
    original: 'transpose',
    mode: 'ruby',
    category: 'ruby',
    hint: '二次元配列の行と列を入れ替えた新しい配列を返すメソッド'
  },
  {
    id: 'cycle-1',
    original: 'cycle',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素を指定回数だけ繰り返しながらブロックを実行するメソッド'
  },

  // Part 4: Hash Methods Extended
  {
    id: 'fetch-1',
    original: 'fetch',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュから指定したキーの値を取得し、存在しない場合はデフォルト値を返すメソッド'
  },
  {
    id: 'key-1',
    original: 'key',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュで指定した値に対応するキーを返すメソッド'
  },
  {
    id: 'default-1',
    original: 'default',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュでキーが見つからない場合に返すデフォルト値を設定・取得するメソッド'
  },
  {
    id: 'delete-1',
    original: 'delete',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュや配列から指定したキーや値を削除して、その値を返すメソッド'
  },
  {
    id: 'clear-1',
    original: 'clear',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュや配列のすべての要素を削除して空にするメソッド'
  },
  {
    id: 'invert-1',
    original: 'invert',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ハッシュのキーと値を入れ替えた新しいハッシュを返すメソッド'
  },

  // Part 5: Flow Control and Loops
  {
    id: 'while-1',
    original: 'while',
    mode: 'ruby',
    category: 'ruby',
    hint: '条件式がtrueの間、繰り返し処理を実行するループ制御構造のキーワード'
  },
  {
    id: 'until-1',
    original: 'until',
    mode: 'ruby',
    category: 'ruby',
    hint: '条件式がfalseの間、繰り返し処理を実行するループ制御構造のキーワード'
  },
  {
    id: 'for-1',
    original: 'for',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列や範囲オブジェクトの各要素に対して繰り返し処理を実行するループのキーワード'
  },
  {
    id: 'break-1',
    original: 'break',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ループやブロックから即座に抜け出すための制御キーワード'
  },
  {
    id: 'next-2',
    original: 'next',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ループの現在の繰り返しをスキップして次の繰り返しに進むキーワード'
  },
  {
    id: 'return-1',
    original: 'return',
    mode: 'ruby',
    category: 'ruby',
    hint: 'メソッドから値を返して処理を終了するキーワード'
  },
  {
    id: 'yield-1',
    original: 'yield',
    mode: 'ruby',
    category: 'ruby',
    hint: 'メソッド内で渡されたブロックを実行するキーワード'
  },

  // Part 6: Object and Class Methods
  {
    id: 'new-1',
    original: 'new',
    mode: 'ruby',
    category: 'ruby',
    hint: 'クラスから新しいインスタンス（オブジェクト）を生成するメソッド'
  },
  {
    id: 'initialize-1',
    original: 'initialize',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクト生成時に自動的に呼ばれるコンストラクタメソッド'
  },
  {
    id: 'self-1',
    original: 'self',
    mode: 'ruby',
    category: 'ruby',
    hint: '現在のオブジェクト自身を参照するキーワード'
  },
  {
    id: 'super-1',
    original: 'super',
    mode: 'ruby',
    category: 'ruby',
    hint: '親クラスの同名メソッドを呼び出すキーワード'
  },
  {
    id: 'attr_accessor-1',
    original: 'attr_accessor',
    mode: 'ruby',
    category: 'ruby',
    hint: 'インスタンス変数の読み書き両方のアクセサメソッドを自動生成するメソッド'
  },
  {
    id: 'private-1',
    original: 'private',
    mode: 'ruby',
    category: 'ruby',
    hint: 'メソッドをプライベート（クラス内部からのみアクセス可能）にするキーワード'
  },
  {
    id: 'require-1',
    original: 'require',
    mode: 'ruby',
    category: 'ruby',
    hint: '外部ライブラリやファイルを読み込むメソッド（一度だけ読み込み）'
  },
  {
    id: 'load-1',
    original: 'load',
    mode: 'ruby',
    category: 'ruby',
    hint: 'ファイルを毎回読み込むメソッド（requireとは異なり重複読み込み可能）'
  },
  {
    id: 'puts-1',
    original: 'puts',
    mode: 'ruby',
    category: 'ruby',
    hint: '値を標準出力に表示し、末尾に改行を追加するメソッド'
  },
  {
    id: 'print-1',
    original: 'print',
    mode: 'ruby',
    category: 'ruby',
    hint: '値を標準出力に表示するメソッド（改行なし）'
  },

  // Part 7: Type Checking and Conversion
  {
    id: 'is_a-1',
    original: 'is_a',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトが指定したクラスのインスタンスかどうかを判定するメソッド'
  },
  {
    id: 'nil-1',
    original: 'nil',
    mode: 'ruby',
    category: 'ruby',
    hint: '値が存在しないことを表すRubyの特別な値（オブジェクト）'
  },
  {
    id: 'true-1',
    original: 'true',
    mode: 'ruby',
    category: 'ruby',
    hint: '真偽値の真を表すRubyの基本的なオブジェクト'
  },
  {
    id: 'respond_to-1',
    original: 'respond_to',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトが指定したメソッドに応答できるかどうかを判定するメソッド'
  },
  {
    id: 'to_s-1',
    original: 'to_s',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトを文字列表現に変換するメソッド'
  },
  {
    id: 'to_i-1',
    original: 'to_i',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトを整数に変換するメソッド'
  },
  {
    id: 'to_f-1',
    original: 'to_f',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトを浮動小数点数に変換するメソッド'
  },
  {
    id: 'to_a-1',
    original: 'to_a',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトを配列に変換するメソッド'
  },
  {
    id: 'to_h-1',
    original: 'to_h',
    mode: 'ruby',
    category: 'ruby',
    hint: 'オブジェクトをハッシュに変換するメソッド'
  },

  // Part 8: Advanced Enumerable Methods
  {
    id: 'count-1',
    original: 'count',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列内の要素数を数えるメソッド（条件指定も可能）'
  },
  {
    id: 'any-1',
    original: 'any',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素のいずれかがブロックの条件を満たすかどうかを判定するメソッド'
  },
  {
    id: 'all-1',
    original: 'all',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列のすべての要素がブロックの条件を満たすかどうかを判定するメソッド'
  },
  {
    id: 'none-1',
    original: 'none',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素がいずれもブロックの条件を満たさないかどうかを判定するメソッド'
  },
  {
    id: 'one-1',
    original: 'one',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素のうち、ちょうど一つだけがブロックの条件を満たすかどうかを判定するメソッド'
  },
  {
    id: 'max-1',
    original: 'max',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素の中から最大値を返すメソッド'
  },
  {
    id: 'min-1',
    original: 'min',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素の中から最小値を返すメソッド'
  },
  {
    id: 'false-1',
    original: 'false',
    mode: 'ruby',
    category: 'ruby',
    hint: '真偽値の偽を表すRubyの基本的なオブジェクト'
  },
  {
    id: 'sum-1',
    original: 'sum',
    mode: 'ruby',
    category: 'ruby',
    hint: '配列の要素の合計値を計算するメソッド'
  }
];

/**
 * Get a random Ruby method
 */
export const getRandomRubyMethod = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * rubyMethods.length);
  const word = rubyMethods[randomIndex];

  return {
    ...word,
    scrambled: scrambleWord(word.original),
  };
};