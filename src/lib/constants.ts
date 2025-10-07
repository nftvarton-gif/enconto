import { Bot, Zap, Plug, TrendingUp, Code2, Users, Blocks, Link as LinkIcon, ShieldCheck, Linkedin, Mail, Phone, MessageSquare, Database, Share2, Component, Waypoints } from "lucide-react";
import { TikTokIcon, TelegramIcon } from "@/components/icons";

export const FEATURES = [
  {
    icon: Zap,
    title: "Fast Deployment",
    description: "Quickly integrate our solutions into your existing workflows with minimal downtime.",
  },
  {
    icon: Bot,
    title: "AI Assistants",
    description: "Leverage intelligent AI assistants to automate tasks and enhance productivity.",
  },
  {
    icon: Plug,
    title: "100+ Integrations",
    description: "Connect with a vast ecosystem of tools and platforms to streamline your operations.",
  },
  {
    icon: TrendingUp,
    title: "Boost Growth",
    description: "Scale your business and drive growth with our powerful automation and AI solutions.",
  },
];

export const SERVICES = [
  {
    title: "n8n Workflow Development",
    description: "Custom n8n workflows to automate your business processes and connect your apps.",
    icon: Blocks,
  },
  {
    title: "AI Assistants & Agents",
    description: "Intelligent agents for customer support, data analysis, and internal process optimization.",
    icon: Bot,
  },
  {
    title: "API Integrations",
    description: "Seamlessly connect services like TikTok API, CRMs, and payment gateways.",
    icon: LinkIcon,
  },
  {
    title: "Custom SaaS Solutions",
    description: "Tailor-made SaaS platforms to meet your unique business requirements.",
    icon: ShieldCheck,
  },
];

export const WHY_CHOOSE_US = [
    {
      icon: Users,
      title: "Expertise in AI & Blockchain",
      description: "Our team consists of seasoned experts in artificial intelligence and blockchain technology."
    },
    {
      icon: ShieldCheck,
      title: "Tailored Solutions",
      description: "We don't believe in one-size-fits-all. Every solution is customized to your specific needs."
    },
    {
      icon: TrendingUp,
      title: "Measurable Results",
      description: "We focus on delivering solutions that provide clear, measurable improvements to your bottom line."
    },
    {
      icon: Bot,
      title: "Dedicated Support",
      description: "Our team is always here to provide support and ensure your success."
    },
  ]


export const TESTIMONIALS = [
  {
    name: "John Doe",
    company: "Tech Solutions Inc.",
    text: "Enconto transformed our operations. The AI assistants have saved us hundreds of hours per month. Truly a game-changer!",
    avatarSeed: "1",
  },
  {
    name: "Jane Smith",
    company: "Creative Co.",
    text: "The n8n workflow automation is seamless. Their team was professional, and the deployment was incredibly fast. Highly recommended!",
    avatarSeed: "2",
  },
  {
    name: "Samuel Lee",
    company: "Growth Ventures",
    text: "Working with Enconto on our custom SaaS platform was a fantastic experience. They understood our vision and delivered beyond our expectations.",
    avatarSeed: "3",
  },
];

export const SOCIAL_LINKS = [
    {
        name: 'Telegram',
        icon: TelegramIcon,
        href: 'https://t.me/gptstop',
    },
    {
        name: 'LinkedIn',
        icon: Linkedin,
        href: '#',
    },
    {
        name: 'TikTok',
        icon: TikTokIcon,
        href: '#',
    },
]

export const CONTACT_DETAILS = [
    {
        name: 'Email',
        value: 'alanol@enconto.net',
        icon: Mail,
        href: 'mailto:alanol@enconto.net'
    },
    {
        name: 'WhatsApp',
        value: '+995 511 488 185',
        icon: Phone,
        href: 'https://wa.me/995511488185'
    },
    {
        name: 'Telegram',
        value: '@gptstop',
        icon: MessageSquare,
        href: 'https://t.me/gptstop'
    },
]
