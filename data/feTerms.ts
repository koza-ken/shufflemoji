import { Word, GameWord } from '@/types/word'
import { scrambleWord } from '@/utils/scrambleWord'

// 基本情報技術者試験用語データベース（合計 100語）
// 3文字: 66語, 4文字: 27語, 5文字: 6語, 7文字: 1語
export const feTerms: Word[] = [
  // 3文字略語（66語）
  {
    id: 'bcp-1',
    original: 'BCP',
    mode: 'fe',
    category: 'FE',
    hint: '事業継続計画として災害時や緊急事態における事業継続戦略を策定する重要な経営手法。',
    fullName: 'Business Continuity Plan',
    fullNameJa: '事業継続計画'
  },
  {
    id: 'bsc-1',
    original: 'BSC',
    mode: 'fe',
    category: 'FE',
    hint: '財務・顧客・業務プロセス・学習と成長の4つの視点から組織を評価する多角的経営管理手法。',
    fullName: 'Balanced Score Card',
    fullNameJa: 'バランススコアカード'
  },
  {
    id: 'cdn-1',
    original: 'CDN',
    mode: 'fe',
    category: 'FE',
    hint: '世界各地のサーバーにコンテンツを配置してユーザーに高速配信するネットワーク。',
    fullName: 'Content Delivery Network',
    fullNameJa: 'コンテンツ配信ネットワーク'
  },
  {
    id: 'ceo-1',
    original: 'CEO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高"経営"責任者として経営方針決定や業務執行の最終責任を負う役職。',
    fullName: 'Chief Executive Officer',
    fullNameJa: '最高経営責任者'
  },
  {
    id: 'cio-1',
    original: 'CIO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高"情報"責任者としてIT戦略やシステム全体の責任を担う経営幹部。',
    fullName: 'Chief Information Officer',
    fullNameJa: '最高情報責任者'
  },
  {
    id: 'cli-1',
    original: 'CLI',
    mode: 'fe',
    category: 'FE',
    hint: 'テキストベースでコマンドを入力してコンピュータを操作するインターフェース。',
    fullName: 'Command Line Interface',
  },
  {
    id: 'cpu-1',
    original: 'CPU',
    mode: 'fe',
    category: 'FE',
    hint: '中央処理装置としてコンピュータの演算制御を担う中核部品。プログラム実行の司令塔。',
    fullName: 'Central Processing Unit',
    fullNameJa: '中央処理装置'
  },
  {
    id: 'crc-1',
    original: 'CRC',
    mode: 'fe',
    category: 'FE',
    hint: '送信データを生成多項式で除算し、割った余りを送信データに付加して、データの誤りを検出する方式。',
    fullName: 'Cyclic Redundancy Check',
    fullNameJa: '巡回冗長検査'
  },
  {
    id: 'crm-1',
    original: 'CRM',
    mode: 'fe',
    category: 'FE',
    hint: '顧客や市場から得られた情報を統合管理し、顧客との関係を構築・維持することで営業活動を支援する経営手法。',
    fullName: 'Customer Relationship Management',
    fullNameJa: '顧客関係管理'
  },
  {
    id: 'csr-1',
    original: 'CSR',
    mode: 'fe',
    category: 'FE',
    hint: '企業の社会的責任として環境保護や社会貢献活動を重視する経営理念。',
    fullName: 'Corporate Social Responsibility',
    fullNameJa: '企業の社会的責任'
  },
  {
    id: 'css-1',
    original: 'CSS',
    mode: 'fe',
    category: 'FE',
    hint: 'Webページの見た目やレイアウトをHTMLから分離して指定するスタイル記述言語。',
    fullName: 'Cascading Style Sheets',
  },
  {
    id: 'csv-1',
    original: 'CSV',
    mode: 'fe',
    category: 'FE',
    hint: 'データをカンマで区切って表現するシンプルなファイル形式。表計算ソフトで広く使用。',
    fullName: 'Comma Separated Values',
    fullNameJa: 'カンマ区切り値'
  },
  {
    id: 'ddl-1',
    original: 'DDL',
    mode: 'fe',
    category: 'FE',
    hint: 'データベースのテーブルやインデックス構造を定義するSQL。',
    fullName: 'Data Definition Language',
    fullNameJa: 'データ定義言語'
  },
  {
    id: 'dml-1',
    original: 'DML',
    mode: 'fe',
    category: 'FE',
    hint: 'データの追加・更新・削除を行うSQL文の分類。',
    fullName: 'Data Manipulation Language',
    fullNameJa: 'データ操作言語'
  },
  {
    id: 'dns-1',
    original: 'DNS',
    mode: 'fe',
    category: 'FE',
    hint: 'ドメイン名とIPアドレスを相互に変換（名前解決）するためのインターネットの基盤的な仕組み。',
    fullName: 'Domain Name System',
  },
  {
    id: 'dos-1',
    original: 'DoS',
    mode: 'fe',
    category: 'FE',
    hint: 'サーバーに大量のリクエストを送信してサービスを利用不可にするサイバー攻撃。',
    fullName: 'Denial of Service',
    fullNameJa: 'サービス拒否攻撃'
  },
  {
    id: 'eai-1',
    original: 'EAI',
    mode: 'fe',
    category: 'FE',
    hint: '企業内に分散している異なるアプリケーションやシステムを連携させ、データや業務プロセスを統合的に扱えるようにする手法。',
    fullName: 'Enterprise Application Integration',
    fullNameJa: '企業アプリケーション統合'
  },
  {
    id: 'ecm-1',
    original: 'ECM',
    mode: 'fe',
    category: 'FE',
    hint: '企業コンテンツ管理として文書や画像などの情報資産を統合管理するシステム。',
    fullName: 'Enterprise Content Management',
    fullNameJa: '企業コンテンツ管理'
  },
  {
    id: 'edi-1',
    original: 'EDI',
    mode: 'fe',
    category: 'FE',
    hint: '企業間でやり取りされるビジネス文書を、標準化された形式で電子的に自動交換する仕組み。',
    fullName: 'Electronic Data Interchange',
    fullNameJa: '電子データ交換'
  },
  {
    id: 'erp-1',
    original: 'ERP',
    mode: 'fe',
    category: 'FE',
    hint: '経営資源（人・モノ・カネ・情報）を計画的かつ統合的に管理し、業務効率化や経営の最適化を図る考え方および仕組み。',
    fullName: 'Enterprise Resource Planning',
    fullNameJa: '企業資源計画'
  },
  {
    id: 'etl-1',
    original: 'ETL',
    mode: 'fe',
    category: 'FE',
    hint: 'データウェアハウスにおいてデータを抽出・変換・読み込みするプロセス。',
    fullName: 'Extract Transform Load',
    fullNameJa: '抽出・変換・ロード'
  },
  {
    id: 'faq-1',
    original: 'FAQ',
    mode: 'fe',
    category: 'FE',
    hint: 'よくある質問集としてユーザーサポートや情報提供に活用される形式。',
    fullName: 'Frequently Asked Questions',
    fullNameJa: 'よくある質問'
  },
  {
    id: 'ftp-1',
    original: 'FTP',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上でファイルを送受信するための標準的な通信プロトコル。',
    fullName: 'File Transfer Protocol',
    fullNameJa: 'ファイル転送プロトコル'
  },
  {
    id: 'gps-1',
    original: 'GPS',
    mode: 'fe',
    category: 'FE',
    hint: '人工衛星を利用して地球上の位置を正確に測定する全地球測位システム。',
    fullName: 'Global Positioning System',
    fullNameJa: '全地球測位システム'
  },
  {
    id: 'gpu-1',
    original: 'GPU',
    mode: 'fe',
    category: 'FE',
    hint: '画像処理専用装置として3Dグラフィックス処理やAI計算の高速化に活用される。',
    fullName: 'Graphics Processing Unit',
    fullNameJa: '画像処理装置'
  },
  {
    id: 'gui-1',
    original: 'GUI',
    mode: 'fe',
    category: 'FE',
    hint: 'アイコンやボタンなど視覚的要素を使ってコンピュータを直感的に操作するインターフェース。',
    fullName: 'Graphical User Interface',
  },
  {
    id: 'hdd-1',
    original: 'HDD',
    mode: 'fe',
    category: 'FE',
    hint: '磁気ディスクを利用した大容量データ保存装置。回転する円盤にデータを記録する従来型ストレージ。',
    fullName: 'Hard Disk Drive',
  },
  {
    id: 'ict-1',
    original: 'ICT',
    mode: 'fe',
    category: 'FE',
    hint: '情報通信技術として情報処理と通信技術を統合した概念。',
    fullName: 'Information and Communication Technology',
    fullNameJa: '情報通信技術'
  },
  {
    id: 'ide-1',
    original: 'IDE',
    mode: 'fe',
    category: 'FE',
    hint: 'ソースコード編集・コンパイル・デバッグ機能を統合したプログラミング環境。',
    fullName: 'Integrated Development Environment',
    fullNameJa: '統合開発環境'
  },
  {
    id: 'iot-1',
    original: 'IoT',
    mode: 'fe',
    category: 'FE',
    hint: 'モノのインターネットとして日常の物理デバイスをネットワーク接続してデータ収集・制御を行う。',
    fullName: 'Internet of Things',
    fullNameJa: 'モノのインターネット'
  },
  {
    id: 'ipo-1',
    original: 'IPO',
    mode: 'fe',
    category: 'FE',
    hint: '入力・処理・出力の基本処理モデル。システム設計の基礎となる概念。',
    fullName: 'Input Process Output',
    fullNameJa: '入力・処理・出力'
  },
  {
    id: 'iso-1',
    original: 'ISO',
    mode: 'fe',
    category: 'FE',
    hint: '国際標準化機構として世界規模での標準規格策定を行う国際機関。',
    fullName: 'International Organization for Standardization',
    fullNameJa: '国際標準化機構'
  },
  {
    id: 'jis-1',
    original: 'JIS',
    mode: 'fe',
    category: 'FE',
    hint: '日本産業規格として日本国内の工業標準化を推進する国家規格。',
    fullName: 'Japanese Industrial Standards',
    fullNameJa: '日本産業規格'
  },
  {
    id: 'jit-1',
    original: 'JIT',
    mode: 'fe',
    category: 'FE',
    hint: '必要な時に必要な分だけ生産。調達する方式。トヨタ生産方式でも採用。',
    fullName: 'Just In Time',
    fullNameJa: 'ジャストインタイム'
  },
  {
    id: 'kpi-1',
    original: 'KPI',
    mode: 'fe',
    category: 'FE',
    hint: '重要業績評価指標として目標達成度を測定する定量的な指標。',
    fullName: 'Key Performance Indicator',
    fullNameJa: '重要業績評価指標'
  },
  {
    id: 'lan-1',
    original: 'LAN',
    mode: 'fe',
    category: 'FE',
    hint: '建物内や限定された地域内でコンピュータを接続するネットワーク。',
    fullName: 'Local Area Network',
  },
  {
    id: 'mac-1',
    original: 'MAC',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークインターフェースの固有識別子として各機器に割り当てられるアドレス。',
    fullName: 'Media Access Control',
    fullNameJa: 'メディアアクセス制御'
  },
  {
    id: 'mvc-1',
    original: 'MVC',
    mode: 'fe',
    category: 'FE',
    hint: 'アプリケーション設計においてデータ・表示・制御を分離する設計パターン。',
    fullName: 'Model View Controller',
  },
  {
    id: 'nas-1',
    original: 'NAS',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークに直接接続されたファイル共有専用ストレージデバイス。',
    fullName: 'Network Attached Storage',
    fullNameJa: 'ネットワーク接続ストレージ'
  },
  {
    id: 'nlp-1',
    original: 'NLP',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピューターが、人々が使っている言葉（自然言語）の意味を適切に把握するため技術。',
    fullName: 'Natural Language Processing',
    fullNameJa: '自然言語処理'
  },
  {
    id: 'oop-1',
    original: 'OOP',
    mode: 'fe',
    category: 'FE',
    hint: 'データとそれに関連するメソッドを 「クラス」という単位でまとめて管理する手法。',
    fullName: 'Object Oriented Programming',
    fullNameJa: 'オブジェクト指向プログラミング'
  },
  {
    id: 'pdf-1',
    original: 'PDF',
    mode: 'fe',
    category: 'FE',
    hint: '異なる環境でも同一の見た目を保持するAdobe開発の文書フォーマット。',
    fullName: 'Portable Document Format',
  },
  {
    id: 'pki-1',
    original: 'PKI',
    mode: 'fe',
    category: 'FE',
    hint: '公開鍵暗号技術を基盤とした認証・暗号化・デジタル署名のセキュリティ基盤。',
    fullName: 'Public Key Infrastructure',
    fullNameJa: '公開鍵基盤'
  },
  {
    id: 'qos-1',
    original: 'QoS',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワーク通信において帯域幅・遅延・パケット損失などの品質を保証する技術。',
    fullName: 'Quality of Service',
    fullNameJa: 'サービス品質'
  },
  {
    id: 'ram-1',
    original: 'RAM',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピュータの主記憶装置として任意の場所に高速アクセス可能な揮発性メモリ。',
    fullName: 'Random Access Memory',
  },
  {
    id: 'roi-1',
    original: 'ROI',
    mode: 'fe',
    category: 'FE',
    hint: '投資額に対する利益の割合を示す経営指標。',
    fullName: 'Return on Investment',
    fullNameJa: '投資収益率'
  },
  {
    id: 'rom-1',
    original: 'ROM',
    mode: 'fe',
    category: 'FE',
    hint: '電源を切ってもデータが保持される読み取り専用の不揮発性メモリ。',
    fullName: 'Read Only Memory',
    fullNameJa: '読み取り専用メモリ'
  },
  {
    id: 'sdk-1',
    original: 'SDK',
    mode: 'fe',
    category: 'FE',
    hint: 'ソフトウェアを開発する際に必要なプログラムやAPI・文書・サンプルなどをまとめたパッケージ。',
    fullName: 'Software Development Kit',
    fullNameJa: 'ソフトウェア開発キット'
  },
  {
    id: 'seo-1',
    original: 'SEO',
    mode: 'fe',
    category: 'FE',
    hint: '検索結果で自分のサイトを上位に表示させる取り組み。',
    fullName: 'Search Engine Optimization',
    fullNameJa: '検索エンジン最適化'
  },
  {
    id: 'sla-1',
    original: 'SLA',
    mode: 'fe',
    category: 'FE',
    hint: 'サービス提供者と利用者間で合意されたサービス品質水準を定めた契約書。',
    fullName: 'Service Level Agreement',
    fullNameJa: 'サービスレベル合意'
  },
  {
    id: 'soa-1',
    original: 'SOA',
    mode: 'fe',
    category: 'FE',
    hint: 'ビジネス機能をサービスとして定義し組み合わせるシステム設計手法。',
    fullName: 'Service Oriented Architecture',
    fullNameJa: 'サービス指向アーキテクチャ'
  },
  {
    id: 'sql-1',
    original: 'SQL',
    mode: 'fe',
    category: 'FE',
    hint: '関係データベースの操作・検索を行うための標準的な構造化問い合わせ言語。',
    fullName: 'Structured Query Language',
    fullNameJa: '構造化問い合わせ言語'
  },
  {
    id: 'ssd-1',
    original: 'SSD',
    mode: 'fe',
    category: 'FE',
    hint: 'フラッシュメモリを利用した高速・静音・省電力の半導体記憶装置。HDDの後継技術。',
    fullName: 'Solid State Drive',
  },
  {
    id: 'ssl-1',
    original: 'SSL',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット通信を暗号化するセキュリティプロトコル。現在はTLSがこれの後継。',
    fullName: 'Secure Sockets Layer',
  },
  {
    id: 'tcp-1',
    original: 'TCP',
    mode: 'fe',
    category: 'FE',
    hint: '信頼性の高いデータ送受信を保証するコネクション型の伝送制御プロトコル。',
    fullName: 'Transmission Control Protocol',
    fullNameJa: '伝送制御プロトコル'
  },
  {
    id: 'tls-1',
    original: 'TLS',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット通信を暗号化して安全に行うためのプロトコル。SSLの後継。',
    fullName: 'Transport Layer Security',
  },
  {
    id: 'udp-1',
    original: 'UDP',
    mode: 'fe',
    category: 'FE',
    hint: '高速だが信頼性は低いコネクションレス型の通信プロトコル。リアルタイム通信で使用。',
    fullName: 'User Datagram Protocol',
  },
  {
    id: 'url-1',
    original: 'URL',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上のWebページやファイルの所在を示す統一的な指標。',
    fullName: 'Uniform Resource Locator',
    fullNameJa: '統一資源位置指定子'
  },
  {
    id: 'mime-1',
    original: 'MIME',
    mode: 'fe',
    category: 'FE',
    hint: '電子メールでテキスト以外のデータ（画像・音声・動画など）を送信するための拡張仕様。',
    fullName: 'Multipurpose Internet Mail Extensions',
    fullNameJa: '多目的インターネットメール拡張'
  },
  {
    id: 'vpn-1',
    original: 'VPN',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上に構築された暗号化された仮想の専用ネットワーク。',
    fullName: 'Virtual Private Network',
    fullNameJa: '仮想専用通信網'
  },
  {
    id: 'wan-1',
    original: 'WAN',
    mode: 'fe',
    category: 'FE',
    hint: '地理的に離れた地点間を接続するネットワーク。',
    fullName: 'Wide Area Network',
    fullNameJa: '広域ネットワーク'
  },
  {
    id: 'wbs-1',
    original: 'WBS',
    mode: 'fe',
    category: 'FE',
    hint: 'プロジェクトを管理可能な作業単位まで階層的に分解する作業分解構造。',
    fullName: 'Work Breakdown Structure',
    fullNameJa: '作業分解構造'
  },
  {
    id: 'waf-1',
    original: 'WAF',
    mode: 'fe',
    category: 'FE',
    hint: 'WebアプリケーションのHTTP/HTTPS通信を監視・フィルタリングするセキュリティ装置。',
    fullName: 'Web Application Firewall',
  },
  {
    id: 'xml-1',
    original: 'XML',
    mode: 'fe',
    category: 'FE',
    hint: 'データ構造を記述する拡張可能なマークアップ言語。文書やデータ交換で活用。',
    fullName: 'Extensible Markup Language',
    fullNameJa: '拡張マークアップ言語'
  },
  {
    id: 'xss-1',
    original: 'XSS',
    mode: 'fe',
    category: 'FE',
    hint: 'Webアプリケーションに悪意のあるスクリプトを埋め込む攻撃。',
    fullName: 'Cross Site Scripting',
  },
  {
    id: 'llm-1',
    original: 'LLM',
    mode: 'fe',
    category: 'FE',
    hint: '大量のテキストデータで学習された大規模言語モデル。ChatGPTなどの基盤技術。',
    fullName: 'Large Language Model',
    fullNameJa: '大規模言語モデル'
  },

  // 4文字略語（28語）
  {
    id: 'acid-1',
    original: 'ACID',
    mode: 'fe',
    category: 'FE',
    hint: 'データベーストランザクションが満たすべき4つの基本特性。',
    fullName: 'Atomicity Consistency Isolation Durability',
    fullNameJa: '原子性・一貫性・独立性・永続性'
  },
  {
    id: 'api-1',
    original: 'API',
    mode: 'fe',
    category: 'FE',
    hint: 'ソフトウェアやWebサービス同士が互いに通信し、データや機能をやり取りするための窓口や取り決め。',
    fullName: 'Application Programming Interface',
  },
  {
    id: 'asic-1',
    original: 'ASIC',
    mode: 'fe',
    category: 'FE',
    hint: 'ユーザーの要求をもとに設計された専用集積回路。',
    fullName: 'Application Specific Integrated Circuit',
    fullNameJa: '特定用途向け半導体'
  },
  {
    id: 'bios-1',
    original: 'BIOS',
    mode: 'fe',
    category: 'FE',
    hint: 'コンピュータ起動時にハードウェアを初期化・制御するマザーボード搭載の基本ソフト。',
    fullName: 'Basic Input Output System',
    fullNameJa: '基本入出力システム'
  },
  {
    id: 'ciso-1',
    original: 'CISO',
    mode: 'fe',
    category: 'FE',
    hint: '企業の最高情報セキュリティ責任者としてサイバーセキュリティ戦略を統括。',
    fullName: 'Chief Information Security Officer',
    fullNameJa: '最高情報セキュリティ責任者'
  },
  {
    id: 'crud-1',
    original: 'CRUD',
    mode: 'fe',
    category: 'FE',
    hint: 'データベースやWebアプリケーションにおける4つの基本操作機能。',
    fullName: 'Create Read Update Delete',
    fullNameJa: '作成・読取・更新・削除'
  },
  {
    id: 'csrf-1',
    original: 'CSRF',
    mode: 'fe',
    category: 'FE',
    hint: '攻撃者がユーザーを騙して意図しない操作を実行させるウェブセキュリティの脆弱性。',
    fullName: 'Cross Site Request Forgery',
    fullNameJa: 'クロスサイトリクエストフォージェリ'
  },
  {
    id: 'dbms-1',
    original: 'DBMS',
    mode: 'fe',
    category: 'FE',
    hint: 'データベースの作成・管理・操作を統合的に行うソフトウェアシステム。',
    fullName: 'Database Management System',
    fullNameJa: 'データベース管理システム'
  },
  {
    id: 'ddos-1',
    original: 'DDoS',
    mode: 'fe',
    category: 'FE',
    hint: '複数のコンピュータから同時に攻撃する分散型サービス拒否攻撃。',
    fullName: 'Distributed Denial of Service',
    fullNameJa: '分散型サービス拒否攻撃'
  },
  {
    id: 'dhcp-1',
    original: 'DHCP',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークに接続するデバイスにIPアドレスを自動的に割り当てるプロトコル。',
    fullName: 'Dynamic Host Configuration Protocol',
    fullNameJa: '動的ホスト構成プロトコル'
  },
  {
    id: 'fifo-1',
    original: 'FIFO',
    mode: 'fe',
    category: 'FE',
    hint: '先入先出法として最初に入力されたデータを最初に出力するキュー構造の処理方式。',
    fullName: 'First In First Out',
    fullNameJa: '先入先出法'
  },
  {
    id: 'html-1',
    original: 'HTML',
    mode: 'fe',
    category: 'FE',
    hint: 'Webページの構造と内容を記述するための言語。',
    fullName: 'HyperText Markup Language',
    fullNameJa: 'ハイパーテキストマークアップ言語'
  },
  {
    id: 'http-1',
    original: 'HTTP',
    mode: 'fe',
    category: 'FE',
    hint: 'WebサーバーとWebブラウザ間でハイパーテキスト文書を転送するプロトコル。',
    fullName: 'HyperText Transfer Protocol',
    fullNameJa: 'ハイパーテキスト転送プロトコル'
  },
  {
    id: 'iaas-1',
    original: 'IaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてサーバーやネットワークをサービスとして提供。',
    fullName: 'Infrastructure as a Service',
    fullNameJa: 'サービスとしてのインフラストラクチャ'
  },
  {
    id: 'ids-1',
    original: 'IDS',
    mode: 'fe',
    category: 'FE',
    hint: 'ネットワークやシステムへの不正な侵入や攻撃を検知・監視するセキュリティシステム。',
    fullName: 'Intrusion Detection System',
    fullNameJa: '侵入検知システム'
  },
  {
    id: 'ipv6-1',
    original: 'IPv6',
    mode: 'fe',
    category: 'FE',
    hint: '128ビットの次世代IPアドレスを使用するインターネットプロトコル第6版。',
    fullName: 'Internet Protocol version 6',
  },
  {
    id: 'isms-1',
    original: 'ISMS',
    mode: 'fe',
    category: 'FE',
    hint: '組織の情報セキュリティを継続的に改善する管理システム。',
    fullName: 'Information Security Management System',
    fullNameJa: '情報セキュリティ管理システム'
  },
  {
    id: 'json-1',
    original: 'JSON',
    mode: 'fe',
    category: 'FE',
    hint: '軽量なデータ交換フォーマットとしてWebアプリケーションで広く使用される記法。',
    fullName: 'JavaScript Object Notation',
    fullNameJa: 'JavaScriptオブジェクト記法'
  },
  {
    id: 'lifo-1',
    original: 'LIFO',
    mode: 'fe',
    category: 'FE',
    hint: '後入先出法として最後に入力されたデータを最初に出力するスタック構造の処理方式。',
    fullName: 'Last In First Out',
    fullNameJa: '後入先出法'
  },
  {
    id: 'mitm-1',
    original: 'MITM',
    mode: 'fe',
    category: 'FE',
    hint: '通信の中間に侵入してメッセージの盗聴や改ざんを行う攻撃。',
    fullName: 'Man In The Middle attack',
    fullNameJa: '中間者攻撃'
  },
  {
    id: 'paas-1',
    original: 'PaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてアプリケーション実行環境をサービスとして提供。',
    fullName: 'Platform as a Service',
    fullNameJa: 'サービスとしてのプラットフォーム'
  },
  {
    id: 'raid-1',
    original: 'RAID',
    mode: 'fe',
    category: 'FE',
    hint: '複数のディスクを組み合わせて冗長性や性能を向上させる技術。',
    fullName: 'Redundant Array of Independent Disks',
    fullNameJa: '独立ディスクの冗長配列'
  },
  {
    id: 'rest-1',
    original: 'REST',
    mode: 'fe',
    category: 'FE',
    hint: 'WebサービスのAPI設計における軽量でスケーラブルなアーキテクチャ設計原則。',
    fullName: 'Representational State Transfer',
    fullNameJa: 'web APIの構築方法に関するルール'
  },
  {
    id: 'rfid-1',
    original: 'RFID',
    mode: 'fe',
    category: 'FE',
    hint: '電波を利用してタグのデータを非接触で読み取る無線個体識別技術。',
    fullName: 'Radio Frequency Identification',
    fullNameJa: '無線周波数識別'
  },
  {
    id: 'saas-1',
    original: 'SaaS',
    mode: 'fe',
    category: 'FE',
    hint: 'クラウドコンピューティングにおいてソフトウェアをサービスとして提供するモデル。',
    fullName: 'Software as a Service',
    fullNameJa: 'サービスとしてのソフトウェア'
  },
  {
    id: 'smtp-1',
    original: 'SMTP',
    mode: 'fe',
    category: 'FE',
    hint: 'インターネット上で電子メールを送信するための標準的な簡易メール転送プロトコル。',
    fullName: 'Simple Mail Transfer Protocol',
    fullNameJa: '簡易メール転送プロトコル'
  },
  {
    id: 'swot-1',
    original: 'SWOT',
    mode: 'fe',
    category: 'FE',
    hint: '強み・弱み・機会・脅威から戦略を分析するフレームワーク。',
    fullName: 'Strengths Weaknesses Opportunities Threats',
  },

  // 5文字略語（6語）
  {
    id: 'https-1',
    original: 'HTTPS',
    mode: 'fe',
    category: 'FE',
    hint: 'SSL/TLSによって暗号化されたHTTP通信。Webサイトのセキュリティを確保する標準的手法。',
    fullName: 'HyperText Transfer Protocol Secure',
    fullNameJa: 'セキュアハイパーテキスト転送プロトコル'
  },
  {
    id: 'mlops-1',
    original: 'MLOps',
    mode: 'fe',
    category: 'FE',
    hint: '開発からデプロイ、モニタリングに至る機械学習のライフサイクルを管理するプロセス。',
    fullName: 'Machine Learning Operations',
  },
  {
    id: 'nosql-1',
    original: 'NoSQL',
    mode: 'fe',
    category: 'FE',
    hint: '非表形式でデータを保存する非リレーショナルデータベース。',
    fullName: 'Not only SQL',
 },
  {
    id: 'pmbok-1',
    original: 'PMBOK',
    mode: 'fe',
    category: 'FE',
    hint: 'プロジェクトマネジメント協会が策定したプロジェクト管理の知識体系。',
    fullName: 'Project Management Body of Knowledge',
    fullNameJa: 'プロジェクトマネジメント知識体系'
  },
  {
    id: 'utf8-1',
    original: 'UTF-8',
    mode: 'fe',
    category: 'FE',
    hint: '世界中の文字を表現できるUnicode文字の可変長符号化方式。',
    fullName: 'Unicode Transformation Format 8-bit',
    fullNameJa: '8ビットUnicode変換フォーマット'
  },
  {
    id: 'wifi-1',
    original: 'Wi-Fi',
    mode: 'fe',
    category: 'FE',
    hint: 'IEEE 802.11規格に基づく無線LAN機器の相互接続を保証する業界標準規格の商標。',
    fullName: 'Wi-Fi',
  },

  // 7文字略語（1語）
  {
    id: 'captcha-1',
    original: 'CAPTCHA',
    mode: 'fe',
    category: 'FE',
    hint: '人間とボットを区別する認証システム。',
    fullName: 'Completely Automated Public Turing Test',
    fullNameJa: '完全自動化公開チューリングテスト'
  },
];

// ランダムなFE用語を取得
export const getRandomFeTerm = (): GameWord => {
  const randomIndex = Math.floor(Math.random() * feTerms.length)
  const word = feTerms[randomIndex]
  return {
    ...word,
    scrambled: scrambleWord(word.original)
  }
}
