export default function Achievement({ trigger }) {
   return(
      <div className="menu">
         <div class="menuAnimation">
            <img alt="plank-frame" className="menuBackground" src="/assets/plank-frame.png"/>
            <div className="menuInside">
               <div className="menuTop">
                  <span className="menuText">ACHIEVEMENT</span>
                  <span className="menuTextBorder">ACHIEVEMENT</span>
                  <img 
                     alt="close" 
                     className="menuClose farmButton"
                     onClick={ () => { trigger("achievement") } } 
                     src="/assets/close.png"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}