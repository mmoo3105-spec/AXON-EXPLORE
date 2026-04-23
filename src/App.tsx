/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Menu, 
  ShoppingBag, 
  Home as HomeIcon, 
  Calendar, 
  User, 
  ArrowLeft, 
  Heart, 
  Share2, 
  Wifi, 
  Wind, 
  Zap, 
  Dog,
  Minus,
  Plus,
  Trash2,
  Package,
  CalendarDays,
  Truck,
  Warehouse,
  Check,
  Verified,
  CreditCard,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Lock,
  Hiking,
  Waves,
  Trees,
  Mountain,
  Tent,
  UtilityPole,
  TentTree
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type View = 'HOME' | 'SEARCH_RESULTS' | 'STAY_DETAIL' | 'BOOKING' | 'GEAR_HOME' | 'GEAR_DETAIL' | 'ORDER_SUMMARY';

interface Stay {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  tags?: string[];
  description?: string;
}

interface Gear {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  badge?: string;
}

// --- Data ---

const STAYS: Stay[] = [
  {
    id: '1',
    name: '시다 할로우 캐빈',
    location: '올림픽 국립공원, 워싱턴',
    price: 180,
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    category: '숲속'
  },
  {
    id: '2',
    name: '스타라이트 돔',
    location: '세도나, 애리조나',
    price: 245,
    rating: 4.7,
    reviews: 86,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000',
    category: '글램핑'
  },
  {
    id: '3',
    name: '펀웨 트리하우스',
    location: '캣스킬, 뉴욕',
    price: 320,
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1000',
    category: '숲속'
  }
];

const GEAR_ITEMS: Gear[] = [
  {
    id: 'g1',
    name: '서밋 피크 2인용 텐트',
    description: '초경량, 날씨 보호 설계를 갖춘 건축적 디자인',
    price: 24,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000',
    category: '쉘터',
    badge: '최고 평점'
  },
  {
    id: 'g2',
    name: '아틱 쉘 -10° 침낭',
    description: '책임 있는 다운 충전재, 인체공학적 머미형',
    price: 18,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1000',
    category: '침구'
  },
  {
    id: 'g3',
    name: '헤리티지 LED 랜턴',
    description: '400 루멘, 방수, USB 충전 지원',
    price: 12,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541011532454-e9102431ac17?auto=format&fit=crop&q=80&w=1000',
    category: '조명'
  }
];

// --- Components ---

