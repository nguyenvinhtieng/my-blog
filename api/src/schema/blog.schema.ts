import { BLOG_TYPE } from '@/constants/BlogConstant'
import joi from 'joi'

export const createBlogSchema = joi.object({
  title: joi.string().required(),
  thumbnail: joi.string().uri().allow(null).required(),
  contents: joi.array().required(),
  topic: joi.array().items(joi.string()),
  type: joi
    .string()
    .valid(...Object.values(BLOG_TYPE))
    .required()
})

export const updateBlogSchema = joi.object({
  title: joi.string(),
  thumbnail: joi.string().uri().allow(null),
  contents: joi.array(),
  topic: joi.array().items(joi.string()),
  type: joi.string().valid(...Object.values(BLOG_TYPE))
})
