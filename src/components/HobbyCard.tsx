'use client';

import { Hobby } from '@/types/hobby';
import Link from 'next/link';

interface HobbyCardProps {
  hobby: Hobby;
}

export default function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <Link href={`/hobby/${hobby.id}`}>
      <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <img
            src={hobby.imageUrl}
            alt={hobby.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {hobby.difficulty === 'beginner' && '초급'}
              {hobby.difficulty === 'intermediate' && '중급'}
              {hobby.difficulty === 'advanced' && '고급'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">{hobby.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{hobby.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {hobby.timeRequired.frequency}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {hobby.cost.min.toLocaleString()}원 ~ {hobby.cost.max.toLocaleString()}원
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {hobby.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
} 