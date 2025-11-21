'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import Theme from '@/components/ui/theme-switcher';
import Logo from "@/components/ui/logo";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="w-full min-w-[350px] px-[50px] pt-[35px] [@media(max-width:450px)]:px-0">
      <div className="border-border mx-auto max-w-[1220px] border-x px-0 py-[10px] [@media(min-width:360px)]:px-1 [@media(min-width:370px)]:px-3 [@media(min-width:380px)]:px-4 [@media(min-width:391px)]:px-[25px]">
        <div className="flex items-center justify-between">
          <div className="flex flex-row items-center gap-[5px]">
            <div className="flex flex-row items-center gap-[15px]">
              <Logo
                className={`text-primary block h-[20px] w-auto [@media(min-width:700px)]:block`}
              />
              <h1 className="font-inter text-primary block text-[20px] md:text-[20px]">
                HEX50X3{' '}
              </h1>
              <Theme />
            </div>
            <div className="flex items-center gap-[5px]">
              <h1 className="font-poppins-l text-primary [@media(min-width:600px)]:hide hidden text-[18px] md:text-[18px]">
                /
              </h1>
              <h1 className="font-poppinsxl text-secondary light:font-rubik [@media(min-width:600px)]:hide hidden text-[18px] md:text-[18px]">
                Software Engineer
              </h1>
            </div>
          </div>
          <div className="flex gap-[15px]">
            <a
              onClick={() => router.push('/projects')}
              rel="noopener noreferrer"
            >
              <Button
                variant="social"
                size="social"
                aria-label="Projects"
                className="group border-border light:hover:border-[#0066C7] light:hover:[background:conic-gradient(from_180deg,#0066C7,#0066C7,#005261)] light:hover:drop-shadow-[0_0_35px_#2828a8 ] !cursor-pointer transition-all duration-800 ease-out hover:border-[#003261] hover:shadow-none hover:drop-shadow-[0_0_20px_#0066C7] hover:[background:conic-gradient(from_180deg,#0066C7,#004B92,#003261)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted group-hover:fill-colored-foreground light:duration-200 !h-[19px] !w-[18px] fill-current transition-all duration-300 group-hover:!h-[20px] group-hover:!w-[19px]"
                  viewBox="0 0 50 50"
                >
                  <path d="M45 8L18.044 8.006c-.279-.101-.855-1.02-1.165-1.514C16.112 5.268 15.317 4 14 4H5C3.346 4 2 5.346 2 7v6h1 44 1v-2C48 9.346 46.654 8 45 8zM48 43V16c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v27c0 1.657 1.343 3 3 3h40C46.657 46 48 44.657 48 43z"></path>
                </svg>
              </Button>
            </a>

            {/* 
            <Button
              variant="social"
              size="social"
              className="group hover:shadow-none transition-all duration-800 ease-out hover:[background:conic-gradient(from_180deg,#0066C7,#004B92,#003261)] hover:drop-shadow-[0_0_11px_#0066C7] hover:border-[#003261]"
            >
              <a
                href="https://www.linkedin.com/in/hex50x3/"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="!w-[23px] !h-[23px] fill-current text-muted group-hover:fill-primary group-hover:!w-[25px] group-hover:!h-[25px] transition-all duration-200"
                  viewBox="0 0 30 30"
                >
                  <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                </svg>
              </a>
            </Button> 
            */}

            <a
              tabIndex={-1}
              href="mailto:markjhebryx@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="social"
                size="social"
                aria-label="Email"
                className="group border-border light:hover:border-[#E81013] light:hover:drop-shadow-[0_0_35px_#E81013] light:hover:[background:conic-gradient(from_180deg,#E81013,#E81013,#A3070A)] !cursor-pointer transition-all duration-800 ease-out hover:border-[#610002] hover:shadow-none hover:drop-shadow-[0_0_20px_#A0191C] hover:[background:conic-gradient(from_180deg,#E81013,#A3070A,#610002)]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-muted group-hover:fill-colored-foreground light:duration-200 !h-[23px] !w-[20px] fill-current transition-all duration-300 group-hover:!h-[24px] group-hover:!w-[21px]"
                  viewBox="0 0 24 24"
                >
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
