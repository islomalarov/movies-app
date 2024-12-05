import { FunctionComponent, useEffect, useState } from 'react';
import { usePageStore } from '../../../store/usePageStore';
import { useMovieStore } from '../../../store/useMovieStore';
import TheCard from './TheCard';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const TheCardsList: FunctionComponent = () => {
  const { page } = usePageStore();
  const { movies, fetchMovies } = useMovieStore();
  const [showFavorite, setShowFavorite] = useState(false);

  const filterMovies = showFavorite
    ? movies.filter((movie) => showFavorite === movie.favorite)
    : movies;

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  return (
    <div className="grid gap-4 pt-4">
      <div className="flex items-center justify-between">
        <div>{movies.length}</div>
        <Button onClick={() => setShowFavorite(!showFavorite)} className="bg-black">
          {showFavorite ? 'show all movies' : 'show favorite movies'}
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterMovies.length ? (
          filterMovies.map((movie) => <TheCard key={movie.id} movie={movie} />)
        ) : (
          <Alert className="col-span-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>No favorite movies</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default TheCardsList;
