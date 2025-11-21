'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { X } from 'lucide-react';
import HyphenatedText from '@/components/ui/hyphenated-text';

const PROJECTS = [
  {
    id: 1,
    category: 'PRODUCTIVITY APP',
    title: 'ASIKASO',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-application-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-folder-code-icon lucide-folder-code"
      >
        <path d="M10 10.5 8 13l2 2.5" />
        <path d="m14 10.5 2 2.5-2 2.5" />
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    description: `Asikaso is a web-based productivity app designed to help users stay organized and balanced throughout their day. With a holistic approach to time and energy management, it goes beyond simply checking off tasks, focusing on maintaining balance across all aspects of well-being: physical energy, mental clarity, emotional stability, and long-term goals. It promotes a healthy approach to productivity, ensuring efficiency and focus without sacrificing health or well-being.`,
    fullDescription: `Asikaso (2025) is a web-based productivity app designed to help users stay organized and balanced throughout their day. With a holistic approach to time and energy management, it goes beyond simply checking off tasks, focusing on maintaining balance across all aspects of well-being: physical energy, mental clarity, emotional stability, and long-term goals. It promotes a healthy approach to productivity, ensuring efficiency and focus without sacrificing health or well-being.`,
    features: [
      {
        label: 'TBA',
        detail: '-',
      },
    ],
    techStack: ['TBA'],
    images: [{ type: 'image', src: '/images/workinprogress.webp' }],
  },
{
    id: 2,
    category: 'PERSONAL WEBSITE',
    title: 'PORTFOLIO',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-application-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-folder-code-icon lucide-folder-code"
      >
        <path d="M10 10.5 8 13l2 2.5" />
        <path d="m14 10.5 2 2.5-2 2.5" />
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    description: `Hex50x3.dev is a space that Mark built to showcase his skills, projects, and growth in tech. He designed everything, from the layout to the visual identity, by hand. The hardest part was the final polish, ensuring each tiny detail, from design to functionality, reflected his vision. More than a technical portfolio, the website reflects Mark’s personal sense of design and the effort he put into bringing it to life.`,
    fullDescription: `Hex50x3.dev (2025) is a space that Mark built to showcase his skills, projects, and growth in tech. He designed everything, from the layout to the visual identity, by hand. The hardest part was the final polish, ensuring each tiny detail, from design to functionality, reflected his vision. More than a technical portfolio, the website reflects Mark’s personal sense of design and the effort he put into bringing it to life.`,
    features: [
      {
        label: 'Theme Toggle',
        detail:
          'Switch seamlessly between Dark Mode and Light Mode.',
      },
      {
        label: 'Animations',
        detail:
          'Smooth hover effects, transitions, and subtle micro-interactions.',
      },
      {
        label: 'Contact Form',
        detail:
          'Send messages directly through the website safely and easily.',
      },
    ],
    techStack: ['Next.js', 'React.js', 'TailwindCSS', 'Shadcn', 'Figma'],
    images: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/HFJA7ajek8s?si=-mo7F-YX0Hru0g1Q',
      },
    ],
  },
  {
    id: 3,
    category: 'MULTIPLAYER GAME',
    title: 'PUGAY X',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-game-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-gamepad2-icon lucide-gamepad-2"
      >
        <line x1="6" x2="10" y1="11" y2="11" />
        <line x1="8" x2="8" y1="9" y2="13" />
        <line x1="15" x2="15.01" y1="12" y2="12" />
        <line x1="18" x2="18.01" y1="10" y2="10" />
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
      </svg>
    ),
    description: `PUGAY X: Multiplayer Arnis Fundamentals Game is an educational application aimed at promoting Filipino martial arts,
      specifically Arnis, to enhance users' understanding and appreciation of its foundational aspects.
      Designed as a free supplementary learning tool for Arnis practitioners and enthusiasts...`,
    fullDescription: `PUGAY X: Multiplayer Arnis Fundamentals Game (2024) is an educational application aimed at promoting Filipino martial arts, specifically Arnis, to enhance users' understanding and appreciation of its foundational aspects. Designed as a free supplementary learning tool for Arnis practitioners and enthusiasts, PUGAY introduces an engaging story-mode game that unlocks stages featuring interactive cutscene-like modules. These modules teach 12 fundamental strikes and blocks, as well as stances, accompanied by multiplayer matches where users can apply and refine their skills in a competitive environment. The project features over 330 individual sprite frames, providing animations that bring the techniques to life. Overall, PUGAY aims to provide a comprehensive and immersive learning experience that fosters a deeper connection with the art of Arnis.`,
    features: [
      {
        label: 'Story-Mode Gameplay',
        detail:
          'Unlock stages by completing tasks, focusing on strikes, blocks, and stances.',
      },
      {
        label: 'Interactive Educational Modules',
        detail:
          'Cutscene-style lessons with instructor guidance and interactive elements.',
      },
      {
        label: 'Points-Based Progression System',
        detail:
          'Earn points by learning & playing to unlock higher-level content.',
      },
      {
        label: 'Multiplayer Mode',
        detail: 'Compete online with others in real-time matches.',
      },
      {
        label: 'Edutainment Design',
        detail: 'Combines education and fun to enhance retention.',
      },
    ],
    techStack: ['C#', 'Unity', 'Azure Playfab', 'Photon', 'Figma', 'Photoshop'],
    images: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/uwvo8ZMT8ig?si=i6LL2jYrULhCFxfp',
      },
      { type: 'image', src: '/images/pugay-1.webp' },
      { type: 'image', src: '/images/pugay-2.webp' },
      { type: 'image', src: '/images/pugay-3.webp' },
      { type: 'image', src: '/images/pugay-4.webp' },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/OUwugKTEEys?si=VeFcg4vHzZmTTcf0',
      },
    ],
  },
  /*
  {
    id: 3,
    category: 'MINI-GAME',
    title: 'BUKSAN MO',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-game-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-gamepad2-icon lucide-gamepad-2"
      >
        <line x1="6" x2="10" y1="11" y2="11" />
        <line x1="8" x2="8" y1="9" y2="13" />
        <line x1="15" x2="15.01" y1="12" y2="12" />
        <line x1="18" x2="18.01" y1="10" y2="10" />
        <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
      </svg>
    ),
    description: `Buksan mo Papasukin Ako (translated as "Open the Window, Let Me In") is a Python-based mini-game Mark created to challenge himself by seeing how quickly he could come up with a game concept and develop it in just one day using limited resources. In the game, a figure named Kua Win demands to be let in, and the player must quickly close the window to prevent it from entering. The game challenges players to react quickly and test their reflexes.`,
    fullDescription: `Buksan mo Papasukin Ako (2024) (translated as "Open the Window, Let Me In") is a Python-based mini-game Mark created to challenge himself by seeing how quickly he could come up with a game concept and develop it in just one day using limited resources. In the game, a figure named Kua Win demands to be let in, and the player must quickly close the window to prevent it from entering. The game challenges players to react quickly and test their reflexes.`,
    features: [
      {
        label: 'Reflex-Based Gameplay',
        detail:
          'Close the window quickly each time the figure appears to earn points.',
      },
      {
        label: 'Escalating Difficulty',
        detail:
          'Each success shortens the timer, making the figure returns faster.',
      },
      {
        label: 'Endless Challenge',
        detail:
          'Play continues until you fail, aiming for the highest score possible.',
      },
    ],
    techStack: ['Python', 'Pycharm', 'Pygame', 'Photoshop', 'VEGAS Pro'],
    images: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/OfYge8r_S-U?si=oZvziHKrQCM1vPYe',
      },
    ],
  },
*/
  {
    id: 4,
    category: 'INVENTORY MANAGEMENT SYSTEM',
    title: 'STOCKDEMON',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-application-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-folder-code-icon lucide-folder-code"
      >
        <path d="M10 10.5 8 13l2 2.5" />
        <path d="m14 10.5 2 2.5-2 2.5" />
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    description: `Stockdemon is a Windows Form application developed for Vaping Hood Caloocan. It features inventory tracking, cloud-based backup on Google Drive, email notifications, audit logs, and PDF report generation for efficient management.`,
    fullDescription: `Stockdemon (2023) is a Windows Form application developed for Vaping Hood Caloocan. It features inventory tracking, cloud-based backup on Google Drive, email notifications, audit logs, and PDF report generation for efficient management.`,
    features: [
      {
        label: 'User Management',
        detail: 'Manages users, categories, products, suppliers, and more.',
      },
      {
        label: 'Cloud Backup',
        detail: 'Cloud backup for secure data storage.',
      },
      {
        label: 'Automated Summaries',
        detail: 'Daily email reports for inventory.',
      },
      {
        label: 'Audit Logging',
        detail: 'Tracks user activity and system changes.',
      },
      {
        label: 'Report Generation',
        detail: 'Creates PDF reports for purchases and sales.',
      },
    ],
    techStack: [
      'C#',
      'Windows Forms',
      '.NET 6',
      'SQL Server',
      'Figma',
      'Photoshop',
      'Google Drive API',
      'SMTP',
      'iTextSharp',
    ],
    images: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/gDHQ2Mqpj58',
      },
    ],
  },
  {
    id: 5,
    category: 'SCHOOL MANAGEMENT SYSTEM',
    title: 'SITSMS',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-application-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-folder-code-icon lucide-folder-code"
      >
        <path d="M10 10.5 8 13l2 2.5" />
        <path d="m14 10.5 2 2.5-2 2.5" />
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    description: `SIT School Management System is one of the capstone project Mark developed using Windows Forms and is designed to handle the basic CRUD (Create, Read, Update, Delete) operations for managing school data. Mark focused on creating a user-friendly interface with a cute and approachable design, ensuring the application is both functional and visually appealing...`,
    fullDescription: `SIT School Management System (2023) is one of the capstone project Mark developed using Windows Forms, designed to handle the basic CRUD (Create, Read, Update, Delete) operations for managing school data. Mark focused on creating a user-friendly interface with a cute and approachable design, ensuring the application is both functional and visually appealing.`,
    features: [
      {
        label: 'School Data Management',
        detail:
          'Perform basic CRUD (Create, Read, Update, Delete) operations with ease.',
      },
      {
        label: 'Minimalist Design',
        detail:
          'Cute, approachable visuals while keeping the interface uncluttered.',
      },
    ],
    techStack: [
      'C#',
      'Windows Forms',
      '.NET 6',
      'SQL Server',
      'Figma',
      'Photoshop',
    ],
    images: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/_WmEBtWMbHE?si=ecRTqSaVRntdQxAj',
      },
    ],
  },
  {
    id: 6,
    category: 'LOL DRAFT HELPER',
    title: 'DRAFTPICKPAL',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--category-application-dev)"
        strokeWidth={1.15}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-folder-code-icon lucide-folder-code"
      >
        <path d="M10 10.5 8 13l2 2.5" />
        <path d="m14 10.5 2 2.5-2 2.5" />
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
      </svg>
    ),
    description: `DraftPickPal is a Windows Forms application developed to challenge Mark’s problem-solving skills using C# and data structures. It helps users determine the best champion picks in League of Legends by analyzing their champion pool and the enemy's champions, using manually gathered data from Op.gg on strengths and weaknesses—entirely without relying on an API. This project introduced Mark to intense problem-solving, data handling, error management, and debugging in Windows Forms.`,
    fullDescription: `DraftPickPal (2023) is a Windows Forms application developed to challenge Mark’s problem-solving skills using C# and data structures. It helps users determine the best champion picks in League of Legends by analyzing their champion pool and the enemy's champions, using manually gathered data from Op.gg on strengths and weaknesses—entirely without relying on an API. This project introduced Mark to intense problem-solving, data handling, error management, and debugging in Windows Forms. Mark loves this project, even though it’s not suitable for showcasing on a professional platform, because it marks the moment he discovered his passion for problem-solving. It was a turning point where he experienced the thrill of coding and building solutions entirely from scratch.`,
    features: [
      {
        label: 'Champion Pool Setup',
        detail: 'Add your main champions to build a personalized pool.',
      },
      {
        label: 'Ban Suggestions',
        detail:
          'Automatically recommends bans based on your mains’ weaknesses.',
      },
      {
        label: 'Enemy Matchup Analysis',
        detail:
          'Enter enemy picks and see which of your mains remain viable based on matchup data from Op.gg.',
      },
      {
        label: 'Best Pick Recommendation',
        detail:
          'Highlights the strongest main champion to pick against the enemy team.',
      },
    ],
    techStack: ['C#', 'Windows Forms'],
    images: [
      { type: 'youtube', src: 'https://www.youtube.com/embed/m-jwIwJ0ieM' },
    ],
  },
];

