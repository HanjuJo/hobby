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
  increment,
} from 'firebase/firestore';
import { db } from './firebase';
import { Post, Comment, Group, Event } from '@/types/community';

// 게시글 관련 함수
export async function getPosts(hobbyId?: string, categoryId?: string): Promise<Post[]> {
  let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(20));
  
  if (hobbyId) {
    q = query(q, where('hobbyId', '==', hobbyId));
  }
  if (categoryId) {
    q = query(q, where('categoryId', '==', categoryId));
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
}

export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Post;
  }
  return null;
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...post,
    likes: 0,
    comments: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updatePost(
  id: string,
  post: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, {
    ...post,
    updatedAt: Timestamp.now(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, 'posts', id));
}

// 댓글 관련 함수
export async function getComments(postId: string): Promise<Comment[]> {
  const q = query(
    collection(db, 'comments'),
    where('postId', '==', postId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
}

export async function createComment(
  comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'comments'), {
    ...comment,
    likes: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // 게시글의 댓글 수 증가
  const postRef = doc(db, 'posts', comment.postId);
  await updateDoc(postRef, {
    comments: increment(1),
  });

  return docRef.id;
}

// 그룹 관련 함수
export async function getGroups(hobbyId?: string): Promise<Group[]> {
  let q = query(collection(db, 'groups'), orderBy('createdAt', 'desc'));
  if (hobbyId) {
    q = query(q, where('hobbyId', '==', hobbyId));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Group));
}

export async function getGroup(id: string): Promise<Group | null> {
  const docRef = doc(db, 'groups', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Group;
  }
  return null;
}

export async function createGroup(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'groups'), {
    ...group,
    members: [group.leaderId],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function joinGroup(groupId: string, userId: string): Promise<void> {
  const groupRef = doc(db, 'groups', groupId);
  const group = await getGroup(groupId);
  
  if (!group) throw new Error('그룹을 찾을 수 없습니다.');
  if (group.members.includes(userId)) throw new Error('이미 가입된 그룹입니다.');
  if (group.members.length >= group.maxMembers) throw new Error('그룹이 가득 찼습니다.');

  await updateDoc(groupRef, {
    members: [...group.members, userId],
    updatedAt: Timestamp.now(),
  });
}

// 이벤트 관련 함수
export async function getEvents(groupId?: string): Promise<Event[]> {
  let q = query(collection(db, 'events'), orderBy('startDate', 'asc'));
  if (groupId) {
    q = query(q, where('groupId', '==', groupId));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
}

export async function getEvent(id: string): Promise<Event | null> {
  const docRef = doc(db, 'events', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Event;
  }
  return null;
}

export async function createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'events'), {
    ...event,
    currentParticipants: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function joinEvent(eventId: string): Promise<void> {
  const eventRef = doc(db, 'events', eventId);
  const event = await getEvent(eventId);
  
  if (!event) throw new Error('이벤트를 찾을 수 없습니다.');
  if (event.currentParticipants >= event.maxParticipants) throw new Error('이벤트가 가득 찼습니다.');

  await updateDoc(eventRef, {
    currentParticipants: increment(1),
    updatedAt: Timestamp.now(),
  });
} 