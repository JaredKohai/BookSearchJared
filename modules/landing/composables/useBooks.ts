import { ref } from 'vue';
import axios from 'axios';
import type { Book } from '../interfaces/Book';

export function useBooks() {
  const books = ref<Book[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentPage = ref(1);
  const totalPages = ref(1);

  const searchBooks = async (query: string, filter: 'author' | 'title' | 'isbn', page: number = 1) => {
    isLoading.value = true;
    error.value = null;
    const url = `https://openlibrary.org/search.json?${filter}=${encodeURIComponent(query)}&page=${page}&limit=10`;

    try {
      const response = await axios.get(url);
      books.value = response.data.docs.map((book: any) => ({
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        publisher: book.publisher,
        cover_i: book.cover_i,
        isbn: book.isbn,
        key: book.key
      }));
      totalPages.value = Math.ceil(response.data.num_found / 10);
    } catch (err) {
      error.value = 'Error al buscar libros.';
    } finally {
      isLoading.value = false;
    }
  };

  const changePage = (query: string, filter: 'author' | 'title' | 'isbn', page: number) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page;
      searchBooks(query, filter, page);
    }
  };

  return {
    books,
    isLoading,
    error,
    searchBooks,
    currentPage,
    totalPages,
    changePage
  };
}
