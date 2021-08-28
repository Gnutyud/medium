interface ArticleType {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: AuthorType;
}

interface FormInputArticleType {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
