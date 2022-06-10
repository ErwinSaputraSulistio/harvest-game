import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action";

export default function Authentication({ clickSoundPlay, height, width }) {
  const [isLogin, switchAuth] = useState(true);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [loginData, setLoginData] = useState({ email: "", password: "" });


  //handle onChange pada form,merubah state loginData, function diwariskan sebagai props
  const handleChange = (event) => {
    console.log('masuk sini jink');
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    
  };

  const changeAuth = () => {
    clickSoundPlay("click");
    switchAuth(!isLogin);
  };
  //function untuk handle login button, function diwariskan sebagai props, dispatch ke function login di store dgn mengirim data login pada state sebagai param
  const loginHandle = () => {
    console.log(loginData.email,loginData.password);
    clickSoundPlay("click");
    dispatch(login(loginData));
  };

  

  return (
    <div className="farm" style={{ background: "rgb(103, 195, 220)" }}>
      <div
        className="farmZone"
        style={{
          backgroundImage: 'url("/assets/bg-greenland.png")',
          backgroundPosition: "center",
          backgroundSize: "cover",
          height,
          width,
        }}
      ></div>
      <div className="auth">
         <h1>{JSON.stringify(isLoggedIn)}</h1>
        {isLogin === true ? (
          <Login change={changeAuth} loginHandle={loginHandle} handleChange={handleChange} loginData={loginData} />
        ) : (
          // REGISTER FUNCTION ISN'T DONE YET, SO USED LOGIN TRIAL FUNCTION FOR A WHILE
          <Register change={changeAuth} register={login} />
        )}
      </div>
    </div>
  );
}
