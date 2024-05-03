import { IAuthor } from "./author"
import { IGenre } from "./genre"

export interface IBook {
    id: number
    isbn: string
    title: string
    description: string
    pictureURL: string
    edition: number
    publicationDate: Date
    language: string
    format: string
    pages: number
    price: number
    quantityInStock: number
    publisherId: number
    publisher: string
    authors: IAuthor[]
    genres: IGenre[]
  }