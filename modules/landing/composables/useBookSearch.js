import { ref } from 'vue';
import axios from 'axios';

export function useBookSearch() {
  const books = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const query = ref('');

  const searchBooks = async (searchQuery, page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&page=${page}&limit=10`);
      books.value = response.data.docs.map((book) => ({
        title: book.title,
        author_name: book.author_name,
        first_publish_year: book.first_publish_year,
        publisher: book.publisher,
        cover_url: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
        key: book.key
      }));
      totalPages.value = Math.ceil(response.data.num_found / 10);
    } catch (err) {
      error.value = 'Error al obtener los datos.';
    } finally {
      loading.value = false;
    }
  };


  const changePage = (page) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page;
      searchBooks(query.value, page);
    }
  };

  return {
    books,
    loading,
    error,
    searchBooks,
    currentPage,
    totalPages,
    changePage
  };
}
