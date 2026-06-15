export interface SubProject {
  name: string
  description: string
  link?: string
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string[]
  links: { label: string; url: string }[]
  subProjects?: SubProject[]
  images?: ProjectImage[] // Array of image data for the gallery
}

export interface Experiment {
  id: string
  title: string
  description: string
  tags: string[]
  link?: string
}

export interface ProjectImage {
  src: string
  width: number
  height: number
}

export const projects: Project[] = [
  {
    id: 'programming-defi-uniswap',
    title: 'PROGRAMMING DEFI: UNISWAP',
    subtitle: '_CLONE UNISWAP V1 → V2 FROM SCRATCH',
    description: [
      '_SOLIDITY · HARDHAT · FOUNDRY',
      '_AMM MATH · LP TOKENS · ROUTERS',
      '_FACTORY · EXCHANGE · TOKEN SWAPS',
    ],
    links: [
      { label: 'READ SERIES', url: 'https://jeiwan.net/posts/programming-defi-uniswap-1/' },
    ],
    subProjects: [
      {
        name: 'UNISWAP V1',
        description: 'PARTS 1–3 · EXCHANGE + FACTORY',
        link: 'https://jeiwan.net/posts/programming-defi-uniswap-1/',
      },
      {
        name: 'UNISWAP V2',
        description: 'PARTS 1–4 · PAIRS + ROUTING',
        link: 'https://jeiwan.net/posts/programming-defi-uniswapv2-1/',
      },
      {
        name: 'V3 DEV BOOK',
        description: 'CONCENTRATED LIQUIDITY DEEP DIVE',
        link: 'https://jeiwan.net/posts/uniswap-v3-development-book-is-out/',
      },
    ],
    images: [
      { src: '/images/projects/jeiwan-uniswap.svg', width: 1700, height: 1400 },
      { src: '/images/projects/jeiwan-home.svg', width: 1700, height: 1400 },
    ],
  },
  {
    id: 'blockchain-in-go',
    title: 'BLOCKCHAIN IN GO',
    subtitle: '_BUILD A CHAIN FROM FIRST PRINCIPLES',
    description: [
      '_PROOF-OF-WORK · MEMPOOL · UTXO',
      '_PERSISTENCE · CLI · P2P NETWORK',
      '_7-PART HANDS-ON SERIES',
    ],
    links: [
      { label: 'READ SERIES', url: 'https://jeiwan.net/posts/building-blockchain-in-go-part-1/' },
    ],
    subProjects: [
      {
        name: 'PART 1–3',
        description: 'PROTOTYPE · POW · PERSISTENCE',
        link: 'https://jeiwan.net/posts/building-blockchain-in-go-part-1/',
      },
      {
        name: 'PART 4–5',
        description: 'TRANSACTIONS · ADDRESSES',
        link: 'https://jeiwan.net/posts/building-blockchain-in-go-part-4/',
      },
      {
        name: 'PART 6–7',
        description: 'UTXO MODEL · P2P NETWORK',
        link: 'https://jeiwan.net/posts/building-blockchain-in-go-part-7/',
      },
    ],
    images: [
      { src: '/images/projects/jeiwan-go.svg', width: 1700, height: 1400 },
    ],
  },
  {
    id: 'defi-security',
    title: 'DEFI SECURITY',
    subtitle: '_AUDITS · CTF · ON-CHAIN ANALYSIS',
    description: [
      '_ETHERNAUT + PARADIGM CTF WRITEUPS',
      '_UPGRADEABLE PROXY PATTERNS',
      '_FOUNDRY STRATEGY EVALUATION',
    ],
    links: [
      { label: 'READ ARTICLE', url: '/blogs/upgradeable-proxy' },
    ],
    subProjects: [
      {
        name: 'UPGRADEABLE PROXY',
        description: 'DELEGATECALL · EIP-1967 · YUL',
        link: '/blogs/upgradeable-proxy',
      },
      {
        name: 'ETHERNAUT',
        description: 'TIPS + SOLUTIONS',
        link: 'https://jeiwan.net/posts/ethernaut-tips-and-solutions/',
      },
      {
        name: 'PARADIGM CTF 2022',
        description: 'CHALLENGE SOLUTIONS',
        link: 'https://jeiwan.net/posts/my-paradigm-ctf-2022-solutions/',
      },
      {
        name: 'SWAPROUTER BUG',
        description: 'PUBLIC UNISWAP BUG REPORT',
        link: 'https://jeiwan.net/posts/public-bug-report-uniswap-swaprouter/',
      },
    ],
    images: [
      { src: '/images/projects/jeiwan-security.svg', width: 1700, height: 1400 },
    ],
  },
  {
    id: 'shillz',
    title: 'SHILLZ.APP',
    subtitle: '_TOKEN-BASED COMMUNITY REWARDS',
    description: [
      '_SMART CONTRACT REWARD DISTRIBUTION',
      '_ON-CHAIN ENGAGEMENT METRICS',
      '_EVM + SOLANA INTEGRATION',
    ],
    links: [
      { label: 'SHILLZ.APP', url: 'https://www.shillz.app' },
    ],
    images: [
      { src: '/images/projects/shillz-landing.png', width: 1706, height: 1401 },
      { src: '/images/projects/shillz-dashboard.png', width: 1700, height: 1398 },
      { src: '/images/projects/shillz-project.png', width: 1712, height: 1394 },
      { src: '/images/projects/shillz-analytics.png', width: 1694, height: 1388 },
      { src: '/images/projects/shillz-profile.png', width: 1704, height: 1399 },
    ],
  },
  {
    id: 'y2k-dotcom',
    title: 'Y2K DOTCOM',
    subtitle: '_CULTURE COIN // NOSTALGIA PROTOCOL',
    description: [
      '_TOKEN CONTRACT + 4,000+ HOLDERS',
      '_ON-CHAIN COMMUNITY TOOLS',
      '_AI-POWERED MEME GENERATION',
    ],
    links: [
      { label: 'Y2KDOTCOM.XYZ', url: 'https://y2kdotcom.xyz' },
    ],
    subProjects: [
      {
        name: 'MEME MACHINE',
        description: 'AI-POWERED MEME GENERATOR',
        link: 'https://y2kdotcom.xyz/meme-machine',
      },
      {
        name: 'PORTFOLIO',
        description: 'TOKEN HOLDER DASHBOARD',
        link: 'https://y2kdotcom.xyz/portfolio',
      },
      {
        name: 'MEME DATABASE',
        description: 'SEARCHABLE MEME ARCHIVE',
        link: 'https://y2kdotcom.xyz/meme-database',
      },
    ],
    images: [
      { src: '/images/projects/y2k-main.png', width: 1709, height: 1403 },
      { src: '/images/projects/y2k-meme-machine.png', width: 1701, height: 1397 },
      { src: '/images/projects/y2k-portfolio.png', width: 1697, height: 1395 },
      { src: '/images/projects/y2k-database.png', width: 1702, height: 1395 },
    ],
  },
  {
    id: 'y2k-coded',
    title: 'Y2K CODED',
    subtitle: '_PHYSICAL DROPS // DIGITAL CULTURE',
    description: [
      '_LIMITED EDITION POSTERS',
      '_NOSTALGIA ARTIFACTS',
      '_SHOPIFY INTEGRATION',
      '_BRIDGING DIGITAL & PHYSICAL',
    ],
    links: [
      { label: 'Y2KCODED.COM', url: 'https://y2kcoded.com' },
    ],
    images: [
      { src: '/images/projects/y2k-coded-main.png', width: 1694, height: 1350 },
      { src: '/images/projects/y2k-coded-poster-details.png', width: 1686, height: 1202 },
      { src: '/images/projects/y2k-coded-drop-schedule.png', width: 1676, height: 1203 },
      { src: '/images/projects/y2k-coded-bundle.png', width: 1666, height: 1270 },
      { src: '/images/projects/y2k-coded-checkout.png', width: 1698, height: 1347 },
      { src: '/images/projects/y2k-coded-archive.png', width: 1634, height: 1250 },
    ],
  },
]

export const experiments: Experiment[] = [
  {
    id: 'meme-receipts',
    title: 'MEME RECEIPTS',
    description: 'TURN YOUR TRADES INTO SHAREABLE RECEIPTS',
    tags: ['SMART CONTRACTS', 'WEB3', 'MEMES'],
    link: 'https://meme-receipts.com',
  },
  {
    id: 'coming-soon-1',
    title: 'MORE COMING',
    description: 'NEW WEB3 + AI EXPERIMENTS LOADING...',
    tags: ['WEB3', 'AI', 'SOON'],
  },
]
