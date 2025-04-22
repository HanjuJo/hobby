import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Category, Hobby } from '@/types/hobby';

const categories: Omit<Category, 'id'>[] = [
  {
    name: '예술 & 창작',
    description: '그림, 음악, 공예 등',
    icon: '🎨',
    hobbies: [],
  },
  {
    name: '운동 & 스포츠',
    description: '요가, 등산, 수영 등',
    icon: '🏃',
    hobbies: [],
  },
  {
    name: '요리 & 식문화',
    description: '한식, 베이킹, 와인 등',
    icon: '🍳',
    hobbies: [],
  },
  {
    name: '게임 & 퍼즐',
    description: '보드게임, 퍼즐, 카드게임 등',
    icon: '🎮',
    hobbies: [],
  },
];

const hobbies: Omit<Hobby, 'id'>[] = [
  {
    name: '성악',
    description: '클래식 음악의 정수를 경험하세요',
    categoryId: '', // 카테고리 ID로 업데이트 필요
    difficulty: 'intermediate',
    cost: {
      min: 500000,
      max: 2000000,
      currency: 'KRW',
    },
    timeRequired: {
      frequency: '주 2-3회',
      duration: '회당 1-2시간',
    },
    location: ['연습실', '공연장'],
    imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
    tags: ['음악', '클래식', '성악'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    name: '등산',
    description: '자연과 함께하는 건강한 취미',
    categoryId: '', // 카테고리 ID로 업데이트 필요
    difficulty: 'beginner',
    cost: {
      min: 100000,
      max: 500000,
      currency: 'KRW',
    },
    timeRequired: {
      frequency: '주 1-2회',
      duration: '회당 3-4시간',
    },
    location: ['산', '등산로'],
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306',
    tags: ['운동', '자연', '건강'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    name: '그림 그리기',
    description: '나만의 예술 세계를 표현하세요',
    categoryId: '', // 카테고리 ID로 업데이트 필요
    difficulty: 'beginner',
    cost: {
      min: 100000,
      max: 300000,
      currency: 'KRW',
    },
    timeRequired: {
      frequency: '주 1-2회',
      duration: '회당 2-3시간',
    },
    location: ['집', '화실', '공방'],
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f',
    tags: ['예술', '창작', '드로잉'],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

export async function seedData() {
  try {
    // 카테고리 추가
    const categoryRefs = await Promise.all(
      categories.map(async (category) => {
        const docRef = await addDoc(collection(db, 'categories'), category);
        return { id: docRef.id, ...category };
      })
    );

    // 취미 추가 (카테고리 ID 업데이트)
    const hobbyRefs = await Promise.all(
      hobbies.map(async (hobby, index) => {
        const categoryId = categoryRefs[index % categoryRefs.length].id;
        const docRef = await addDoc(collection(db, 'hobbies'), {
          ...hobby,
          categoryId,
        });
        return { id: docRef.id, ...hobby, categoryId };
      })
    );

    // 카테고리에 취미 ID 추가
    await Promise.all(
      categoryRefs.map(async (category, index) => {
        const hobbyIds = hobbyRefs
          .filter((hobby) => hobby.categoryId === category.id)
          .map((hobby) => hobby.id);
        await addDoc(collection(db, 'categories'), {
          ...category,
          hobbies: hobbyIds,
        });
      })
    );

    console.log('데이터 시드 완료!');
  } catch (error) {
    console.error('데이터 시드 중 오류 발생:', error);
  }
} 