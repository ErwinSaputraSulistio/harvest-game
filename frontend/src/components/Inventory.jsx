export default function Inventory({ trigger }) {
   return(
      <div className="menu">
         <div class="menuAnimation">
            <img alt="plank-frame" className="menuBackground" src="/assets/plank-frame.png"/>
            <div className="menuInside">
               <div className="menuTop">
                  <span className="menuText">INVENTORY</span>
                  <span className="menuTextBorder">INVENTORY</span>
                  <img 
                     alt="close" 
                     className="menuClose farmButton"
                     onClick={ () => { trigger("inventory") } } 
                     src="/assets/close.png"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}