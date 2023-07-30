import React, { useState } from 'react'
import icons from '../../icons/icon'
import "../../css/home/how-it-work.css"
import how_it_work from '../../static/how It Works/how_it_work';
const HowItWork = () => {
    const [selectedButton, setSelectedButton] = useState("Secure");
    const handleButtonClick = (buttonText) => {
        setSelectedButton(buttonText);
    };
    const renderContent = () => {
        const selectedItem = how_it_work.find((item) => item.title == selectedButton) || how_it_work[0];
        if (selectedItem) {
            return (
                <div className="h-w-right">
                    <div className="h-w-content">
                        <span>{selectedItem.title}</span>
                        <p>{selectedItem.description}</p>
                    </div>
                    <div className="h-w-vector">
                        <img src={selectedItem.image} alt="" />
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <>
            <div className=" how-it-work">
                <div className=" home_card_header">
                    <div className='container-header'> <h1>How It Works</h1> <img src={icons.SERVICE} alt="" /></div>
                  
                </div>
                <div className="h-w-container">
                    <div className="h-w-button">
                        {
                            how_it_work.map((item, i) => <button key={i} onClick={() => handleButtonClick(item.title)} className={selectedButton === item.title ? "btn active" : "btn"}>{item.title}</button>)
                        }
                    </div>
                    {renderContent()}
                </div>

            </div>

        </>
    )
}


export default HowItWork