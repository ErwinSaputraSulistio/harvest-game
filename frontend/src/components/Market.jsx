export default function Market({ trigger }) {
   return(
      <div className="menu">
         <div class="menuAnimation">
            <img alt="plank-frame" className="menuBackground" src="/assets/plank-frame.png"/>
            <div className="menuInside">
               <div className="menuTop">
                  <span className="menuText">SHOP</span>
                  <span className="menuTextBorder">SHOP</span>
                  <img 
                     alt="close" 
                     className="menuClose farmButton"
                     onClick={ () => { trigger("market") } } 
                     src="/assets/close.png"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}