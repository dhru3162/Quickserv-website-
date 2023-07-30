// index.js (inside the "banners" folder)

import aboutUsBanner from './about Us banner.png';
import carrerBanner from './carrer banner.png';
import contactUsBanner from './contact us banner.png';
import desktopRepair from './desktop repair-01.png';
import extendedWarrenty from './extended warrenty-01.png';
import laptopRepair from './laptop repair-01.png';
import printerRepair from './printer repair-01.png';
import refurbishedLaptop from './Refurbished Laptop .png';
import sellYourOld from './Sell Your old .png';

export const pageBanner = {
    aboutUsBanner,
    carrerBanner,
    contactUsBanner,
}
const LandingPageBanner = [
    {
        img: desktopRepair,
        path: "service"
    },
    {
        img: printerRepair,
        path: "service"
    },
    {
        img: extendedWarrenty,
        path: "warrenty"
    },
    {
        img: laptopRepair,
        path: "service"
    },
    {
        img: refurbishedLaptop,
        path: "buy"
    },
    {
        img: sellYourOld,
        path: "sell"
    },

]
export default LandingPageBanner
