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
    cursor:'pointer',
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

    const [sliderValue, setSliderValue] = useState('50');
    const [dropdownOpen, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [investInfo, setInvestInfo] = useState([5]);
    const [activeTab, setActiveTab] = useState(0);
    const [calcTotalDividends, setCalcTotalDividends] = useState("")
    const [initalStakeAfterFees, setInitalStakeAfterFees] = useState("")
    const [dailyPercent, setDailyPercent] = useState("");
    const [dailyValue, setDailyValue] = useState("");
    const [stakingAmount, setStakingAmount] = useState("");
    const [calculatedDividends, setCalculatedDividends] = useState(0);
    const [contractBalance, setContractBalance] = useState("");
    const [referralAccrued, setReferralAccrued] = useState("");
    const [totalUsers, setTotalUsers] = useState("");
    const [userDepositInfo, setUserDepositInfo] = useState([]);
    const [totalClaimableRewards, setTotalClaimableRewards] = useState([]);
    // const [totalCompounds, setTotalCompounds] = useState("")
    // const [totalCollections, setTotalCollections] = useState("")
    const [contract, setContract] = useState(undefined)
    const [signer, setSigner] = useState(undefined)
    const [userWalletAddress, setUserWalletAddress] = useState('none');
    const [userStablecoinBalance, setUserStablecoinBalance] = useState(0);
    const [stablecoinAllowanceAmount, setStablecoinAllowanceAmount] = useState(0);
    const stableCoin = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
    // const stableCoin = '0xe98e93Fde3A05Bc703f307Ee63be9507d1f48554';
    // const wealthContract = '0x4d0b1621dfCC820ca196470Be89857De7E45316D'; // test
    const wealthContract = '0xca3E36fC417535875015aA359aEa2F2250bB9034';    // main net
    const scanLinkSuffix = 'https://bscscan.com/address/';
    const [refBonusLoading, setRefBonusLoading] = useState(false);
    const [connectButtonText, setConnectButtonText] = useState('Join Airdrop')
    // const videoRef = useRef();

    const [mobile, setMobile] = useState(false);

    const [auditNo, setAuditNo] = useState('https://georgestamp.xyz/2022/09/wc-miner-busd/');
    const [cnt, setCnt] = useState(0);
    
    const audits = [
        { link: '/', label: 'Audit 1', pic: tech },
        { link: '/', label: 'Audit 2', pic: theStamp },
        { link: '/', label: 'Audit 3', pic: certik },
    ];

    const socials = [
        {link: 'https://twitter.com/Spodermanlol', label: 'twitter', pic: twitterIcon},
        {link: 'https://t.me/spodermanlol', label: 'telegram', pic: telIcon},
        {link: 'https://t.me/spodermanlolchat', label: 'telegram', pic: telIcon},
        {link: 'https://discord.gg/46bPadV5QM', label: 'discord', pic: discordIcon},
        {link: 'https://www.instagram.com/spoderman.lol/', label: 'instagram', pic: insIcon},
    ];

    const spiders = [
        {link: '', label: 'spider1', pic: spider1},
        {link: '', label: 'spider2', pic: spider2},
        {link: '', label: 'spider3', pic: spider3},
        {link: '', label: 'spider4', pic: spider4},
        {link: '', label: 'spider5', pic: spider5},
        {link: '', label: 'spider6', pic: spider6},
        {link: '', label: 'spider7', pic: spider7},
        {link: '', label: 'spider8', pic: spider8},
    ];

    const tokenomics = [
        {label: 'Airdrop', value: '1%'},
        {label: 'CEX', value: '5%'},
        {label: 'Spoderweb3.0 TVL', value: '40%'},
        {label: 'Liquidity', value: '45%'},
        {label: 'Developers Wallet', value: '4%'},
        {label: 'Marketing Wallet', value: '5%'},
    ]

    const onChangeAuditNo = (value) => {
        console.log("onChangeAuditNo value=", value); //, " : ", audits[value].link);
        setCnt((cnt + 1) % 2);
        setAuditNo(audits[(cnt + 1) % 2].link);
    }

    const [countdown, setCountdown] = useState({
        alive: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const [claimableReward, setClaimableRewards] = useState(0);

    const getCountdown = (deadline) => {
        const now = Date.now() / 1000;
        const total = Number(deadline) - now;
        const period = now - Number(deadline);
        const rewards = (2 * period / 86400);
        setClaimableRewards(rewards);
        const seconds = Math.floor((total) % 60);
        const minutes = Math.floor((total / 60) % 60);
        const hours = Math.floor((total / (60 * 60)) % 24);
        const days = Math.floor(total / (60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            try {
                const data = getCountdown(1684905200);
                setCountdown({
                    alive: data.total > 0,
                    days: data.days,
                    hours: data.hours,
                    minutes: data.minutes,
                    seconds: data.seconds
                })
            } catch (err) {
                console.log(err);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [])


    const handleChange = (e, value) => {
        setActiveTab(value);
        recalculateInfo()
    }
    // window.addEventListener("focus", function () {
    //     recalculateInfo();
    // })

    async function recalculateInfo() {
        if (contract === undefined || contract === null) {
            return;
        }

        contract.userInfo().then(value => {
            // console.log("User Info xx=> ", value);
            setUserInfo(value)
        })

        contract.getUserInfo().then(value => {
            console.log("getuserInfo: ", value);
            setUserDepositInfo(value);
        })

        contract.getTotalRewards(userWalletAddress).then((value) => {
            setTotalClaimableRewards(ethers.utils.formatEther(value));
        })
        return;
    }

    const stablecoinContract = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function approve(address spender, uint amount) public returns(bool)'],
        signerOrProvider: signer,
    })
    const stablecoinBalance = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function balanceOf(address account) external view returns (uint256)'],
        signerOrProvider: signer,
    })
    const stablecoinAllowance = useContract({
        addressOrName: stableCoin,
        contractInterface: ['function allowance(address _owner, address spender) external view returns (uint256)'],
        signerOrProvider: signer,
    })

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
            {mobile === true ? (
                <div className="mobile_head">
                    <div className="mobile_herader_content">
                        <div style={{ alignSelf: "center", marginBottom: "30px" }}>
                            <img src="./favicon.png" alt="ETH Snowball" height="64px" />
                        </div>
                        <div className="mobile_four_btn">
                            <div onClick={() => { setMobile(true); section1.onClick() }} selected={section1.selected} className='font-bold'>
                                Spoderverse
                            </div>
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/" target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    <span>Webpaper</span>
                                </a>
                            </div>
                            <div onClick={() => { setMobile(true); section2.onClick() }} selected={section2.selected} className='font-bold'>
                                <span>Roadmap</span>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <Button
                            className='custom-button connect-button !text-[13px]'
                            >
                            JOIN AIRDROP
                        </Button>
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
                <img
                    alt="..."
                    src={logoImg}
                    style={{ width: 'auto', height: '28px' }}
                />
                <div className="header_menu">
                    <Item onClick={() => {section1.onClick()}} selected={section1.selected}>
                        <span>Spoderverse</span>
                    </Item>
                    <Item>
                        <a href='/' target="_blank" rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                                color: 'black'
                            }}
                        >
                            <span>Webpaper </span>
                        </a>
                    </Item>
                    <Item onClick={() => {section2.onClick(); console.log(">>>>>>>")}} selected={section2.selected}>
                        <span>Roadmap</span>
                    </Item>
                </div>

                <Button
                    className='custom-button connect-button desktop-button'
                    >
                    JOIN AIRDROP
                </Button>
                <div
                    className='mobile_btn'
                    onClick={() => {
                        setMobile(true)
                    }}
                >
                    <GiHamburgerMenu />
                </div>
            </div>
            
            <Container className='!max-w-full md:!max-w-[80%]'>
                <CardDeck className='flex justify-between'>
                    <Card className='banner-card pt-[70px] md:!pt-[100px] text-center md:text-left'>
                        <h2 className="text-black text-uppercase font-weight-900 font-adamwarrenpro title1 !text-[30px] md:!text-[40px] text-center md:!text-left">The Amazing Spoderman</h2>
                        <h6 className='text-black font-weight-bold leading-8 text-center md:text-left'>The Web-Slinging, A**-Kicking, Community-Building Token is HERE!</h6>
                        <p className='text-black leading-8 text-center md:text-left'>$Spoder is the hottest meme token in ERC-20 that’s hyper-deflationary, product & community driven, and designed to reward long-term hodlers.</p>
                        <h5 className='pt-4 text-black font-bold'>Launching in</h5>
                        <div className='text-red text-[28px] font-weight-bold pb-4'>{countdown.alive ? countdown.days + 'D : ' + countdown.hours + "H : " + countdown.minutes + "M : " + (countdown.seconds >= 10 ? countdown.seconds : "0" + countdown.seconds) + "S " : ""}</div>
                        <div className='flex gap-3'>
                            <Button
                                className='custom-button connect-button w-[150px] max-w-[50%] !text-[13px] md:text-[16px]'>
                                Join Airdrop
                            </Button>
                            <Button
                                className='custom-button connect-button w-[150px] max-w-[50%] !text-[13px] md:text-[16px] !bg-white'>
                                Telegram
                            </Button>
                        </div>
                    </Card>
                    <Card className="banner-card flex flex-row justify-end">
                        <img src={ spoder1Img } alt="..." className='max-w-[500px] w-full'/>
                    </Card>
                </CardDeck>
            </Container>

            <div className='main-content pb-8'>
                <Container className="pt-3">
                    <div>
                        <div className='title1 text-center'>
                            Avengurs
                        </div>
                        <div className='flex justify-between flex-wrap pt-[20px] md:pt-[54px] px-8'>
                            {
                                spiders.map((item, index) => 
                                    <a href={item.link} target='_blank' key={index} className='w-1/2 md:w-1/4 flex flex-row justify-center'>
                                        <img src={item.pic} className='spider-img' alt={item.label}/>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            ABOUT SPODERMAN
                        </div>
                        <div className="text-center">
                            Making the world a better place, one <span className='font-weight-bold'>$SPODER</span> at a time! 
                        </div>
                        <div className='plain flex-revert pt-[54px] text-center md:text-left'>
                            <div className='text-container self-center'>
                                <div className='title2'>
                                    UTILITY
                                </div>
                                <div className="leading-8">
                                    The $Spoder token is the main currency in the SPODERMAN platform. Holders of the token can partake in governance, staking, gaming, and purchasing products within the Spoderverse.
                                </div>
                            </div>
                            <div className='image-container justify-end'>
                                <img src={spoder2Img}/>
                            </div>
                        </div>
                        <div className='plain pt-[30px] md:pt-[80px] text-center md:text-right'>
                            <div className='image-container p-4 md:p-12'>
                                <img src={spodercowImg}/>
                            </div>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2'>
                                    HyperDEFLATIONARY
                                </div>
                                <div className="leading-8">
                                    Through our SPODERVERSE products, HYPERdeflationary mechanisms will be put in place to encourage higher value setting of the token and its utility, incentivizing long-term hodlers.
                                </div>
                            </div>
                        </div>
                        <div className='plain flex-revert pt-[30px] md:pt-[80px] text-center md:text-left'>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2'>
                                    Community
                                </div>
                                <div className="leading-8">
                                    We believe that the world is a happier place with memes in it. All the time we’ve been talking about building a community, but what’s our community without one of the most recognizable memes of all time? Your friendly neighborhood SPODERMAN is proud to provide charitable support to Doges through our partner, Second Chance Animal Rescue Society (SCARS).
                                </div>
                            </div>
                            <div className='image-container justify-end'>
                                <img src={spoder_dogImg}/>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            Features
                        </div>
                        <div className="text-center">
                            Spoderman Superhero Products
                        </div>
                        <div className='plain flex-revert pt-[54px] leading-8 text-center md:text-left'>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2 pb-4'>
                                    SPODERWEB 3.0
                                </div>
                                <div>
                                    The upcoming SPODERMAN WEB3 Platforms aims to make exchanging, trading, gaming, staking, and lotteries easier for members of our community. The diversity of sources that SPODERMAN will open to unlocks a pool of opportunities for valuable growth, especially when you combine it with easy-to-use UI, compelling design, high demand functions, and top levels of security.
                                </div>
                                {/* <Button className='connect-button custom-button mt-4'>
                                    LAUNCH DAPP
                                </Button> */}
                                <Button
                                    className='custom-button connect-button w-[150px] max-w-[50%] !text-[13px] md:text-[16px] !bg-white mt-4'>
                                    COMING SOON
                                </Button>
                            </div>
                            <div className='image-container justify-end p-8 md:p-12'>
                                <img src={spoderleftHeader}/>
                            </div>
                        </div>
                    </div>
                    <Section id="section1">
                        <div className='pt-[30px] md:pt-[80px]'>
                            <div className='title1 text-center'>
                                SPODERVERSE
                            </div>
                            <div className="text-center leading-8 px-1 md:px-8">
                                The ultimate NFT play-to-earn platform that's powered by AI-generated NFTs. We're excited to introduce you to our latest feature, which allows you to earn tokens by staking NFTs, engaging in PVP battles, and teaming up to take down powerful bosses.
                            </div>
                            <div className='flex justify-between pt-0 md:pt-[48px]'>
                                <div class="slider">
                                    <div class="slide-track">
                                        <div class="slide"><img src={spoder0} alt='spoder0'/></div>
                                        <div class="slide"><img src={spoder1} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder2} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder3} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder4} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder5} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder6} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder7} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder8} alt='spoder1'/></div>
                                        {/* <div class="slide"><img src={spoder9} alt='spoder1'/></div> */}
                                        {/* <div class="slide"><img src={spoder10} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder11} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder12} alt='spoder1'/></div> */}
                                        <div class="slide"><img src={spoder0} alt='spoder0'/></div>
                                        <div class="slide"><img src={spoder1} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder2} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder3} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder4} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder5} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder6} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder7} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder8} alt='spoder1'/></div>
                                        {/* <div class="slide"><img src={spoder9} alt='spoder1'/></div> */}
                                        {/* <div class="slide"><img src={spoder10} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder11} alt='spoder1'/></div>
                                        <div class="slide"><img src={spoder12} alt='spoder1'/></div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <Button
                                    className='custom-button connect-button w-[150px] max-w-[50%] !text-[13px] md:text-[16px] !bg-white'>
                                    COMING SOON
                                </Button>
                            </div>
                            <div className='plain pt-[80px]'>
                                <div className='image-container md:p-8'>
                                    <img src={spoderHeartImg} style={{maxWidth:'-webkit-fill-available'}}/>
                                </div>
                                <div className='text-container' style={{alignSelf:'center'}}>
                                    <div className='title1 text-center md:text-left'>
                                        Spodersense
                                    </div>
                                    <div className="md:text-left text-center leading-8">
                                        A powerful app that provides real-time signals for buying and selling cryptocurrency. Whether you're an experienced trader or a newbie to the crypto scene, SpoderSense can help you make informed decisions and maximize your profits by taking advantage of effective trading tools and new technology, integrated with insights of the SPODERMAN community.
                                    </div>
                                    <div className='flex flex-row gap-4 mt-4 justify-center md:justify-start'>
                                        <img src={googlePlayBtnImg} className='w-[140px] cursor-pointer'/>
                                        <img src={appStoreBtnImg} className='w-[140px] cursor-pointer'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>
                    <div className='py-[50px] md:mt-8 px-4 bg-black'>
                        <div className='title1 text-center text-white'>
                            AUDIT
                        </div>
                        <div className='flex flex-col md:flex-row px-4 gap-8 mt-4 justify-between text-black items-center'>
                            {
                                audits.map((item, index) => 
                                <a href={item.link} target='_blank' alt={item.label} key={index}>
                                    <img src={item.pic} className='cursor-pointer'/>
                                </a>)
                            }
                        </div>
                    </div>
                    <Section id='section2'>
                        <div className='pt-[50px] md:pt-[150px]'>
                            <div className='title1 text-center'>
                                ROADMAP
                            </div>
                            <div className="text-center">
                                <b>$SPODER</b> MASTERPLAN
                            </div>
                            <div className='flex flex-col md:flex-row px-4 gap-8 mt-8 md:mt-16 justify-between text-black'>
                                <div className='flex flex-col gap-2 p-4 md:max-w-[30%] bg-white custom-shadow'>
                                    <div className="text-center title2">Phase 1</div>
                                    <div className="text-center pb-4 ">Airdrop, Launch, and Listing - Catching the Crypto Web</div>
                                    <ul className="list-disc ml-4 flex flex-col h-full justify-between">
                                    <li>Airdrop Extravaganza</li> 
                                    <li>Airdrop<b>(Techrate)</b></li> 
                                    <li>Token Launch Spodey-Style</li> 
                                    <li>Fast Track Listing in <b>Coingeko</b> and <b>CoinMarketCap</b></li>
                                    <li>Contract Renouncement</li>
                                    </ul>
                                </div>
                                <div className='flex flex-col gap-2 p-4 md:max-w-[30%] bg-white custom-shadow'>
                                    <div className="text-center title2">Phase 2</div>
                                    <div className="text-center pb-4">SpoderWeb3.0 Development Building the Ultimate Web-Slinging Platform</div>
                                    <ul className="list-disc ml-4 flex flex-col h-full justify-between">
                                    <li>Spin(Develop) a Seamless <b>SpoderWeb3.0</b></li> 
                                    <li>Secure the <b>SpoderWeb3.0</b></li>
                                    <li><b>SpoderWeb3.0</b> Hype</li> 
                                    </ul>
                                </div>
                                <div className='flex flex-col gap-2 p-4 md:max-w-[30%] bg-white custom-shadow'>
                                    <div className="text-center title2">Phase 3</div>
                                    <div className="text-center pb-4">SpoderVerse and SpoderSense Development - Unleashing Superpowers</div>
                                    <ul className="list-disc ml-4 flex flex-col h-full justify-between">
                                    <li>Spin (Develop) a Seamless <b>SpoderWeb3.0</b></li> 
                                    <li>Tingle the <b>SpoderSense</b></li>
                                    <li><b>Superhero-level Marketing</b></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Section>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            Tokenomics
                        </div>
                        <div className="text-center">
                            <span className='font-weight-bold text-black'>BUY & SELL TAX 5%</span> (2% BURN, 2% LIQUIDITY, 1% BUYBACK)
                        </div>
                        <div className='flex flex-wrap gap-4 justify-center mt-4 pt-[24px] md:pt-[54px]'>
                            {tokenomics.map((item, index) => 
                                <div className='flex flex-col w-[45%] md:w-[130px] p-2' key={index}>
                                    <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>{item.value}</div>
                                    <div className="text-center pt-2">{item.label}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            Disclaimer
                        </div>
                        <div className="text-center">
                            $Spoder is not associated with any creator or studio. $Spoder is a form of appreciation by OG memers, to showcase the Spoderman meme to the new generation and beyond.
                        </div>
                        <div className='flex gap-4 justify-center mt-4 pt-[24px] md:pt-[54px]'>
                            <img src={manImg}/>
                        </div>
                    </div>
                </Container>
            </div>
            
            <div className="pt-3 text-center calvino text-lightblue">
                {/* <Card style={{ borderRadius: '0px', padding: '40px', display:'flex', flexDirection:'row', alignItems:'center'}}> */}
                <Card className='rounded-0 py-4 md:px-8 gap-4 flex !flex-col-reverse md:!flex-row justify-between items-center'>
                    <CardDeck className='!mx-0'>
                        SPODERMAN.LOL @ 2023
                    </CardDeck>
                    <CardDeck className="flex flex-col md:flex-row custom-footer items-center pb-4 md:pb-0 !mx-0">
                        <div className='pb-4 md:pb-0 md:pr-4 text-[20px]'>Join our Community</div>
                        <div className='flex flex-row gap-2'>
                            {
                                socials.map((item, index) => 
                                <a href={item.link} target='_blank' alt={item.label} key={index}>
                                    <img src={item.pic} alt={item.label}/>
                                </a>
                                )
                            }
                        </div>
                    </CardDeck>
                </Card>
            </div>
        </>
    )
}
export default Spoderman;