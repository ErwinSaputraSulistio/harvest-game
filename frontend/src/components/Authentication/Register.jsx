export default function Register({ change, register }) {
   return(
      <div className="authZone">
         {/* BG */}
         <img alt="bg" className="authOuterBg" src="/assets/plank-frame.png" style={{ position: "absolute" }}/>
         <img alt="bg2" className="authInnerBg" src="/assets/plank-brown.png"/>
         {/* LOGIN FORM */}
         <div className="authForm">
            <div className="authTextContainer" style={{ justifyContent: "center" }}>
               <span className="authText">Sign Up</span>
               <span className="authTextBorder">Sign Up</span>
            </div>
            <div className="authFormInputArea">
               {/* INPUT EMAIL */}
               <div className="authFormInputAndText">
                  <div className="authTextContainer">
                     <span className="authInputText">Full Name</span>
                     <span className="authInputTextBorder">Full Name</span>
                  </div>
                  <div className="authInputField">
                     <img alt="input" className="authInputBg" src="/assets/input.png"/>
                     <input className="authInput" type="text"/>
                  </div>
               </div>
               {/* INPUT EMAIL */}
               <div className="authFormInputAndText">
                  <div className="authTextContainer">
                     <span className="authInputText">Email</span>
                     <span className="authInputTextBorder">Email</span>
                  </div>
                  <div className="authInputField">
                     <img alt="input" className="authInputBg" src="/assets/input.png"/>
                     <input className="authInput" type="email"/>
                  </div>
               </div>
               {/* INPUT PASSWORD */}
               <div className="authFormInputAndText" >
                  <div className="authTextContainer">
                     <span className="authInputText">Password</span>
                     <span className="authInputTextBorder">Password</span>
                  </div>
                  <div className="authInputField">
                     <img alt="input" className="authInputBg" src="/assets/input.png"/>
                     <input className="authInput" style={{ fontFamily: "Calibri" }} type="password"/>
                  </div>
               </div>
               {/* INPUT CONFIRM PASSWORD */}
               <div className="authFormInputAndText" >
                  <div className="authTextContainer">
                     <span className="authInputText">Confirm Password</span>
                     <span className="authInputTextBorder">Confirm Password</span>
                  </div>
                  <div className="authInputField">
                     <img alt="input" className="authInputBg" src="/assets/input.png"/>
                     <input className="authInput" style={{ fontFamily: "Calibri" }} type="password"/>
                  </div>
               </div>
            </div>
            <div>
               <img alt="signup" className="authButton" onClick={ () => { register() } } src="/assets/signup.png"/>
               <img alt="login" className="authButton" onClick={ () => { change() } } src="/assets/login.png"/>
            </div>
         </div>
      </div>
   )
}