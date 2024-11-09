import { USER_SENSITIVE_FIELDS } from './../constants/UserConstant'
import { OrNull } from '@/types/Common.types'
import logger from '@/utils/logger'
import { Blog, CreateBlogRequestBody } from '@/types/Blog.types'
import slugify from 'slugify'
import BlogModel from '@/models/Blog.model'

const blogServices = {
  /**
   * @description Create a new Blog
   * @returns Blog | null
   */
  createBlog: async (body: CreateBlogRequestBody, userId: string): Promise<OrNull<Blog>> => {
    try {
      // Generate slug from the title
      const blogSlug = slugify(body.title, { lower: true, strict: true })

      // Check if slug already exists and modify if necessary to ensure uniqueness
      let uniqueSlug = blogSlug
      let suffix = 1

      while (await BlogModel.exists({ slug: uniqueSlug })) {
        uniqueSlug = `${blogSlug}-${suffix}`
        suffix += 1
      }

      // Create the blog document
      const newBlog = new BlogModel({
        ...body,
        writer: userId,
        slug: uniqueSlug
      })

      const blog = await newBlog.save()
      return blog
    } catch (e) {
      logger.error('Check for admin account failed: ' + e)
      return null
    }
  },

  /**
   * @description Delete a Blog or multiple Blogs with id
   * @param id string | string[]
   * @returns Blog | null
   */
  deleteBlogs: async (id: string | string[]): Promise<boolean> => {
    try {
      if (typeof id === 'string') {
        const result = await BlogModel.deleteOne({ _id: id })
        return Boolean(result.deletedCount)
      }

      const result = await BlogModel.deleteMany({ _id: { $in: id } })
      return Boolean(result.deletedCount)
    } catch (e) {
      logger.error('Delete blog failed: ' + e)
      return false
    }
  },

  /**
   * @description Update Blog with field in CreateBlogRequestBody
   * @param id string
   * @param body CreateBlogRequestBody
   * @returns Blog | null
   */
  updateBlog: async (id: string, body: CreateBlogRequestBody): Promise<OrNull<Blog>> => {
    try {
      const blog = await BlogModel.findById(id)

      if (!blog) {
        return null
      }

      Object.assign(blog, body)
      await blog.save()
      return blog
    } catch (e) {
      logger.error('Update blog failed: ' + e)
      return null
    }
  },

  /**
   * @description Get all Blogs with pagination
   * @returns Blog[]
   */
  getPaginatedBlogs: async (limit: number, cursor?: string, page?: number, filters: Record<string, any> = {}) => {
    try {
      // Base query with filters
      const query = BlogModel.find(filters)
        .populate({
          path: 'writer',
          select: USER_SENSITIVE_FIELDS // Exclude sensitive fields
        })
        .sort({ created_at: -1 })

      // Apply cursor-based pagination if cursor is provided
      if (cursor) {
        query.where('_id').lt(Number(cursor)) // Assuming '_id' can be used as a cursor
      }
      // Apply page-based pagination if page is provided
      else if (page) {
        query.skip((page - 1) * limit)
      }

      // Limit the number of results
      const blogs = await query.limit(limit)

      // Prepare the next cursor for cursor-based pagination
      const nextCursor = blogs.length ? blogs[blogs.length - 1]._id : null

      // Total page
      const totalPage = ((await BlogModel.countDocuments(filters)) || 0) / limit

      return {
        blogs,
        nextCursor, // for cursor-based pagination
        currentPage: page || 1, // for page-based pagination
        totalPage
      }
    } catch (error) {
      logger.error('Get paginated blogs failed: ' + error)
      throw new Error('Failed to fetch blogs')
    }
  },

  /**
   * @description Get Blog by Slug
   * @param id string
   * @returns Blog | null
   */
  getBlogBySlug: async (slug: string): Promise<OrNull<Blog>> => {
    try {
      const blog = await BlogModel.findOne({ slug }).populate({
        path: 'writer',
        select: USER_SENSITIVE_FIELDS
      })
      return blog
    } catch (e) {
      logger.error('Get blog by slug failed: ' + e)
      return null
    }
  },

  /**
   * @description Get Blog by Id
   * @param id string
   * @returns Blog | null
   */
  getBlogById: async (id: string): Promise<OrNull<Blog>> => {
    try {
      const blog = await BlogModel.findById(id).populate({
        path: 'writer',
        select: USER_SENSITIVE_FIELDS
      })
      return blog
    } catch (e) {
      logger.error('Get blog by id failed: ' + e)
      return null
    }
  },

  /**
   * @description Get Blogs by Ids
   * @param ids string[]
   * @returns Blog[]
   */
  getBlogsByIds: async (ids: string[]): Promise<Blog[]> => {
    try {
      const blogs = await BlogModel.find({ _id: { $in: ids } }).populate({
        path: 'writer',
        select: USER_SENSITIVE_FIELDS
      })
      return blogs
    } catch (e) {
      logger.error('Get blogs by ids failed: ' + e)
      return []
    }
  }
}

export default blogServices
