import { Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile } from '@/lib/firestore';
import { getRecommendedHobbies } from '@/lib/recommendation';
import HobbyCard from '@/components/HobbyCard';
import LoadingSpinner from '@/components/LoadingSpinner';

async function RecommendedHobbies() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">로그인이 필요합니다</h2>
        <p className="mt-2 text-gray-600">
          맞춤형 취미 추천을 받으려면 로그인해주세요.
        </p>
        <a
          href="/login"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          로그인하기
        </a>
      </div>
    );
  }

  const userProfile = await getUserProfile(user.uid);
  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">프로필 설정이 필요합니다</h2>
        <p className="mt-2 text-gray-600">
          맞춤형 취미 추천을 받으려면 프로필을 설정해주세요.
        </p>
        <a
          href="/profile"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          프로필 설정하기
        </a>
      </div>
    );
  }

  const recommendedHobbies = await getRecommendedHobbies(userProfile);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {userProfile.displayName}님을 위한 맞춤 취미 추천
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          관심사와 선호도를 기반으로 추천된 취미입니다.
        </p>
      </div>

      <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recommendedHobbies.map((hobby) => (
          <HobbyCard key={hobby.id} hobby={hobby} />
        ))}
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RecommendedHobbies />
    </Suspense>
  );
} 