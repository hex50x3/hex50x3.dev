import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-[25px] w-full min-w-[350px] px-[50px] pb-[15px] max-[450px]:px-0">
      <div className="mx-auto max-w-[1220px] min-w-[350px] justify-center px-[25px] [@media(max-width:450px)]:px-5">
        <div className="border-border flex flex-col items-center justify-center border-t-[0.5px] py-[25px] sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-row items-center gap-[15px]">
            <img
              src="/images/logo2.png"
              alt="Hex-Logo-Small"
              className="light:brightness-60 h-[14px] w-[22px]"
            ></img>
            <h1 className="text-secondary light:text-secondary/90 font-poppinsxl light:font-rubik text-[12px]">
              © 2025 Hex50x3.
              <span className="block sm:inline"> All rights reserved.</span>
            </h1>
          </div>

          <div className="flex flex-row gap-[15px] pt-[15px] sm:-mx-2 sm:pt-0">
            {[
              {
                label: 'LinkedIn',
                'aria-label': 'Visit me on LinkedIn',
                href: 'https://www.linkedin.com/in/hex50x3',
              },
              {
                label: 'Github',
                'aria-label': 'Visit me on Github',
                href: 'https://github.com/hex50x3',
              },
              {
                label: 'Figma',
                'aria-label': 'Visit me on Figma',
                href: 'https://www.figma.com/@hex50x3',
              },
              {
                label: 'Monkeytype',
                'aria-label': 'Visit me on Monkeytype',
                href: 'https://monkeytype.com/profile/hex50x3',
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppinsxl light:font-rubik light:text-secondary/90 text-secondary hover:text-bg-primary mx-auto text-[12px] transition-colors duration-200 hover:underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
