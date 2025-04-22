import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Hobby, Category, UserProfile, Resource } from '@/types/hobby';

// 취미 관련 함수
export async function getHobby(id: string): Promise<Hobby | null> {
  const docRef = doc(db, 'hobbies', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Hobby;
  }
  return null;
}

export async function getHobbies(limit: number = 10): Promise<Hobby[]> {
  const q = query(collection(db, 'hobbies'), orderBy('createdAt', 'desc'), limit(limit));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Hobby));
}

export async function getHobbiesByCategory(categoryId: string): Promise<Hobby[]> {
  const q = query(collection(db, 'hobbies'), where('categoryId', '==', categoryId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Hobby));
}

export async function createHobby(hobby: Omit<Hobby, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'hobbies'), {
    ...hobby,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

// 카테고리 관련 함수
export async function getCategory(id: string): Promise<Category | null> {
  const docRef = doc(db, 'categories', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Category;
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  const querySnapshot = await getDocs(collection(db, 'categories'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
}

// 사용자 프로필 관련 함수
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as UserProfile;
  }
  return null;
}

export async function createUserProfile(
  userId: string,
  profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<void> {
  await addDoc(collection(db, 'users'), {
    ...profile,
    id: userId,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function updateUserProfile(
  userId: string,
  profile: Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    ...profile,
    updatedAt: Timestamp.now(),
  });
}

// 리소스 관련 함수
export async function getResourcesByHobby(hobbyId: string): Promise<Resource[]> {
  const q = query(collection(db, 'resources'), where('relatedHobbies', 'array-contains', hobbyId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
}

export async function getResourcesByLocation(
  city: string,
  state: string,
  country: string
): Promise<Resource[]> {
  const q = query(
    collection(db, 'resources'),
    where('location.city', '==', city),
    where('location.state', '==', state),
    where('location.country', '==', country)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resource));
} 