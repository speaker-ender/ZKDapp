import * as React from "react"
import { useCallback, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useRef } from "react";
import { useDEXContract } from "hooks/contracts/dex.hooks";
import { useActiveConnectorContext } from "hooks/connector.hooks";
import { StyledSwapper, StyledSwapperHeader } from "./swapper.styles";
import { DEX } from "../../../../typechain-types/DEX";
import { useDeadCoinContract } from "hooks/contracts/deadCoin.hooks";
import { DeadCoin } from "../../../../typechain-types";
import { Paragraph } from "global/typography";
import SwapperInfo from "./parts/swapperInfo";

const Swapper: React.FC = () => {
    const hooks = useActiveConnectorContext();
    const DEXContract = useDEXContract({ hooks: hooks });
    const deadCoin = useDeadCoinContract({ hooks: hooks });
    const account = hooks.useActiveAccount();
    const chainId = hooks.useActiveChainId();
    const activeProvider = hooks.useActiveProvider();
    const stakeAmount = useRef<HTMLInputElement>(null!);
    const [stakedBalance, setStakedBalance] = useState<BigNumber>(BigNumber.from('0'));
    const [deadLiquidity, setDeadLiquidity] = useState<BigNumber>(BigNumber.from('0'));
    const [ethLiquidity, setEthLiquidity] = useState<BigNumber>(BigNumber.from('0'));

    const updateStakedBalance = useCallback((dex: DEX) => {
    }, [stakedBalance, setStakedBalance]);

    const updateEthLiquidity = useCallback(async (dex: DEX) => {
        const newEthLiquidity = activeProvider && await activeProvider.getBalance(dex.address);
        setEthLiquidity(newEthLiquidity || BigNumber.from(0));
    }, [ethLiquidity, setEthLiquidity]);

    const updateDeadLiquidity = useCallback(async (dex: DEX, dead: DeadCoin) => {
        const newDeadLiquidity = await dead.balanceOf(dex.address);
        setDeadLiquidity(newDeadLiquidity);
    }, [deadLiquidity, setDeadLiquidity]);

    const getContractInfo = useCallback(() => {
        if (!!DEXContract && deadCoin) {
            updateDeadLiquidity(DEXContract, deadCoin);
            updateEthLiquidity(DEXContract);
        }
    }, [DEXContract, deadCoin]);

    useEffect(() => {
        getContractInfo();

        return () => {
        }
    }, [DEXContract, deadCoin])

    return (
        <StyledSwapper>
            <StyledSwapperHeader>Swap</StyledSwapperHeader>
            {deadCoin && DEXContract &&
                <SwapperInfo deadCoin={deadCoin} DEXContract={DEXContract} />
            }
        </StyledSwapper>
    )
}

export default Swapper
