import Swal from "sweetalert2";
import { uploadProfileImage } from "./firebase";

const wrongIdentitySigninAlert = (identity) => {
  return Swal.fire({
    title: `此 Email 註冊為${identity}`,
    html: `<h3>請選擇以${identity}身份登入！</h3>`,
    icon: "warning",
    customClass: {
      confirmButton: "confirm__button",
    },
  });
};

const uploadProfileImageWithPopup = (currentUserEmail) => {
  return Swal.fire({
    title: "更新顯示照片",
    input: "file",
    inputPlaceholder: "請選擇照片",
    inputAttributes: {
      accept: "image/*",
      "aria-label": "請選擇照片",
    },
    showCloseButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: "Upload｜上傳",
    showCancelButton: true,
    cancelButtonText: "Cancel｜取消",
    customClass: {
      confirmButton: "confirm__button",
      cancelButton: "cancel__button",
    },
    preConfirm: (value) => {
      uploadProfileImage(value, currentUserEmail);
    },
    inputValidator: (value) => {
      if (!value) {
        return "沒有上傳任何照片檔案喔！";
      }
    },
  });
};

const uploadProfileImageSucceedAlert = (e) => {
  return Swal.fire({
    title: "顯示照片更新成功",
    imageUrl: e.target.result,
    imageAlt: "顯示照片更新成功",
    customClass: {
      confirmButton: "confirm__button",
      image: "upload__image",
    },
  });
};

const userSignOutWithPopup = (currentUserEmail) => {
  return Swal.fire({
    title: `登出｜Sign out`,
    html: `<h3>是否要登出 ${currentUserEmail}？</h3>`,
    confirmButtonText: "Sign out｜登出",
    showCancelButton: true,
    cancelButtonText: "Cancel｜取消",
    customClass: {
      confirmButton: "confirm__button",
      cancelButton: "cancel__button",
    },
    imageUrl: "/images/theme/theme-13.png",
    imageWidth: 130,
    imageAlt: "theme image",
  });
};

const userSignOutSucceedAlert = (currentUserEmail) => {
  return Swal.fire({
    timer: 1200,
    timerProgressBar: true,
    showConfirmButton: false,
    title: "登出成功，將回到首頁！",
    text: `登出 Email｜${currentUserEmail}`,
    icon: "success",
  });
};

export {
  wrongIdentitySigninAlert,
  uploadProfileImageWithPopup,
  uploadProfileImageSucceedAlert,
  userSignOutWithPopup,
  userSignOutSucceedAlert,
};
