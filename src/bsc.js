import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'
// import AOS from 'aos';
// import 'aos/dist/aos.css';
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

import spoder1 from "./assets/img/spoders/image 1.png";
import spoder2 from "./assets/img/spoders/image 2.png";
import spoder3 from "./assets/img/spoders/image 3.png";
import spoder4 from "./assets/img/spoders/image 4.png";
import spoder5 from "./assets/img/spoders/image 5.png";
import spoder6 from "./assets/img/spoders/image 6.png";
import spoder7 from "./assets/img/spoders/image 7.png";
import spoder8 from "./assets/img/spoders/image 8.png";
import spoder9 from "./assets/img/spoders/image 9.png";
import spoder10 from "./assets/img/spoders/image 10.png";
import spoder11 from "./assets/img/spoders/image 11.png";
import spoder12 from "./assets/img/spoders/image 12.png";



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
    // margin: '0px 20px',
    textAlign: 'center',
    fontSize: "16px",
    // color: theme.palette.text.secondary,
    color: 'black',
    // border: "solid white 2px",
    // borderRadius: "1.25rem",
    // background: "#000000b8",
    minWidth: '100px',
    alignSelf: 'center',
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
    // background: theme.palette.purple.main,
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

function WealthMountain() {
    // const LunarHopNFTs = [
    //     [
    //       {
    //         path: nft1,
    //         name: 'Common'
    //       },
    //       {
    //         properties : [
    //           {
    //             label: "Daily Return",
    //             value: 2,
    //           },
    //           {
    //             label: "Price",
    //             value: 50,
    //           },
    //           {
    //             label: "Life Span",
    //             value: 30,
    //           },
    //           {
    //             label: "Total Income",
    //             value: 60,
    //           }
    //         ]
    //       },
    //     ],
    //     [
    //         {
    //           path: nft2,
    //           name: 'Uncommon'
    //         },
    //         {
    //           properties : [
    //             {
    //               label: "Daily Return",
    //               value: 4.2,
    //             },
    //             {
    //               label: "Price",
    //               value: 100,
    //             },
    //             {
    //               label: "Life Span",
    //               value: 30,
    //             },
    //             {
    //               label: "Total Income",
    //               value: 126,
    //             }
    //           ]
    //         },
    //     ],
    //     [
    //         {
    //           path: nft3,
    //           name: 'Rare'
    //         },
    //         {
    //           properties : [
    //             {
    //               label: "Daily Return",
    //               value: 22,
    //             },
    //             {
    //               label: "Price",
    //               value: 500,
    //             },
    //             {
    //               label: "Life Span",
    //               value: 45,
    //             },
    //             {
    //               label: "Total Income",
    //               value: 990,
    //             }
    //           ]
    //         },
    //     ],
    //     [
    //         {
    //           path: nft4,
    //           name: 'Super Rare'
    //         },
    //         {
    //           properties : [
    //             {
    //               label: "Daily Return",
    //               value: 45,
    //             },
    //             {
    //               label: "Price",
    //               value: 1000,
    //             },
    //             {
    //               label: "Life Span",
    //               value: 45,
    //             },
    //             {
    //               label: "Total Income",
    //               value: 2025,
    //             }
    //           ]
    //         },
    //     ],
    //     [
    //       {
    //         path: nft5,
    //         name: 'Legendary'
    //       },
    //       {
    //         properties : [
    //           {
    //             label: "Daily Return",
    //             value: 235,
    //           },
    //           {
    //             label: "Price",
    //             value: 5000,
    //           },
    //           {
    //             label: "Life Span",
    //             value: 60,
    //           },
    //           {
    //             label: "Total Income",
    //             value: 14100,
    //           }
    //         ]
    //       },
    //     ],
    //     [
    //         {
    //           path: nft6,
    //           name: 'Mytical'
    //         },
    //         {
    //           properties : [
    //             {
    //               label: "Daily Return",
    //               value: 480,
    //             },
    //             {
    //               label: "Price",
    //               value: 10000,
    //             },
    //             {
    //               label: "Life Span",
    //               value: 60,
    //             },
    //             {
    //               label: "Total Income",
    //               value: 28800,
    //             }
    //           ]
    //         },
    //     ],
    // ];

    const faqData = [
        {
          title: `What is Lunar Hop?`,
          content: 
            <p>
                Lunar Hop NFTs were blended into the creation as it attracts you bring luck today and in the future. The more Lunar Hop NFT you have, the greater wealth you will attract.
            </p>
        },
        {
            title: `Who can own Lunar Hop NFT?`,
            content: 
              <p>
                You, me or anyone from around the globe can own Lunar Hop NFT. Anyone deserves to prosper and earn good luck for infinite wealth.
              </p>
        },
        {
            title: `What is Lunar Hop Miner?`,
            content: 
              <p>
                The Lunar Hop Miner is the primary staking platform that provide users an opportunity to collect and earn good fortune over time.
              </p>
        },
        {
            title: `How do I get in touch with the team?`,
            content: 
              <p>
                 Follow us on Instagram, Twitter, and Discord for more updates and announcements.
              </p>
        } 
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 0,
        slidesToScroll: 1
    };

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
        { link: 'https://georgestamp.xyz/2022/09/wc-miner-busd/', label: 'Audit 1' },
        { link: '/audit.pdf', label: 'Audit 2' },
    ];
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

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         try {
    //             const data = getCountdown(1674349200);
    //             setCountdown({
    //                 alive: data.total > 0,
    //                 days: data.days,
    //                 hours: data.hours,
    //                 minutes: data.minutes,
    //                 seconds: data.seconds
    //             })
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [userInfo])


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
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href='/' target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    Spoderverse
                                </a>
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
                            <div onClick={() => {
                                setMobile(true)
                            }}>
                                <a href="/" target="_blank" rel="noreferrer"
                                    className="mobile-menu-item"
                                >
                                    <span>Roadmap</span>
                                </a>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <Button
                            className='custom-button connect-button'
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
            : null}
            {/* <Container> */}
                {/* {countdown.alive && 
                    <div className='date-title'>
                        <h5 className='text-center font-weight-bolder text-white pt-1'>Launch Date &nbsp;&nbsp;</h5>
                        <h5 className='text-center font-weight-bolder text-yellow pt-1'>{`${countdown.days} D : ${countdown.hours} H : ${countdown.minutes} M : ${countdown.seconds >= 10 ? countdown.seconds : '0' + countdown.seconds} S`}</h5>
                    </div>
                } */}
            {/* </Container> */}
            <div className="custom-header">
                <img
                    alt="..."
                    src={logoImg}
                    style={{ width: 'auto', height: '28px' }}
                />
                <div className="header_menu">
                    <Item>
                        <a href='/' target="_blank" rel="noreferrer"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                                color: 'black'
                            }}
                        >
                            <span>Spoderverse</span>
                        </a>
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
                    <Item>
                        <a href="/" target="_blank"
                            style={{
                                textDecoration: 'none',
                                fontWeight: "bolder",
                                color: 'black'
                            }}
                        >
                            <span>Roadmap</span>
                        </a>
                    </Item>
                </div>

                <Button
                    className='custom-button connect-button desktop-button'
                    >
                    JOIN AIRDROP2
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
            
            <Container className='!max-w-full md:!max-w-[90%]'>
                <CardDeck className='flex justify-between'>
                    <Card className='banner-card pt-[70px] md:!pt-[100px]'>
                        <h2 className="text-black text-uppercase font-weight-900 font-adamwarrenpro title1 !text-[30px] md:!text-[40px] text-center md:!text-left">The Amazing Spoderman</h2>
                        <h6 className='text-black font-weight-bold leading-8'>The Web-Slinging, A**-Kicking, Community-Building Token is HERE!</h6>
                        <p className='text-black leading-8'>$Spoder is the hottest meme token in ERC-20 that’s hyper-deflationary, product & community driven, and designed to reward long-term hodlers.</p>
                        <h6 className='pt-4 text-black'>Launching in</h6>
                        <div className='text-red text-[28px] font-weight-bold pb-4'>05D : 18H : 5M: 59S</div>
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
                    <Card className="banner-card">
                        <img src={ spoder1Img } alt="..." className='max-w-[500px]'/>
                    </Card>
                </CardDeck>
            </Container>

            <div className='main-content pb-8'>
                <Container className="pt-3">
                    <div>
                        <div className='title1 text-center'>
                            Avengurs
                        </div>
                        <div className='flex justify-between flex-wrap pt-[20px] md:pt-[54px]'>
                            <img className='spider-img' src={spider1} alt='spider1'/>
                            <img className='spider-img' src={spider2} alt='spider2'/>
                            <img className='spider-img' src={spider3} alt='spider3'/>
                            <img className='spider-img' src={spider4} alt='spider4'/>
                        </div>
                        <div className='flex justify-between flex-wrap pt-[20px] md:pt-[54px]'>
                            <img className='spider-img' src={spider5} alt='spider5'/>
                            <img className='spider-img' src={spider6} alt='spider6'/>
                            <img className='spider-img' src={spider7} alt='spider7'/>
                            <img className='spider-img' src={spider8} alt='spider8'/>
                        </div>
                    </div>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            ABOUT SPODERMAN
                        </div>
                        <div className="text-center">
                            Making the world a better place, one <span className='font-weight-bold'>$SPODER</span> at a time! 
                        </div>
                        <div className='plain flex-revert pt-[54px]'>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2 text-left'>
                                    UTILITY
                                </div>
                                <div className="text-left leading-8">
                                    The $Spoder token is the main currency in the SPODERMAN platform. Holders of the token can partake in governance, staking, gaming, and purchasing products within the Spoderverse.
                                </div>
                            </div>
                            <div className='image-container'>
                                <img src={spoder2Img}/>
                            </div>
                        </div>
                        <div className='plain pt-[30px] md:pt-[80px]'>
                            <div className='image-container'>
                                <img src={spodercowImg}/>
                            </div>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2 text-right'>
                                    HyperDEFLATIONARY
                                </div>
                                <div className="text-right leading-8">
                                    Through our SPODERVERSE products, HYPERdeflationary mechanisms will be put in place to encourage higher value setting of the token and its utility, incentivizing long-term hodlers.
                                </div>
                            </div>
                        </div>
                        <div className='plain flex-revert pt-[30px] md:pt-[80px]'>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2 text-left'>
                                    Community
                                </div>
                                <div className="text-left leading-8">
                                    We believe that the world is a happier place with memes in it. All the time we’ve been talking about building a community, but what’s our community without one of the most recognizable memes of all time? Your friendly neighborhood SPODERMAN is proud to provide charitable support to Doges through our partner, Second Chance Animal Rescue Society (SCARS).
                                </div>
                            </div>
                            <div className='image-container'>
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
                        <div className='plain flex-revert pt-[54px] leading-8'>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title2 text-left pb-4'>
                                    SPODERWEB 3.0
                                </div>
                                <div className="text-left">
                                    The upcoming SPODERMAN WEB3 Platforms aims to make exchanging, trading, gaming, staking, and lotteries easier for members of our community. The diversity of sources that SPODERMAN will open to unlocks a pool of opportunities for valuable growth, especially when you combine it with easy-to-use UI, compelling design, high demand functions, and top levels of security.
                                </div>
                            </div>
                            <div className='image-container'>
                                <img src={spoderleftHeader}/>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[30px] md:pt-[80px]'>
                        <div className='title1 text-center'>
                            SPODERVERSE
                        </div>
                        <div className="text-center leading-8 px-1 md:px-8">
                            The ultimate NFT play-to-earn platform that's powered by AI-generated NFTs. We're excited to introduce you to our latest feature, which allows you to earn tokens by staking NFTs, engaging in PVP battles, and teaming up to take down powerful bosses.
                        </div>
                        <div className='flex justify-between pt-[48px]'>
                            <div class="slider">
                                <div class="slide-track">
                                    <div class="slide"><img src={spoder1} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder2} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder3} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder4} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder5} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder6} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder7} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder8} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder9} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder10} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder11} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder12} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder1} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder2} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder3} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder4} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder5} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder6} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder7} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder8} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder9} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder10} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder11} alt='spoder1'/></div>
                                    <div class="slide"><img src={spoder12} alt='spoder1'/></div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-[48px] mx-auto flex'>
                            Comming Soon
                        </div>
                        <div className='plain pt-[80px]'>
                            <div className='image-container'>
                                <img src={spoderHeartImg} style={{maxWidth:'-webkit-fill-available'}}/>
                            </div>
                            <div className='text-container' style={{alignSelf:'center'}}>
                                <div className='title1 text-left'>
                                    Spodersense
                                </div>
                                <div className="md:text-left text-center leading-8">
                                    A powerful app that provides real-time signals for buying and selling cryptocurrency. Whether you're an experienced trader or a newbie to the crypto scene, SpoderSense can help you make informed decisions and maximize your profits by taking advantage of effective trading tools and new technology, integrated with insights of the SPODERMAN community.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            ROADMAP
                        </div>
                        <div className="text-center">
                            <b>$SPODER</b> MASTERPLAN
                        </div>
                        <div className='flex flex-col md:flex-row px-4 gap-8 mt-4 justify-between text-black'>
                            <div className='flex flex-col gap-2 p-4 md:max-w-[30%] border-[8px] border-black border-right-0 border-bottom-0'>
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
                            <div className='flex flex-col gap-2 p-4 md:max-w-[30%] border-[8px] border-black border-right-0 border-bottom-0'>
                                <div className="text-center title2">Phase 2</div>
                                <div className="text-center pb-4">SpoderWeb3.0 Development Building the Ultimate Web-Slinging Platform</div>
                                <ul className="list-disc ml-4 flex flex-col h-full justify-between">
                                   <li>Spin(Develop) a Seamless <b>SpoderWeb3.0</b></li> 
                                   <li>Secure the <b>SpoderWeb3.0</b></li>
                                   <li><b>SpoderWeb3.0</b> Hype</li> 
                                 </ul>
                            </div>
                            <div className='flex flex-col gap-2 p-4 md:max-w-[30%] border-[8px] border-black border-right-0 border-bottom-0'>
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
                    <div className='pt-[50px] md:pt-[150px]'>
                        <div className='title1 text-center'>
                            Tokenomics
                        </div>
                        <div className="text-center">
                            <span className='font-weight-bold text-black'>BUY & SELL TAX 5%</span> (2% Reflection to all holders, 2% BURN, 1% BUYBACK)
                        </div>
                        <div className='flex flex-wrap gap-4 justify-center md:justify-between mt-4 pt-[24px] md:pt-[54px]'>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>1%</div>
                                <div className="text-center pt-2">Airdrop</div>
                            </div>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>5%</div>
                                <div className="text-center pt-2">CEX</div>
                            </div>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>40%</div>
                                <div className="text-center pt-2">Spoderweb 3.0 TVL</div>
                            </div>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>40%</div>
                                <div className="text-center pt-2">Liquidity</div>
                            </div>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>4%</div>
                                <div className="text-center pt-2">Developers Wallet</div>
                            </div>
                            <div className='flex flex-col max-w-[100px]'>
                                <div className='text-red text-center text-3xl font-bold font-adamwarrenpro'>10%</div>
                                <div className="text-center pt-2">Marketing Wallet</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            
            {/* <div style={{marginTop:'50px'}}>
                <h3 className='py-3 text-white text-center font-weight-900'>Frequently Asked Questions</h3>
                <FAQList/>
            </div> */}

            {/* <div className="pt-3 text-center calvino text-lightblue">
                <Card style={{ borderRadius: '0px', padding: '40px 10px 30px 10px' }}>
                    <CardDeck className="custom-footer">
                        <a href={scanLinkSuffix + wealthContract} target="_blank" rel="noreferrer"> CONTRACT </a>
                        <a href="/hopdoc.pdf" target="_blank" rel="noreferrer"> HOP PAPER </a>
                        <a href="https://twitter.com/lunar_hop" target="_blank" rel="noreferrer"> TWITTER </a>
                        <a href="https://t.me/Lunarhop" target="_blank" rel="noreferrer"> TELEGRAM </a>
                    </CardDeck>
                    <p style={{ fontSize: '16px', color: 'white', paddingTop: '30px', fontWeight: 'bold' }}>© Luner Hop Team , All Rights Reserved</p>
                </Card>
            </div> */}
        </>

    )
}
export default WealthMountain;