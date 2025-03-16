import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AREA',
  tagline: 'A webhook management platform',
  favicon: 'img/favicon.ico',

  url: 'http://localhost:8080/',
  baseUrl: '/',

  organizationName: 'EpitechPromo2027',
  projectName: 'B-DEV-500-STG-5-1-area-mohamed.mazouz',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'AREA',
      logo: {
        alt: 'AREA Logo',
        src: 'img/docusaurus.png',
      },
      items: [
        { to: '/docs/get-started', label: 'Get Started', position: 'left'},
        { to: '/docs/category/users-guide', label: 'User Guide', position: 'left' },
        { to: '/docs/category/technical-documentation', label: 'Technical Documentation', position: 'left' },
        {
          href: 'https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'User Guide',
              to: '/docs/category/users-guide',
            },
            {
              label: 'Technical Documentation',
              to: '/docs/category/technical-documentation',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/EpitechPromo2027/B-DEV-500-STG-5-1-area-mohamed.mazouz',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AREA Project.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

};

export default config;
