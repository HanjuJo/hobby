export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  hobbyId: string;
  categoryId: string;
  likes: number;
  comments: number;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  postId: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  hobbyId: string;
  categoryId: string;
  leaderId: string;
  leaderName: string;
  members: string[];
  maxMembers: number;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  meetingSchedule: {
    frequency: string;
    dayOfWeek: string[];
    time: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  groupId: string;
  organizerId: string;
  organizerName: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  price: {
    amount: number;
    currency: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
} 