import { Schema, model } from 'mongoose'
import { Blog } from '@/types/Blog.types'
import { BLOG_TYPE } from '@/constants/BlogConstant'

const blogSchema = new Schema<Blog>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    contents: [{ type: Schema.Types.Mixed, required: true }],
    topic: { type: [String] },
    writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    slug: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: Object.values(BLOG_TYPE),
      required: true,
      default: BLOG_TYPE.PRIVATE
    }
  },
  {
    timestamps: true
  }
)

const BlogModel = model<Blog>('Blog', blogSchema)

export default BlogModel
