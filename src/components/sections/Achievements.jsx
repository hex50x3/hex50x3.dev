import React from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/ui/magicui/marquee';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import {
  Marquee as KiboMarquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee/index';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AWARDS = [
  { title: 'Cum Laude', subtitle: 'STI College Caloocan', year: '2025' },
  {
    title: 'Champion - Codefest (Local)',
    subtitle: 'STI Tagisan ng Talino',
    year: '2024',
  },
  {
    title: 'Champion - Codefest (Local)',
    subtitle: 'STI Tagisan ng Talino',
    year: '2023',
  },
  {
    title: 'STI Alumni Scholar',
    subtitle: 'STI College Caloocan',
    year: '2020',
  },
];
const AwardItem = ({ title, subtitle, year }) => (
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

const PROGRAMMING_SKILLS = [
  {
    name: 'JavaScript',
    src: '/images/javascript.png',
  },
  {
    name: 'React.js',
    src: '/images/react.png',
  },
  {
    name: 'Python',
    src: '/images/python.png',
  },
  {
    name: 'TypeScript',
    src: '/images/typescript.png',
  },
  {
    name: 'Next.js',
    src: '/images/next.png',
  },
  {
    name: 'Tailwind CSS',
    src: '/images/tailwind.png',
  },
  {
    name: 'Java',
    src: '/images/java.png',
  },
  {
    name: 'C#',
    src: '/images/csharp.png',
  },
  {
    name: 'C++',
    src: '/images/c++.png',
  },
];
const TOOLS_AND_PLATFORMS = [
  {
    name: 'ASP.NET Core',
    src: '/images/dotnet.png',
  },
  {
    name: 'Git',
    src: '/images/git.png',
  },
  {
    name: 'Visual Studio',
    src: '/images/vs.png',
  },
  {
    name: 'Visual Studio Code',
    src: '/images/vs-code.png',
  },
  {
    name: 'Vite',
    src: '/images/vite.png',
  },
  {
    name: 'Supabase',
    src: '/images/supabase.png',
  },
  {
    name: 'Figma',
    src: '/images/figma.png',
  },
  {
    name: 'Photoshop',
    src: '/images/photoshop.png',
  },
  {
    name: 'Asana',
    src: '/images/asana.png',
  },
  {
    name: 'Unity',
    src: '/images/unity.png',
  },
  {
    name: 'TanStack',
    src: '/images/tanstack.png',
  },
];
const DATABASES_AND_TECHNOLOGIES = [
  {
    name: 'Microsoft SQL Server',
    src: '/images/sqlserver.png',
  },
  {
    name: 'MySQL',
    src: '/images/mysql.png',
  },
  {
    name: 'PostgreSQL',
    src: '/images/postgreSQL.png',
  },
  {
    name: 'MongoDB',
    src: '/images/mongodb.png',
  },
  {
    name: 'REST APIs',
    src: '/images/rest.png',
  },
];

const REVIEWS = [
  {
    name: 'Khaela May Lee',
    profession: 'IT Faculty',
    body: "I've seen Mark tackle challenges with determination and am confident he'll excel in future projects.",
    alt: 'Khaela May Lee',
    img: '/images/ms-khae.webp',
    link: 'https://www.linkedin.com/in/khaela-may-lee-2b3853157/',
  },
  {
    name: 'John Ace Manlapat',
    profession: 'IT/CS Faculty',
    body: 'In my course, Mark consistently demonstrated commitment and strong problem-solving skills in both individual and group tasks.',
    alt: 'John Ace Manlapat',
    img: '/images/sir-ace.webp',
    link: 'https://www.facebook.com/johnace.manlapat',
  },
  {
    name: 'Bryan Lim',
    profession: 'IT & Software Lead',
    body: 'During his OJT, Mark demonstrated excellent UI/UX skills through clean and intuitive design work.',
    alt: 'Bryan Lim',
    img: '/images/sir-bry.webp',
    link: 'https://www.linkedin.com/in/bryan-lim-3749b714a/',
  },
  {
    name: 'Patrick Garcia',
    profession: 'Full Stack Developer',
    body: "Impressive work, Mark Jhebryx! Seeing how much you've grown in such a short time is truly inspiring.",
    alt: 'Patrick Garcia',
    img: '/images/chief.webp',
    link: 'https://www.linkedin.com/in/patrick-renz-garcia-16b643215/',
  },

  /* Fix Below */

  {
    name: 'Jane',
    profession: '@linkedinuser',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@90e52c4245bc483ccd339fc6ecbf3872679886c4/public/avatars/pinky_2.png',
  },
  {
    name: 'Jenny',
    profession: '@linkedinuser',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@90e52c4245bc483ccd339fc6ecbf3872679886c4/public/avatars/robot_2.png',
  },
  {
    name: 'James',
    profession: '@linkedinuser',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://cdn.jsdelivr.net/gh/itspi3141/discord-fake-avatar-decorations@90e52c4245bc483ccd339fc6ecbf3872679886c4/public/avatars/robot_5.png',
  },
];
const ReviewCard = ({ img, name, profession, body, link }) => {
  const cardContent = (
    <figure
      className={cn(
        'relative mt-1 h-full w-[250px] cursor-pointer overflow-hidden border p-3.5 sm:w-60',
        'border-border bg-background light:hover:border-badge-border-hover light:hover:bg-badge-hover/50 hover:bg-gray-950/[.05]',
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img
          className="rounded-full object-cover"
          width="30"
          height="30"
          alt={name}
          src={img}
        />
        <div className="flex flex-col justify-center leading-[100%]">
          <figcaption className="font-rubik light:font-rubik-m light:text-primary/90 text-primary light:text-[12.50px] text-[13px] leading-[102%]">
            {name}
          </figcaption>
          <p className="font-rubik text-secondary text-[11.50px]">
            {profession}
          </p>
        </div>
      </div>
      <blockquote className="font-rubik text-secondary light:text-[12.50px] mt-3 text-[13px] leading-[125%]">
        {body}
      </blockquote>
    </figure>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

export default function Achievements() {
  const firstRow = REVIEWS.slice(0, Math.ceil(REVIEWS.length / 2));

  return (
    <div className="w-full px-[50px] pt-[25px] [@media(max-width:450px)]:px-0">
      <div className="mx-auto flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center gap-[25px] px-[25px]">
        <CardContainer className="border-border bg-card flex h-[250px] min-w-[350px] flex-1 flex-col border p-[15px]">
          <CardItem
            translateZ="Z"
            className="fill-muted text-muted flex flex-row items-center gap-[10px]"
          >
            <div className="font-poppins text-[14px] select-none">
              HONORS & AWARDS
            </div>
          </CardItem>
          <CardItem
            translateZ="22"
            className="flex h-full flex-col justify-between gap-0 pt-[15px]"
          >
            <div className="flex flex-col gap-[13.5px]">
              {AWARDS.map((item, index) => (
                <AwardItem key={index} {...item} />
              ))}
            </div>
          </CardItem>
        </CardContainer>

        <div className="border-border bg-card flex h-[250px] w-[350px] min-w-[350px] flex-1 flex-col border-[0.5px] p-[15px]">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <h1 className="font-poppins text-[14px] select-none">SKILLS</h1>
          </div>
          <div className="flex h-full flex-col justify-between gap-0 pt-[15px]">
            <div className="relative flex flex-col gap-[13.5px]">
              <div className="relative">
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent speed={30} pauseOnHover autoFill loop={0}>
                  {PROGRAMMING_SKILLS.map(({ src, name }, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <MarqueeItem className="h-[50px] w-[50px] hover:cursor-pointer">
                          <img
                            src={src}
                            alt={`Skill ${index + 1}`}
                            className="rounded-full object-cover"
                          />
                        </MarqueeItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </MarqueeContent>
              </div>

              <div className="relative">
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent speed={30} pauseOnHover autoFill loop={0}>
                  {TOOLS_AND_PLATFORMS.map(({ src, name }, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <MarqueeItem className="h-[50px] w-[50px] hover:cursor-pointer">
                          <img
                            src={src}
                            alt={`Skill ${index + 1}`}
                            className="rounded-full object-cover"
                          />
                        </MarqueeItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </MarqueeContent>
              </div>

              <div className="relative">
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent speed={30} pauseOnHover autoFill loop={0}>
                  {DATABASES_AND_TECHNOLOGIES.map(({ src, name }, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <MarqueeItem className="h-[50px] w-[50px] hover:cursor-pointer">
                          <img
                            src={src}
                            alt={`Skill ${index + 1}`}
                            className="rounded-full object-cover"
                          />
                        </MarqueeItem>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </MarqueeContent>
              </div>
            </div>
          </div>
        </div>
        <div className="border-border bg-card flex h-[250px] min-w-[350px] flex-1 flex-col border-[0.5px] p-[15px]">
          <div className="fill-muted text-muted flex flex-row items-center gap-[10px]">
            <h1 className="font-poppins text-[14px] select-none">
              RECOMMENDATIONS
            </h1>
          </div>
          <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden">
            <div className="flex flex-col gap-[13.5x]">
              <div className="relative flex h-auto w-[full] flex-col items-center justify-center">
                <Marquee pauseOnHover className="[--duration:35s]">
                  {firstRow.map((review, index) => (
                    <ReviewCard
                      key={`${review.profession}-${index}`}
                      {...review}
                    />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
