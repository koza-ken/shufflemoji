import { GameWord, Word } from '../types/word';

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
    category: 'HTML',
    hint: 'HTMLで最もよく使われるブロック要素。コンテンツをグループ化してレイアウトを作ったり、CSSでスタイリングするための汎用的なコンテナとして利用される。',
  },
  {
    id: 'span-1',
    original: 'span',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTMLのインライン要素で、文章の一部分だけにスタイルを適用したい時に使用する。改行されることなく文章の流れの中に配置される汎用的なコンテナ。',
  },
  {
    id: 'img-1',
    original: 'img',
    mode: 'html-css',
    category: 'HTML',
    hint: 'Webページに画像を表示するための要素。srcで画像ファイルのパスを指定し、altで代替テキストを設定することでアクセシビリティも向上させる。',
  },
  {
    id: 'h1-1',
    original: 'h1',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTMLの見出し要素の中で最も重要度が高いもの。ページの主タイトルに使用され、SEOや文書構造の観点から1ページに1つだけ使うのが推奨される。',
  },
  {
    id: 'header-1',
    original: 'header',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加されたセマンティック要素。ページやセクションの導入部分を表し、ナビゲーションやサイトロゴなどを配置することが多い。',
  },
  {
    id: 'section-1',
    original: 'section',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5のセマンティック要素で、文書の論理的な区切りを表す。一般的に見出しとともに使用され、関連するコンテンツをグループ化する。',
  },
  {
    id: 'article-1',
    original: 'article',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加された要素で、独立して配信・再利用できるコンテンツを表す。ブログ記事、ニュース記事、フォーラムの投稿などに使用される。',
  },
  {
    id: 'nav-1',
    original: 'nav',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5のセマンティック要素で、ナビゲーションリンクのグループを表す。サイト内メニューやパンくずリストなどに使用される。',
  },
  {
    id: 'footer-1',
    original: 'footer',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加された要素で、ページやセクションの末尾を表す。著作権情報、連絡先、関連リンクなどを配置することが多い。',
  },
  {
    id: 'aside-1',
    original: 'aside',
    mode: 'html-css',
    category: 'HTML',
    hint: 'メインコンテンツと間接的に関連する補助的な内容を表すHTML5要素。サイドバーや広告、関連記事などに使用される。',
  },
  {
    id: 'main-1',
    original: 'main',
    mode: 'html-css',
    category: 'HTML',
    hint: 'ページの主要なコンテンツを表すHTML5要素。ページ内で一つだけ使用し、文書の中心的な内容を示すためのセマンティック要素。',
  },
  {
    id: 'figure-1',
    original: 'figure',
    mode: 'html-css',
    category: 'HTML',
    hint: '画像、図表、コードなどの独立したコンテンツを表すHTML5要素。figcaptionと組み合わせてキャプション付きのコンテンツを作成する。',
  },
  {
    id: 'figcaption-1',
    original: 'figcaption',
    mode: 'html-css',
    category: 'HTML',
    hint: 'figure要素内でキャプション（説明文）を表すHTML5要素。画像や図表の説明文を意味的に関連付けるために使用される。',
  },
  {
    id: 'summary-1',
    original: 'summary',
    mode: 'html-css',
    category: 'HTML',
    hint: 'details要素と組み合わせて使用され、折りたたみ可能なコンテンツの見出しを表すHTML5要素。クリックで詳細を表示・非表示できる。',
  },
  {
    id: 'details-1',
    original: 'details',
    mode: 'html-css',
    category: 'HTML',
    hint: '折りたたみ可能なコンテンツを作成するHTML5要素。summary要素と組み合わせてアコーディオンUIを実装できる。',
  },
  {
    id: 'code-1',
    original: 'code',
    mode: 'html-css',
    category: 'HTML',
    hint: 'インラインのプログラムコードを表すHTML要素。文章中のコード片やメソッド名、変数名などを意味的にマークアップする。',
  },
  {
    id: 'table-1',
    original: 'table',
    mode: 'html-css',
    category: 'HTML',
    hint: 'データを表形式で表示するHTML要素。行と列でデータを整理し、thead、tbody、tfootと組み合わせて使用される。',
  },
  {
    id: 'thead-1',
    original: 'thead',
    mode: 'html-css',
    category: 'HTML',
    hint: 'テーブルのヘッダー部分をグループ化するHTML要素。テーブルの構造を明確にし、印刷時やスクロール時のヘッダー固定に使用される。',
  },
  {
    id: 'tbody-1',
    original: 'tbody',
    mode: 'html-css',
    category: 'HTML',
    hint: 'テーブルの本体（データ部分）をグループ化するHTML要素。ヘッダーやフッターと区別してテーブル構造を整理する。',
  },
  {
    id: 'tfoot-1',
    original: 'tfoot',
    mode: 'html-css',
    category: 'HTML',
    hint: 'テーブルのフッター部分をグループ化するHTML要素。合計値や総計などの要約情報を配置することが多い。',
  },
  {
    id: 'form-1',
    original: 'form',
    mode: 'html-css',
    category: 'HTML',
    hint: 'ユーザーからの入力を受け付けるフォームを作成するHTML要素。input、textarea、selectなどと組み合わせて使用される。',
  },
  {
    id: 'input-1',
    original: 'input',
    mode: 'html-css',
    category: 'HTML',
    hint: 'フォーム内で様々な種類の入力フィールドを作成するHTML要素。type属性でtext、email、passwordなどの入力タイプを指定できる。',
  },
  {
    id: 'button-1',
    original: 'button',
    mode: 'html-css',
    category: 'HTML',
    hint: 'クリック可能なボタンを作成するHTML要素。フォームの送信や JavaScript のイベント実行などに使用される。',
  },
  {
    id: 'textarea-1',
    original: 'textarea',
    mode: 'html-css',
    category: 'HTML',
    hint: '複数行のテキスト入力を可能にするHTML要素。コメントや長いメッセージの入力欄として使用される。',
  },
  {
    id: 'select-1',
    original: 'select',
    mode: 'html-css',
    category: 'HTML',
    hint: 'ドロップダウンリストを作成するHTML要素。option要素と組み合わせて、複数の選択肢から一つを選ぶインターフェースを提供する。',
  },
  {
    id: 'option-1',
    original: 'option',
    mode: 'html-css',
    category: 'HTML',
    hint: 'select要素内の選択肢を表すHTML要素。value属性で選択時の値を指定し、表示テキストを内容として記述する。',
  },
  {
    id: 'label-1',
    original: 'label',
    mode: 'html-css',
    category: 'HTML',
    hint: 'フォーム要素にラベルを付けるHTML要素。for属性やform要素の包含により関連付けられ、アクセシビリティを向上させる。',
  },
  {
    id: 'fieldset-1',
    original: 'fieldset',
    mode: 'html-css',
    category: 'HTML',
    hint: 'フォーム内の関連する入力要素をグループ化するHTML要素。legend要素と組み合わせてグループにタイトルを付けられる。',
  },
  {
    id: 'legend-1',
    original: 'legend',
    mode: 'html-css',
    category: 'HTML',
    hint: 'fieldset要素のタイトルを表すHTML要素。フォームのグループ化された部分に説明的な見出しを提供する。',
  },
  {
    id: 'strong-1',
    original: 'strong',
    mode: 'html-css',
    category: 'HTML',
    hint: 'テキストの重要性を示すHTML要素。デフォルトで太字に表示され、セマンティックな意味を持つ強調を表現する。',
  },
  {
    id: 'mark-1',
    original: 'mark',
    mode: 'html-css',
    category: 'HTML',
    hint: 'テキストのハイライト（蛍光ペンのような強調）を表すHTML5要素。検索結果の該当箇所や重要な部分をマークする。',
  },
  {
    id: 'time-1',
    original: 'time',
    mode: 'html-css',
    category: 'HTML',
    hint: '日付や時刻を意味的にマークアップするHTML5要素。datetime属性で機械読み取り可能な形式を指定できる。',
  },
  {
    id: 'small-1',
    original: 'small',
    mode: 'html-css',
    category: 'HTML',
    hint: '免責事項、著作権、法的注意など、サイドコメントや小さな文字で表示すべき内容を表すHTML要素。',
  },
  {
    id: 'iframe-1',
    original: 'iframe',
    mode: 'html-css',
    category: 'HTML',
    hint: '他のWebページやコンテンツをページ内に埋め込むHTML要素。YouTube動画やGoogleマップなどの外部コンテンツ表示に使用される。',
  },
  {
    id: 'video-1',
    original: 'video',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加された動画を埋め込むための要素。controls属性で再生コントロールを表示し、複数の動画形式に対応できる。',
  },
  {
    id: 'audio-1',
    original: 'audio',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加された音声を埋め込むための要素。MP3やWAVなどの音声ファイルを再生でき、controls属性で操作ボタンを表示できる。',
  },
  {
    id: 'canvas-1',
    original: 'canvas',
    mode: 'html-css',
    category: 'HTML',
    hint: 'HTML5で追加された、JavaScriptを使って動的にグラフィックを描画するための要素。ゲームやデータ視覚化に使用される。',
  },

  // CSS Properties
  {
    id: 'color-1',
    original: 'color',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキストの文字色を指定するCSSプロパティ。16進数カラーコード、RGB値、色名などで指定でき、要素の前景色を変更する基本的なスタイル設定。',
  },
  {
    id: 'width-1',
    original: 'width',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の幅を指定するCSSプロパティ。px、%、emなどの単位で指定でき、レスポンシブデザインやレイアウト調整に欠かせない基本的なプロパティ。',
  },
  {
    id: 'height-1',
    original: 'height',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の高さを指定するCSSプロパティ。固定値やパーセンテージで指定でき、ボックス要素のサイズ調整やレイアウト設計に使用される。',
  },
  {
    id: 'margin-1',
    original: 'margin',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の外側の余白を指定するCSSプロパティ。上下左右を個別に設定でき、要素間の間隔調整やページレイアウトの基本として重要な役割を果たす。',
  },
  {
    id: 'padding-1',
    original: 'padding',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の内側の余白を指定するCSSプロパティ。コンテンツと境界線との間のスペースを調整し、読みやすさや見た目の改善に使用される。',
  },
  {
    id: 'display-1',
    original: 'display',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の表示形式を指定するCSSプロパティ。block、inline、flex、gridなどの値があり、レイアウト設計の根幹を決める非常に重要なプロパティ。',
  },
  {
    id: 'position-1',
    original: 'position',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の配置方法を指定するCSSプロパティ。static、relative、absolute、fixedなどの値があり、レイアウトの基本的な配置制御を行う。',
  },
  {
    id: 'outline-1',
    original: 'outline',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の外側に描かれる輪郭線を指定するCSSプロパティ。borderと異なりレイアウトに影響せず、フォーカス表示に使用される。',
  },
  {
    id: 'content-1',
    original: 'content',
    mode: 'html-css',
    category: 'CSS',
    hint: '疑似要素（::before、::after）で生成されるコンテンツを指定するCSSプロパティ。テキストや画像を動的に挿入できる。',
  },
  {
    id: 'resize-1',
    original: 'resize',
    mode: 'html-css',
    category: 'CSS',
    hint: 'ユーザーが要素のサイズを変更できるかどうかを制御するCSSプロパティ。textareaなどでリサイズの可否を設定する。',
  },
  {
    id: 'bottom-1',
    original: 'bottom',
    mode: 'html-css',
    category: 'CSS',
    hint: 'position指定された要素の下端位置を指定するCSSプロパティ。親要素や viewport からの距離をpxや%で指定する。',
  },
  {
    id: 'float-1',
    original: 'float',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素を左右に浮動させるCSSプロパティ。テキストの回り込みレイアウトを作成するが、現在はflexboxやgridが推奨される。',
  },
  {
    id: 'clear-1',
    original: 'clear',
    mode: 'html-css',
    category: 'CSS',
    hint: 'float要素の影響を解除するCSSプロパティ。左右または両方のfloatを解除して、新しい行から要素を配置する。',
  },
  {
    id: 'flex-1',
    original: 'flex',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxレイアウトでフレックスアイテムの伸縮を制御するCSSプロパティ。grow、shrink、basisを一括で指定できる。',
  },
  {
    id: 'grid-1',
    original: 'grid',
    mode: 'html-css',
    category: 'CSS',
    hint: 'CSS Gridレイアウトを制御するプロパティの総称。二次元レイアウトを効率的に作成できる現代的なレイアウト手法。',
  },
  {
    id: 'border-1',
    original: 'border',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の境界線を指定するCSSプロパティ。線の太さ、スタイル、色を一括で設定でき、ボックスの視覚的な境界を作成する。',
  },
  {
    id: 'background-1',
    original: 'background',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の背景を指定するCSSプロパティ。色、画像、グラデーションなどを設定でき、複数の背景プロパティを一括で指定できる。',
  },
  {
    id: 'font-1',
    original: 'font',
    mode: 'html-css',
    category: 'CSS',
    hint: 'フォント関連の複数のプロパティを一括で指定するCSSプロパティ。サイズ、ウェイト、ファミリーなどを同時に設定できる。',
  },
  {
    id: 'text-align-1',
    original: 'text-align',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキストの水平方向の配置を指定するCSSプロパティ。left、center、right、justifyなどの値で文字揃えを制御する。',
  },
  {
    id: 'vertical-align-1',
    original: 'vertical-align',
    mode: 'html-css',
    category: 'CSS',
    hint: 'インライン要素やテーブルセルの垂直方向の配置を指定するCSSプロパティ。baseline、top、middle、bottomなどで調整する。',
  },
  {
    id: 'line-height-1',
    original: 'line-height',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキストの行間を指定するCSSプロパティ。読みやすさを向上させるために適切な行間を設定し、縦方向の中央揃えにも使用される。',
  },
  {
    id: 'font-size-1',
    original: 'font-size',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキストのフォントサイズを指定するCSSプロパティ。px、em、rem、%などの単位で文字の大きさを調整する。',
  },
  {
    id: 'font-weight-1',
    original: 'font-weight',
    mode: 'html-css',
    category: 'CSS',
    hint: 'フォントの太さを指定するCSSプロパティ。normal、bold、数値（100-900）などで文字の太さを調整する。',
  },
  {
    id: 'font-family-1',
    original: 'font-family',
    mode: 'html-css',
    category: 'CSS',
    hint: '使用するフォントを指定するCSSプロパティ。複数のフォント名をカンマ区切りで指定し、フォールバックフォントも設定できる。',
  },
  {
    id: 'opacity-1',
    original: 'opacity',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の透明度を指定するCSSプロパティ。0（完全に透明）から1（完全に不透明）の値で要素の見え方を調整する。',
  },
  {
    id: 'z-index-1',
    original: 'z-index',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の重ね順を指定するCSSプロパティ。数値が大きいほど前面に表示され、position指定された要素に適用される。',
  },
  {
    id: 'overflow-1',
    original: 'overflow',
    mode: 'html-css',
    category: 'CSS',
    hint: 'コンテンツが要素をはみ出した時の表示方法を指定するCSSプロパティ。visible、hidden、scroll、autoなどの値がある。',
  },
  {
    id: 'cursor-1',
    original: 'cursor',
    mode: 'html-css',
    category: 'CSS',
    hint: 'マウスカーソルの形状を指定するCSSプロパティ。pointer、text、crosshair、not-allowedなどでユーザビリティを向上させる。',
  },
  {
    id: 'transform-1',
    original: 'transform',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の変形を指定するCSSプロパティ。回転、拡大縮小、移動、傾斜などの2D・3D変形をアニメーションと組み合わせて使用する。',
  },
  {
    id: 'transition-1',
    original: 'transition',
    mode: 'html-css',
    category: 'CSS',
    hint: 'CSSプロパティの変化をスムーズにアニメーション化するプロパティ。ホバー効果やインタラクションの際の滑らかな変化を実現する。',
  },
  {
    id: 'animation-1',
    original: 'animation',
    mode: 'html-css',
    category: 'CSS',
    hint: 'keyframesで定義したアニメーションを要素に適用するCSSプロパティ。複雑な動的効果や継続的なアニメーションを作成できる。',
  },
  {
    id: 'box-shadow-1',
    original: 'box-shadow',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素に影を追加するCSSプロパティ。X/Yオフセット、ぼかし、拡散、色を指定して立体感や奥行きを演出できる。',
  },
  {
    id: 'border-radius-1',
    original: 'border-radius',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の角を丸くするCSSプロパティ。px、%、emなどの単位で指定し、モダンなデザインや円形要素の作成に使用される。',
  },
  {
    id: 'text-decoration-1',
    original: 'text-decoration',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキストの装飾を指定するCSSプロパティ。underline、line-through、noneなどでリンクの下線除去やテキスト装飾を制御する。',
  },
  {
    id: 'list-style-1',
    original: 'list-style',
    mode: 'html-css',
    category: 'CSS',
    hint: 'リスト要素のマーカー（点や番号）をカスタマイズするCSSプロパティ。タイプ、位置、画像を一括で指定できる。',
  },
  {
    id: 'white-space-1',
    original: 'white-space',
    mode: 'html-css',
    category: 'CSS',
    hint: 'テキスト内の空白や改行の処理方法を指定するCSSプロパティ。nowrap、pre、pre-wrapなどでテキストの折り返しを制御する。',
  },
  {
    id: 'word-wrap-1',
    original: 'word-wrap',
    mode: 'html-css',
    category: 'CSS',
    hint: '長い単語が要素幅を超える場合の改行を制御するCSSプロパティ。break-wordで強制的な改行を可能にする。',
  },
  {
    id: 'visibility-1',
    original: 'visibility',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の表示・非表示を制御するCSSプロパティ。hiddenでも要素の領域は保持され、displayとは異なる動作をする。',
  },
  {
    id: 'max-width-1',
    original: 'max-width',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の最大幅を制限するCSSプロパティ。レスポンシブデザインで画像やコンテナが画面からはみ出すのを防ぐために使用される。',
  },
  {
    id: 'min-width-1',
    original: 'min-width',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の最小幅を保証するCSSプロパティ。コンテンツが少なくても一定の幅を維持したい場合に使用される。',
  },
  {
    id: 'max-height-1',
    original: 'max-height',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の最大高さを制限するCSSプロパティ。overflowと組み合わせてスクロール可能な領域を作成することが多い。',
  },
  {
    id: 'min-height-1',
    original: 'min-height',
    mode: 'html-css',
    category: 'CSS',
    hint: '要素の最小高さを保証するCSSプロパティ。コンテンツが少なくても一定の高さを維持し、レイアウトの安定性を確保する。',
  },
  {
    id: 'justify-content-1',
    original: 'justify-content',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxやgridで主軸方向のアイテム配置を指定するCSSプロパティ。center、space-between、space-aroundなどで配置を制御する。',
  },
  {
    id: 'align-items-1',
    original: 'align-items',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxやgridで交差軸方向のアイテム配置を指定するCSSプロパティ。center、flex-start、flex-endなどで垂直配置を制御する。',
  },
  {
    id: 'flex-direction-1',
    original: 'flex-direction',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxコンテナ内のアイテムの並び方向を指定するCSSプロパティ。row、column、row-reverse、column-reverseで方向を制御する。',
  },
  {
    id: 'flex-wrap-1',
    original: 'flex-wrap',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxアイテムが親要素からはみ出す場合の折り返しを制御するCSSプロパティ。wrap、nowrap、wrap-reverseで動作を指定する。',
  },
  {
    id: 'gap-1',
    original: 'gap',
    mode: 'html-css',
    category: 'CSS',
    hint: 'flexboxやgridアイテム間の間隔を指定するCSSプロパティ。marginを使わずにアイテム間のスペースを効率的に制御できる。',
  },
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
    scrambled: scrambleWord(word.original),
  };
};
