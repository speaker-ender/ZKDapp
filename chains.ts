import type { AddEthereumChainParameter } from '@web3-react/metamask'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
}

interface BasicChainInformation {
    urls: (string | undefined)[]
    name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
    nativeCurrency: AddEthereumChainParameter['nativeCurrency']
    blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
    chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
    return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

const getFormattedNetworkName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase().replace(' ', '');
}

export function notUndefined<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== undefined;
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
    const chainInformation = CHAINS[chainId]
    const chainUrls: string[] = chainInformation.urls.filter(notUndefined);

    if (isExtendedChainInformation(chainInformation) && chainInformation.urls !== undefined) {
        return {
            chainId,
            chainName: chainInformation.name,
            nativeCurrency: chainInformation.nativeCurrency,
            rpcUrls: chainUrls,
            blockExplorerUrls: chainInformation.blockExplorerUrls,
        }
    } else {
        return chainId
    }
}

export const CHAINS: { [chainId: number]: BasicChainInformation | ExtendedChainInformation } = {
    31337: {
        urls: [
            'http://localhost:8545',
        ],
        name: 'Hardhat',
    },
    1: {
        urls: [
            process.env.infuraKey ? `https://mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            process.env.alchemyKey ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined,
            'https://cloudflare-eth.com',
        ],
        name: 'Mainnet',
    },
    3: {
        urls: [process.env.infuraKey ? `https://ropsten.infura.io/v3/${process.env.infuraKey}` : undefined],
        name: 'Ropsten',
    },
    4: {
        urls: [process.env.infuraKey ? `https://rinkeby.infura.io/v3/${process.env.infuraKey}` : undefined],
        name: 'Rinkeby',
    },
    5: {
        urls: [process.env.infuraKey ? `https://goerli.infura.io/v3/${process.env.infuraKey}` : undefined],
        name: 'Görli',
    },
    42: {
        urls: [process.env.infuraKey ? `https://kovan.infura.io/v3/${process.env.infuraKey}` : undefined],
        name: 'Kovan',
    },
    // Optimism
    10: {
        urls: [
            process.env.infuraKey ? `https://optimism-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://mainnet.optimism.io',
        ],
        name: 'Optimistic Ethereum',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://optimistic.etherscan.io'],
    },
    69: {
        urls: [
            process.env.infuraKey ? `https://optimism-kovan.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://kovan.optimism.io',
        ],
        name: 'Optimistic Kovan',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
    },
    // Arbitrum
    42161: {
        urls: [
            process.env.infuraKey ? `https://arbitrum-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://arb1.arbitrum.io/rpc',
        ],
        name: 'Arbitrum One',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://arbiscan.io'],
    },
    421611: {
        urls: [
            process.env.infuraKey ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://rinkeby.arbitrum.io/rpc',
        ],
        name: 'Arbitrum Testnet',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://testnet.arbiscan.io'],
    },
    // Polygon
    137: {
        urls: [
            process.env.infuraKey ? `https://polygon-mainnet.infura.io/v3/${process.env.infuraKey}` : undefined,
            'https://polygon-rpc.com',
        ],
        name: 'Polygon Mainnet',
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://polygonscan.com'],
    },
    80001: {
        urls: [process.env.infuraKey ? `https://polygon-mumbai.infura.io/v3/${process.env.infuraKey}` : `https://rpc-mumbai.maticvigil.com`],
        name: 'Polygon Mumbai',
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
}

type IHardhatObject = {
    url: string,
    accounts: string[]
}

export const NETWORKS: { [chainName: string]: { url: string, accounts: string[] } } = Object.keys(CHAINS).reduce((accumulator, chainId) => {
    const validURLs: (string | undefined)[] = CHAINS[Number(chainId)].urls.filter((url) => url)
    const filteredURLs = validURLs.filter(notUndefined);
    const chainName: string = getFormattedNetworkName(CHAINS[Number(chainId)].name);

    if (validURLs.length) {
        accumulator[chainName] = { url: filteredURLs[0], accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [] }
    }

    return accumulator
}, {} as Record<string, IHardhatObject>)

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce((accumulator, chainId) => {
    const validURLs: (string | undefined)[] = CHAINS[Number(chainId)].urls.filter((url) => url).filter(notUndefined);
    const filteredURLs = validURLs.filter(notUndefined);

    if (validURLs.length) {
        accumulator[chainId] = filteredURLs
    }

    return accumulator
}, {} as Record<string, string[]>)