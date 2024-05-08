export interface IBookCreate {
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
    authorIds: number[]
    genreIds: number[]
  }