import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-1 sm:py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            {/* <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              シャッフルもじ
            </div> */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              © {currentYear} シャッフルもじ.
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-row items-center space-x-6">
            <Link
              href="/terms"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>

        {/* Description
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            プログラミング学習を楽しくする文字並べ替えゲーム。HTML/CSS、Ruby、基本情報技術者試験の用語を学習できます。
          </p>
        </div> */}
      </div>
    </footer>
  );
}
