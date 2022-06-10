export default function Login({ change, loginHandle, handleChange,loginData }) {
  return (
    <div className="authZone">
      {/* BG */}
      <img
        alt="bg"
        className="authOuterBg"
        src="/assets/plank-frame.png"
        style={{ position: "absolute" }}
      />
      <img alt="bg2" className="authInnerBg" src="/assets/plank-brown.png" />
      {/* LOGIN FORM */}
      <div className="authForm">
        <div className="authTextContainer" style={{ justifyContent: "center" }}>
          <span className="authText">Log In</span>
          <span className="authTextBorder">Log In</span>
        </div>
        <div className="authFormInputArea">
          {/* INPUT EMAIL */}
          <div className="authFormInputAndText">
            <div className="authTextContainer">
              <span className="authInputText">Email</span>
              <span className="authInputTextBorder">Email</span>
            </div>
            <div className="authInputField">
              <img
                alt="input"
                className="authInputBg"
                src="/assets/input.png"
              />
              <input
                className="authInput"
                type="email"
                onChange={handleChange}
                name="email"
                value={loginData.email}
              />
            </div>
          </div>
          {/* INPUT PASSWORD */}
          <div className="authFormInputAndText">
            <div className="authTextContainer">
              <span className="authInputText">Password</span>
              <span className="authInputTextBorder">Password</span>
            </div>
            <div className="authInputField">
              <img
                alt="input"
                className="authInputBg"
                src="/assets/input.png"
              />
              <input
                className="authInput"
                style={{ fontFamily: "Calibri" }}
                type="password"
                onChange={handleChange}
                name="password"
                value={loginData.password}
              />
            </div>
          </div>
          {/* FORGET PASSWORD */}
          <div className="authForgotPassword">
            <span className="authForgotText">Forget password ?</span>
          </div>
        </div>
        <div>
          <img
            alt="signup"
            className="authButton"
            onClick={() => {
              change();
            }}
            src="/assets/signup.png"
          />
          <img
            alt="login"
            className="authButton"
            onClick={() => {
              loginHandle();
            }}
            src="/assets/login.png"
          />
        </div>
      </div>
    </div>
  );
}
