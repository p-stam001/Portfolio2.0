export interface Article {
  id: string
  title: string
  url: string
  source: 'BLOG' | 'X'
  year: string
}

export const articles: Article[] = [
  {
    id: 'upgradeable-proxy',
    title: 'UPGRADEABLE PROXY CONTRACT FROM SCRATCH',
    url: 'https://blog.cxdev.info/posts/upgradeable-proxy-from-scratch/',
    source: 'BLOG',
    year: '2021',
  },
  {
    id: 'uniswap-bug-report',
    title: 'PUBLIC BUG REPORT: UNISWAP SWAPROUTER ETH REFUND',
    url: 'https://blog.cxdev.info/posts/public-bug-report-uniswap-swaprouter/',
    source: 'BLOG',
    year: '2023',
  },
  {
    id: 'uniswap-v3-book',
    title: 'UNISWAP V3 DEVELOPMENT BOOK IS OUT',
    url: 'https://blog.cxdev.info/posts/uniswap-v3-development-book-is-out/',
    source: 'BLOG',
    year: '2022',
  },
  {
    id: 'defi-foundry',
    title: 'EVALUATING DEFI STRATEGIES USING FOUNDRY',
    url: 'https://blog.cxdev.info/posts/evaluating-defi-strategy-in-foundry/',
    source: 'BLOG',
    year: '2022',
  },
  {
    id: 'uniswap-v2-part-1',
    title: 'PROGRAMMING DEFI: UNISWAP V2. PART 1',
    url: 'https://blog.cxdev.info/posts/programming-defi-uniswapv2-1/',
    source: 'BLOG',
    year: '2022',
  },
  {
    id: 'uniswap-part-1',
    title: 'PROGRAMMING DEFI: UNISWAP. PART 1',
    url: 'https://blog.cxdev.info/posts/programming-defi-uniswap-1/',
    source: 'BLOG',
    year: '2021',
  },
  {
    id: 'blockchain-go-part-1',
    title: 'BUILDING BLOCKCHAIN IN GO. PART 1: BASIC PROTOTYPE',
    url: 'https://blog.cxdev.info/posts/building-blockchain-in-go-part-1/',
    source: 'BLOG',
    year: '2017',
  },
]

export const articlesArchiveUrl = 'https://blog.cxdev.info/'
