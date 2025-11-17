export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LokalKu",
  description: "Platform direktori digital untuk mendukung ekonomi lokal Purwokerto dan sekitarnya",
  navItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Direktori",
      href: "/direktori",
    },
    {
      label: "Peta",
      href: "/peta",
    },
    {
      label: "Favorit",
      href: "/favorit",
    },
  ],
  navMenuItems: [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Direktori",
      href: "/direktori",
    },
    {
      label: "Peta",
      href: "/peta",
    },
    {
      label: "Favorit",
      href: "/favorit",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
