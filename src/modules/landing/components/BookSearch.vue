<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 py-10 flex items-center justify-center">
    <div class="max-w-4xl mx-auto bg-gray-800 shadow-2xl rounded-2xl p-8 flex flex-col items-center">
      <h1 class="text-3xl font-extrabold text-gray-100 mb-6 text-center text-gradient bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text">Biblioteca Digital Jared!</h1>
      <p class="text-sm text-gray mb-6 text-center">Para más detalles sobre el libro, haz clic en la imagen del mismo.</p>

      <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 text-center text-blue-400">
        <input v-model="query" type="text" placeholder="Buscar..." class="flex-grow px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-gray-100 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
        <select v-model="filter" class="px-4 py-3 border border-gray-700 rounded-lg bg-gray-700 text-gray-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option value="title" class="text-black">Título</option>
          <option value="author" class="text-black">Autor</option>
          <option value="isbn" class="text-black">ISBN</option>
        </select>
        <button @click="search" class="px-6 py-3 bg-blue-600 text-gray-100 font-bold rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105 active:scale-95 active:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2">Buscar</button>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
        <div v-for="index in 6" :key="index" class="bg-gray-800 p-4 rounded-xl shadow-lg space-y-4 text-center animate-pulse">
          <div class="flex justify-center mb-4"><div class="w-16 h-20 bg-gray-700 rounded-md mx-auto"></div></div>
          <div class="h-4 w-3/4 bg-gray-700 mx-auto rounded"></div>
          <div class="h-4 w-2/3 bg-gray-700 mx-auto rounded mt-2"></div>
          <div class="h-4 w-1/2 bg-gray-700 mx-auto rounded mt-2"></div>
        </div>
      </div>

      <div v-if="error" class="text-center text-red-400">{{ error }}</div>

      <div v-if="!isLoading && books.length === 0" class="text-center text-gray-400">
        <p>No se encontraron resultados.</p>
      </div>

      <div v-if="books.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
        <div v-for="book in books" :key="Array.isArray(book.isbn) ? book.isbn.join(',') : book.isbn || book.title" class="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition space-y-4 text-center">
          <div class="flex justify-center mb-4">
            <a :href="`https://openlibrary.org/${book.key}`" target="_blank">
              <img :src="book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'" alt="Portada" :class="book.cover_i ? 'w-16 h-20 object-cover rounded-md mx-auto' : 'w-8 h-10 object-cover rounded-md mx-auto'" />
            </a>
          </div>
          <h2 class="text-lg font-semibold text-gray-100">{{ book.title }}</h2>
          <p class="text-sm text-gray-400 mt-2"><strong>Autor:</strong> {{ book.author_name?.join(', ') || 'Desconocido' }}</p>
          <p class="text-sm text-gray-400"><strong>Año:</strong> {{ book.first_publish_year || 'Desconocido' }}</p>
          <p class="text-sm text-gray-400"><strong>ISBN:</strong> {{ book.isbn?.join(', ') || 'No disponible' }}</p>
          <div class="my-4 border-t border-gray-600"></div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex justify-center mt-6 text-center text-blue-400">
        <button :disabled="currentPage <= 1" @click="changePage(query, filter, currentPage - 1)" class="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg mr-2 hover:bg-gray-600 transition">Anterior</button>
        <span class="text-gray-100">Página {{ currentPage }} de {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="changePage(query, filter, currentPage + 1)" class="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg ml-2 hover:bg-gray-600 transition">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBooks } from '../composables/useBooks'

const { books, isLoading, error, searchBooks, currentPage, totalPages, changePage } = useBooks()

const query = ref('')
const filter = ref<'author' | 'title' | 'isbn'>('title')

const search = async () => {
  await searchBooks(query.value, filter.value, currentPage.value)
}
</script>
