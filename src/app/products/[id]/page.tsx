'use client';
import React, { FunctionComponent, useEffect } from 'react';
import { useMovieStore } from '../../../../store/useMovieStore';
import { useParams } from 'next/navigation';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Product: FunctionComponent = ({}) => {
  const { id } = useParams();
  const { movie, fetchMovie, toggleFavorite } = useMovieStore();

  useEffect(() => {
    fetchMovie(Number(id));
  }, [id, fetchMovie]);
  if (!movie) {
    return <div>Продукт не найден</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {movie.title}
          </h1>
          <button
            className={`text-red-500 ${movie.favorite ? 'fill-current' : ''}`}
            onClick={() => toggleFavorite(movie.id)}>
            <Heart fill={movie.favorite ? 'red' : 'none'} />
          </button>
          <p className="mb-8 leading-relaxed">{movie.overview}</p>

          <div className="flex justify-center">
            <Link
              href="/products"
              className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
              Back
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
          />
        </div>
      </div>
    </section>
  );
};

export default Product;
