export default function Loading({ percent }) {
   return(
      <div className="loading">
         <div style={{
            backgroundImage: 'url("/assets/plank-grass-frame.png")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: "60%",
            width: "100%"
         }}>

         </div>
         <div className="loadingBar">
            <img alt="loading" src="/assets/loading.png" style={{ height: "100%", transitionDuration: "0.1s", width: percent + "%" }}/>
         </div>
      </div>
   )
}