import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { z } from 'zod'

const es = initEdgeStore.create()

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicAvatar: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, //1MB
    })
    .input(
      z.object({
        type: z.enum(['avatar']),
      }),
    )
    .path(({ input }) => [{ type: input.type }]),
  artigoAvatar: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, //1MB
    })
    .input(
      z.object({
        type: z.enum(['avatar']),
      }),
    )
    .path(({ input }) => [{ type: input.type }]),
})

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})

export { handler as GET, handler as POST }

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter
