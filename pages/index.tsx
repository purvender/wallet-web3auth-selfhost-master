import React, {useContext, useState} from 'react';
import {WalletContextValues, WalletContext} from "../components/WalletContext";
import {WALLET_ADAPTERS} from "@web3auth/base";

const CustomAuth = () => {
    const [wError, setWError] = useState('')

    const {
        web3AuthType,
        isLoading,
        connected,
        accountAddress,
        accountBalance,
        login,
        logout,
    }: WalletContextValues = useContext(WalletContext);


    // @ts-ignore
    const WButton = ({label, onClick}) =>
        <div
            className=' flex w-48 h-12 bg-indigo-800 cursor-pointer m-8 rounded items-center justify-center text-cyan-50'
            onClick={() => {
                setWError('');
                onClick();
            }}>{label}</div>

    const getButtons = () => {
        if (web3AuthType && web3AuthType === 'web3Core') {
            return (
                <>
                    <WButton label={'login - metamask'} onClick={() => login(WALLET_ADAPTERS.METAMASK)}/>
                    <WButton label={'login - torus evm'} onClick={() => login(WALLET_ADAPTERS.TORUS_EVM)}/>
                    <WButton label={'login - walletConnect v1'}
                             onClick={() => login(WALLET_ADAPTERS.WALLET_CONNECT_V1)}/>
                </>
            )
        } else {
            return (
                <>
                    <WButton label={'login - openLogin'} onClick={() => login(WALLET_ADAPTERS.OPENLOGIN)}/>
                </>
            )
        }
    }


    return (
        <div className='flex flex-col items-center mt-8'>
            <div className='flex flex-col items-start w-full px-12'>
                <div className='min-h-12'>Loading: {isLoading ? 'true' : 'false'} </div>
                <div className='min-h-12'> Connected: {connected ? 'true' : 'false'}</div>
                <div
                    className={`${wError === '' ? 'text-black' : 'text-red-800'} min-h-12`}>Error: {wError === '' ? 'none' : wError}</div>
                <div className='min-h-12'>Account Public
                    Key: {accountAddress ? `${accountAddress?.substring(0, 5)}...${accountAddress?.slice(-5)}` : null}</div>
                <div className='min-h-12'>Account Balance: {accountBalance}</div>
                <div className='min-h-12'>Web3Auth Type: {web3AuthType}</div>
            </div>
            <div className='flex flex-col'>
                {connected ?
                    <>
                        <WButton label={'logout'} onClick={logout}/>
                    </> :
                 getButtons()
                }
            </div>
        </div>
    )
}

export default CustomAuth;
