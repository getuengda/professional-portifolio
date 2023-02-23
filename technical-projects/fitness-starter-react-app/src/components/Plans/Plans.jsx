import React from 'react'
import './Plans.css';
import {plansData} from '../../data/plansData';
import whiteTick from '../../assets/whiteTick.png';

const Plans = () => {
  return (
    <div className="plans-container" id='plans'>
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="programs-header" style={{gap: '2rem'}}>
        <span className='stroke-text'>READY TO STRAT</span>
        <span>YOUR JOURNY</span>
        <span className='stroke-text'>NOW WITHUS</span>
      </div>
      {/* plans Card*/}
      <div className="plans">
          {plansData.map((plan, i) =>
            <div className="plan" key={i}>
              {plan.icon}
              <spna>{plan.name}</spna>
              <spna>$ {plan.price}</spna>

              <div className="features">
                {plan.features.map((feature, i) => (
                  <div className="feature">
                    <img src={whiteTick} alt=''/>
                    <span key={i}>{feature}</span>
                  </div>
                )
                )} 
              </div>
                  <div>
                    <span>See more benefits -> </span>
                  </div>
                  <button className='btn'>Join now</button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Plans