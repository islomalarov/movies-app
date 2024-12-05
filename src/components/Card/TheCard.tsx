import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { FunctionComponent } from 'react';
import { Heart, Star, Trash } from 'lucide-react';
import { useMovieStore } from '../../../store/useMovieStore';

interface TheCardProps {
  movie: {
    favorite?: boolean;
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
  };
}

const TheCard: FunctionComponent<TheCardProps> = ({ movie }) => {
  const { deleteMovie, toggleFavorite } = useMovieStore();

  return (
    <Card>
      <Link href={`/products/${movie.id}`}>
        <CardHeader className="text-center">
          <CardTitle className="truncate">{movie.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-stretch gap-4">
          <CardDescription className="text-justify h-5 truncate">{movie.overview}</CardDescription>
          <div className="relative w-full h-0 pb-[150%]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              priority
            />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <button
          className={`text-red-500 ${movie.favorite ? 'fill-current' : ''}`}
          onClick={() => toggleFavorite(movie.id)}>
          <Heart fill={movie.favorite ? 'red' : 'none'} />
        </button>
        <div className="flex items-center gap-4">
          <Star fill="yellow" />
          {movie.vote_average}
        </div>
        <button onClick={() => deleteMovie(movie.id)}>
          <Trash />
        </button>
      </CardFooter>
    </Card>
  );
};

export default TheCard;
