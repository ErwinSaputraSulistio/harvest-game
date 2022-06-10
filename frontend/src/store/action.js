import { Redirect } from "react-router";
import Toast from "../helpers/swalToast";
// import axios from "axios";

const server = "http://localhost:8000";

export function setLogin(payload) {
  return { type: "SET_LOGIN", payload };
}

export function login(payload) {
  console.log(payload);
  return function (dispatch) {
    fetch(server + "/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.status == 400) {
          Toast.fire({
            icon: "warning",
            title: "Invalid username or password",
          });
        } else if(result.status == 200) {
          console.log('sukses');
          localStorage.setItem("access_token", JSON.stringify(result));
          dispatch(setLogin(true));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

// export function setLogin(payload) {
//   console.log('masuk set login')
//   return { type: "SET_LOGIN", payload };
// }
// export function setIsDataFetched(payload) {
//   return { type: "SET_IS_DATA_FETCHED", payload };
// }
// export function setPageAction(payload) {
//   return { type: "SET_CURRENT_PAGE", payload };
// }
// export function setSearchKeyword(payload) {
//   return { type: "SET_KEYWORD", payload };
// }

// export function setDocuments(payload) {
//   console.log('set doc')
//   return { type: "SET_DOCUMENTS", payload };
// }

// export function uploadAction(payload) {
//   console.log(payload);
//   return function (dispatch) {
//     const formData = new FormData();
//     formData.append("File", payload);
//     fetch(server + "/documents", {
//       method: "POST",
//       body: formData,
//       headers:{
//         access_token: JSON.parse(localStorage.getItem("access_token"))
//       }
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((result) => {
//         if (result.error) {
//           Toast.fire({
//             icon: "warning",
//             title: result.error,
//           });
//         } else {
//           console.log(result, "result");
//           document.getElementById("myFile").value = "";
//           dispatch(setIsDataFetched(false))
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }

// export function getDocumentsAction() {
//   return function (dispatch) {
//     console.log('masuk')
//     fetch(server + "/documents", {
//       method: "GET",
//       headers:{
//         access_token: JSON.parse(localStorage.getItem("access_token"))
//       }
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((result) => {
//         if (result.error) {
//           Toast.fire({
//             icon: "warning",
//             title: result.error,
//           });
//         } else {
//           console.log(result);
//           dispatch({ type: "SET_DOCUMENTS", payload: result });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }
// export function downloadAction(doc) {
//   return function (dispatch) {
//     console.log('masuk')
//     axios({
//       url: `http://localhost:3001/documents/${doc.id}`,
//       method: 'GET',
//       headers:{
//         access_token: JSON.parse(localStorage.getItem("access_token"))
//       },
//       responseType: 'blob', // important
//     }).then((response) => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', doc.name);
//       document.body.appendChild(link);
//       link.click();
//       link.parentNode.removeChild(link);
//     });
//   };
// }

// export function changePasswordAction(payload,callback) {
//   return function (dispatch) {

//     // callback('halo','res')
//     console.log(payload,'action');
//     fetch(server + "/user/changepassword", {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         access_token: JSON.parse(localStorage.getItem("access_token"))
//       },
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((result) => {
//         if (result.error) {
//           Toast.fire({
//             icon: "warning",
//             title: result.error,
//           });
//           callback(result.error,null)
//         } else {
//           console.log(result);
//           Toast.fire({
//             icon: "success",
//             title: "Change Password Success",
//           });
//           callback(null,result)

//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         callback(error,null)
//       });
//   };
// }
