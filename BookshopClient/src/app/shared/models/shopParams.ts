export class ShopParams {
    genreId = 0;
    authorId = 0;
    sort = 'name';
    pageNumber? = 1;
    pageSize? = 4;
    search!: string
}