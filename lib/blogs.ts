export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'list'; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  date: string
  year: string
  tags: string[]
  excerpt: string
  blocks: BlogBlock[]
  externalUrl?: string
}

export const blogs: BlogPost[] = [
  {
    slug: 'upgradeable-proxy',
    title: 'UPGRADEABLE PROXY CONTRACT FROM SCRATCH',
    date: '2021-08-25',
    year: '2021',
    tags: ['SOLIDITY', 'PROXY', 'EVM'],
    excerpt:
      'Build an upgradeable proxy with delegatecall, resolve storage collisions via EIP-1967, and swap implementations without migrating state.',
    externalUrl: 'https://jeiwan.net/posts/upgradeable-proxy-from-scratch/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Smart contracts are immutable by default — which is great for trust, but painful when you need to fix bugs or ship improvements. Proxy patterns let you keep a stable address while swapping the implementation behind it.',
      },
      { type: 'heading', text: 'PROXY + IMPLEMENTATION' },
      {
        type: 'paragraph',
        text: 'A proxy contract forwards calls to an implementation contract. Users interact with the proxy; the proxy relays function calls via fallback logic. When you deploy a new implementation, you update the pointer — same address, new logic.',
      },
      {
        type: 'code',
        language: 'solidity',
        code: `contract Logic {
  uint256 magicNumber;

  function setMagicNumber(uint256 newMagicNumber) public {
    magicNumber = newMagicNumber;
  }

  function getMagicNumber() public view returns (uint256) {
    return magicNumber;
  }
}`,
      },
      { type: 'heading', text: 'DELEGATECALL VS CALL' },
      {
        type: 'paragraph',
        text: 'delegatecall runs the implementation code in the proxy storage context. That is what makes upgrades work: state lives in the proxy, logic lives in replaceable contracts. A plain call would keep state in the implementation and break upgradeability.',
      },
      { type: 'heading', text: 'STORAGE COLLISIONS' },
      {
        type: 'paragraph',
        text: 'If the proxy and implementation both declare state variables at slot 0, they collide under delegatecall. EIP-1967 fixes this by storing the implementation address at a deterministic slot derived from a unique hash, keeping implementation metadata out of the way of app state.',
      },
      {
        type: 'list',
        items: [
          'Use assembly fallback to forward calldata unchanged',
          'Store implementation at EIP-1967 slot via sload/sstore',
          'Initialize logic with an explicit init function — constructors do not run on the proxy',
          'Swap implementations and keep user data intact',
        ],
      },
      {
        type: 'paragraph',
        text: 'This pattern is the foundation for production upgradeable systems. Understanding storage layout, delegatecall, and initialization is essential before reaching for OpenZeppelin proxies in anger.',
      },
    ],
  },
  {
    slug: 'uniswap-bug-report',
    title: "PUBLIC BUG REPORT: UNISWAP SWAPROUTER ETH REFUND",
    date: '2023-01-21',
    year: '2023',
    tags: ['SECURITY', 'UNISWAP', 'MEV'],
    excerpt:
      'SwapRouter can leave unspent ETH in the contract during partial swaps — funds that anyone can withdraw via refundETH.',
    externalUrl: 'https://jeiwan.net/posts/public-bug-report-uniswap-swaprouter/',
    blocks: [
      {
        type: 'paragraph',
        text: 'During partial ETH swaps, SwapRouter may not refund the difference between msg.value and the amount actually consumed. Excess ETH stays in the router until someone calls refundETH — including MEV bots watching the mempool.',
      },
      {
        type: 'heading',
        text: 'MITIGATION',
      },
      {
        type: 'list',
        items: [
          'Wrap swaps in multicall and call refundETH in the same transaction',
          'Use the Uniswap SDK, which handles refunds automatically',
          'Never send more ETH than required without an explicit refund step',
        ],
      },
    ],
  },
  {
    slug: 'uniswap-v3-book',
    title: 'UNISWAP V3 DEVELOPMENT BOOK IS OUT',
    date: '2022-10-11',
    year: '2022',
    tags: ['UNISWAP', 'V3', 'FOUNDRY'],
    excerpt:
      'A from-scratch Uniswap V3 clone in Foundry — concentrated liquidity, chained swaps, fees, oracles, and optional NFT positions.',
    externalUrl: 'https://jeiwan.net/posts/uniswap-v3-development-book-is-out/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Uniswap V3 adds concentrated liquidity, tighter capital efficiency, and a thicker engineering layer on top of the classic x * y = k model. This series walks through building a V3 clone milestone by milestone in Foundry.',
      },
      {
        type: 'list',
        items: [
          'Milestone 0–1: market makers and a simple one-direction DEX',
          'Milestone 2–3: bidirectional swaps and multi-position liquidity',
          'Milestone 4–5: chained swaps, fees, and TWAP oracles',
          'Milestone 6: extending pools with third-party NFT wrappers',
        ],
      },
    ],
  },
  {
    slug: 'defi-foundry',
    title: 'EVALUATING DEFI STRATEGIES USING FOUNDRY',
    date: '2022-04-11',
    year: '2022',
    tags: ['FOUNDRY', 'DEFI', 'AAVE'],
    excerpt:
      'Simulate DeFi strategies against mainnet state with Forge fork mode — deploy, borrow, and validate health factors without spending gas.',
    externalUrl: 'https://jeiwan.net/posts/evaluating-defi-strategy-in-foundry/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Forge fork tests let you run Solidity tests against live mainnet state. That means you can deploy a strategy contract, interact with Aave, and assert LTV and health factor in one reproducible test run.',
      },
      {
        type: 'list',
        items: [
          'Use --fork-url with an RPC endpoint to enable fork mode',
          'Approve delegation so the strategy can borrow on your behalf',
          'Read getUserAccountData from Aave to validate positions',
          'Re-run tests when mainnet state shifts — assertions may need updates',
        ],
      },
    ],
  },
  {
    slug: 'uniswap-v2-part-1',
    title: 'PROGRAMMING DEFI: UNISWAP V2. PART 1',
    date: '2022-01-11',
    year: '2022',
    tags: ['UNISWAP', 'V2', 'FOUNDRY'],
    excerpt:
      'Start a Uniswap V2 clone in Foundry — pair contracts, LP tokens, mint/burn liquidity, and Solidity-native tests.',
    externalUrl: 'https://jeiwan.net/posts/programming-defi-uniswapv2-1/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Uniswap V2 generalizes V1 into arbitrary ERC20 pairs with a factory registry, CREATE2 pair addresses, and a periphery router. Part 1 focuses on the pair contract: reserves, LP tokens, and liquidity math.',
      },
      {
        type: 'list',
        items: [
          'Track reserve0 and reserve1 separately from token balances',
          'Mint LP tokens on addLiquidity; burn on removeLiquidity',
          'Use geometric mean for initial liquidity; min of ratios when pool exists',
          'Write tests in Solidity with Foundry instead of JS harnesses',
        ],
      },
    ],
  },
  {
    slug: 'uniswap-part-1',
    title: 'PROGRAMMING DEFI: UNISWAP. PART 1',
    date: '2021-06-07',
    year: '2021',
    tags: ['UNISWAP', 'V1', 'HARDHAT'],
    excerpt:
      'Build Uniswap V1 from scratch with Hardhat — ERC20 token, exchange contract, constant product pricing, and swaps.',
    externalUrl: 'https://jeiwan.net/posts/programming-defi-uniswap-1/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Uniswap V1 supports ETH ↔ token swaps through a factory registry and per-token exchange contracts. Part 1 implements the ERC20 token, exchange liquidity, pricing with x * y = k, and basic swap functions.',
      },
      {
        type: 'list',
        items: [
          'Factory maps tokens to exchange addresses',
          'Exchange holds reserves and executes swaps with slippage protection',
          'Pricing functions must prevent pool draining',
          'LP rewards and factory wiring come in later parts',
        ],
      },
    ],
  },
  {
    slug: 'blockchain-go-part-1',
    title: 'BUILDING BLOCKCHAIN IN GO. PART 1: BASIC PROTOTYPE',
    date: '2017-08-16',
    year: '2017',
    tags: ['GO', 'BLOCKCHAIN', 'FROM SCRATCH'],
    excerpt:
      'Model a blockchain as an ordered, back-linked list of blocks — genesis block, hashing, and append-only chain logic in Go.',
    externalUrl: 'https://jeiwan.net/posts/building-blockchain-in-go-part-1/',
    blocks: [
      {
        type: 'paragraph',
        text: 'Before proof-of-work, networking, or transactions, a blockchain is just an ordered list where each block points to the previous hash. Part 1 implements that prototype in Go with a genesis block and append logic.',
      },
      {
        type: 'list',
        items: [
          'Blocks store data, timestamp, previous hash, and current hash',
          'Genesis block has no predecessor — every chain starts here',
          'New blocks link to the tip of the chain',
          'Later parts add PoW, persistence, transactions, and P2P networking',
        ],
      },
    ],
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((blog) => blog.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((blog) => blog.slug)
}
