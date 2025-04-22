'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getPosts, getGroups } from '@/lib/community';
import { Post, Group } from '@/types/community';
import Link from 'next/link';

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, groupsData] = await Promise.all([
          getPosts(),
          getGroups()
        ]);
        setPosts(postsData);
        setGroups(groupsData);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
          {user && (
            <Link
              href="/community/write"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              글쓰기
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 게시글 목록 */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">최근 게시글</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/posts/${post.id}`}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>{post.likes} 좋아요</span>
                    <span className="mx-2">•</span>
                    <span>{post.comments} 댓글</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 그룹 목록 */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">활동 그룹</h2>
            <div className="space-y-4">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/community/groups/${group.id}`}
                  className="block bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{group.name}</h3>
                  <p className="text-gray-600 line-clamp-2">{group.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>{group.members.length}/{group.maxMembers} 명</span>
                    <span className="mx-2">•</span>
                    <span>{group.location}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 