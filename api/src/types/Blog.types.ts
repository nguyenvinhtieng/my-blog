import { BLOG_TYPE } from '@/constants/BlogConstant'
import { Types } from 'mongoose'

export type CoreBlogContentBlock = {
  type: 'HTML' | 'CODE'
}

export type TextBlock = CoreBlogContentBlock & {
  type: 'HTML'
  text: string
}

export type CodeBlock = CoreBlogContentBlock & {
  type: 'CODE'
  code: string
  language: string
}

export type BlogContent = TextBlock | CodeBlock

export type BlogType = keyof typeof BLOG_TYPE

export interface Blog extends Document {
  _id: string
  title: string
  thumbnail: string
  slug: string
  contents: BlogContent[]
  topic?: string[]
  writer: Types.ObjectId
  type: BlogType
  created_at: Date
  updated_at: Date
}

export interface CreateBlogRequestBody {
  title: string
  thumbnail: string
  contents: BlogContent[]
  topic?: string[]
  type: BlogType
}
