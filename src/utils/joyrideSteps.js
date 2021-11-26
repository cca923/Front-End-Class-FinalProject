import guideImage from "../images/guide.gif";
import question from "../images/question-scroll.png";

const teacherSteps = [
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        開始進行視訊房間操作導覽
      </h2>
    ),
    placement: "center",
    target: "body",
    content: (
      <img
        src={guideImage}
        alt="guide"
        width="150px"
        style={{
          borderRadius: "50%",
        }}
      />
    ),
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        第一步：開啟視訊
      </h2>
    ),
    content: "確認鏡頭及麥克風是否異常",
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 15,
    target: ".open_webcam",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        第二步：寄送通知
      </h2>
    ),
    content: "發送邀請通知給預約對象",
    placement: "bottom",
    spotlightPadding: 15,
    target: ".send_invitation",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        結束視訊：離開房間
      </h2>
    ),
    content: "關閉鏡頭、麥克風並自動跳轉至 Profile 頁面",
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 15,
    target: ".exit_live",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        忘記流程嗎？
      </h2>
    ),
    placement: "center",
    target: "body",
    content: (
      <>
        <p>請點擊畫面右上角圖案，再次進行視訊房間操作導覽</p>
        <img
          src={question}
          alt="question"
          width="70px"
          style={{
            margin: "10px auto",
          }}
        />
      </>
    ),
  },
];

const studentSteps = [
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        開始進行視訊房間操作導覽！
      </h2>
    ),
    placement: "center",
    target: "body",
    content: (
      <img
        src={guideImage}
        alt="guide"
        width="150px"
        style={{
          borderRadius: "50%",
        }}
      />
    ),
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        第一步：開啟視訊
      </h2>
    ),
    content: "確認鏡頭及麥克風是否異常",
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 15,
    target: ".open_webcam",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        第二步：加入房間
      </h2>
    ),
    content: "加入房間立即開始視訊諮詢",
    placement: "bottom",
    spotlightPadding: 15,
    target: ".join_invitation",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        結束視訊：離開房間
      </h2>
    ),
    content: "關閉鏡頭、麥克風並進行評論",
    floaterProps: {
      disableAnimation: true,
    },
    spotlightPadding: 15,
    target: ".exit_live",
  },
  {
    title: (
      <h2
        style={{
          letterSpacing: "2px",
        }}>
        忘記流程嗎？
      </h2>
    ),
    placement: "center",
    target: "body",
    content: (
      <>
        <p>請點擊畫面右上角圖案，再次進行視訊房間操作導覽</p>
        <img
          src={question}
          alt="question"
          width="70px"
          style={{
            margin: "10px auto",
          }}
        />
      </>
    ),
  },
];

export { teacherSteps, studentSteps };
