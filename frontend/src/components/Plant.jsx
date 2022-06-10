export default function Plant({ item, width }) {
   const { plant, age } = item
   return(
      plant === "wheat" && age === 3 ?
      <img
         src="/assets/plants/wheat-3.png"
         style={{
            marginTop: -width / 90,
            marginLeft: width / 500,
            position: "absolute",
            width: width / 22,
            
         }}
      />
      :
      plant === "corn" && age === 3 ?
      <img
         src="/assets/plants/corn-3.png"
         style={{
            marginTop: - width / 70,
            position: "absolute",
            width: width / 20,
            
         }}
      />
      :
      plant === "banana" && age === 3 ?
      <img
         src="/assets/plants/banana-3.png"
         style={{
            marginTop: - width / 18,
            marginLeft: - width / 46,
            position: "absolute",
            width: width / 11,
            
         }}
      />
      :
      plant === "papaya" && age === 3 ?
      <img
         src="/assets/plants/papaya-3.png"
         style={{
            marginTop: - width / 20,
            marginLeft: - width / 50,
            position: "absolute",
            width: width / 11,
         }}
      />
      :
      plant === "garlic" && age === 3 ?
      <img
         src="/assets/plants/garlic-3.png"
         style={{
            marginTop: - width / 33,
            marginLeft: - width / 125,
            position: "absolute",
            width: width / 15,
         }}
      />
      :
      plant === "carrot" && age === 3 ?
      <img
         src="/assets/plants/carrot-3.png"
         style={{
            marginTop: - width / 70,
            position: "absolute",
            width: width / 20,
         }}
      />
      :
      null
   )
}