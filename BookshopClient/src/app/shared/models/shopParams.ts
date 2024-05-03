export class ShopParams {
    genreId = 0;
    authorId = 0;
    sort = 'name';
    pageNumber? = 1;
    pageSize? = 6;
    search!: string
}