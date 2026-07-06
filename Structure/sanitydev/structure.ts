import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S, context) => {
  const roles = context.currentUser?.roles?.map((r: any) => r.name) || []
  const isAdmin = roles.includes('administrator') || roles.includes('admin')
  const isEditor = roles.includes('editor')
  const isSubscriber = roles.includes('subscriber')
  // currentEmail no longer needed since we removed per-user 'My Profile'

  if (isAdmin) {
    return S.list()
      .title('Content')
      .items([
        S.listItem()
          .title('Global Settings')
          .child(
            S.editor()
              .id('globalSettings-singleton')
              .schemaType('globalSettings')
              .documentId('globalSettings')
          ),
        S.listItem()
          .title('Web Settings')
          .child(
            S.editor()
              .id('webSettings-singleton')
              .schemaType('webSettings')
              .documentId('webSettings')
          ),
        S.documentTypeListItem('userProfile').title('User Profiles'),

        S.divider(),
        S.documentTypeListItem('page'),
        S.documentTypeListItem('blogPost'),
        S.documentTypeListItem('author'),
        S.documentTypeListItem('category'),
        S.documentTypeListItem('blogSearchStyle').title('Blog Search Style'),

        S.divider(),
        S.documentTypeListItem('headerSettings').title('Header Settings'),
        S.documentTypeListItem('menu').title('Header Menu'),
        S.documentTypeListItem('logoMenu').title('Logo Header'),

        S.divider(),
        S.documentTypeListItem('footerSettings').title('Footer Settings'),
        S.documentTypeListItem('footerMenu').title('Footer Menu'),
        S.documentTypeListItem('footerContent').title('Footer Content'),

        S.divider(),
        S.documentTypeListItem('sections').title('Sections'),
        S.documentTypeListItem('form').title('Forms'),
        S.documentTypeListItem('formStyle').title('Form Style'),

        S.divider(),
        S.documentTypeListItem('accordion').title('Accordion / FAQ'),
        S.documentTypeListItem('slider').title('Sliders'),
        S.documentTypeListItem('cookieBanner').title('Cookie Banner'),
        S.listItem()
          .title('Cookie Banner Pop Up Settings')
          .child(
            S.editor()
              .id('cookiePopupSettings-singleton')
              .schemaType('cookiePopupSettings')
              .documentId('cookiePopupSettings')
          ),
      ])
  }

  if (isEditor) {
    return S.list()
      .title('Editor')
      .items([
        S.listItem()
          .title('Web Settings')
          .child(
            S.editor()
              .id('webSettings-singleton')
              .schemaType('webSettings')
              .documentId('webSettings')
          ),
        S.divider(),
        S.documentTypeListItem('page').title('Pages'),
        S.documentTypeListItem('blogPost').title('Blog Posts'),
        S.documentTypeListItem('author').title('Authors'),
        S.documentTypeListItem('category').title('Categories'),
        S.documentTypeListItem('blogSearchStyle').title('Blog Search Style'),
        S.divider(),
        S.documentTypeListItem('headerSettings').title('Header Settings'),
        S.documentTypeListItem('menu').title('Header Menu'),
        S.documentTypeListItem('footerSettings').title('Footer Settings'),
        S.documentTypeListItem('footerMenu').title('Footer Menu'),
        S.listItem()
          .id('footerContent-singleton')
          .title('Footer Content')
          .child(
            S.editor()
              .id('footerContent-singleton')
              .schemaType('footerContent')
              .documentId('footerContent')
          ),
        S.divider(),
        S.documentTypeListItem('sections').title('Sections'),
        S.documentTypeListItem('accordion').title('Accordion / FAQ'),
        S.documentTypeListItem('slider').title('Sliders'),
        S.documentTypeListItem('form').title('Forms'),
      ])
  }

  if (isSubscriber) {
    // Subscribers manage their account via the frontend (/account page), not Studio.
    return S.list().title('Content').items([])
  }

  // default fallback: show limited content by default
  return S.list().title('Content').items([
    S.documentTypeListItem('page'),
    S.documentTypeListItem('blogPost'),
    S.documentTypeListItem('author'),
    S.documentTypeListItem('category'),
  ])
}
