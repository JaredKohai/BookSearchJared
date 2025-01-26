import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Book } from '../interfaces/Book';

export const useBookStore = defineStore('bookStore', () => {
  const books = ref<Book[]>([]);

  const setBooks = (newBooks: Book[]) => {
    books.value = newBooks;
  };

  return { books, setBooks };
});