const NavBar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const isGear = currentView.startsWith('GEAR') || currentView === 'ORDER_SUMMARY';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-border h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('HOME')}>
        <div className="w-8 h-8 bg-secondary transform rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full transform -rotate-45"></div>
        </div>
        <span className="font-bold tracking-tighter text-xl text-primary uppercase">AXON EXPLORE</span>
      </div>
      
      <div className="hidden md:flex gap-8">
        {['여행지', '장비 허브', '필드 로그', '네트워크'].map(item => (
          <button key={item} className="text-[12px] font-bold text-text-muted hover:text-secondary transition-colors">{item}</button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-text-muted font-mono uppercase">Node Live</span>
        </div>
        <button className="p-2 hover:bg-bg-light transition-colors">
          <Search className="w-4 h-4 text-primary" />
        </button>
        {isGear && (
          <button className="p-2 hover:bg-bg-light transition-colors relative" onClick={() => setView('ORDER_SUMMARY')}>
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-secondary text-white text-[8px] flex items-center justify-center font-bold">2</span>
          </button>
        )}
        <button 
          className="bg-primary text-white px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all"
          onClick={() => setView(isGear ? 'GEAR_HOME' : 'HOME')}
        >
          {isGear ? '장비 요청' : '시스템 초기화'}
        </button>
      </div>
    </nav>
  );
};

const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => {
  const tabs = [
    { id: 'HOME', label: '인덱스', icon: HomeIcon },
    { id: 'SEARCH_RESULTS', label: '조회', icon: Search },
    { id: 'BOOKING', label: '로그', icon: Calendar },
    { id: 'GEAR_HOME', label: '에셋', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-border h-20 flex items-center justify-around px-2 md:hidden">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          onClick={() => setView(tab.id as View)}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all w-full py-2",
            currentView === tab.id ? "text-secondary border-t-2 border-secondary -mt-0.5" : "text-text-muted border-t-2 border-transparent"
          )}
        >
          <tab.icon className="w-5 h-5" />
          <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

// --- Views ---

const HomeView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-24 bg-bg-light min-h-screen">
      {/* Hero / Operational Velocity */}
      <section className="relative h-[440px] m-6 bg-primary overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-secondary transform skew-x-12 translate-x-24 opacity-30"></div>
        
        <div className="container mx-auto px-12 relative z-10">
          <span className="label-mono text-accent mb-4 block">현재 상태: 최적 (Optimal)</span>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6 tracking-tighter max-w-4xl">
            기하학적 <span className="text-secondary">야생 탐험</span>의 <br/>새로운 정의.
          </h1>
          <p className="text-slate-400 font-normal text-lg max-w-lg mb-8">
            프리미엄 자연주의자를 위한 가변형 숙박 물류 및 기술 장비 노드 시스템.
          </p>
          <button 
            className="bg-white text-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all rounded-sm"
            onClick={() => setView('SEARCH_RESULTS')}
          >
            쿼리 실행 (Launch Query)
          </button>
        </div>
      </section>

      {/* Stats Quick Grid */}
      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-6 -mt-16 relative z-20">
        {[
          { label: '활성 노드', val: '142', change: '+3%' },
          { label: '평균 피드백', val: '4.92', change: '안정적' },
          { label: '네트워크 부하', val: '12.4%', change: '-0.2%' },
          { label: '사용가능 에셋', val: '18', change: 'Live' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-border p-6 flex flex-col justify-between h-32 text-left">
             <span className="label-mono">{stat.label}</span>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-light">{stat.val}</span>
               <span className="text-[10px] font-bold text-secondary">{stat.change}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Grid Categories */}
      <section className="py-16 px-6">
        <div className="mb-10 flex justify-between items-end border-b border-border pb-6">
          <div>
            <span className="label-mono mb-2 block">시스템 매핑</span>
            <h2 className="text-2xl font-bold uppercase tracking-tight">지형 분류 그리드</h2>
          </div>
          <div className="flex space-x-1 mb-1">
            <div className="w-12 h-1 bg-border"></div>
            <div className="w-6 h-1 bg-secondary"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border border border-border">
          {[
            { name: '숲 (Forest)', icon: Trees },
            { name: '강 (River)', icon: Waves },
            { name: '해변 (Beach)', icon: Wind },
            { name: '산맥 (Peaks)', icon: Mountain },
            { name: '글램핑 (Glamping)', icon: TentTree }
          ].map(cat => (
            <div key={cat.name} className="bg-white p-10 flex flex-col items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 border border-border flex items-center justify-center group-hover:border-secondary group-hover:text-secondary transition-all">
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="label-mono">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular / System Log Style */}
      <section className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="mb-10 flex border-b border-border pb-6">
               <h2 className="text-2xl font-bold uppercase tracking-tight">주요 노드 (Prime Nodes)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STAYS.map(stay => (
                <div key={stay.id} className="geometric-card group cursor-pointer" onClick={() => setView('STAY_DETAIL')}>
                  <div className="relative aspect-video overflow-hidden border-b border-border">
                    <img 
                      src={stay.image} 
                      alt={stay.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                    <div className="absolute top-0 right-0 bg-white border-l border-b border-border px-3 py-1 font-mono text-xs font-bold">
                       {stay.rating} <span className="text-secondary">/ 5.0</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold uppercase group-hover:text-secondary transition-colors">{stay.name}</h3>
                      <span className="text-lg font-light">${stay.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono border-t border-border pt-4 text-text-muted">
                      <span>LOCATION: {stay.location.split(',')[0]}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 self-start bg-white border border-border sticky top-24">
            <div className="p-6 border-b border-border">
              <h3 className="label-mono text-primary font-bold">최근 네트워크 활동</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { label: '예약 동기화', time: '10:42 AM', status: 'bg-secondary' },
                { label: '숙박 시설 검증', time: '09:15 AM', status: 'bg-green-500' },
                { label: '결제 알림', time: '08:22 AM', status: 'bg-yellow-500' },
                { label: 'API 정제 완료', time: '07:01 AM', status: 'bg-secondary' },
                { label: '에셋 주행 기록', time: '04:30 AM', status: 'bg-slate-300' },
              ].map((log, i) => (
                <div key={i} className="p-4 flex items-center space-x-4 hover:bg-slate-50 transition-colors">
                  <div className={cn("w-2 h-2 rounded-full", log.status)}></div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold uppercase tracking-tight">{log.label}</span>
                    <span className="text-[10px] font-mono text-text-muted">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50">
               <button className="w-full py-3 border border-border text-[10px] font-extrabold uppercase tracking-widest hover:bg-white transition-all">분석 데이터 보기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Footer Section */}
      <section className="px-6 py-20">
        <div className="bg-primary text-white p-12 overflow-hidden relative border border-border">
          <div className="absolute right-0 top-0 h-full w-1/4 bg-secondary transform skew-x-12 translate-x-12 opacity-10"></div>
          <div className="relative z-10 max-w-2xl text-left">
            <h3 className="text-3xl font-light mb-4">프로젝트 진행 속도가 <span className="text-accent">최적</span>입니다.</h3>
            <p className="text-slate-400 text-sm mb-8">현재 스프린트는 기준 투사점보다 15% 앞서고 있으며, 지난 사이클 동안 보고된 치명적 결함은 0건입니다.</p>
            <button className="bg-white text-primary px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-all rounded-sm">
              데이터 스트림 구독
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const StayDetailView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-24 bg-bg-light">
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-border sticky top-16 z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-bg-light transition-colors" onClick={() => setView('HOME')}>
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div className="text-left">
            <h1 className="text-sm font-bold uppercase tracking-tight">노드 토폴로지: 와일드우드 호라이즌</h1>
            <p className="text-[10px] font-mono text-text-muted">ID: WH-992-B</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="p-2 border border-border hover:bg-slate-50"><Share2 className="w-4 h-4" /></button>
          <button className="p-2 border border-border hover:bg-slate-50"><Heart className="w-4 h-4" /></button>
        </div>
      </header>

      <section className="relative w-full h-[500px] overflow-hidden border-b border-border">
        <img 
          src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Stay Main"
        />
        <div className="absolute right-8 bottom-8 flex gap-1">
          <div className="w-12 h-1 bg-white"></div>
          <div className="w-8 h-1 bg-white/40"></div>
          <div className="w-8 h-1 bg-white/40"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white border border-border p-8 md:p-12 shadow-sm text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                 <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="label-mono text-secondary">검증된 에셋 (Verified)</span>
                 </div>
                 <div className="h-4 w-px bg-border mx-2"></div>
                 <div className="flex items-center text-text-main gap-1">
                   <Star className="w-3 h-3 text-secondary fill-current" />
                   <span className="text-xs font-bold">4.92 / 5.00</span>
                 </div>
              </div>
              <h2 className="text-4xl font-light text-primary leading-tight uppercase tracking-tighter">와일드우드 호라이즌 <br />(Wildwood Horizon)</h2>
              <p className="text-text-muted mt-4 font-mono text-xs flex items-center gap-2 uppercase tracking-widest">
                <MapPin className="w-3 h-3" /> 구역: 오팔 릿지 // 카스카디아 (Opal Ridge)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div>
              <h3 className="label-mono mb-6 pb-2 border-b border-border">운영 개요</h3>
              <p className="text-text-muted leading-relaxed text-lg mb-10 font-light">
                고대 삼나무 숲의 구조적 끝자락에 위치한 와일드우드 호라이즌은 고충실도 야생 인터페이스를 제공합니다. 사이트 간격은 30미터로 엄격히 제한되어, 기술적 집중이나 회복 사이클 동안 완벽한 프라이버시를 보장합니다.
              </p>

              <h3 className="label-mono mb-6 pb-2 border-b border-border">기능 매트릭스 (Features)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                {[
                  { name: '무선망', icon: Wifi, label: 'SAT-LINK' },
                  { name: '공급수', icon: Waves, label: 'POTABLE' },
                  { name: '전력망', icon: Zap, label: 'SOLAR GRID' },
                  { name: '반려동물', icon: Dog, label: 'COMPATIBLE' }
                ].map(item => (
                  <div key={item.name} className="border border-border p-6 flex flex-col items-center text-center gap-4 hover:border-secondary transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                    <span className="label-mono text-[9px]">{item.label}</span>
                  </div>
                ))}
              </div>

              <h3 className="label-mono mb-6 pb-2 border-b border-border">필드 데이터 (현장 일지)</h3>
              <div className="bg-slate-50 border border-border p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-border transform translate-x-12 -translate-y-12"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-slate-200 border border-border flex items-center justify-center font-mono text-xs">ER</div>
                  <div className="text-left">
                    <h4 className="font-bold text-xs uppercase">E. 로드리게스</h4>
                    <div className="flex text-secondary gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-text-muted italic text-sm font-light leading-relaxed text-left">
                  "참으로 환경적인 조화가 뛰어났습니다. 시스템 반응이 72시간 사이클 내내 일관적이었으며, 구름이 낀 날에도 태양광 텔레메트리가 최적으로 작동했습니다."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Deployment Hub */}
        <aside className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-primary text-white p-10 border border-border shadow-lg relative overflow-hidden text-left">
             <div className="absolute top-0 left-0 w-1 bg-secondary h-full"></div>
             <span className="label-mono text-secondary mb-4 block">예약 버퍼 (Reservation)</span>
             <div className="flex justify-between items-center mb-8">
               <h4 className="text-2xl font-light">8월 14일 • 8월 19일</h4>
               <CalendarDays className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer" />
             </div>
             
             <div className="space-y-4 pt-6 border-t border-white/10 font-mono text-[10px]">
               <div className="flex justify-between text-white/40">
                 <span>기본 주파수 (5X Cycles)</span>
                 <span className="text-white">$425.00</span>
               </div>
               <div className="flex justify-between text-white/40">
                 <span>보존 노드 비용</span>
                 <span className="text-white">$25.00</span>
               </div>
               <div className="flex justify-between text-xl font-bold pt-6 border-t border-white/10 mt-6 tracking-tighter">
                 <span>순 가치 (Net Value)</span>
                 <span className="text-accent underline decoration-secondary decoration-2 underline-offset-4">$450.00</span>
               </div>
             </div>
          </div>
          
          <button 
            className="w-full bg-secondary text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
            onClick={() => setView('BOOKING')}
          >
            배포 실행 (Execute Placement)
          </button>
          
          <div className="p-6 border border-border bg-white flex flex-col gap-3 text-left">
             <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-text-muted" />
                <span className="text-[10px] font-mono text-text-muted uppercase">보안 프로토콜 활성화됨</span>
             </div>
             <p className="text-[10px] text-text-muted/60 leading-tight">데이터 전송은 SSL-256 비트 암호화로 보호됩니다. 예약 취소는 48시간 가변 윈도우 내에서 처리됩니다.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const BookingView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-32 bg-bg-light min-h-screen">
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-border sticky top-16 z-20 text-left">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-bg-light transition-colors" onClick={() => setView('STAY_DETAIL')}>
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-tight">결제 파이프라인 (Checkout)</h1>
        </div>
        <div className="flex items-center space-x-2">
           <div className="w-4 h-4 border border-secondary bg-secondary/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-secondary"></div>
           </div>
           <span className="font-mono text-[9px] uppercase font-bold">우선 순위 처리 중</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        <div className="lg:col-span-8 space-y-8">
          {/* Calendar Select Grid */}
          <section className="bg-white p-8 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-border">
              <h2 className="label-mono text-primary font-extrabold font-mono">날짜 선택 매트릭스</h2>
              <div className="flex space-x-1">
                 <button className="p-2 border border-border hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /></button>
                 <button className="p-2 border border-border hover:bg-slate-50"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-px bg-border border border-border">
              {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                <div key={d} className="bg-slate-50 py-3 text-[10px] font-bold text-center border-b border-border text-text-muted">{d}</div>
              ))}
              {Array.from({ length: 31 }).map((_, i) => {
                const isSelectedStart = i === 11;
                const isSelectedEnd = i === 14;
                const isInRange = i > 11 && i < 14;
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "h-16 bg-white flex flex-col items-center justify-center font-mono text-xs cursor-pointer group hover:bg-slate-50 relative",
                      (isSelectedStart || isSelectedEnd) && "bg-primary text-white hover:bg-primary z-10",
                      isInRange && "bg-secondary/10 text-secondary"
                    )}
                  >
                    <span>{i + 1}</span>
                    {isSelectedStart && <span className="absolute bottom-1 text-[8px] opacity-60">시작</span>}
                    {isSelectedEnd && <span className="absolute bottom-1 text-[8px] opacity-60">종료</span>}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Configuration Nodes */}
          <section className="bg-white border border-border divide-y divide-border">
            <div className="p-8">
              <h2 className="label-mono mb-8">인원 구성 (Personnel)</h2>
              <div className="space-y-4">
                {[
                  { label: '주요 투숙객', sub: '상태: 성인', count: 2 },
                  { label: '추가 투숙객', sub: '상태: 아동', count: 1 }
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between p-6 border border-border bg-slate-50/50">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-tight">{item.label}</h4>
                      <p className="font-mono text-[9px] text-text-muted">{item.sub}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <button className="w-8 h-8 border border-border flex items-center justify-center hover:bg-white"><Minus className="w-3 h-3" /></button>
                      <span className="font-mono text-lg font-medium w-4 text-center">{item.count}</span>
                      <button className="w-8 h-8 border border-border flex items-center justify-center hover:bg-white"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <h2 className="label-mono mb-8">금융 인터페이스 (Financial)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border-2 border-secondary bg-secondary/5 flex items-center gap-6 relative">
                  <CreditCard className="w-5 h-5 text-secondary" />
                  <div>
                    <h4 className="text-xs font-bold uppercase">등록된 신용카드</h4>
                    <p className="font-mono text-[9px] opacity-60">참조: XXXX-4242</p>
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center bg-secondary text-white">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <button className="p-6 border border-border flex items-center gap-6 hover:bg-slate-50 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 text-left">
                  <Smartphone className="w-5 h-5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase">모바일 페이 (Payload)</h4>
                    <p className="font-mono text-[9px]">GPay / ApplePay</p>
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Tactical Summary */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-white border border-border overflow-hidden text-left">
            <div className="h-40 bg-primary flex items-center justify-center overflow-hidden">
               <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary flex items-end p-6">
                  <span className="label-mono !text-accent">요약 매니페스트 (Summary)</span>
               </div>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2">실버우드 릿지</h3>
                <div className="flex space-x-1">
                   <div className="w-4 h-1 bg-secondary text-white text-[8px] flex items-center"></div>
                   <span className="font-mono text-[9px] text-text-muted">상태: 운영 중 (OPERATIONAL)</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border font-mono text-[10px]">
                <div className="flex justify-between items-center text-text-muted">
                  <span>투숙 기간 (3 사이클)</span>
                  <span className="font-bold text-primary">$360.00</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>물류 수수료</span>
                  <span className="font-bold text-primary">$45.00</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span>네트워크 오버헤드</span>
                  <span className="font-bold text-primary">$28.50</span>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-border mt-8 text-xl font-bold tracking-tighter">
                  <span>총 가치 (Gross Value)</span>
                  <span className="text-secondary">$433.50</span>
                </div>
              </div>

              <button 
                className="w-full bg-primary text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                onClick={() => alert('트랜잭션 승인됨: 예약이 완료되었습니다.')}
              >
                트랜잭션 실행 <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-center gap-2 opacity-30 mt-4">
                 <Lock className="w-3 h-3" />
                 <span className="font-mono text-[8px] uppercase tracking-widest font-black">256비트 암호화 활성화됨</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// --- Gear Views ---

const GearHomeView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-24 bg-bg-light min-h-screen">
      <header className="relative h-[440px] m-6 bg-primary overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <img 
          src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          alt="Gear Hero"
        />
        <div className="absolute right-0 top-0 h-full w-1/4 bg-secondary transform skew-x-12 translate-x-32 opacity-20"></div>
        
        <div className="container mx-auto px-12 relative z-10 text-left">
          <span className="label-mono text-accent mb-4 block">자산 할당 허브 (Asset Allocation)</span>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-8 tracking-tighter">
            현장 활동을 위한 <br/>기술 <span className="text-secondary">장비.</span>
          </h1>
          <div className="bg-white p-1 border border-border flex items-center w-full max-w-xl group shadow-2xl">
            <Search className="w-5 h-5 text-text-muted mx-4" />
            <input type="text" placeholder="자산 데이터베이스 쿼리..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium tracking-tight" />
            <button className="bg-primary text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary transition-all">실행</button>
          </div>
        </div>
      </header>

      <section className="px-6 py-12 text-left">
        <div className="mb-8 px-2 border-b border-border pb-4 w-fit">
          <h3 className="label-mono text-primary font-bold">표준 분류 (Classifications)</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          <div className="col-span-2 row-span-2 relative h-[400px] overflow-hidden group bg-white">
            <img 
              src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-10">
              <span className="label-mono text-accent mb-2">카테고리 // 01</span>
              <h4 className="text-white text-3xl font-light uppercase tracking-tighter">쉘터 시스템</h4>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group bg-white">
            <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-primary/20 flex flex-col justify-end p-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">휴식 포드</h4>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden group bg-white">
            <img src="https://images.unsplash.com/photo-1541011532454-e9102431ac17?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 bg-primary/20 flex flex-col justify-end p-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">실험 식단</h4>
            </div>
          </div>
          <div className="col-span-2 relative h-48 overflow-hidden group bg-white">
             <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
             <div className="absolute inset-0 bg-primary/20 flex flex-col justify-end p-6">
               <h4 className="text-white text-sm font-bold uppercase tracking-widest">전력 발전</h4>
             </div>
          </div>
        </div>
      </section>

      <section className="px-6 text-left">
        <div className="flex justify-between items-end mb-12 border-b border-border pb-6 px-2">
          <div>
            <span className="label-mono mb-2 block">가용 재고</span>
            <h3 className="text-2xl font-bold uppercase tracking-tight">활성 인벤토리</h3>
          </div>
          <button className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group">
            전체 디렉토리 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GEAR_ITEMS.map(item => (
            <div key={item.id} className="geometric-card group cursor-pointer" onClick={() => setView('GEAR_DETAIL')}>
              <div className="relative aspect-square overflow-hidden border-b border-border">
                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <button className="absolute top-0 right-0 bg-white border-l border-b border-border p-3 hover:text-secondary"><Heart className="w-4 h-4" /></button>
                {item.badge && <span className="absolute bottom-0 left-0 bg-primary text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5">{item.badge}</span>}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-sm uppercase tracking-tight group-hover:text-secondary transition-colors">{item.name}</h4>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Star className="w-3 h-3 text-secondary fill-current" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-text-muted mb-8 font-light line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <p className="text-xl font-light text-primary">${item.price}<span className="text-[10px] font-mono opacity-40 uppercase ml-1">/ cycle</span></p>
                  <button className="bg-slate-100 px-4 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">대기열 추가</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const GearDetailView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-32 bg-bg-light min-h-screen">
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-border sticky top-16 z-20 text-left">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-bg-light transition-colors" onClick={() => setView('GEAR_HOME')}>
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-tight">기술 데이터: 장비 WH-772</h1>
        </div>
        <div className="flex items-center space-x-4">
           <button className="p-2 border border-border"><ShoppingBag className="w-4 h-4" /></button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="aspect-video relative border border-border shadow-2xl overflow-hidden bg-primary">
              <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" />
              <div className="absolute bottom-6 left-6 flex gap-1">
                <span className="bg-white text-primary border border-border px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">ASSET_NEW</span>
                <span className="bg-secondary text-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest">PRIME_SPEC</span>
              </div>
            </div>
            
            <section className="bg-white border border-border p-10">
              <h2 className="text-3xl font-light uppercase tracking-tighter mb-6">필드 성능 사양 (Performance Specs)</h2>
              <p className="text-text-muted leading-relaxed mb-10 font-light">
                고위도 필드 운영에 최적화되었습니다. WH-772 모델은 고인장 구조 섬유와 열 유지 매핑 기술을 통합하여 가변적인 기후 스트레스 하에서도 운영의 일관성을 보장합니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                {[
                  { label: '수용 용량', value: '04 노드', icon: User },
                  { label: '환경 등급', value: '4 계절', icon: Wind },
                  { label: '정적 인장력', value: '3000 PSI', icon: Waves },
                  { label: '배포 사이클', value: '15 분', icon: Zap }
                ].map(stat => (
                  <div key={stat.label} className="bg-white p-8 flex flex-col items-center text-center gap-4 group hover:bg-slate-50 transition-colors">
                    <stat.icon className="w-5 h-5 text-secondary" />
                    <div>
                      <span className="block label-mono text-[8px] opacity-40 mb-1">{stat.label}</span>
                      <span className="text-xs font-bold uppercase tracking-tight">{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
             <div className="bg-primary text-white p-10 border border-border sticky top-32 text-left">
                <div className="absolute top-0 right-0 w-8 h-8 bg-secondary"></div>
                <span className="label-mono text-accent mb-6 block">임대 시작 (Lease Initiation)</span>
                <h3 className="text-3xl font-light uppercase tracking-tight mb-8">프리미엄 노드 쉘터</h3>
                <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
                  <Star className="w-4 h-4 text-secondary fill-current" />
                  <span className="font-mono text-sm font-bold tracking-tighter">4.92 / 5.00</span>
                  <span className="text-white/40 text-[10px] font-mono uppercase ml-auto">128 로그 기록됨</span>
                </div>
                
                <div className="mb-12">
                   <p className="text-5xl font-light text-white">$85.00<span className="text-xs font-mono opacity-30 text-white uppercase tracking-widest ml-2">/ 1박 기준</span></p>
                </div>
                
                <div className="space-y-4 mb-10">
                  <div className="p-4 border border-white/10 bg-white/5 flex justify-between items-center group cursor-pointer hover:border-secondary">
                    <span className="label-mono text-[8px] text-white/40">EPOCH_START</span>
                    <span className="font-mono text-[10px] font-bold">2024년 10월 14일</span>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/5 flex justify-between items-center group cursor-pointer hover:border-secondary">
                    <span className="label-mono text-[8px] text-white/40">EPOCH_END</span>
                    <span className="font-mono text-[10px] font-bold">2024년 10월 18일</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-secondary text-white py-5 font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-[0.98]" 
                  onClick={() => setView('ORDER_SUMMARY')}
                >
                  할당 승인 (Confirm Allocation)
                </button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const OrderSummaryView = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <div className="pt-16 pb-32 bg-bg-light min-h-screen">
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-border sticky top-16 z-20 text-left">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-bg-light transition-colors" onClick={() => setView('GEAR_HOME')}>
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-tight">주문 대기열 (Order Queue)</h1>
        </div>
        <div className="label-mono border-l border-border pl-4">매니페스트 #2910-X</div>
      </header>
      
      <div className="max-w-5xl mx-auto px-6 pt-12 text-left">
        <section className="mb-16 border-l-4 border-secondary pl-8">
          <span className="label-mono text-secondary mb-2 block">시스템 준비 체크리스트</span>
          <h2 className="text-4xl font-light uppercase tracking-tighter">인벤토리 요약</h2>
        </section>

        <div className="grid grid-cols-1 gap-12">
          <div className="space-y-8">
            <div className="bg-white p-8 border border-border flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 border border-border flex items-center justify-center text-secondary bg-slate-50"><CalendarDays className="w-6 h-6" /></div>
                <div>
                   <p className="label-mono text-[8px] mb-1">할당 윈도우 (Allocation)</p>
                   <p className="text-sm font-bold uppercase tracking-tighter">2023년 10월 14일 — 10월 18일</p>
                </div>
              </div>
              <button className="label-mono text-secondary hover:underline cursor-pointer">기간 수정</button>
            </div>

            <div className="space-y-px bg-border border border-border">
              {[
                { name: '서밋 피크 쉘터 유닛', price: 120, img: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=200' },
                { name: '프로-마스터 유틸리티 키트', price: 45, img: 'https://images.unsplash.com/photo-1541011532454-e9102431ac17?auto=format&fit=crop&q=80&w=200' }
              ].map(item => (
                <div key={item.name} className="bg-white p-8 flex items-center gap-10 hover:bg-slate-50 transition-colors">
                  <div className="w-24 h-24 border border-border grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden text-left">
                    <img src={item.img} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between items-center text-left">
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{item.name}</h4>
                      <p className="font-mono text-[9px] text-text-muted">시리즈: 기술 현장 장비</p>
                      <div className="flex items-center gap-6 mt-6">
                        <div className="flex items-center border border-border p-1 bg-white font-mono">
                          <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100">-</button>
                          <span className="w-8 text-center text-xs font-bold">1</span>
                          <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100">+</button>
                        </div>
                        <Trash2 className="w-4 h-4 text-text-muted hover:text-red-500 cursor-pointer" />
                      </div>
                    </div>
                    <span className="text-2xl font-light text-primary">${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Logistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              <div className="p-8 bg-slate-50 border-r-2 border-secondary flex items-start gap-6 relative">
                <Truck className="w-8 h-8 text-secondary mt-1" />
                <div>
                   <h4 className="text-xs font-bold uppercase mb-2">커브사이드 물류</h4>
                   <p className="text-[10px] text-text-muted leading-relaxed font-light">지정된 트레일헤드 또는 거주지 좌표로 배포합니다.</p>
                </div>
                <div className="absolute top-2 right-2"><Check className="w-4 h-4 text-secondary" /></div>
              </div>
              <button className="p-8 bg-white flex items-start gap-6 hover:bg-slate-50 opacity-40 hover:opacity-100 transition-all text-left">
                <Warehouse className="w-8 h-8 mt-1" />
                <div>
                   <h4 className="text-xs font-bold uppercase mb-2">베이스캠프 픽업</h4>
                   <p className="text-[10px] text-text-muted leading-relaxed font-light">지역 유통 허브에서 직접 수령합니다.</p>
                </div>
              </button>
            </div>

            {/* Tactical Order Total */}
            <div className="bg-primary text-white p-12 border border-border relative overflow-hidden mt-12 text-left">
               <div className="absolute top-0 right-0 w-24 h-24 bg-secondary opacity-10"></div>
               <h3 className="label-mono text-accent mb-10 pb-6 border-b border-white/10">회계 프로토콜 (Accounting)</h3>
               <div className="space-y-4 mb-12 font-mono text-[10px]">
                 <div className="flex justify-between text-white/40">
                    <span>자산 하위 가치</span>
                    <span className="text-white">$165.00</span>
                 </div>
                 <div className="flex justify-between text-white/40">
                    <span>에포크 사이클 (4X)</span>
                    <span className="text-green-400">포함됨</span>
                 </div>
                 <div className="flex justify-between text-white/40">
                    <span>물류 노드 비용</span>
                    <span className="text-white">$15.00</span>
                 </div>
                 <div className="flex justify-between text-white/40">
                    <span>자산 보호 비용</span>
                    <span className="text-white">$22.50</span>
                 </div>
               </div>
               <div className="flex justify-between items-center text-3xl font-bold tracking-tighter mb-12">
                 <span>순 지급액</span>
                 <span className="text-accent underline decoration-secondary underline-offset-8">$202.50</span>
               </div>
               <button className="w-full bg-secondary py-5 font-bold text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all active:scale-[0.98]" onClick={() => alert('매니페스트 처리됨!')}>
                 자산 할당 처리 실행
               </button>
               <div className="flex items-center justify-center gap-3 opacity-20 mt-8">
                  <Lock className="w-4 h-4" />
                  <span className="font-mono text-[8px] uppercase tracking-widest font-black">암호화된 데이터 스트림 검증됨</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('HOME');

  return (
    <div className="min-h-screen font-sans selection:bg-secondary/20 bg-bg-light">
      <NavBar currentView={view} setView={setView} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'linear' }}
        >
          {view === 'HOME' && <HomeView setView={setView} />}
          {view === 'SEARCH_RESULTS' && <HomeView setView={setView} />}
          {view === 'STAY_DETAIL' && <StayDetailView setView={setView} />}
          {view === 'BOOKING' && <BookingView setView={setView} />}
          {view === 'GEAR_HOME' && <GearHomeView setView={setView} />}
          {view === 'GEAR_DETAIL' && <GearDetailView setView={setView} />}
          {view === 'ORDER_SUMMARY' && <OrderSummaryView setView={setView} />}
        </motion.div>
      </AnimatePresence>

      <BottomNav currentView={view} setView={setView} />
      
      {/* Footer (Technical / Matrix Style) */}
      <footer className="bg-primary text-white py-24 px-8 border-t border-border hidden md:block text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-16">
          <div className="col-span-1 border-r border-white/10 pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 bg-secondary transform rotate-45"></div>
              <span className="font-bold tracking-tighter text-xl text-white uppercase">AXON</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 leading-relaxed uppercase tracking-widest">
              2024년부터 고충실도 야생 상호작용 물류를 표준화하고 있습니다.
            </p>
          </div>
          <div>
            <h4 className="label-mono !text-white/40 mb-8 pb-2 border-b border-white/10 w-fit">운영 (Operations)</h4>
            <ul className="space-y-4 font-mono text-[10px] text-slate-400 font-bold">
              <li className="hover:text-secondary cursor-pointer transition-colors">노드 디렉토리</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">현장 연구</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">자산 매핑</li>
            </ul>
          </div>
          <div>
            <h4 className="label-mono !text-white/40 mb-8 pb-2 border-b border-white/10 w-fit">인프라 (Infrastructure)</h4>
            <ul className="space-y-4 font-mono text-[10px] text-slate-400 font-bold">
              <li className="hover:text-secondary cursor-pointer transition-colors">네트워크 맵</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">핵심 프로토콜</li>
              <li className="hover:text-secondary cursor-pointer transition-colors">시스템 상태</li>
            </ul>
          </div>
          <div className="bg-white/5 p-8 border border-white/10">
            <h4 className="label-mono mb-4 text-white">데이터 전송</h4>
            <div className="flex border border-white/20">
               <input type="text" placeholder="이메일 주소" className="bg-transparent px-4 py-2 text-[10px] flex-1 outline-none font-mono" />
               <button className="bg-secondary px-4 py-2 hover:bg-blue-600 transition-colors"><ArrowRight className="w-4 h-4 text-white" /></button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">
           <span>© 2024 AXON_EXPLORE_NODE // 모든 프로토콜 권리 보유</span>
           <span>보안 링크 // C-291</span>
        </div>
      </footer>
    </div>
  );
}
