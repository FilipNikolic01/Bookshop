import { IAuthor } from "./author"
import { IGenre } from "./genre"
import { IPublisher } from "./publisher"

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
    publisher: IPublisher
    authors: IAuthor[]
    genres: IGenre[]
  }