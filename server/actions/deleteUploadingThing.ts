"use server"

import { UTApi } from "uploadthing/server"// သင့် project ထဲက safe-action wrapper ကို သုံးပါ
import z from "zod"
import { deleteSchema } from "@/types/delete"
import { actionClient } from "./actions"

export const deleteFileAction =actionClient
  .inputSchema(
    deleteSchema
  )
  .action(async ({ parsedInput:{key} }) => {
    try {
        const utapi = new UTApi
      await utapi.deleteFiles(key)
      return { success: true }
    } catch (err) {
      console.error("Delete failed:", err)
      throw new Error("Failed to delete file")
    }
  })
