"use client"

import React from 'react';
import { CometCard } from '@/components/ui/comet-card';
import { useRouter } from 'next/navigation';

const PROJECTS = [
  {
    label: '/FEATURED-PROJECT',
    title: 'ASIKASO',
    subtitle: 'PRODUCTIVITY APP',
    image: '/images/workinprogress.webp',
    alt: 'Featured Project',
    opacity: 'opacity-70',
  },
  {
    label: '/CAPSTONE-PROJECT',
    title: 'PUGAY X',
    subtitle: 'MULTIPLAYER GAME',
    image: '/images/pugay.webp',
    alt: 'Capstone Project',
    opacity: 'opacity-85',
  },
];

export default function Projects() {
  const router = useRouter();

  return (
    <div className="w-full px-[50px] pt-[25px] [@media(max-width:450px)]:px-0">
      <div className="mx-auto flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center gap-[25px] px-[25px]">
        {PROJECTS.map((proj) => (
          <div
            key={proj.title}
            className="border-border bg-card flex h-[250px] min-w-[350px] flex-1 cursor-pointer flex-col border p-[15px]"
            onClick={() => router.push('/projects')}
          >
            <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
              <h1 className="font-poppins text-[14px] select-none">
                {proj.label}
              </h1>
            </div>
            <CometCard className="w-full">
              <div className="my-[15px] h-[147px] flex-1">
                <img
                  src={proj.image}
                  alt={proj.alt}
                  className={`light:opacity-100 h-full w-full object-cover opacity-25 transition-opacity duration-500 ease-in-out`}
                  onLoad={(e) => e.currentTarget.classList.add(proj.opacity)}
                />
              </div>
            </CometCard>
            <div className="flex w-full items-center">
              <h1 className="font-rubik-l light:font-rubik text-primary text-[14px] whitespace-nowrap">
                {proj.title}
              </h1>
              <div className="bg-border mx-[15px] h-[0.4px] flex-1" />
              <h1 className="font-rubik-l light:font-rubik light:text-muted text-secondary text-[14px] whitespace-nowrap">
                {proj.subtitle}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
