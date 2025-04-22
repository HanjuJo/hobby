export interface Hobby {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cost: {
    min: number;
    max: number;
    currency: string;
  };
  timeRequired: {
    frequency: string;
    duration: string;
  };
  location: string[];
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  hobbies: string[]; // hobby IDs
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  interests: string[]; // category IDs
  favoriteHobbies: string[]; // hobby IDs
  location: {
    city: string;
    state: string;
    country: string;
  };
  preferences: {
    difficulty: ('beginner' | 'intermediate' | 'advanced')[];
    maxCost: number;
    timeAvailability: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  name: string;
  type: 'space' | 'equipment' | 'mentor';
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  price: {
    amount: number;
    currency: string;
    period: 'hour' | 'day' | 'month';
  };
  availability: {
    days: string[];
    hours: string[];
  };
  relatedHobbies: string[]; // hobby IDs
  createdAt: Date;
  updatedAt: Date;
} 