export default function AllProjects() {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <div className="w-full px-[50px] pt-[25px] [@media(max-width:450px)]:px-0">
        <div className="mx-auto mb-[15px] flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center px-[25px]">
          <div className="fill-muted text-muted w-full min-w-[350px] flex-row gap-[10px]">
            <h1
              className="font-poppins light:hover:font-poppins-m hover:text-primary hover:fill-primary light:hover:text-primary w-fit cursor-pointer pl-[0.8px] text-[14px] select-none"
              onClick={() => router.push('../')}
            >
              ← GO BACK
            </h1>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1220px] min-w-[350px] flex-wrap justify-center gap-[25px] px-[25px]">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="border-border bg-card hover:border-input-border light:hover:border-input-border light:hover:bg-badge-hover/50 flex h-[178px] min-w-[350px] flex-1 flex-col gap-[10px] overflow-hidden border p-[15px] hover:bg-gray-950/[.05] [@media(min-width:885px)]:h-[194px]"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div className="fill-muted flex flex-row items-center justify-between">
                    <h1 className="font-poppins text-muted text-[13px] select-none">
                      {project.category}
                    </h1>
                  </div>
                  <h1 className="font-poppins-m text-primary text-[20px]">
                    {project.title}
                  </h1>
                </div>

                {project.icon}
              </div>
              <HyphenatedText
                lang="en"
                minWordLength={7}
                className="font-rubik-l about-text light:font-rubik text-primary light:text-primary/80 light:text-[13.50px] line-clamp-2 text-justify text-[14px] !leading-[130%] [@media(min-width:885px)]:line-clamp-3"
              >
                {project.description}
              </HyphenatedText>
              <div
                className="font-poppins-l text-primary/85 light:text-primary hover:text-primary bg-button light:font-poppins border-button-border hover:from-button-gradient-start hover:to-button-gradient-end hover:border-button-border-hover/75 mt-[8px] flex h-[25px] w-full cursor-pointer items-center justify-center border py-[15px] text-[12px] transition-all duration-200 ease-out select-none hover:border-[0.05px]"
                onClick={() => setActiveProject(project)}
              >
                Learn More →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="border-border bg-card relative max-h-[90dvh] w-full max-w-[900px] overflow-x-hidden overflow-y-auto rounded-none border p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-primary hover:text-accent absolute top-4 right-4 cursor-pointer"
              onClick={() => setActiveProject(null)}
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-[15px]">
              <div>
                <h2 className="text-muted font-poppins text-[14px] select-none">
                  {activeProject.category}
                </h2>
                <h1 className="font-poppins-m text-primary text-[20px]">
                  {activeProject.title}
                </h1>
              </div>
              <p className="font-rubik-l light:font-rubik light:text-[13.50px] light:text-primary/85 text-primary text-left text-[14px]">
                {activeProject.fullDescription}
              </p>

              <div className="font-rubik-l light:font-rubik light:text-[13.50px] light:text-primary/85 text-primary text-[14px]">
                <h3 className="light:font-poppins mb-2 text-[14px]">
                  FEATURES:
                </h3>
                <ul className="list-disc pl-5">
                  {activeProject.features.map((f, i) => (
                    <li key={i}>
                      {f.label}:{' '}
                      <span className="text-primary light:font-rubik light:text-[13.50px] light:text-primary/85 text-[14px]">
                        {f.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="font-rubik-l light:font-rubik light:text-[13.50px] light:text-primary/85 text-primary text-[14px]">
                <h3 className="light:font-poppins-l mb-2 text-[14px]">
                  TECH STACK:
                </h3>
                <div className="flex flex-wrap gap-[10px]">
                  {activeProject.techStack.map((t) => (
                    <div
                      key={t}
                      className="border-border light:text-secondary text-primary bg-badge light:bg-card-inner hover:border-badge-border-hover hover:bg-badge-hover flex h-[25px] w-auto cursor-default items-center justify-center border px-[15px] text-[12px] transition-all duration-200 ease-out select-none"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-[13px]">
                <Carousel className="h-auto w-full">
                  <CarouselContent>
                    {activeProject.images.map((media, index) => (
                      <CarouselItem key={index}>
                        <div className="flex h-[300px] w-full items-center justify-center overflow-hidden">
                          {media.type === 'image' && (
                            <img
                              src={media.src}
                              alt={`carousel-${index}`}
                              className="h-full w-full object-cover"
                            />
                          )}
                          {media.type === 'video' && (
                            <video
                              src={media.src}
                              controls
                              className="h-full w-full object-cover"
                            />
                          )}
                          {media.type === 'youtube' && (
                            <iframe
                              width="100%"
                              height="100%"
                              src={media.src}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="!bg-badge border-badge-border text-muted hover:text-primary hover:badge-border-hover" />
                  <CarouselNext className="!bg-badge border-badge-border text-muted hover:text-primary hover:badge-border-hover" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
