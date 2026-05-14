import * as S from 'sanity/desk'
import type { StructureResolver, ListItemBuilder } from 'sanity/structure'

// Very simple role resolution via localStorage token or window var is not secure for real prod.
// In production you should use Sanity's role system or a proper auth proxy.

const resolver: StructureResolver = (Sctx, context) => {
  // Try to read a role hint from a global; fallback to 'subscriber'
  // You can enhance by plugging a custom auth and setting window.__ROLE__ at login
  const role = (typeof window !== 'undefined' && (window as any).__ROLE__) || 'administrator'

  if (role === 'administrator') {
    return S.list()
      .title('Content')
      .items([
        S.documentTypeListItem('page'),
        S.documentTypeListItem('blogPost'),
        S.documentTypeListItem('author'),
        S.documentTypeListItem('category'),
        S.divider(),
        S.documentTypeListItem('userProfile'),
        S.divider(),
        ...S.documentTypeListItems().filter((i: ListItemBuilder) => !['page','blogPost','author','category','userProfile'].includes(i.getId()||''))
      ])
  }

  if (role === 'editor') {
    return S.list()
      .title('Editor')
      .items([
        S.documentTypeListItem('page'),
        S.documentTypeListItem('blogPost'),
        S.documentTypeListItem('author'),
        S.documentTypeListItem('category'),
      ])
  }

  // Subscriber: only their own userProfile (this requires _id known; otherwise list is hidden)
  const userId = (typeof window !== 'undefined' && (window as any).__USER_ID__) || ''
  if (userId) {
    return S.list()
      .title('Profile')
      .items([
        S.listItem()
          .title('My Profile')
          .child(
            S.editor()
              .id(`userProfile.${userId}`)
              .schemaType('userProfile')
              .documentId(`userProfile.${userId}`)
          )
      ])
  }
  return S.list().title('Profile').items([])
}

export default resolver
