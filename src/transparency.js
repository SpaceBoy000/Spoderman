import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
import { Section, useScrollSection } from 'react-scroll-section'
import './App.css';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
// import moment from 'moment';
import { useContract } from 'wagmi'
import wealthMountainABI from './contracts/WealthMountainBSC.json';
// import erc20ABI from './contracts/erc20ABI.json';
import styled from "styled-components";
import { Tabs, Tab, TabPanel } from "./components/tabs/tabs";
// import SelectObject from "./components/SelectCoin";
// import { FaCopy, FaWallet, FaUserShield, FaSearchDollar } from 'react-icons/fa';
import { Accordion } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi"
// import axios from "axios";
// import RealTimeChart from "./chart";
import { Toast } from './utils';
import Web3 from "web3";
import MyNftCard from './components/MyNftCard';
import FAQList from './components/faq/FaqAccordian';


import logoImg from "./assets/img/logos/logo.png";

import spoder1Img from "./assets/img/spoder1.png";
import spoder2Img from "./assets/img/spoder2.png";
import spoder_dogImg from "./assets/img/spoder-2dog.png";
import spodercowImg from "./assets/img/spoder-cow.png";
import spoderHeartImg from "./assets/img/spoder-heart.png";
import spoderleftHeader from "./assets/img/spoder-left.png";

import plusIcon from "./assets/icons/plusIcon.svg";
import minusIcon from "./assets/icons/minusIcon.svg";

import spider1 from "./assets/img/spiders/spider 1.png";
import spider2 from "./assets/img/spiders/spider 2.png";
import spider3 from "./assets/img/spiders/spider 3.png";
import spider4 from "./assets/img/spiders/spider 4.png";
import spider5 from "./assets/img/spiders/spider 5.png";
import spider6 from "./assets/img/spiders/spider 6.png";
import spider7 from "./assets/img/spiders/spider 7.png";
import spider8 from "./assets/img/spiders/spider 8.png";

import spoder0 from "./assets/img/spoders/image.png";
import spoder1 from "./assets/img/spoders/image 1.png";
import spoder2 from "./assets/img/spoders/image 2.png";
import spoder3 from "./assets/img/spoders/image 3.png";
import spoder4 from "./assets/img/spoders/image 4.png";
import spoder5 from "./assets/img/spoders/image 5.png";
import spoder6 from "./assets/img/spoders/image 6.png";
import spoder7 from "./assets/img/spoders/image 7.png";
import spoder8 from "./assets/img/spoders/image 8.png";
// import spoder9 from "./assets/img/spoders/image 9.png";
// import spoder10 from "./assets/img/spoders/image 10.png";
// import spoder11 from "./assets/img/spoders/image 11.png";
// import spoder12 from "./assets/img/spoders/image 12.png";

import telIcon from "./assets/icons/telegram.png";
import discordIcon from "./assets/icons/discord.png";
import twitterIcon from "./assets/icons/twitter.png";
import insIcon from "./assets/icons/instagram.png";

import certik from "./assets/img/audit/certik.png";
import theStamp from "./assets/img/audit/theStamp.png";
import tech from "./assets/img/audit/tech.png";

import manImg from "./assets/img/man.png";

import googlePlayBtnImg from "./assets/icons/google_play.png"
import appStoreBtnImg from "./assets/icons/app_store.png"



// import abiDecoder from "abi-decoder";
// window.Buffer = window.Buffer || require("buffer").Buffer;
import {
    Button,
    Card,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CardDeck,
    Container,
    Col,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Label,
    Table,
    Row
} from "reactstrap";
import { ethers, Contract } from 'ethers';

// AOS.init({ duration: 2000 });
const TabsContainer = styled.div`
  display: flex;
  padding: 2px;
`;

const Item = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '5px 20px',
    textAlign: 'center',
    fontSize: "16px",
    color: 'black',
    minWidth: '100px',
    alignSelf: 'center',
    cursor: 'pointer',
    fontWeight: '900'
}));

const Wrapper = styled("div")(({ theme }) => ({
    minWidth: "250px",
    margin: "10px",
    width: '250px',
    display: 'inline-block',
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    overflow: "hidden",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 3px",
    borderRadius: "20px",
    marginBottom: "24px",
    border: 'solid 1px #0e131f',
    '&:hover': {
        boxShadow: "0 0 0.1em #fff, 0 0 0.2em #fff, 0 0 0.3em #fff, 0 0 0.4em #f5ea1a, 0 0 0.6em #e0f734, 0 0 0.8em #ebf705, 0 0 1em #e1f414, 0 0 1.2em #cde60f",
    },
    [theme.breakpoints.down('md')]: {
        width: '90%',
    }
}));

// const web3 = new Web3(
//     new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/")
// );


// const abiCoder = require("web3-eth-abi");
// const investFunc = /^0x3acb1a0a/;
// const claimFunc = /^0x9ddf840d/;
// const inputs = [
//     {
//         "internalType": "uint256",
//         "name": "amtx",
//         "type": "uint256"
//     },
//     {
//         "internalType": "address",
//         "name": "ref",
//         "type": "address"
//     }
// ];

// const decodeFunction = (data) => {
//     let decoded = abiCoder.decodeParameters(inputs, data.slice(10));   
//     // console.log("decoded: ", decoded.amtx / 10 ** 18);
//     return decoded.amtx / 10 ** 18;
// }

export function shorten(str, length = 6) {
    if (str.length < 10) return str;
    return `${str.slice(0, length)}...${str.slice(str.length - 4)}`;
}

function Transparency() {

    const [userWalletAddress, setUserWalletAddress] = useState('none');

    const items = [
        { txlink: '/', label: 'Treasury Wallet', value: 0 },
        { txlink: '/', label: 'CEX', value: 0 },
        { txlink: '/', lockLink: '/', label: 'Marketing Wallet', value: 0 },
        { txlink: '/', lockLink: '/', label: 'Developer Wallet', value: 0 },
        { txlink: '/', lockLink: '/', label: 'Rewards For Sporderman Product', value: 0 },
    ];


    const copyFunc = () => {
        navigator.clipboard.writeText(window.location + "?ref=" + userWalletAddress);
        Toast.fire({
            icon: 'success',
            title: 'Successfully copied!'
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    RENDER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className='main-content pb-8'>
                <Container className="pt-3">
                    <div className='mt-[50px] md:mt-[10px]'>
                        <div className='flex flex-col px-4 gap-8 mt-8 md:mt-16 justify-between text-black'>
                            {
                                items.map((item, index) => {
                                    return (
                                        <div className='flex flex-col gap-2 p-4 md:max-w-full bg-white custom-shadow'>
                                            <div className="text-center title2">{item.label}</div>
                                            <div className="text-center pb-4 ">{item.value.toFixed(2)}</div>
                                            <div className='flex justify-center gap-4'>
                                                <div className="text-center pb-4 ">View Transaction</div>
                                                {item.lockLink ? <div className="text-center pb-4 ">View Token Lock</div> : <></>}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
export default Transparency;