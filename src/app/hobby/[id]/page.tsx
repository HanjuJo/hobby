import { Tab } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/20/solid';
import { MapPinIcon, ClockIcon, CurrencyYenIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  { name: '기본 정보', current: true },
  { name: '시작 가이드', current: false },
  { name: '공간/장비', current: false },
  { name: '멘토/강사', current: false },
  { name: '커뮤니티', current: false },
];

export default function HobbyDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt=""
          />
          <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            성악
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            클래식 음악의 정수를 경험하세요. 성악은 인간의 목소리를 악기로 활용하여 음악을 표현하는 예술 형태입니다.
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-white p-1">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-gray-500 hover:bg-white/[0.12] hover:text-gray-700'
                      )
                    }
                  >
                    {tab.name}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-8">
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">기본 정보</h3>
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center">
                          <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-500">난이도: 초급</span>
                        </div>
                        <div className="flex items-center">
                          <CurrencyYenIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-500">시작 비용: 50-200만원</span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-500">필요 시간: 주 2-3회, 회당 1-2시간</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-500">활동 장소: 연습실, 공연장</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">취미 소개</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        성악은 인간의 목소리를 악기로 활용하여 음악을 표현하는 예술 형태입니다. 클래식 음악에서부터 팝, 재즈까지 다양한 장르에서 활용됩니다. 성악을 통해 음악적 표현력과 호흡법을 배우고, 자신만의 목소리를 개발할 수 있습니다.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">시작하기 위한 조건</h3>
                      <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                        <li>특별한 전제 조건은 없으며 음악에 대한 열정과 꾸준한 연습이 중요합니다</li>
                        <li>기초적인 음악 이론 지식이 있으면 도움이 됩니다</li>
                        <li>연습할 수 있는 공간과 시간이 필요합니다</li>
                      </ul>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">시작 가이드</h3>
                    <div className="prose prose-sm text-gray-500">
                      <p>
                        1. 기초 음악 이론 학습
                        - 음악의 기본 요소 이해
                        - 악보 읽기 연습
                        - 음정과 화성 학습
                      </p>
                      <p>
                        2. 호흡법과 발성법 연습
                        - 복식 호흡법 습득
                        - 기본 발성법 연습
                        - 음색 개발
                      </p>
                      <p>
                        3. 기본 레퍼토리 학습
                        - 쉬운 아리아나 아르티에트 선택
                        - 기본적인 이태리어 발음 연습
                        - 간단한 곡 연습
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">필요한 장비와 공간</h3>
                    <div className="prose prose-sm text-gray-500">
                      <p>
                        필수 장비:
                        - 피아노 또는 전자 피아노
                        - 악보
                        - 녹음 장비
                      </p>
                      <p>
                        연습 공간:
                        - 방음이 잘 되는 연습실
                        - 피아노가 있는 공간
                        - 충분한 공기가 순환되는 공간
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">멘토/강사 정보</h3>
                    <div className="prose prose-sm text-gray-500">
                      <p>
                        전문 강사 찾기:
                        - 음악대학 성악과 출신
                        - 전문 성악가
                        - 경험이 풍부한 강사
                      </p>
                      <p>
                        레슨 비용:
                        - 개인 레슨: 시간당 5-10만원
                        - 그룹 레슨: 시간당 2-5만원
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="rounded-xl bg-white p-6 shadow">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">커뮤니티</h3>
                    <div className="prose prose-sm text-gray-500">
                      <p>
                        온라인 커뮤니티:
                        - 성악 포럼
                        - SNS 그룹
                        - 온라인 레슨
                      </p>
                      <p>
                        오프라인 모임:
                        - 성악 동호회
                        - 공연 관람 모임
                        - 워크샵
                      </p>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-4">
            <div className="sticky top-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">관련 추천 취미</h3>
                <div className="mt-6 space-y-4">
                  {relatedHobbies.map((hobby) => (
                    <div key={hobby.name} className="flex items-center space-x-4">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={hobby.image}
                        alt={hobby.name}
                      />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{hobby.name}</h4>
                        <p className="text-sm text-gray-500">{hobby.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const relatedHobbies = [
  {
    name: '피아노',
    description: '클래식 음악의 기초를 배우세요',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: '합창',
    description: '함께 노래하며 즐거움을 나누세요',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    name: '음악 이론',
    description: '음악의 기본을 이해하세요',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
]; 