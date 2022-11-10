import { z } from "zod"
import { FastifyInstance } from "fastify"

import { prisma } from "../lib/prisma"

import ShortUniqueId from "short-unique-id"

export async function guessesRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count()

    return { count }
  })
}
