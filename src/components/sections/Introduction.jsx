"use client";

import React from 'react';
import { motion } from 'framer-motion';
import HyphenatedText from '../ui/hyphenated-text';

const EXPERIENCE = [
  {
    title: 'Accenture',
    subtitle: 'Associate Software Engineer',
    year: 'Present',
  },
  {
    title: 'Hiraya Tech',
    subtitle: 'Frontend Developer',
    year: '2025',
  },
  {
    title: 'Minahal Solutions',
    subtitle: 'UI/UX Engineer',
    year: '2025',
  },
  {
    title: 'STI College',
    subtitle: 'BS Information Technology',
    year: '2021-2025',
  },
  { title: 'STI Senior High', subtitle: 'ICT Strand', year: '2018-2020' },
];

const MESSAGES = ['Hi! 👋', 'You can call me Mark!'];

  const ExperienceItem = ({ title, subtitle, year }) => (
    <div className="flex flex-row items-center justify-between leading-[102%]">
      <div className="flex w-auto flex-col">
        <h1 className="font-rubik text-primary text-[15px] whitespace-nowrap">
          {title}
        </h1>
        <h2 className="font-rubik text-muted light:text-[12.50px] text-[13px] whitespace-nowrap">
          {subtitle}
        </h2>
      </div>
      <div className="bg-border ml-[25px] h-[0.4px] w-full" />
      <div className="border-border mr-[25px] rounded-2xl border-2"></div>
      <h3 className="font-rubik text-muted light:text-[12.50px] text-[13px] whitespace-nowrap">
        {year}
      </h3>
    </div>
  );

export default function Introduction() {
  return (
    <div className="w-full px-[50px] pt-[25px] [@media(max-width:450px)]:px-0">
      <div className="mx-auto flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center gap-[25px] px-[25px]">
        <div className="flex h-[250px] min-w-[350px] flex-1 flex-col">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-info-icon lucide-info light-svg-stroke"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <h1 className="font-poppins text-[14px] select-none">ABOUT</h1>
          </div>
          <div
            lang="en"
            className="flex h-full flex-col justify-between pt-[15px]"
          >
            <HyphenatedText
              lang="en"
              minWordLength={7}
              className="font-rubik-l light:font-rubik light:text-[13.50px] text-primary about-text mx-auto text-[14px] !leading-[130%] md:text-justify"
            >
              Mark Jhebryx Bergonio (He/Him) is a software engineer based in
              Manila, Philippines. He holds a Bachelor's degree in Information
              Technology from STI College Caloocan, where he developed a passion
              for building software that solves real-world problems and
              contributes to meaningful projects and initiatives. With
              experience spanning both design and development, Mark focuses on
              building solutions that balance functionality and user experience.
            </HyphenatedText>
            <div className="bg-border h-[0.4px] w-full" />
            <div className="mt-1 flex w-full flex-row gap-[15px]">
              <div className="border-badge-border text-primary bg-badge hover:border-badge-border-hover hover:bg-badge-hover/75 flex h-[26px] w-full cursor-default items-center justify-center border text-[12.50px] transition-all duration-200 ease-out select-none">
                {' '}
                Software Engineer{' '}
              </div>
              <div className="border-badge-border text-primary bg-badge hover:border-badge-border-hover hover:bg-badge-hover/75 flex h-[26px] w-full cursor-default items-center justify-center border text-[12.50px] transition-all duration-200 ease-out select-none">
                {' '}
                UI/UX Designer{' '}
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative h-[250px] min-w-[350px] flex-1 overflow-hidden border-[#50201c] bg-[#BE1504] shadow-md sm:min-w-[150px]"
          style={{
            cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='32' width='32'><text y='24' font-size='18'>😎</text></svg>") 16 16, auto`,
          }}
        >
          <img
            src="/images/placeholder.webp"
            alt="Design"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 ease-in-out"
            onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
          />
          <div className="absolute bottom-4 left-4 space-y-1 font-[Figtree] text-sm font-medium">
            {MESSAGES.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-rubik text-colored-foreground w-fit max-w-xs bg-[#161616] px-2 py-1 text-[13px] shadow-md"
              >
                {msg}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex h-[250px] min-w-[350px] flex-1 flex-col">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-briefcase-icon lucide-briefcase light-svg-stroke"
            >
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              <rect width="20" height="14" x="2" y="6" rx="2" />
            </svg>
            <h1 className="font-poppins text-[14px] select-none">EXPERIENCE</h1>
          </div>
          <div className="flex h-full flex-col justify-between pt-[15px]">
            <div className="flex flex-col gap-[13.5px]">
              {EXPERIENCE.map((item, index) => (
                <ExperienceItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
