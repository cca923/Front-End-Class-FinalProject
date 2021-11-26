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

const successAlert = (successText) => {
  return Swal.fire({
    title: successText,
    icon: "success",
    timer: 1200,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

const warningAlert = (warningText) => {
  return Swal.fire({
    title: warningText,
    icon: "warning",
    customClass: {
      confirmButton: "confirm__button",
    },
  });
};

const removeWarningAlert = (warningText) => {
  return Swal.fire({
    title: warningText,
    icon: "warning",
    confirmButtonText: "Remove｜移除",
    showCancelButton: true,
    cancelButtonText: "Cancel｜取消",
    customClass: {
      confirmButton: "confirm__button",
      cancelButton: "cancel__button",
    },
  });
};

const handleConfirmedWithPopup = (time, text, confirmButtonText, imageURL) => {
  return Swal.fire({
    title: time,
    html: `<h3>${text}</h3>`,
    confirmButtonText: confirmButtonText,
    showCancelButton: true,
    cancelButtonText: "Cancel｜取消",
    showCloseButton: true,
    customClass: {
      confirmButton: "confirm__button",
      cancelButton: "cancel__button",
    },
    imageUrl: imageURL,
    imageWidth: 130,
    imageAlt: "theme image",
  });
};

const handleScheduleSucceedAlert = (successText, time) => {
  return Swal.fire({
    title: successText,
    text: time,
    icon: "success",
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

const reserveTimeSucceedAlert = (time) => {
  return Swal.fire({
    title: "預約成功！",
    text: `預約時段｜${time}`,
    icon: "success",
    customClass: {
      confirmButton: "confirm__button",
    },
    allowOutsideClick: false,
  });
};

const deleteInvitationWarningAlert = (name) => {
  return Swal.fire({
    title: "確定要離開視訊房間嗎？",
    html: `<h3>將撤銷 ${name} 對您的視訊邀請。</h3>`,
    confirmButtonText: "Yes｜確定",
    showCancelButton: true,
    cancelButtonText: "Cancel｜取消",
    customClass: {
      confirmButton: "confirm__button",
      cancelButton: "cancel__button",
    },
    icon: "warning",
  });
};

const commentWithPopup = (name) => {
  return Swal.fire({
    title: "歡迎留下評論！",
    input: "textarea",
    inputLabel: `覺得 ${name} 如何？`,
    inputPlaceholder: `分享您對與 ${name} 視訊的想法吧！(限 200 字)`,
    inputAttributes: {
      maxlength: "200",
    },
    showCloseButton: true,
    showLoaderOnConfirm: true,
    confirmButtonText: "Submit｜發送",
    showDenyButton: true,
    denyButtonText: "Dismiss｜略過",
    customClass: {
      confirmButton: "confirm__button",
      denyButton: "deny__button",
    },
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "沒有輸入任何評論喔！";
      }
    },
  });
};

export {
  wrongIdentitySigninAlert,
  uploadProfileImageWithPopup,
  uploadProfileImageSucceedAlert,
  userSignOutWithPopup,
  userSignOutSucceedAlert,
  successAlert,
  warningAlert,
  removeWarningAlert,
  handleConfirmedWithPopup,
  handleScheduleSucceedAlert,
  reserveTimeSucceedAlert,
  deleteInvitationWarningAlert,
  commentWithPopup,
};
