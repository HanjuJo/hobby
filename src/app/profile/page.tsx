'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '@/lib/firestore';
import { getCategories } from '@/lib/firestore';
import { Category, UserProfile } from '@/types/hobby';

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [userProfile, allCategories] = await Promise.all([
          getUserProfile(user.uid),
          getCategories(),
        ]);
        setProfile(userProfile);
        setCategories(allCategories);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">로그인이 필요합니다</h2>
        <p className="mt-2 text-gray-600">
          프로필을 설정하려면 로그인해주세요.
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">오류가 발생했습니다</h2>
        <p className="mt-2 text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">프로필 설정</h1>
        <p className="mt-2 text-gray-600">
          관심사와 선호도를 설정하여 맞춤형 취미를 추천받으세요.
        </p>

        <form className="mt-8 space-y-6">
          {/* 관심사 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              관심 있는 카테고리
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {categories.map((category) => (
                <div key={category.id} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={profile?.interests.includes(category.id)}
                      onChange={(e) => {
                        if (!profile) return;
                        const newInterests = e.target.checked
                          ? [...profile.interests, category.id]
                          : profile.interests.filter((id) => id !== category.id);
                        setProfile({ ...profile, interests: newInterests });
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700">
                      {category.name}
                    </label>
                    <p className="text-gray-500">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 난이도 선호도 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              선호하는 난이도
            </label>
            <div className="mt-2 space-y-4">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <div key={level} className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={profile?.preferences.difficulty.includes(level as any)}
                      onChange={(e) => {
                        if (!profile) return;
                        const newDifficulty = e.target.checked
                          ? [...profile.preferences.difficulty, level]
                          : profile.preferences.difficulty.filter((d) => d !== level);
                        setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            difficulty: newDifficulty as any,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700">
                      {level === 'beginner' && '초급'}
                      {level === 'intermediate' && '중급'}
                      {level === 'advanced' && '고급'}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 최대 비용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              최대 비용 (원)
            </label>
            <div className="mt-1">
              <input
                type="number"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={profile?.preferences.maxCost || 0}
                onChange={(e) => {
                  if (!profile) return;
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      maxCost: parseInt(e.target.value) || 0,
                    },
                  });
                }}
              />
            </div>
          </div>

          {/* 시간 가용성 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              가용 시간
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {['평일 오전', '평일 오후', '평일 저녁', '주말 오전', '주말 오후', '주말 저녁'].map(
                (timeSlot) => (
                  <div key={timeSlot} className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={profile?.preferences.timeAvailability.includes(timeSlot)}
                        onChange={(e) => {
                          if (!profile) return;
                          const newTimeSlots = e.target.checked
                            ? [...profile.preferences.timeAvailability, timeSlot]
                            : profile.preferences.timeAvailability.filter(
                                (slot) => slot !== timeSlot
                              );
                          setProfile({
                            ...profile,
                            preferences: {
                              ...profile.preferences,
                              timeAvailability: newTimeSlots,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700">{timeSlot}</label>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async () => {
                if (!profile || !user) return;
                try {
                  await updateUserProfile(user.uid, profile);
                  alert('프로필이 업데이트되었습니다.');
                } catch (err) {
                  setError('프로필 업데이트에 실패했습니다.');
                }
              }}
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 