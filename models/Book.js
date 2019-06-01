import Storage from "../providers/Storage";
import GoogleBooks from "../api/GoogleBooks";

class Book {
  /**
   * @param {string} id Id
   * @param {string} title Title
   * @param {Array} authors Authors
   * @param {string} cover Cover
   */
  constructor(id, title, authors, cover, description, publishedDate, ratingsCount, pageCount) {
    this.id = id || "";
    this.title = title || "";
    this.authors = Book.getAuthors(authors);
    this.cover = cover || "";
    this.description = description || "";
    this.publishedDate = publishedDate || "";
    this.ratingsCount = ratingsCount || "";
    this.pageCount = pageCount || "";
  }

  static save = async book => await Storage.save(book.id, book);

  static load = async book => await Storage.load(book.id);
  
  static exist = async book => await Storage.exist(book.id);

  static loadAll = async () => {
    const ids = await Storage.loadAll();
    return ids.map(id => JSON.parse(id[1]));
  };

  static remove = book => Storage.remove(book.id);

  static search = async (query, index) =>
    await GoogleBooks.search({ params: { query, index } });

  static get = async query =>
    await GoogleBooks.get({ params: { query } });

  static getAuthors = authors => {
    if (!authors) return "";
    if (!authors.length) return "";

    if (typeof authors === "string") return authors;

    if (authors.length > 1) {
      return `${authors.slice(0, authors.length - 1).join(", ")} and ${
        authors[authors.length - 1]
      }`;
    }
    return `${authors[0]}`;
  };

  static getMaxResCover = covers => {
    if (covers.medium) return covers.medium;
    if (covers.large) return covers.large;
    if (covers.extraLarge) return covers.extraLarge;
    return "";
  };
  
  static getPreviewCover = covers => {
    if (covers.thumbnail) return covers.thumbnail;
    if (covers.smallThumbnail) return covers.smallThumbnail;
    return "";
  };

  static parseBook = (response, authors) => {
    const { volumeInfo, id } = response;
    return new Book(
      id,
      volumeInfo.title,
      authors || volumeInfo.authors,
      Book.getMaxResCover(volumeInfo.imageLinks || {}),
      volumeInfo.description,
      volumeInfo.publishedDate,
      volumeInfo.ratingsCount,
      volumeInfo.pageCount,
    );
  };
  
  static parseSearchResult = (response, authors) => {
    const { volumeInfo, id } = response;
    return new Book(
      id,
      volumeInfo.title,
      authors || volumeInfo.authors,
      Book.getPreviewCover(volumeInfo.imageLinks || {}),
      volumeInfo.description,
      volumeInfo.publishedDate,
      volumeInfo.ratingsCount,
      volumeInfo.pageCount,
    );
  };

  static parseApiResponse = response =>
    new Book(
      response.google_book_id,
      response.name,
      response.author,
      response.photo_url,
    );
}

export default Book;
