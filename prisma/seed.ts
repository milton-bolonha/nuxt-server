import { PrismaClient } from '@prisma/client'
import { congressBills, cityCouncilBills } from './seeds/bills'
import { federalLaws } from './seeds/laws'
import { definitions } from './seeds/definitions'
import { vips } from './seeds/vips'
import { executiveOrders } from './seeds/executive-orders'
import { municipalLaws } from './seeds/municipal-laws'
import { courtProcedures } from './seeds/court-procedures'
import { offices } from './seeds/offices'
import { files } from './seeds/files'
import { frcpRules } from './seeds/federal-rules-frcp'
import { frcmpRules } from './seeds/federal-rules-frcmp'
import { constitutionArticles, constitutionAmendments } from './seeds/constitution'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  console.log('🗑️  Clearing existing data...')
  await prisma.bill.deleteMany()
  await prisma.law.deleteMany()
  await prisma.executiveOrder.deleteMany()
  await prisma.municipalLaw.deleteMany()
  await prisma.definition.deleteMany()
  await prisma.vIP.deleteMany()
  await prisma.federalRule.deleteMany()
  await prisma.courtProcedure.deleteMany()
  await prisma.office.deleteMany()
  await prisma.file.deleteMany()
  await prisma.constitutionArticle.deleteMany()
  await prisma.constitutionAmendment.deleteMany()

  console.log('📜 Seeding bills...')
  for (const bill of [...congressBills, ...cityCouncilBills]) {
    await prisma.bill.create({ data: bill })
  }
  console.log(`✅ Seeded ${congressBills.length + cityCouncilBills.length} bills`)

  console.log('⚖️  Seeding federal laws...')
  for (const law of federalLaws) {
    await prisma.law.create({ data: law })
  }
  console.log(`✅ Seeded ${federalLaws.length} federal laws`)

  console.log('📋 Seeding executive orders...')
  for (const eo of executiveOrders) {
    await prisma.executiveOrder.create({ data: eo })
  }
  console.log(`✅ Seeded ${executiveOrders.length} executive orders`)

  console.log('🏛️  Seeding municipal laws...')
  for (const law of municipalLaws) {
    await prisma.municipalLaw.create({ data: law })
  }
  console.log(`✅ Seeded ${municipalLaws.length} municipal laws`)

  console.log('📖 Seeding definitions...')
  for (const definition of definitions) {
    await prisma.definition.create({ data: definition })
  }
  console.log(`✅ Seeded ${definitions.length} definitions`)

  console.log('⭐ Seeding VIPs...')
  for (const vip of vips) {
    await prisma.vIP.create({ data: vip })
  }
  console.log(`✅ Seeded ${vips.length} VIPs`)

  console.log('📚 Seeding federal rules...')
  for (const rule of [...frcpRules, ...frcmpRules]) {
    await prisma.federalRule.create({ data: rule })
  }
  console.log(`✅ Seeded ${frcpRules.length + frcmpRules.length} federal rules`)

  console.log('⚖️  Seeding court procedures...')
  for (const procedure of courtProcedures) {
    await prisma.courtProcedure.create({ data: procedure })
  }
  console.log(`✅ Seeded ${courtProcedures.length} court procedures`)

  console.log('🏢 Seeding offices...')
  for (const office of offices) {
    await prisma.office.create({ data: office })
  }
  console.log(`✅ Seeded ${offices.length} offices`)

  console.log('📄 Seeding files...')
  for (const file of files) {
    await prisma.file.create({ data: file })
  }
  console.log(`✅ Seeded ${files.length} files`)

  console.log('📜 Seeding constitution articles...')
  for (const article of constitutionArticles) {
    await prisma.constitutionArticle.create({ data: article })
  }
  console.log(`✅ Seeded ${constitutionArticles.length} constitution articles`)

  console.log('📜 Seeding constitution amendments...')
  for (const amendment of constitutionAmendments) {
    await prisma.constitutionAmendment.create({ data: amendment })
  }
  console.log(`✅ Seeded ${constitutionAmendments.length} constitution amendments`)
  
  console.log('✨ Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
