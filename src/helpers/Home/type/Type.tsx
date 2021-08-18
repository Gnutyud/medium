import { string } from "yup";

interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface Type {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}
export interface UserType {
  username: string;
  email: string;
}
