import logo from "./logo.png";
import service from "./service.svg";
import phone from "./phone.svg";
import location from "./lcoation.svg";
import email from "./email.svg";
import instagram from "./instagram.png";
import twitter from "./twitter.svg";
import fb from "./fb.svg";
import linkedin from "./linkedin.svg";
import playstore from "./play-store.svg";
import quote from "./quote.svg";
import gear from "../icons/gear.svg";
import left_scroll from "./left_scroll.svg";
import singleGear from "./single-gear.png";
import serviceScroll from "./service-scroll.png";
import notification from "./Vector (1).png";
import coud_upload from "./cloud-upload.png";
import pdf from "./pdf.svg";
import search from "./search.png";
import whatsapp from "./whatsapp.png";

const icons = {
    whatsapp,
    search,
    pdf,
    coud_upload,
    notification,
    serviceScroll,
    singleGear,
    gear,
    LOGO: logo,
    SERVICE: service,
    PHONE: phone,
    EMAIL: email,
    LOCATION: location,
    PLAY_STORE: playstore,
    QUOTE: quote,
    left_scroll: left_scroll,
};

export const socialMediaIcons = [
    {
        platform: "Instagram",
        link: "https://instagram.com/quikservindia/",
        icon: instagram,
    },
    {
        platform: "Twitter",
        link: "https://twitter.com/QuikservIndia",
        icon: twitter,
    },
    {
        platform: "Facebook",
        link: " https://www.facebook.com/profile.php?id=100093852079816",
        icon: fb,
    },
    {
        platform: "LinkedIn",
        link: "linkedin.com/in/quikserv-india-a08937280",
        icon: linkedin,
    },
];

export default icons;
