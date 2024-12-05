'use client';

import { useState } from 'react';
import { useMovieStore, Movie } from '../../../store/useMovieStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const CreateProduct = () => {
  const { addMovie } = useMovieStore();
  const router = useRouter();

  const [formData, setFormData] = useState<Movie>({
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    vote_average: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fields = [
    { name: 'title', label: 'Название', type: 'text', placeholder: 'Введите название' },
    { name: 'overview', label: 'Описание', type: 'textarea', placeholder: 'Введите описание' },
    { name: 'poster_path', label: 'URL постера', type: 'text', placeholder: 'Введите URL постера' },
    {
      name: 'vote_average',
      label: 'Рейтинг (1-10)',
      type: 'number',
      placeholder: 'Введите рейтинг',
      min: 1,
      max: 10,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'vote_average' ? +value : value,
    }));
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Название обязательно';
    if (!formData.overview) newErrors.overview = 'Описание обязательно';
    if (!formData.poster_path) newErrors.poster_path = 'URL постера обязателен';
    if (formData.vote_average <= 0 || formData.vote_average > 10)
      newErrors.vote_average = 'Рейтинг должен быть от 1 до 10';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addMovie(formData);
    router.push('/products');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Создать продукт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name as keyof Movie] as string}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-2 border border-gray-300 rounded"></textarea>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof Movie] as string | number}
                onChange={handleChange}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                className="w-full p-2 border border-gray-300 rounded"
              />
            )}
            {errors[field.name] && <p className="text-red-500 text-sm">{errors[field.name]}</p>}
          </div>
        ))}

        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
