interface Author {
  username: string,
  image: string,
  following: boolean
}

export interface ArticleType {
  id: string,
  slug: string,
  title: string,
  description: string,
  body: string,
  createdAt: string,
  updatedAt: string,
  tagList: string[],
  favorited: boolean,
  favoritesCount: number,
  author: Author,
}
