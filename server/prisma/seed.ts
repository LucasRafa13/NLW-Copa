import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "john.doe333@gmail.com",
      avatarUrl: "https://github.com/LucasRafa13.png"
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Pool 1",
      code: "123456",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-06T23:46:03.945Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR"
    }
  })

  await prisma.game.create({
    data: {
      date: "2022-11-08T23:46:03.945Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 5,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })
}

main()
