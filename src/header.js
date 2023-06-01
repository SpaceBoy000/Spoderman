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

function Spoderman() {

    const section1 = useScrollSection('section1');
    const section2 = useScrollSection('section2');

    const [mobile, setMobile] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    RENDER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            {mobile === true ? (
                <div className="mobile_head">
                    <div className="mobile_herader_content">
                        <div style={{ alignSelf: "center", marginBottom: "30px" }}>
                            <img src="./favicon.png" alt="ETH Snowball" height="64px" />
                        </div>
                        <div className="mobile_four_btn">
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/webpaper.pdf" target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    <span>Webpaper</span>
                                </a>
                            </div>
                            <div onClick={() => { setMobile(true); section2.onClick() }} selected={section2.selected} className='font-bold'>
                                <span>Roadmap</span>
                            </div>
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/transparency" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    <span>Transparency</span>
                                </a>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <a href='http://t.me/SpodermanAirdrop_Bot' target='_blank' alt='Join Airdrop'>
                            <Button
                                className='custom-button connect-button !text-[13px]'
                            >
                                JOIN AIRDROP
                            </Button>
                        </a>
                    </div>
                    <div
                        className="empty_mobile"
                        onClick={() => {
                            setMobile(false)
                        }}
                    ></div>
                </div>
            )
                : <></>}

            <div className="custom-header bg-white">
                <a href='/' rel="noreferrer"
                    style={{
                        textDecoration: 'none',
                        fontWeight: "bolder",
                        color: 'black'
                    }}
                >
                    <img
                        alt="..."
                        src={logoImg}
                        style={{ width: 'auto', height: '28px' }}
                    />
                </a>
                <div className="header_menu">
                    <Item>
                        <a href='/webpaper.pdf' target="_blank" rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                                color: 'black'
                            }}
                        >
                            <span>Webpaper </span>
                        </a>
                    </Item>
                    <Item onClick={() => { section2.onClick(); console.log(">>>>>>>") }} selected={section2.selected}>
                        <span>Roadmap</span>
                    </Item>
                    <Item>
                        <a href='/transparency' rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                                color: 'black'
                            }}
                        >
                            <span>Transparency </span>
                        </a>
                    </Item>
                </div>
                <a href='http://t.me/SpodermanAirdrop_Bot' target='_blank' alt='Join Airdrop'>
                    <Button
                        className='custom-button connect-button desktop-button'
                    >
                        JOIN AIRDROP
                    </Button>
                </a>
                <div
                    className='mobile_btn'
                    onClick={() => {
                        setMobile(true)
                    }}
                >
                    <GiHamburgerMenu />
                </div>
            </div>
        </>
    )
}
export default Spoderman;