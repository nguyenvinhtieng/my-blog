# Account

- email: string
- password: string
- name: string
- role: 'Admin' | 'User'

# Topic

- id: string
- title: string
- thumbnail: string
- created_at: Date
- updated_at: Date

# Blog

- id: string
- title: string
- thumbnail: string
- content_blocks: Json
- topic: TopicId[]
- created_at: Date
- updated_at: Date

# CodeBlock

- id: string
- blog_id: string (reference to Blog)
- code: string
- language: string
- description: string

# EmbedConfig

- id: string
- blog_id: string (reference to Blog)
- provider: 'stackblitz' | 'codepen' | 'jsfiddle'
- embed_url: string
- settings: JSON
