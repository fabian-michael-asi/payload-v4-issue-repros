import type { CollectionConfig, FieldAffectingData } from 'payload'

import { LinkFeature, UploadFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const withEmailLinkType = (defaultFields: FieldAffectingData[]): FieldAffectingData[] =>
  defaultFields.map((field) =>
    field.type === 'radio' && field.name === 'linkType'
      ? { ...field, options: [...field.options, { label: 'Email', value: 'email' }] }
      : field,
  )

const addEmailLinkType = LinkFeature({
  fields: ({ defaultFields }) => [...withEmailLinkType(defaultFields), { name: 'rel', type: 'text' }],
})

const addEmailLinkTypeOnly = LinkFeature({
  fields: ({ defaultFields }) => withEmailLinkType(defaultFields),
})

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      admin: { components: { RowLabel: './components/ItemRowLabel#ItemRowLabel' } },
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'linkTypeContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => feature.key !== 'link'),
          addEmailLinkType,
        ],
      }),
    },
    {
      name: 'linkTypeOnlyContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => feature.key !== 'link'),
          addEmailLinkTypeOnly,
        ],
      }),
    },
    {
      name: 'noUploadCollectionsContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures.filter((feature) => feature.key !== 'upload'),
          UploadFeature({ disabledCollections: ['media'] }),
        ],
      }),
    },
  ],
}
