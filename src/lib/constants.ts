import { Bot, Zap, Plug, TrendingUp, Code2, Users, Blocks, Link as LinkIcon, ShieldCheck, Linkedin, Mail, Phone, MessageSquare, Database, Share2, Component, Waypoints } from "lucide-react";
import { TikTokIcon, TelegramIcon } from "@/components/icons";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const LANGUAGE_OPTIONS = [
  { name: 'English', code: 'en', flag: '🇬🇧' },
  { name: 'Русский', code: 'ru', flag: '🇷🇺' },
  { name: '中文', code: 'zh', flag: '🇨🇳' },
]

export const FEATURES = [
  {
    icon: Zap,
    title: "features.fastDeployment.title",
    description: "features.fastDeployment.description",
  },
  {
    icon: Bot,
    title: "features.aiAssistants.title",
    description: "features.aiAssistants.description",
  },
  {
    icon: Plug,
    title: "features.integrations.title",
    description: "features.integrations.description",
  },
  {
    icon: TrendingUp,
    title: "features.boostGrowth.title",
    description: "features.boostGrowth.description",
  },
];

export const SERVICES = [
  {
    title: "services.n8n.title",
    description: "services.n8n.description",
    icon: Blocks,
  },
  {
    title: "services.aiAgents.title",
    description: "services.aiAgents.description",
    icon: Bot,
  },
  {
    title: "services.apiIntegrations.title",
    description: "services.apiIntegrations.description",
    icon: LinkIcon,
  },
  {
    title: "services.customSaaS.title",
    description: "services.customSaaS.description",
    icon: ShieldCheck,
  },
];

export const WHY_CHOOSE_US = [
    {
      icon: Users,
      title: "whyChooseUs.expertise.title",
      description: "whyChooseUs.expertise.description"
    },
    {
      icon: ShieldCheck,
      title: "whyChooseUs.tailored.title",
      description: "whyChooseUs.tailored.description"
    },
    {
      icon: TrendingUp,
      title: "whyChooseUs.results.title",
      description: "whyChooseUs.results.description"
    },
    {
      icon: Bot,
      title: "whyChooseUs.support.title",
      description: "whyChooseUs.support.description"
    },
  ]


export const TESTIMONIALS = [
  {
    name: "John Doe",
    company: "Tech Solutions Inc.",
    text: "testimonials.johnDoe.text",
    avatarSeed: "1",
  },
  {
    name: "Jane Smith",
    company: "Creative Co.",
    text: "testimonials.janeSmith.text",
    avatarSeed: "2",
  },
  {
    name: "Samuel Lee",
    company: "Growth Ventures",
    text: "testimonials.samuelLee.text",
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
        name: 'contact.email.name',
        value: 'alanol@enconto.net',
        icon: Mail,
        href: 'mailto:alanol@enconto.net'
    },
    {
        name: 'contact.whatsapp.name',
        value: '+995 511 488 185',
        icon: Phone,
        href: 'https://wa.me/995511488185'
    },
    {
        name: 'contact.telegram.name',
        value: '@gptstop',
        icon: MessageSquare,
        href: 'https://t.me/gptstop'
    },
]
