import type { RichTextNodes } from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'

import type { Post } from '../payload-types'

type LinkTypeNodes = RichTextNodes<Post['linkTypeContent']>
type LinkFields = Extract<
  Extract<LinkTypeNodes, { type: 'paragraph' }>['children'][number],
  { type: 'link' }
>['fields']

export const emailLink: LinkFields = { linkType: 'email', newTab: false }

type LinkTypeOnlyNodes = RichTextNodes<Post['linkTypeOnlyContent']>
type LinkTypeOnlyFields = Extract<
  Extract<LinkTypeOnlyNodes, { type: 'paragraph' }>['children'][number],
  { type: 'link' }
>['fields']

export const emailLinkWithoutExtraFields: LinkTypeOnlyFields = { linkType: 'email', newTab: false }

type NoUploadCollectionsNodes = RichTextNodes<Post['noUploadCollectionsContent']>

export const asLexicalNode = (node: NoUploadCollectionsNodes): SerializedLexicalNode => node
