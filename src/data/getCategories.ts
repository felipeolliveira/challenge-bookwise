import { z } from 'zod'

import { GetData } from '.'

const getCategoriesSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  }),
)

export type GetCategoriesResponse = z.infer<typeof getCategoriesSchema>

export const getCategories: GetData<void, GetCategoriesResponse> = {
  key: 'categories',
  fetch: () => {
    return async () => {
      const response = await fetch(`/api/categories`)
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      const categories = getCategoriesSchema.parse(json)

      return categories
    }
  },
}
