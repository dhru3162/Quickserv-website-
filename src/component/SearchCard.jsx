import React from 'react'
import "../css/search-card.css"
import { FormPopUpAction } from '../redux/action/TogfleAction'
import { useDispatch } from 'react-redux'
const SearchCard = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="search-card">
        <div className="s-card-header">
          <div className='card-header'>
            <div className="job-position">
              <h1>Service Engineer</h1>
              <strong>Position 3</strong>
              <span>Posted at 22/2/2023</span>
            </div>
            <span><strong>Required Exp</strong> : 2-5 Years</span>
            <span><strong>Location</strong> : Bangalore</span>
          </div>
          <button onClick={() => dispatch(FormPopUpAction("apply"))} className='btn active apply-btn'>Apply</button>
        </div>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam eveniet, soluta tempora officia commodi enim necessitatibus exercitationem placeat quibusdam numquam totam aliquam omnis doloribus aperiam odit nihil! Omnis a commodi aspernatur quasi provident, reprehenderit sint ratione praesentium soluta aliquid expedita. Beatae praesentium temporibus iure facilis sed vitae eius cupiditate eveniet facere, eaque explicabo, omnis placeat tempore ad architecto mollitia quae in voluptatum quo labore harum at ratione asperiores. Quia aspernatur voluptates provident impedit eius omnis fugiat sequi, totam quas vel exercitationem consectetur, nulla quos a laborum temporibus. Rem assumenda dignissimos autem earum? Fugit consectetur facilis, deserunt possimus blanditiis accusamus temporibus!</p>
      </div>
    </>
  )
}

export default SearchCard