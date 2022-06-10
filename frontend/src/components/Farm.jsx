import { Achievement, Inventory, Market, Plant } from "./";
import { useState } from "react";

export default function Farm({ clickSoundPlay, height, width }) {
   const [achievement, switchAchievement] = useState(false)
   const [inventory, switchInventory] = useState(false)
   const [market, switchMarket] = useState(false)
   const triggerMenu = (menu) => {
      clickSoundPlay("click")
      if(menu === "achievement") { switchAchievement(!achievement) }
      else if(menu === "inventory") { switchInventory(!inventory) }
      else if(menu === "market") { switchMarket(!market) }
   }
   // DUMMY DATA
   const tileOne = [
      { plant: "papaya", age: 3 }, 
      { plant: "wheat", age: 3 }, 
      { plant: "corn", age: 3 }, 
      { plant: "banana", age: 3 }, 
      { plant: "papaya", age: 3 }, 
      { plant: "corn", age: 3 }, 
      { plant: "wheat", age: 3 }, 
      { plant: "banana", age: 3 }, 
      { plant: "carrot", age: 3 }, 
      { plant: "garlic", age: 3 }, 
      { plant: "carrot", age: 3 }, 
      { plant: "banana", age: 3 }, 
      { plant: "garlic", age: 3 }, 
      { plant: "garlic", age: 3 }, 
      { plant: "carrot", age: 3 }, 
      { plant: "wheat", age: 3 }
   ]
   return(
      <div className="farm" style={{ background: 'rgb(103, 195, 220)' }}>
         <div className="farmZone" style={{ 
            backgroundImage: 'url("/assets/bg-greenland.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height,
            width 
         }}>
            <div className="farmBar" style={{ width }}>
               <img alt="exp-bar" className="farmExpBar" src="/assets/exp-bar.png"/>
               <img alt="coin-bar" className="farmCoinBar" src="/assets/coin-bar.png"/>
            </div>
            <div className="farmButtonArea" style={{ width }}>
               <img 
                  alt="settings" 
                  className="farmButton"
                  onClick={ () => { clickSoundPlay("click") } }
                  src="/assets/settings.png" 
                  style={{ 
                     marginTop: - width / 8,
                     marginLeft: - width / 10,
                     marginRight: width / 20,
                     width: width / 20
                  }}
               />
               <div className="farmButtonThree">
                  {/* BUTTON - ACHIEVEMENT */}
                  <img 
                     alt="achievement" 
                     className="farmButton"
                     onClick={ () => { triggerMenu("achievement") } }
                     src="/assets/achievement.png"
                     style={{
                        height: "auto",
                        width: width / 8
                     }}
                  />
                  {/* BUTTON - ORDER */}
                  <img 
                     alt="shop" 
                     className="farmButton"
                     onClick={ () => { triggerMenu("market") } }
                     src="/assets/shop.png" 
                     style={{ 
                        height: "auto",
                        marginLeft: width / 8, 
                        marginRight: width / 8,
                        width: width / 8
                     }}
                  />
                  {/* BUTTON - INVENTORY */}
                  <img 
                     alt="inventory" 
                     className="farmButton"
                     onClick={ () => { triggerMenu("inventory") } }
                     src="/assets/inventory.png"
                     style={{
                        height: "auto",
                        width: width / 8
                     }}
                  />
               </div>
            </div>
            <div className="farmLaneZone" style={{ width }}>
               <div className="farmLane">
                  {  
                     tileOne.map((item, i) => { 
                        return(
                           <div key={i} style={{ 
                              backgroundImage: 'url("/assets/empty-earth.png")',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover', 
                              height: height / 14, 
                              width: height / 14 
                           }}>
                              <Plant item={ item } width={ width }/>
                           </div>
                        )
                     })
                  }
               </div>
               <div className="farmLane">
                  {  
                     tileOne.map((item, i) => { 
                        return(
                           <div key={i} style={{ 
                              backgroundImage: 'url("/assets/empty-earth.png")',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover', 
                              height: height / 14, 
                              width: height / 14 
                           }}/>
                        )
                     })
                  }
               </div>
            </div>
         </div>
         {/* MENU */}
         {
            achievement === true ? <Achievement trigger={ triggerMenu }/>
            :
            inventory === true ? <Inventory trigger={ triggerMenu }/>
            :
            market === true ? <Market trigger={ triggerMenu }/>
            :
            null
         }
      </div>
   )
}