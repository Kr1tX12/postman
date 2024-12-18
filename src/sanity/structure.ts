import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('authors'),
      S.documentTypeListItem('startup').title('startups'),
      S.documentTypeListItem('playlist').title('playlists'),
    ])