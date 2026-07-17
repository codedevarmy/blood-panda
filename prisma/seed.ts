import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../app/generated/prisma/client.js"

import { readdir, readFile } from "node:fs/promises"
import type { MiniPackage } from "~/types/index.js"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

// const packageNames = ["silver", "gold", "platinum", "diamond", "signature"]

// read all json files only
const filesPath = "./app/constants/mini-packages"

async function readingFileFromLocal(
  filePath: string,
  encoding: BufferEncoding
) {
  return readdir(filesPath, { withFileTypes: true }).then((files) => {
    const jsonFiles = files.filter(
      (file) => file.isFile() && file.name.endsWith(".json")
    )
    // console.log("jsonFiles", jsonFiles.map((file) => file.name))

    return Promise.all(
      jsonFiles.map(async (file) => {
        return {
          fileName: file.name.replace(".json", ""),
          data: (await readFile(`${filesPath}/${file.name}`, encoding).then(
            (res) => JSON.parse(res)
          )) as MiniPackage,
        }
      })
    )
  })
}

const prepared = [
  {
    id: "916cd103-20bc-48dc-a30a-0f128177bedd",
    name: "Prenatal Screen I",
    originalPrice: "2380",
    discountedPrice: "1700",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "2d858d05-2a0c-4774-a885-0db7103e8b62",
    name: "Prenatal Screen II",
    originalPrice: "2380",
    discountedPrice: "1700",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "38cfc812-4ac7-4dcf-bfc5-e824080f023d",
    name: "Prenatal Screen (NIPT)",
    originalPrice: "4900",
    discountedPrice: "3500",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "3b94dba4-a958-4bfb-8b49-a740eb0d9a18",
    name: "Beta HCG",
    originalPrice: "1050",
    discountedPrice: "750",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "44602f28-3572-46e4-b090-c44529087b18",
    name: "AMH",
    originalPrice: "2380",
    discountedPrice: "1700",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "1e593d67-8ee0-405b-bba7-30a07ea8a02b",
    name: "Progesterone",
    originalPrice: "630",
    discountedPrice: "450",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "e50f0c80-8a56-498e-a327-dc76e1a1a84f",
    name: "Estradiol",
    originalPrice: "840",
    discountedPrice: "600",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "9a74c3af-e073-4990-9432-e89e1834918e",
    name: "FSH",
    originalPrice: "560",
    discountedPrice: "400",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
  {
    id: "d8089ca6-50c0-4dd7-bdfe-71e646d89682",
    name: "LH",
    originalPrice: "490",
    discountedPrice: "350",
    discountAmount: "30",
    primaryCategoryId: "90884da7-d0fe-4acb-bead-fa82003c9824",
    secondaryCategoryId: "13e21c60-f9d1-407c-9fc4-dd0a89b7caa2",
  },
]

export async function main() {
  try {
    console.log("Start seeding ... 🌱🌱🌱")

    // await prisma.$connect()

    for (const plan of prepared) {
      await prisma.bloodTest.create({
        data: {
          name: plan.name,
          originalPrice: plan.originalPrice,
          discountedPrice: plan.discountedPrice,
          discountAmount: plan.discountAmount,
          primaryCategoryId: plan.primaryCategoryId,
          secondaryCategoryId: plan.secondaryCategoryId,
        },
      })
    }

    // await prisma.bloodTest.create({
    //   data: {
    //     name: "Blood Test 1",
    //     originalPrice: "100",
    //     discountedPrice: "70",
    //     discountAmount: "30",
    //     primaryCategoryId: "",
    //     secondaryCategoryId: "",
    //   },
    // })

    console.log("Seeding finished. 🌱🌱🌱")
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1) // Exit the process with a failure code
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log("Seeding finished. 🌱🌱🌱")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

async function main2() {
  const allData = (await readingFileFromLocal(filesPath, "utf-8")) as {
    fileName: string
    data: MiniPackage
  }[]
  console.log("allData", JSON.stringify(allData))
  console.log("Start seeding ... 🌱🌱🌱")
  // await prisma.$connect()

  // const prepared = plans.map((plan) => {
  //   return {
  //     name: plan.fileName,
  //     description: plan.data.description,
  //     originalAmount: plan.data.orgPrice,
  //     discountedAmount: plan.data.disPrice,
  //     extraFeatures: plan.data.extraFeatures,
  //     packageCategories: {
  //       create: plan.data.categories.map((category) => ({
  //         // Convert name to lowercase and replace spaces with underscores
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   }
  // })

  // const prepared = miniPackages.map((plan) => {
  //   return {
  //     name: plan.fileName,
  //     description:
  //       "This package includes " +
  //       plan.data.benefits.length +
  //       " individual tests",
  //     originalAmount: plan.data.orgPrice,
  //     discountedAmount: plan.data.disPrice,
  //     extraFeatures: plan.data.extraFeatures,
  //   }
  // })

  // await prisma.miniPackage.createMany({
  //   data: prepared,
  //   skipDuplicates: true, // Skip duplicates based on unique constraints
  // })

  // const sliverPlan = await prisma.package.create({
  //   data: {
  //     name: plans[4].fileName,
  //     description: plans[4].data.description,
  //     originalAmount: plans[4].data.orgPrice,
  //     discountedAmount: plans[4].data.disPrice,
  //     extraFeatures: plans[4].data.extraFeatures,
  //     packageCategories: {
  //       create: plans[4].data.categories.map((category) => ({
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   },
  // })

  // const goldPlan = await prisma.package.create({
  //   data: {
  //     name: plans[1].fileName,
  //     description: plans[1].data.description,
  //     originalAmount: plans[1].data.orgPrice,
  //     discountedAmount: plans[1].data.disPrice,
  //     extraFeatures: plans[1].data.extraFeatures,
  //     packageCategories: {
  //       create: plans[1].data.categories.map((category) => ({
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   },
  // })

  // const platinumPlan = await prisma.package.create({
  //   data: {
  //     name: plans[2].fileName,
  //     description: plans[2].data.description,
  //     originalAmount: plans[2].data.orgPrice,
  //     discountedAmount: plans[2].data.disPrice,
  //     extraFeatures: plans[2].data.extraFeatures,
  //     packageCategories: {
  //       create: plans[2].data.categories.map((category) => ({
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   },
  // })

  // const diamondPlan = await prisma.package.create({
  //   data: {
  //     name: plans[0].fileName,
  //     description: plans[0].data.description,
  //     originalAmount: plans[0].data.orgPrice,
  //     discountedAmount: plans[0].data.disPrice,
  //     extraFeatures: plans[0].data.extraFeatures,
  //     packageCategories: {
  //       create: plans[0].data.categories.map((category) => ({
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   },
  // })

  // const signaturePlan = await prisma.package.create({
  //   data: {
  //     name: plans[3].fileName,
  //     description: plans[3].data.description,
  //     originalAmount: plans[3].data.orgPrice,
  //     discountedAmount: plans[3].data.disPrice,
  //     extraFeatures: plans[3].data.extraFeatures,
  //     packageCategories: {
  //       create: plans[3].data.categories.map((category) => ({
  //         name: category.name.toLowerCase().replace(/\s+/g, "_"),
  //         features: category.features,
  //       })),
  //     },
  //   },
  // })

  // Create a package with multiple categories
  // const adventurePackage = await prisma.package.upsert({
  //   where: { id: "00000000-0000-0000-0000-000000000001" },
  //   update: {},
  //   create: {
  //     name: "Adventure Package",
  //     description: "An exciting adventure package",
  //     cover: "/packages-bg.png",
  //     originalAmount: "500",
  //     discountedAmount: "400",
  //     offerAmount: "20",
  //     extraFeatures: ["Free transport", "Guided tour"],
  //     packageCategories: {
  //       create: [
  //         {
  //           name: "Hiking",
  //           features: ["Mountain trails", "Camping gear"],
  //         },
  //         {
  //           name: "Water Sports",
  //           features: ["Kayaking", "Snorkeling"],
  //         },
  //       ],
  //     },
  //   },
  // })
  // const luxuryPackage = await prisma.package.upsert({
  //   where: { id: "00000000-0000-0000-0000-000000000002" },
  //   update: {},
  //   create: {
  //     name: "Luxury Package",
  //     description: "A premium luxury experience",
  //     cover: "/packages-bg.png",
  //     originalAmount: "1500",
  //     discountedAmount: "1200",
  //     offerAmount: "30",
  //     extraFeatures: ["VIP lounge", "Personal butler"],
  //     packageCategories: {
  //       create: [
  //         {
  //           name: "Spa & Wellness",
  //           features: ["Full body massage", "Sauna access"],
  //         },
  //       ],
  //     },
  //   },
  // })
  // console.log({ adventurePackage, luxuryPackage })

  console.log({
    // sliverPlan,
    // goldPlan,
    // platinumPlan,
    // diamondPlan,
    // signaturePlan,
  })
}

// main2()
//   .then(async () => {
//     await prisma.$disconnect()
//     console.log("Seeding finished. 🌱🌱🌱")
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
