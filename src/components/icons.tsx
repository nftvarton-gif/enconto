import type { SVGProps } from "react";

export const EncontoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
      className="fill-primary"
    />
    <path
      d="M50 12.5L81.65 31.25V68.75L50 87.5L18.35 68.75V31.25L50 12.5Z"
      className="fill-background"
    />
    <path
      d="M50 25L70 37.5V62.5L50 75L30 62.5V37.5L50 25Z"
      className="fill-accent"
    />
  </svg>
);


export const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1em" 
        height="1em" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.8-1.59-1.87-2.32-4.2-1.9-6.6.41-2.39 1.99-4.48 4.16-5.68.34-.18.7-.32 1.06-.41.04-1.57.04-3.14.04-4.71 0-1.56-.04-3.12.04-4.68 1.21-.06 2.42.02 3.62.02z"/>
    </svg>
);

export const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="1em" 
        height="1em" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        {...props}
    >
        <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 6.7L15 15.1c-.1.5-.5.6-1 .4l-3.9-2.9-1.9 1.8c-.2.2-.4.4-.7.4l.3-4 4.1-3.8c.2-.2-.1-.3-.4-.1l-5.1 3.2-3.8-1.2c-.5-.2-.5-.7.1-.9l10.3-4c.4-.2.8.1.6.6z" />
    </svg>
);
