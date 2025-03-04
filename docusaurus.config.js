// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zeenea Data Discovery Platform',
  tagline: 'Documentation',
  favicon: 'img/logos/favicon.ico',

  // Set the production url of your site here
  url: 'https://integration-platform-docs.netlify.app/', // Netlify
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ActianCorp', // Usually your GitHub org/user name.
  projectName: 'integration-platform-docs', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  //i18n: {
  //  defaultLocale: 'en',
  //  locales: ['en'],
  //},

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ActianCorp/integration-platform-docs/tree/suggestions',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      //Navbar items
      image: 'img/Logos_Actian_3Color-White-Transparent.png',
      navbar: {
        //title: 'Integration Platform',
        logo: {
          alt: 'Actian Logo',
          src: 'img/logos/actian-zeenea.png',
         },
        items: [
          {to: 'docs/zeenea-intro', label: 'Docs', position: 'left'},
          {to: 'https://docs.zeenea.com', label: 'API', position: 'left'},
          {
            href: "https://www.actian.com/",
            position: "right",
            label: "Actian Home",
            className: "github-button",
          },
          {
            href: "https://www.actian.com/blog/",
            position: "right",
            label: "Blog",
            className: "github-button",
          },
          {
            href: "https://communities.actian.com/s/",
            position: "right",
            label: "Community",
            className: "github-button",
          },
          {
            href: "https://esd.actian.com/",
            position: "right",
            label: "Downloads",
            className: "github-button hide-mobile",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                html: `
                    <div class="footerRow">
                      <div class="footerColumn-left">
                        <a href="/legal">
                          Legal
                       </a>
                      </div>
                    <div class="footerColumn-center"><span class="footerCopyright">Copyright © 2025 Actian Corporation. All rights reserved.</span></div>
                    <div class="footerColumn-right">
                      <a href="http://www.linkedin.com/company/actian-corporation" target="_blank" rel="noreferrer noopener" aria-label="Linkedin">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" id="meteor-icon-kit__solid-linkedin" fill="none" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path fill-rule="evenodd" clip-rule="evenodd" d="M22.2857 0H1.70893C0.766071 0 0 0.776786 0 1.73036V22.2696C0 23.2232 0.766071 24 1.70893 24H22.2857C23.2286 24 24 23.2232 24 22.2696V1.73036C24 0.776786 23.2286 0 22.2857 0ZM7.25357 20.5714H3.69643V9.11786H7.25893V20.5714H7.25357ZM5.475 7.55357C4.33393 7.55357 3.4125 6.62679 3.4125 5.49107C3.4125 4.35536 4.33393 3.42857 5.475 3.42857C6.61071 3.42857 7.5375 4.35536 7.5375 5.49107C7.5375 6.63214 6.61607 7.55357 5.475 7.55357ZM20.5875 20.5714H17.0304V15C17.0304 13.6714 17.0036 11.9625 15.1821 11.9625C13.3286 11.9625 13.0446 13.4089 13.0446 14.9036V20.5714H9.4875V9.11786H12.9V10.6821H12.9482C13.425 9.78214 14.5875 8.83393 16.3179 8.83393C19.9179 8.83393 20.5875 11.2071 20.5875 14.2929V20.5714Z" fill="#758CA3"/></svg>
                      </a>
                      &nbsp;
                      <a href="https://www.facebook.com/actiancorp" target="_blank">
                        <svg width="22px" height="22px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <title>Facebook</title> <desc></desc> <defs> </defs> <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"> <path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"></path></g></g></g></svg> 
                      </a>
                      &nbsp;
                      <a href="https://twitter.com/actiancorp" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" width="26px" height="26px"><path d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,21H3V3h18V21z M17.538,17l-4.186-5.99L16.774,7h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"/></svg>
                      </a>
                      &nbsp;
                      <a href="http://www.youtube.com/actiancorporation" target="_blank">
                          <svg width="24px" height="24px" viewBox="0 -3.5 24 24" id="meteor-icon-kit__solid-youtube" fill="none" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path fill-rule="evenodd" clip-rule="evenodd" d="M23.4593 2.63137C23.1843 1.59561 22.3738 0.77987 21.3447 0.50304C19.4795 0 12 0 12 0C12 0 4.52059 0 2.65529 0.50304C1.62622 0.77991 0.815739 1.59561 0.540659 2.63137C0.040863 4.50876 0.040863 8.4258 0.040863 8.4258C0.040863 8.4258 0.040863 12.3427 0.540659 14.2201C0.815739 15.2559 1.62622 16.0376 2.65529 16.3145C4.52059 16.8175 12 16.8175 12 16.8175C12 16.8175 19.4794 16.8175 21.3447 16.3145C22.3738 16.0376 23.1843 15.2559 23.4593 14.2201C23.9591 12.3427 23.9591 8.4258 23.9591 8.4258C23.9591 8.4258 23.9591 4.50876 23.4593 2.63137zM9.5538 11.9821V4.86942L15.8051 8.4258L9.5538 11.9821z" fill="#758CA3"/></svg>
                      </a>                   
                      &nbsp;
                      <a href="https://github.com/ActianCorp/integration-platform-docs/tree/suggestions" target="_blank">
                      <svg width="24px" height="24px" viewBox="0 -0.5 24 24" id="meteor-icon-kit__regular-github" fill="none" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12.2047 0.00001C6.56031 -0.005731 1.74628 4.08615 0.842541 9.6577C-0.061195 15.2293 3.2126 20.6331 8.56941 22.4118C9.14823 22.5177 9.35294 22.1577 9.35294 21.8541C9.35294 21.5506 9.35294 20.8588 9.35294 19.8988C6.14117 20.5977 5.46353 18.3529 5.46353 18.3529C5.25046 17.6572 4.79779 17.0595 4.18588 16.6659C3.14823 15.96 4.27059 15.96 4.27059 15.96C5.00761 16.0641 5.65578 16.5014 6.02823 17.1459C6.34368 17.7179 6.87393 18.1406 7.50179 18.3208C8.12965 18.5009 8.8034 18.4236 9.37411 18.1059C9.41842 17.5252 9.66876 16.9794 10.08 16.5671C7.5247 16.2777 4.84235 15.2894 4.84235 10.92C4.82481 9.7786 5.24688 8.67412 6.02117 7.8353C5.67632 6.84285 5.71662 5.7571 6.13412 4.79295C6.13412 4.79295 7.10117 4.48236 9.29647 5.97177C11.1816 5.45419 13.1713 5.45419 15.0565 5.97177C17.2518 4.48236 18.2118 4.79295 18.2118 4.79295C18.6351 5.74689 18.6854 6.82486 18.3529 7.81412C19.1272 8.65294 19.5493 9.7574 19.5318 10.8988C19.5318 15.3177 16.8424 16.2847 14.28 16.5459C14.8359 17.1047 15.1218 17.8774 15.0635 18.6635C15.0635 20.2024 15.0635 21.4447 15.0635 21.8188C15.0635 22.1929 15.2682 22.4824 15.8541 22.3694C21.1473 20.5447 24.3569 15.1728 23.4554 9.6469C22.5539 4.1211 17.8034 0.04779 12.2047 0.00001z" fill="#758CA3"/></svg>                    </div>
                  </div>
                `,
              },
            ],
          },
        ],
      //copyright: `Copyright © ${new Date().getFullYear()} Actian Corporation. All rights reserved.`,
    },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'DJTQI8DCNE',
  
        // Public API key: it is safe to commit it
        apiKey: '557417026f266de1c4a0a43fc919ca41',
  
        indexName: 'integration-platform-netlify',
  
        // Optional: see doc section below
        //contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        //externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        //replaceSearchResultPathname: {
        //  from: '/docs/', // or as RegExp: /\/docs\//
        //  to: '/',
        //},
  
        // Optional: Algolia search parameters
        //searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'false', //'search',
  
        //... other Algolia params
      },
    }),
};

export default config;
