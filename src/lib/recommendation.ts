import { Hobby, UserProfile } from '@/types/hobby';
import { getHobbies, getHobbiesByCategory } from './firestore';

interface RecommendationScore {
  hobby: Hobby;
  score: number;
}

export async function getRecommendedHobbies(userProfile: UserProfile): Promise<Hobby[]> {
  // 1. 사용자의 관심사 기반 취미 가져오기
  const interestBasedHobbies = await Promise.all(
    userProfile.interests.map(categoryId => getHobbiesByCategory(categoryId))
  );
  const allHobbies = interestBasedHobbies.flat();

  // 2. 각 취미에 대한 점수 계산
  const scoredHobbies: RecommendationScore[] = allHobbies.map(hobby => ({
    hobby,
    score: calculateHobbyScore(hobby, userProfile),
  }));

  // 3. 점수 기준으로 정렬
  scoredHobbies.sort((a, b) => b.score - a.score);

  // 4. 상위 10개 취미 반환
  return scoredHobbies.slice(0, 10).map(item => item.hobby);
}

function calculateHobbyScore(hobby: Hobby, userProfile: UserProfile): number {
  let score = 0;

  // 1. 난이도 매칭 점수
  if (userProfile.preferences.difficulty.includes(hobby.difficulty)) {
    score += 3;
  }

  // 2. 비용 적합성 점수
  const maxCost = userProfile.preferences.maxCost;
  if (hobby.cost.max <= maxCost) {
    score += 2;
  } else if (hobby.cost.min <= maxCost) {
    score += 1;
  }

  // 3. 시간 가용성 점수
  const userTimeSlots = userProfile.preferences.timeAvailability;
  const hobbyFrequency = hobby.timeRequired.frequency;
  const hobbyDuration = hobby.timeRequired.duration;

  // 시간 가용성 체크 로직
  if (isTimeCompatible(userTimeSlots, hobbyFrequency, hobbyDuration)) {
    score += 2;
  }

  // 4. 태그 기반 점수
  const userInterests = userProfile.interests;
  const matchingTags = hobby.tags.filter(tag => 
    userInterests.some(interest => interest.toLowerCase().includes(tag.toLowerCase()))
  );
  score += matchingTags.length;

  return score;
}

function isTimeCompatible(
  userTimeSlots: string[],
  hobbyFrequency: string,
  hobbyDuration: string
): boolean {
  // 주간 빈도수 파싱
  const frequencyMatch = hobbyFrequency.match(/주\s*(\d+)-(\d+)회/);
  if (!frequencyMatch) return false;

  const minFrequency = parseInt(frequencyMatch[1]);
  const maxFrequency = parseInt(frequencyMatch[2]);

  // 사용자의 가용 시간 슬롯 수가 취미의 최소 빈도수보다 많거나 같은지 확인
  return userTimeSlots.length >= minFrequency;
}

export async function getSimilarHobbies(hobby: Hobby): Promise<Hobby[]> {
  // 1. 같은 카테고리의 취미 가져오기
  const categoryHobbies = await getHobbiesByCategory(hobby.categoryId);
  
  // 2. 현재 취미 제외
  const otherHobbies = categoryHobbies.filter(h => h.id !== hobby.id);
  
  // 3. 유사도 점수 계산
  const scoredHobbies: RecommendationScore[] = otherHobbies.map(otherHobby => ({
    hobby: otherHobby,
    score: calculateSimilarityScore(hobby, otherHobby),
  }));
  
  // 4. 점수 기준으로 정렬
  scoredHobbies.sort((a, b) => b.score - a.score);
  
  // 5. 상위 5개 취미 반환
  return scoredHobbies.slice(0, 5).map(item => item.hobby);
}

function calculateSimilarityScore(hobby1: Hobby, hobby2: Hobby): number {
  let score = 0;

  // 1. 난이도 일치
  if (hobby1.difficulty === hobby2.difficulty) {
    score += 2;
  }

  // 2. 비용 범위 유사성
  const costOverlap = calculateCostOverlap(hobby1.cost, hobby2.cost);
  score += costOverlap;

  // 3. 태그 일치
  const commonTags = hobby1.tags.filter(tag => hobby2.tags.includes(tag));
  score += commonTags.length;

  return score;
}

function calculateCostOverlap(
  cost1: { min: number; max: number },
  cost2: { min: number; max: number }
): number {
  const overlap = Math.min(cost1.max, cost2.max) - Math.max(cost1.min, cost2.min);
  if (overlap <= 0) return 0;
  
  const totalRange = Math.max(cost1.max, cost2.max) - Math.min(cost1.min, cost2.min);
  return (overlap / totalRange) * 2; // 최대 2점
} 