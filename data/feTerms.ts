import { Word, GameWord } from '@/types/word'
// import { scrambleWord } from '@/utils/scrambleLogic'

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

// 基本情報技術者試験用語データベース（合計 100語）
// 3文字: 66語, 4文字: 27語, 5文字: 6語, 7文字: 1語
export const feTerms: Word[] = [
  // 3文字略語（66語）
  {
    id: 'bcp-1',
    original: 'BCP',
    mode: 'fe',
    category: 'FE',
    hint: '事業継続計画として災害時や緊急事態における事業継続戦略を策定する重要な経営手法。'
  },
  {
    id: 'bsc-1',
    original: 'BSC',
    mode: 'fe',
    category: 'FE',
    hint: '財務・顧客・業務プロセス・学習と成長の4つの視点から組織を評価する多角的経営管理手法。'
  },
  {
    id: 'cdn-1',
    original: 'CDN',
    mode: 'fe',
    category: 'FE',
    hint: '世界各地のサーバーにコンテンツを配置してユーザーに高速配信するネットワーク。'
  },
  {
    id: 'ceo-1',
    original: 'CEO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高"経営"責任者として経営方針決定や業務執行の最終責任を負う役職。'
  },
  {
    id: 'cio-1',
    original: 'CIO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高"情報"責任者としてIT戦略やシステム全体の責任を担う経営幹部。'
  },
  {
    id: 'cli-1',
    original: 'CLI',
    mode: 'fe',
    category: 'FE',
    hint: 'テキストベースでコマンドを入力してコンピュータを操作するインターフェース。'
  },
  {
    id: 'cpu-1',
    original: 'CPU',
    mode: 'fe',
    category: 'FE',
    hint: '中央処理装置としてコンピュータの演算制御を担う中核部品。プログラム実行の司令塔。'
  },
  {
    id: 'crc-1',
    original: 'CRC',
    mode: 'fe',
    category: 'FE',
    hint: '巡回冗長検査として通信やストレージにおけるデータ誤り検出方式。'
  },
  {
    id: 'crm-1',
    original: 'CRM',
    mode: 'fe',
    category: 'FE',
    hint: '顧客関係管理システムとして顧客情報を統合管理し営業活動を支援する。'
  },
  {
    id: 'csr-1',
    original: 'CSR',
    mode: 'fe',
    category: 'FE',
    hint: '企業の社会的責任として環境保護や社会貢献活動を重視する経営理念。'
  },
  {
    id: 'css-1',
    original: 'CSS',
    mode: 'fe',
    category: 'FE',
    hint: 'Webページの見た目やレイアウトをHTMLから分離して指定するスタイル記述言語。'
  },
  {
    id: 'csv-1',
    original: 'CSV',
    mode: 'fe',
    category: 'FE',
    hint: 'データをカンマで区切って表現するシンプルなファイル形式。表計算ソフトで広く使用。'
  },
  {
    id: 'ddl-1',
    original: 'DDL',
    mode: 'fe',
    category: 'FE',
    hint: 'データ定義言語としてデータベースのテーブルやインデックス構造を定義するSQL。'
  },
  {
    id: 'dml-1',
    original: 'DML',
    mode: 'fe',
    category: 'FE',
    hint: 'データ操作言語としてデータの追加・更新・削除を行うSQL文の分類。'
  },
  {
    id: 'dns-1',
    original: 'DNS',
    mode: 'fe',
    category: 'FE',
    hint: 'ドメイン名とIPアドレスを相互変換するインターネットの基盤システム。'
  },
  {
    id: 'dos-1',
    original: 'DoS',
    mode: 'fe',
    category: 'FE',
    hint: 'サーバーに大量のリクエストを送信してサービスを利用不可にするサイバー攻撃。'
  },
  {
    id: 'eai-1',
    original: 'EAI',
    mode: 'fe',
    category: 'FE',
    hint: '企業内の異なるアプリケーションシステムを統合して連携させる技術。'
  },
  {
    id: 'ecm-1',
    original: 'ECM',
    mode: 'fe',
    category: 'FE',
    hint: '企業コンテンツ管理として文書や画像などの情報資産を統合管理するシステム。'
  },
  {
    id: 'edi-1',
    original: 'EDI',
    mode: 'fe',
    category: 'FE',
    hint: '電子データ交換として企業間でビジネス文書を標準化された形式で自動交換。'
  },
  {
    id: 'erp-1',
    original: 'ERP',
    mode: 'fe',
    category: 'FE',
    hint: '企業資源計画として財務・人事・在庫などを統合管理する基幹業務システム。'
  },
  {
    id: 'etl-1',
    original: 'ETL',
    mode: 'fe',
    category: 'FE',
    hint: 'データウェアハウスにおいてデータを抽出・変換・読み込みするプロセス。'
  },
  {
    id: 'faq-1',
    original: 'FAQ',
    mode: 'fe',
    category: 'FE',
    hint: 'よくある質問集としてユーザーサポートや情報提供に活用される形式。'
  },
  {
    id: 'ftp-1',
    original: 'FTP',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上でファイルを送受信するための標準的な通信プロトコル。'
  },
  {
    id: 'gps-1',
    original: 'GPS',
    mode: 'fe',
    category: 'FE',
    hint: '人工衛星を利用して地球上の位置を正確に測定する全地球測位システム。'
  },
  {
    id: 'gpu-1',
    original: 'GPU',
    mode: 'fe',
    category: 'FE',
    hint: '画像処理専用装置として3Dグラフィックス処理やAI計算の高速化に活用される。'
  },
  {
    id: 'gui-1',
    original: 'GUI',
    mode: 'fe',
    category: 'FE',
    hint: 'アイコンやボタンなど視覚的要素を使ってコンピュータを直感的に操作するインターフェース。'
  },
  {
    id: 'hdd-1',
    original: 'HDD',
    mode: 'fe',
    category: 'FE',
    hint: '磁気ディスクを利用した大容量データ保存装置。回転する円盤にデータを記録する従来型ストレージ。'
  },
  {
    id: 'ict-1',
    original: 'ICT',
    mode: 'fe',
    category: 'FE',
    hint: '情報通信技術として情報処理と通信技術を統合した概念。'
  },
  {
    id: 'ide-1',
    original: 'IDE',
    mode: 'fe',
    category: 'FE',
    hint: 'ソースコード編集・コンパイル・デバッグ機能を統合したプログラミング環境。'
  },
  {
    id: 'iot-1',
    original: 'IoT',
    mode: 'fe',
    category: 'FE',
    hint: 'モノのインターネットとして日常の物理デバイスをネットワーク接続してデータ収集・制御を行う。'
  },
  {
    id: 'ipo-1',
    original: 'IPO',
    mode: 'fe',
    category: 'FE',
    hint: '入力・処理・出力の基本処理モデル。システム設計の基礎となる概念。'
  },
  {
    id: 'iso-1',
    original: 'ISO',
    mode: 'fe',
    category: 'FE',
    hint: '国際標準化機構として世界規模での標準規格策定を行う国際機関。'
  },
  {
    id: 'jis-1',
    original: 'JIS',
    mode: 'fe',
    category: 'FE',
    hint: '日本産業規格として日本国内の工業標準化を推進する国家規格。'
  },
  {
    id: 'jit-1',
    original: 'JIT',
    mode: 'fe',
    category: 'FE',
    hint: '必要な時に必要な分だけ実行するジャストインタイム方式。トヨタ生産方式でも採用。'
  },
  {
    id: 'kpi-1',
    original: 'KPI',
    mode: 'fe',
    category: 'FE',
    hint: '重要業績評価指標として目標達成度を測定する定量的な指標。'
  },
  {
    id: 'lan-1',
    original: 'LAN',
    mode: 'fe',
    category: 'FE',
    hint: '建物内や限定された地域内でコンピュータを接続するローカルエリアネットワーク。'
  },
  {
    id: 'mac-1',
    original: 'MAC',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークインターフェースの固有識別子として各機器に割り当てられるアドレス。'
  },
  {
    id: 'mvc-1',
    original: 'MVC',
    mode: 'fe',
    category: 'FE',
    hint: 'アプリケーション設計においてデータ・表示・制御を分離する設計パターン。'
  },
  {
    id: 'nas-1',
    original: 'NAS',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークに直接接続されたファイル共有専用ストレージデバイス。'
  },
  {
    id: 'nlp-1',
    original: 'NLP',
    mode: 'fe',
    category: 'FE',
    hint: '自然言語処理として人間の言語をコンピュータで理解・生成する人工知能技術。'
  },
  {
    id: 'oop-1',
    original: 'OOP',
    mode: 'fe',
    category: 'FE',
    hint: 'オブジェクト指向プログラミングとしてデータと処理をまとめたオブジェクト単位で設計。'
  },
  {
    id: 'pdf-1',
    original: 'PDF',
    mode: 'fe',
    category: 'FE',
    hint: '異なる環境でも同一の見た目を保持するAdobe開発の文書フォーマット。'
  },
  {
    id: 'pki-1',
    original: 'PKI',
    mode: 'fe',
    category: 'FE',
    hint: '公開鍵暗号技術を基盤とした認証・暗号化・デジタル署名のセキュリティ基盤。'
  },
  {
    id: 'qos-1',
    original: 'QoS',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワーク通信において帯域幅・遅延・パケット損失などの品質を保証する技術。'
  },
  {
    id: 'ram-1',
    original: 'RAM',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピュータの主記憶装置として任意の場所に高速アクセス可能な揮発性メモリ。'
  },
  {
    id: 'roi-1',
    original: 'ROI',
    mode: 'fe',
    category: 'FE',
    hint: '投資収益率として投資額に対する利益の割合を示す経営指標。'
  },
  {
    id: 'rom-1',
    original: 'ROM',
    mode: 'fe',
    category: 'FE',
    hint: '電源を切ってもデータが保持される読み取り専用の不揮発性メモリ。'
  },
  {
    id: 'sdk-1',
    original: 'SDK',
    mode: 'fe',
    category: 'FE',
    hint: '特定のプラットフォーム向けアプリケーション開発に必要なツール・ライブラリ集。'
  },
  {
    id: 'seo-1',
    original: 'SEO',
    mode: 'fe',
    category: 'FE',
    hint: '検索エンジン最適化としてWebサイトの検索順位向上を図る技術・手法。'
  },
  {
    id: 'sla-1',
    original: 'SLA',
    mode: 'fe',
    category: 'FE',
    hint: 'サービス提供者と利用者間で合意されたサービス品質水準を定めた契約書。'
  },
  {
    id: 'soa-1',
    original: 'SOA',
    mode: 'fe',
    category: 'FE',
    hint: 'ビジネス機能をサービスとして定義し組み合わせるシステム設計手法。'
  },
  {
    id: 'sql-1',
    original: 'SQL',
    mode: 'fe',
    category: 'FE',
    hint: '関係データベースの操作・検索を行うための標準的な構造化問い合わせ言語。'
  },
  {
    id: 'ssd-1',
    original: 'SSD',
    mode: 'fe',
    category: 'FE',
    hint: 'フラッシュメモリを利用した高速・静音・省電力の半導体記憶装置。HDDの後継技術。'
  },
  {
    id: 'ssl-1',
    original: 'SSL',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット通信を暗号化するセキュリティプロトコル。現在はTLSがこれの後継。'
  },
  {
    id: 'tcp-1',
    original: 'TCP',
    mode: 'fe',
    category: 'FE',
    hint: '信頼性の高いデータ送受信を保証するコネクション型の伝送制御プロトコル。'
  },
  {
    id: 'tls-1',
    original: 'TLS',
    mode: 'fe',
    category: 'FE',
    hint: 'SSL後継のセキュリティプロトコル。HTTPS通信の暗号化を担う。'
  },
  {
    id: 'udp-1',
    original: 'UDP',
    mode: 'fe',
    category: 'FE',
    hint: '高速だが信頼性は低いコネクションレス型の通信プロトコル。リアルタイム通信で使用。'
  },
  {
    id: 'url-1',
    original: 'URL',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上のWebページやファイルの所在を示す統一資源位置指定子。'
  },
  {
    id: 'usb-1',
    original: 'USB',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピュータと周辺機器を接続する汎用シリアルバス規格。プラグアンドプレイ対応。'
  },
  {
    id: 'vpn-1',
    original: 'VPN',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上に構築された暗号化された仮想プライベートネットワーク。'
  },
  {
    id: 'wan-1',
    original: 'WAN',
    mode: 'fe',
    category: 'FE',
    hint: '地理的に離れた地点間を接続する広域ネットワーク。インターネットも一種のWAN。'
  },
  {
    id: 'wbs-1',
    original: 'WBS',
    mode: 'fe',
    category: 'FE',
    hint: 'プロジェクトを管理可能な作業単位まで階層的に分解する作業分解構造。'
  },
  {
    id: 'waf-1',
    original: 'WAF',
    mode: 'fe',
    category: 'FE',
    hint: 'WebアプリケーションのHTTP/HTTPS通信を監視・フィルタリングするセキュリティ装置。'
  },
  {
    id: 'xml-1',
    original: 'XML',
    mode: 'fe',
    category: 'FE',
    hint: 'データ構造を記述する拡張可能なマークアップ言語。文書やデータ交換で活用。'
  },
  {
    id: 'xss-1',
    original: 'XSS',
    mode: 'fe',
    category: 'FE',
    hint: 'Webアプリケーションに悪意のあるスクリプトを埋め込むクロスサイトスクリプティング攻撃。'
  },
  {
    id: 'llm-1',
    original: 'LLM',
    mode: 'fe',
    category: 'FE',
    hint: '大量のテキストデータで学習された大規模言語モデル。ChatGPTなどの基盤技術。'
  },

  // 4文字略語（27語）
  {
    id: 'acid-1',
    original: 'ACID',
    mode: 'fe',
    category: 'FE',
    hint: 'データベーストランザクションが満たすべき4つの基本特性。'
  },
  {
    id: 'ansi-1',
    original: 'ANSI',
    mode: 'fe',
    category: 'FE',
    hint: '米国国家規格協会として産業規格の標準化を推進する民間機関。'
  },
  {
    id: 'asic-1',
    original: 'ASIC',
    mode: 'fe',
    category: 'FE',
    hint: '特定用途向けに設計された専用集積回路。高性能・低消費電力。'
  },
  {
    id: 'bios-1',
    original: 'BIOS',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピュータ起動時の基本入出力制御を行うマザーボード搭載のファームウェア。'
  },
  {
    id: 'ciso-1',
    original: 'CISO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高情報セキュリティ責任者としてサイバーセキュリティ戦略を統括。'
  },
  {
    id: 'crud-1',
    original: 'CRUD',
    mode: 'fe',
    category: 'FE',
    hint: 'データベースやWebアプリケーションにおける4つの基本操作機能（作成・読取・更新・削除）。'
  },
  {
    id: 'csrf-1',
    original: 'CSRF',
    mode: 'fe',
    category: 'FE',
    hint: '攻撃者がユーザーを騙して意図しない操作を実行させるウェブセキュリティの脆弱性。'
  },
  {
    id: 'dbms-1',
    original: 'DBMS',
    mode: 'fe',
    category: 'FE',
    hint: 'データベースの作成・管理・操作を統合的に行うソフトウェアシステム。'
  },
  {
    id: 'ddos-1',
    original: 'DDoS',
    mode: 'fe',
    category: 'FE',
    hint: '複数のコンピュータから同時に攻撃する分散型サービス拒否攻撃。'
  },
  {
    id: 'fifo-1',
    original: 'FIFO',
    mode: 'fe',
    category: 'FE',
    hint: '先入先出法として最初に入力されたデータを最初に出力するキュー構造の処理方式。'
  },
  {
    id: 'html-1',
    original: 'HTML',
    mode: 'fe',
    category: 'FE',
    hint: 'Webページの構造と内容を記述するハイパーテキストマークアップ言語。'
  },
  {
    id: 'http-1',
    original: 'HTTP',
    mode: 'fe',
    category: 'FE',
    hint: 'WebサーバーとWebブラウザ間でハイパーテキスト文書を転送するプロトコル。'
  },
  {
    id: 'iaas-1',
    original: 'IaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてサーバーやネットワークをサービスとして提供。'
  },
  {
    id: 'ipv4-1',
    original: 'IPv4',
    mode: 'fe',
    category: 'FE',
    hint: '32ビットのIPアドレスを使用する現在主流のインターネットプロトコル第4版。'
  },
  {
    id: 'ipv6-1',
    original: 'IPv6',
    mode: 'fe',
    category: 'FE',
    hint: '128ビットの次世代IPアドレスを使用するインターネットプロトコル第6版。'
  },
  {
    id: 'isms-1',
    original: 'ISMS',
    mode: 'fe',
    category: 'FE',
    hint: '組織の情報セキュリティを継続的に改善する管理システム。'
  },
  {
    id: 'json-1',
    original: 'JSON',
    mode: 'fe',
    category: 'FE',
    hint: '軽量なデータ交換フォーマットとしてWebアプリケーションで広く使用される記法。'
  },
  {
    id: 'ldap-1',
    original: 'LDAP',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワーク上のディレクトリ情報にアクセスする軽量プロトコル。'
  },
  {
    id: 'lifo-1',
    original: 'LIFO',
    mode: 'fe',
    category: 'FE',
    hint: '後入先出法として最後に入力されたデータを最初に出力するスタック構造の処理方式。'
  },
  {
    id: 'mitm-1',
    original: 'MITM',
    mode: 'fe',
    category: 'FE',
    hint: '通信の中間に侵入してメッセージの盗聴や改ざんを行う攻撃。'
  },
  {
    id: 'paas-1',
    original: 'PaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてアプリケーション実行環境をサービスとして提供。'
  },
  {
    id: 'raid-1',
    original: 'RAID',
    mode: 'fe',
    category: 'FE',
    hint: '複数のディスクを組み合わせて冗長性や性能を向上させる技術。'
  },
  {
    id: 'rest-1',
    original: 'REST',
    mode: 'fe',
    category: 'FE',
    hint: 'WebサービスのAPI設計における軽量でスケーラブルなアーキテクチャ設計原則。'
  },
  {
    id: 'rfid-1',
    original: 'RFID',
    mode: 'fe',
    category: 'FE',
    hint: '電波を利用してタグのデータを非接触で読み取る無線個体識別技術。'
  },
  {
    id: 'saas-1',
    original: 'SaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてソフトウェアをサービスとして提供するモデル。'
  },
  {
    id: 'smtp-1',
    original: 'SMTP',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上で電子メールを送信するための標準的な簡易メール転送プロトコル。'
  },
  {
    id: 'swot-1',
    original: 'SWOT',
    mode: 'fe',
    category: 'FE',
    hint: '強み・弱み・機会・脅威から戦略を分析するフレームワーク。'
  },

  // 5文字略語（6語）
  {
    id: 'https-1',
    original: 'HTTPS',
    mode: 'fe',
    category: 'FE',
    hint: 'SSL/TLSによって暗号化されたHTTP通信。Webサイトのセキュリティを確保する標準的手法。'
  },
  {
    id: 'mlops-1',
    original: 'MLOps',
    mode: 'fe',
    category: 'FE',
    hint: '機械学習システムの開発・運用・保守を効率化する手法とツールの総称。'
  },
  {
    id: 'nosql-1',
    original: 'NoSQL',
    mode: 'fe',
    category: 'FE',
    hint: '関係データベース以外のデータベースシステム。ビッグデータやWebアプリケーションで活用。'
  },
  {
    id: 'pmbok-1',
    original: 'PMBOK',
    mode: 'fe',
    category: 'FE',
    hint: 'プロジェクトマネジメント協会が策定したプロジェクト管理の知識体系。'
  },
  {
    id: 'utf8-1',
    original: 'UTF-8',
    mode: 'fe',
    category: 'FE',
    hint: '世界中の文字を表現できるUnicode文字の可変長符号化方式。'
  },
  {
    id: 'wifi-1',
    original: 'Wi-Fi',
    mode: 'fe',
    category: 'FE',
    hint: 'IEEE 802.11規格に基づく無線LAN機器の相互接続を保証する業界標準規格の商標。'
  },

  // 7文字略語（1語）
  {
    id: 'captcha-1',
    original: 'CAPTCHA',
    mode: 'fe',
    category: 'FE',
    hint: '人間とボットを区別する認証システム。'
  },
]

// ランダムなFE用語を取得
export const getRandomFeTerm = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * feTerms.length)
  const word = feTerms[randomIndex]
  return {
    ...word,
    scrambled: scrambleWord(word.original)
  }
}
