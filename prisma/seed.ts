import { PrismaClient } from '@prisma/client'
import { htmlCssTerms } from '../data/htmlCssTerms'
import { rubyMethods } from '../data/rubyMethods'

const prisma = new PrismaClient()

// 既存のHTML/CSS用語データをDB用に変換（IDは自動生成）
const htmlCssWordsForDB = htmlCssTerms.map(term => ({
  original: term.original,
  mode: 'HTML_CSS' as const,
  category: term.category || 'HTML',
  hint: term.hint || '',
}))

// 既存のRubyメソッドデータをDB用に変換（IDは自動生成）
const rubyWordsForDB = rubyMethods.map(method => ({
  original: method.original,
  mode: 'RUBY' as const,
  category: method.category || 'ruby',
  hint: method.hint || '',
}))

async function main() {
  console.log('🌱 シードデータの投入を開始します...')

  // HTML/CSS用語を挿入
  console.log('📝 HTML/CSS用語を投入中...')
  for (const term of htmlCssWordsForDB) {
    await prisma.word.upsert({
      where: { 
        original_mode: { 
          original: term.original, 
          mode: term.mode 
        } 
      },
      update: {
        category: term.category,
        hint: term.hint,
      },
      create: term
    })
  }
  console.log(`✅ HTML/CSS用語 ${htmlCssWordsForDB.length}件の投入完了`)
  
  // Rubyメソッドを挿入
  console.log('🔶 Ruby用語を投入中...')
  for (const method of rubyWordsForDB) {
    await prisma.word.upsert({
      where: { 
        original_mode: { 
          original: method.original, 
          mode: method.mode 
        } 
      },
      update: {
        category: method.category,
        hint: method.hint,
      },
      create: method
    })
  }
  console.log(`✅ Ruby用語 ${rubyWordsForDB.length}件の投入完了`)

  // 投入結果の確認
  const totalWords = await prisma.word.count()
  const htmlCssCount = await prisma.word.count({ where: { mode: 'HTML_CSS' } })
  const rubyCount = await prisma.word.count({ where: { mode: 'RUBY' } })

  console.log('📊 投入結果:')
  console.log(`   総単語数: ${totalWords}`)
  console.log(`   HTML/CSS: ${htmlCssCount}件`)
  console.log(`   Ruby: ${rubyCount}件`)
  console.log('🎉 シードデータの投入が完了しました！')
}

main()
  .catch((e) => {
    console.error('❌ シードデータ投入エラー:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })