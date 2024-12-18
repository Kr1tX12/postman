import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
    *[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match  $search] | order(_createdAt desc) {
        author -> {
            _id, name, image, slug
        },
        views,
        slug,
        image,
        description,
        title,
        pitch,
        category,
        _createdAt,
    }`
);

export const STARTUP_QUERY_BY_SLUG = defineQuery(`
    *[_type == 'startup' && slug.current == $slug][0] {
        author -> {
            _id, name, username, image, bio, slug
        },
        _id,
        views,
        slug,
        image,
        description,
        title,
        pitch,
        category,
        pitch,
        _createdAt,
    }
`);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0] {
        views, _id
    }     
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
   *[_type == 'author' && id == $id][0] {
        _id,
        id,
        name,
        username,
        slug,
        age,
        image, 
        bio,
        email
   } 
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == 'author' && _id == $id][0] {
         _id,
         id,
         name,
         username,
         slug,
         age,
         image, 
         bio,
         email
    } 
 `);
 

export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
    *[_type == 'author' && slug.current == $slug][0] {
         _id,
         id,
         name,
         username,
         slug,
         age,
         image, 
         bio,
         email
    } 
 `);

export const STARTUPS_BY_USER_ID_QUERY = defineQuery(`
    *[_type == 'startup' && author->id == $userID] | order(_createdAt desc) {
        author -> {
            _id, name, image, slug
        },
        views,
        slug,
        image,
        description,
        title,
        pitch,
        category,
        _createdAt,
    }
`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
    *[_type == 'playlist' && slug.current == $slug][0] {
        _id,
        title,
        slug,
        select[] -> {
            author -> {
                _id, name, image, slug
            },
            views,
            slug,
            image,
            description,
            title,
            pitch,
            category,
            _createdAt,
            _id
        }
    }`
)