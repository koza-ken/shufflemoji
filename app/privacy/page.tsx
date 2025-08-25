import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - シャッフルもじ',
  description: 'シャッフルもじのプライバシーポリシーです。個人情報の取り扱いについて説明しています。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            プライバシーポリシー
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                個人情報の収集について
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                本サービス「シャッフルもじ」では、サービスの提供に必要な範囲内で以下の個人情報を収集いたします：
              </p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">
                Google OAuth認証時に取得する情報
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>メールアドレス</li>
                <li>氏名</li>
                <li>プロフィール画像URL</li>
                <li>Google アカウントの識別子</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">
                ゲーム利用時に収集する情報
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>ゲームのプレイ結果（スコア、正解・不正解の問題）</li>
                <li>プレイ日時</li>
                <li>選択したゲームモード</li>
                <li>ゲスト名（未登録ユーザーの場合）</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3 mt-4">
                自動的に収集される情報
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>IPアドレス</li>
                <li>ブラウザの種類とバージョン</li>
                <li>アクセス日時</li>
                <li>リファラー情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                個人情報の利用目的
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>本サービスの提供・運営</li>
                <li>ユーザー認証およびアカウント管理</li>
                <li>ゲームの進行状況・履歴の保存と表示</li>
                <li>ランキング機能の提供</li>
                <li>サービス改善のための統計・分析</li>
                <li>技術的な問題の対応・サポート</li>
                <li>利用規約違反の調査・対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                個人情報の第三者提供
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                当運営者は、以下の場合を除いて個人情報を第三者に提供することはありません：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-3">
                <li>ユーザーの同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                外部サービスとの連携
              </h2>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Google OAuth 2.0
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                本サービスではユーザー認証にGoogle OAuth 2.0を使用しています。
                Googleのプライバシーポリシーについては、
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  こちら
                </a>
                をご確認ください。
              </p>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                X (Twitter)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本サービスにはX（旧Twitter）へのシェア機能がありますが、個人情報の送信は行われません。
                シェア機能利用時は、Xのプライバシーポリシーが適用されます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                データの保存と削除
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                個人情報の保存期間および削除について：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>アカウント情報：アカウント削除まで保存</li>
                <li>ゲームプレイ履歴：アカウント削除まで保存</li>
                <li>ゲスト名でのプレイ記録：無期限保存（個人を特定する情報なし）</li>
                <li>ログ情報：最大6ヶ月間保存後自動削除</li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                ユーザーがGoogleアカウントの連携を解除した場合、関連する個人情報は速やかに削除されます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                セキュリティ対策
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                個人情報の安全性確保のため、以下の対策を講じています：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>HTTPS通信による暗号化</li>
                <li>データベースへの不正アクセス防止</li>
                <li>アクセス権限の適切な管理</li>
                <li>定期的なセキュリティ監査</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cookieの使用
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本サービスでは、ユーザー認証およびサービス提供のためにCookieを使用しています。
                Cookieの使用を望まない場合は、ブラウザの設定で無効にすることができますが、
                一部の機能が正常に動作しない可能性があります。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                プライバシーポリシーの変更
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本プライバシーポリシーは、法令の変更やサービス内容の変更に応じて更新する場合があります。
                重要な変更については、本サービス上で通知いたします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                お問い合わせ
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本プライバシーポリシーに関するお問い合わせや、個人情報の取り扱いについてご質問がございましたら、
                本サービスのGitHubリポジトリのIssueよりお気軽にお問い合わせください。
              </p>
            </section>

            <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                制定日：2025年8月25日<br />
                最終更新：2025年8月25日
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              ホームに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
