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
                const data = getCountdown(1685631600);
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
    )
}
export default Spoderman;