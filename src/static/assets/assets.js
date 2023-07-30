
import profile from "../assets/pankaj.jpg"
import search_vector from "./search vector.png"
import service from "./service.png"
import what_we_do from "./what we do.png"
import user_home from "./user-home-1.png"
import sell_banner from "./sale-banner.png"

const assets = {
  sell_banner,
  search_vector,
  PROFILE: profile,
  service,
  user_home,
  what_we_do
}

export const navlist = [
  {
    name: "Book Service",
    path: "service"
  },
  {
    name: "Buy",
    path: "buy"
  },
  {
    name: "Sell",
    path: "sell"
  },
  {
    name: "Extended Warrenty",
    path: "warrenty"
  },

]
export const profileList = [
  { name: 'My Profile', path: 'profile' },
  { name: 'Address', path: 'address' },
  { name: 'Track your request', path: 'track-request' },
  { name: 'Your work order', path: 'work-order' },
  // { name: 'Quotation', path: 'quotation' },
  // { name: 'Invoice', path: 'invoice' },
  { name: 'About Us', path: 'about' },
  { name: 'Contact Us', path: 'contact' },
  { name: 'Logout', path: 'logout' }
];



export const customerReviews = [
  {
    feedback:
      "Outstanding customer service provided by your Engineer.\nWe sincerely appreciate your customer service, how you’re always available to handle challenging issues and the excellent work you have demonstrated on every issue.\nThank you for your prompt response!\n\nPravin Naphade\nITSupport\nPune",
    name: "Pravin Naphade",
    designation: "ITSupport",
    city: "Pune",
  },
  {
    feedback:
      "Recently Engineer repaired an HP laptop that had a keyboard issue. He was decent in his behavior and committed to providing better service.\nHe is a very positive-oriented professional.\nI appreciate his level of knowledge in his field.",
    name: "Sibaram",
    designation: "Support Engineer",
    city: "Kolkata",
  },
  {
    feedback:
      "I wanted to take a moment to express my sincere appreciation for the exceptional service provided by Engineer.\nHe recently resolved my laptop's keyboard issue by efficiently replacing it. His expertise and professionalism were truly commendable,\nand I am thoroughly satisfied with the outcome.\nPlease extend my heartfelt gratitude to Engineer for his outstanding work.\nThank you,\n\nTushar Dalvi\nSoftware Developer\nHyderabad.",
    name: "Tushar Dalvi",
    designation: "Software Developer",
    city: "Hyderabad",
  },
  {
    feedback:
      "Outstanding customer service provided. I was facing a problem with My Laptop.\nIt was attended by Engineer, hardly took 10 minutes to rectify the problem of the Laptop.\nThe ability to provide the resolution quickly exceeded my expectations.\nI really commend the prompt service provided. He also advised me on how to keep my laptop up to date.\nI am really pleased with the knowledge and skills of your staff.\nI would love to recommend your company to anyone who needs an HP Product service in the future. Keep up the good work.\n\nDavid D.\nAnalyst.\nPune",
    name: "David D.",
    designation: "Analyst",
    city: "Pune",
  },
  {
    feedback: "My HP laptop had a heating issue, and the engineer resolved it by changing the fan. The issue was handled well, and he was very supportive.Thank you for your prompt service.",
    name: "Shweta Gadekar",
    designation: "Software Engineer.",
    city: "Mumbai"

  }




]


export default assets
