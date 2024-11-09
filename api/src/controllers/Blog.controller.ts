import { Request, Response } from 'express'
import logger from '@/utils/logger'
import { HTTP_STATUS } from '@/constants/CommonConstant'
import { CreateBlogRequestBody } from '@/types/Blog.types'
import { createBlogSchema, updateBlogSchema } from '@/schema/blog.schema'
import blogServices from '@/services/blog.service'

class BlogController {
  /**
   * @description Create a new blog
   * @endpoint POST /api/blog
   */
  async create(req: Request<object, object, CreateBlogRequestBody>, res: Response): Promise<void> {
    try {
      const { error } = createBlogSchema.validate(req.body, { abortEarly: false })

      if (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Validation error',
          errors: error.details.map((detail) => detail.message)
        })
        return
      }

      const userId = req.user?.userId

      if (!userId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
      }

      const blog = await blogServices.createBlog(req.body, userId)

      res.status(HTTP_STATUS.CREATED).json({ message: 'Blog created successfully', blog })
    } catch (error) {
      logger.error('Create blog failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
  }

  /**
   * @description Delete a blog or list of blogs
   * @endpoint DELETE /api/blog/
   */
  async delete(req: Request<object, object, { id: string | string[] }>, res: Response): Promise<void> {
    try {
      const { id } = req.body
      const deletedIds: string[] = Array.isArray(id) ? id : [id]

      if (deletedIds.length === 0) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid request' })
        return
      }

      // Fetch all blogs at once
      const blogs = await blogServices.getBlogsByIds(deletedIds) // Assuming getBlogsByIds method fetches all blogs by an array of IDs

      // Validate ownership and existence
      for (const blog of blogs) {
        if (!blog) {
          res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Blog not found' })
          return
        }

        if (blog.writer._id.toString() !== req.user?.userId) {
          res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
          return
        }
      }

      // Proceed with deletion
      const isDeleted = await blogServices.deleteBlogs(deletedIds) // Assuming deleteBlogs method deletes multiple blogs

      if (isDeleted) {
        res.status(HTTP_STATUS.OK).json({ message: 'Blogs deleted successfully', deletedIds })
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete blogs' })
      }
    } catch (error) {
      logger.error('Delete blog failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
  }

  /**
   * @description Update Blog Information
   * @endpoint PUT /api/blog/:id
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { error } = updateBlogSchema.validate(req.body, { abortEarly: false })

      if (error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Validation error',
          errors: error.details.map((detail) => detail.message)
        })
        return
      }

      const { id } = req.params

      const blogData = await blogServices.getBlogById(id)

      if (!blogData) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Blog not found' })
        return
      }

      if (blogData.writer._id.toString() !== req.user?.userId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
      }

      const updatedBlog = await blogServices.updateBlog(id, req.body)

      if (updatedBlog) {
        res.status(HTTP_STATUS.OK).json({ message: 'Blog updated successfully', blog: updatedBlog })
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Blog not found' })
      }
    } catch (error) {
      logger.error('Update blog failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
  }

  /**
   * @description Get List of Blogs
   * @endpoint GET /api/blog
   */
  async list(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 10, cursor, page, search, type } = req.query

      // Parse query parameters
      const parsedLimit = parseInt(limit as string, 10)
      const parsedPage = page ? parseInt(page as string, 10) : undefined

      // Build filters
      const filters: Record<string, any> = {}
      if (search) {
        // Search filter, could be title, content, etc.
        filters.$text = { $search: search } // Assuming you've indexed text fields
      }

      if (type) {
        filters.type = type // Blog type filter (e.g., 'PRIVATE' or 'PUBLIC')
      }

      const paginatedBlogs = await blogServices.getPaginatedBlogs(parsedLimit, cursor as string, parsedPage, filters)

      res.status(HTTP_STATUS.OK).json({
        message: 'Blogs retrieved successfully',
        ...paginatedBlogs
      })
    } catch (error) {
      logger.error('List blogs failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
  }

  /**
   * @description Get a single blog
   * @endpoint GET /api/blog/:slug
   */
  async get(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params
      const blog = await blogServices.getBlogBySlug(slug)

      if (blog) {
        res.status(HTTP_STATUS.OK).json({ message: 'Blog retrieved successfully', blog })
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Blog not found' })
      }
    } catch (error) {
      logger.error('Get blog failed: ' + error)
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
    }
  }
}

export default new BlogController()
