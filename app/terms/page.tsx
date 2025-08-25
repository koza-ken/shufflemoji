import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 - シャッフルもじ',
  description: 'シャッフルもじの利用規約です。ご利用前に必ずお読みください。',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            利用規約
          </h1>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第1条（適用）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本利用規約（以下「本規約」）は、「シャッフルもじ」（以下「本サービス」）の利用条件を定めるものです。
                本サービスをご利用いただく際は、本規約に同意いただいたものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第2条（利用登録）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                本サービスの利用登録は任意です。以下のいずれかの方法でご利用いただけます：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>Googleアカウントによるログイン</li>
                <li>ゲストユーザーとしての利用（名前入力のみ）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第3条（禁止事項）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>本サービスの運営を妨害する行為</li>
                <li>他のユーザーに迷惑をかける行為</li>
                <li>不適切な名前やプロフィール情報の設定</li>
                <li>本サービスの脆弱性を悪用する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第4条（個人情報の取扱い）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本サービスでは、以下の個人情報を取得・利用いたします：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4 mt-3 mb-3">
                <li>Googleアカウント情報（メールアドレス、名前、プロフィール画像）</li>
                <li>ゲーム利用履歴（スコア、プレイ日時）</li>
                <li>ユーザーが設定したプロフィール情報</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                これらの情報は、本サービスの提供および改善のためにのみ使用し、第三者に提供することはありません。
                詳細は<a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">プライバシーポリシー</a>をご確認ください。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第5条（知的財産権）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                本サービスに関するすべての知的財産権は、運営者に帰属します。
                ユーザーは、本サービスを個人的かつ非商業的な目的でのみ利用することができます。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第6条（免責事項）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                本サービスの利用に関して、運営者は以下について一切の責任を負いません：
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>サービスの中断や終了による損害</li>
                <li>システムの不具合による損害</li>
                <li>ユーザー間のトラブル</li>
                <li>第三者によるサービスの悪用</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第7条（サービスの変更・終了）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                運営者は、ユーザーに事前に通知することなく、本サービスの内容を変更したり、
                本サービスの提供を終了したりすることができるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                第8条（規約の変更）
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                運営者は、必要に応じて本規約を変更することができるものとします。
                変更後の規約は、本サービス上に掲示した時点から効力を生じるものとします。
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
