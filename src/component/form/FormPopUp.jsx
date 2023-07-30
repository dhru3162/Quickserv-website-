import React from 'react'
import "../../css/form/form.css"
import "../../css/form/apply.css"
import "../../css/form/sell.css"
import "../../css/form/buy.css"
import Apply from './Apply'
import Sell from './Sell'
import ExtendWarrenty from './ExtendWarrenty'
import { useDispatch, useSelector } from 'react-redux'
import { FormPopUpAction } from '../../redux/action/TogfleAction'
import Buy from './Buy'
import BookService from './BookService'
import Invoice from './Invoice'
import TrackRequest from './TrackRequest'
import WorkOrder from './WorkOrder'
import Quotation from './Quotation'
import UserProfile from './UserProfile'
import Address from './Address'

const FormPopUp = () => {
    const dispatch = useDispatch();
    const { form_popup } = useSelector(state => state.toggle)
    return (
        <>
            <section className={form_popup==="profile"?"edit-profile-popup form-popup":"form-popup"}>


                <button onClick={() => dispatch(FormPopUpAction(""))} id={["sell", "warrenty", "buy", "service"].includes(form_popup) && 'form-cards-close-btn'} className='pop-close active'>&times;</button>
                {/* {

                    form_popup === "quotation" && <Quotation />
                } */}
                {

                    form_popup === "track-request" && <TrackRequest />
                }
                {/* {
                    form_popup === "invoice" && <Invoice />
                } */}
                {
                    form_popup === "apply" && <Apply />
                }
                {
                    form_popup === "work-order" && <WorkOrder />
                }
                {
                    form_popup === "warrenty" && <ExtendWarrenty />
                }
                {
                    form_popup === "sell" && <Sell />

                }
                {
                    form_popup === "service" && <BookService />

                }
                {
                    form_popup === "buy" && <Buy />
                }
                {
                    form_popup === "profile" && <UserProfile />
                }
                {
                    form_popup === "address" && <Address />
                }



            </section>

        </>
    )
}

export default FormPopUp