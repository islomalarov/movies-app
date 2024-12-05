import { create } from 'zustand';
const API_BASE_URL = 'https://api.themoviedb.org/3/movie';
const apiKey = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

export interface Movie {
  favorite?: boolean;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

interface MovieStore {
  movies: Movie[];
  movie: Movie | null;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchMovies: (page: number) => Promise<void>;
  fetchMovie: (movie_id: number) => void;
  deleteMovie: (id: number) => void;
  toggleFavorite: (movie_id: number) => void;
  addMovie: (newMovie: Movie) => void;
}
const fetchApi = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
  }
  return response.json();
};
export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  movie: null,
  totalPages: 0,
  isLoading: false,
  error: null,
  fetchMovies: async (page: number) => {
    set({ isLoading: true, error: null });
    try {
      const { results, total_pages } = await fetchApi(
        `${API_BASE_URL}/top_rated?api_key=${apiKey}&language=ru-RU&page=${page}`,
      );
      set({ movies: results, totalPages: total_pages, isLoading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Unknown error occurred', isLoading: false });
      }
    }
  },
  fetchMovie: (movie_id: number) => {
    set((state) => ({ movie: state.movies.find((movie) => movie.id === movie_id) }));
  },
  deleteMovie: (id: number) => {
    set((state) => ({ movies: state.movies.filter((movie) => movie.id !== id) }));
  },
  toggleFavorite: (movie_id: number) => {
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === movie_id ? { ...movie, favorite: !movie.favorite } : movie,
      ),
    }));
  },
  addMovie: (newMovie: Movie) => {
    set((state) => ({
      movies: [...state.movies, { ...newMovie, id: Date.now() }],
    }));
  },
}));
