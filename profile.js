document.addEventListener("DOMContentLoaded", function () {
  try {
    const mainCodeHTML = `
            <div class="profile-container">
                <div class="profile-container_header">
                    <img width="48" height="48" src="https://img.icons8.com/fluency-systems-regular/96/FFFFFF/edit-administrator.png" alt="admin-settings-male"/>
                    <h2>프로필 설정</h2>
                </div>
                <div class="profile-container_box">
                    <div class="profile-section">
                        <label for="profile-image">이미지</label>
                        <div class="image-container">
                            <img id="profile-preview" width="96" height="96" src="https://img.icons8.com/color/96/test-account.png" alt="test-account" class="profile_img"/>
                            <input type="file" id="image-upload" accept="image/*" style="display: none;" />
                        </div>
                        <div class="plf_edit" id="upload-trigger">
                            <img width="30" height="30" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/image.png" alt="image"/>
                        </div>
                    </div>
                    <div class="profile-section">
                        <div class="pro_name"><h3>${sessionStorage.getItem("familyName") || "GUEST"} ${
      sessionStorage.getItem("givenName") || ""
    }</h3></div>
                    </div>
                    <div class="lg_box">
                        <div class="profile-section lg">
                            <div class="lglg stuNum_lglg">
                                <img src="https://img.icons8.com/pulsar-color/96/student-male.png" alt="student-male"/>
                            </div>
                            <div class="pro_schNum"><h5>${
                              sessionStorage.getItem("studentNumber") || "Guest Student"
                            }</h5></div>
                        </div>
                        <div class="profile-section lg">
                            <div class="lglg line_lglg">
                                <img src="https://img.icons8.com/pulsar-color/96/gmail-new.png" alt="gmail-new"/>
                            </div>
                            <div class="email-container">
                                <div class="pro_email">
                                    <h5 id="email-text">${sessionStorage.getItem("email") || "example@g.yju.ac.kr"}</h5>
                                </div>
                                <button id="copy-email" class="copy-btn">
                                    <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/f594b5/copy--v1.png" alt="copy--v1"/>
                                </button>
                            </div>
                        </div>
                        <div class="profile-section lg">
                            <div class="lglg">
                                <a href="https://lin.ee/byNXODw">
                                    <img src="https://img.icons8.com/pulsar-color/96/FFFFFF/line-me.png" alt="line-me"/>
                                </a>
                            </div>
                            <div class="line-container">
                                <div class="conect_h5">
                                    <h5 id="line-toggle">LINE 연결</h5>
                                </div>
                                <!-- 吹き出し -->
                                <div class="line_torisetu" style="display: none;">
                                    <div class="torisetu_batsu">
                                        <i class="fa-solid fa-xmark fa-lg" style="color: #f1a7a0;"></i>
                                    </div>
                                    <div class="token_copy" onclick="copyToken()">
                                        <div class="tk_cp">
                                            <div class="title_line_logo"><img width="500" height="500" src="https://img.icons8.com/clouds/500/line-me.png" alt="line-me"/></div>
                                            <div class="title_line_txt" id="line-toggle"><h4>LINE 연결방법</h4></div>
                                            <div class="line_list">
                                                <ol>
                                                    <li>
                                                        아래 정보코드을 복사한다!!
                                                        <div class="token_copy">
                                                            <div class="token_copy_txt" >
                                                                <p id="copyTarget">복사</p>
                                                            </div>
                                                            <div class="token_copy_lg">
                                                                <i class="fa-regular fa-copy"></i>
                                                            </div>                                                               
                                                        </div>
                                                    </li>
                                                    <li>
                                                        여기서 공식 라인을 추가한다!!
                                                        <a href="https://lin.ee/QzwyAVv">
                                                            <div class="line_add_btn">
                                                                <img width="30" height="30" src="https://img.icons8.com/ios/100/d5725b/line-me.png" alt="line-me"/>
                                                                <p>추가</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        공식 계정의 톡에 방금 복사한 URL을 보내줘!
                                                    </li>
                                                    <li>
                                                        연결 완료!!
                                                    </li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div class="vp_img">
                                            <!-- 必要な画像をここに追加 -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="profile-section lg logout-box">
                            <div class="lglg line_lglg">
                                <img width="96" height="96" src="https://img.icons8.com/pulsar-color/96/exit.png" alt="exit"/>
                            </div>
                            <div class="logout-container">
                                <div class="pro_logout conect_h5">
                                    <h5 id="logout-text">Log Out</h5>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        `;

    const mainElement = document.querySelector("main");
    mainElement.innerHTML += mainCodeHTML;

    // 画像アップロードのイベント
    const imageUpload = document.getElementById("image-upload");
    const profilePreview = document.getElementById("profile-preview");
    const uploadTrigger = document.getElementById("upload-trigger");

    if (uploadTrigger && imageUpload) {
      uploadTrigger.addEventListener("click", function () {
        imageUpload.click();
      });

      imageUpload.addEventListener("change", async function (event) {
        const file = event.target.files[0];
        if (file) {
          await updateProfileImage(file);
          //   const reader = new FileReader();
          //   reader.onload = function (e) {
          //     profilePreview.src = e.target.result;
          //     sessionStorage.setItem("profileImage", e.target.result);
          //   };
          //   reader.readAsDataURL(file);
          sessionStorage.setItem("profileImage", "https://bannote.org/" + file);
          location.reload();
        }
      });
    } else {
      console.error("요소를 찾을 수 없습니다: #upload-trigger 또는 #image-upload");
    }

    // ページリロード時に画像を復元
    const savedProfileImage = sessionStorage.getItem("profileImage");
    if (savedProfileImage) {
      profilePreview.src = savedProfileImage;
    }

    document.getElementById("copy-email").addEventListener("click", function () {
      const emailText = document.getElementById("email-text").innerText;
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = emailText;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert(`복사 : ${emailText}`);
    });

    // プロフィール画像を設定（profileImageがnull, undefined, false, 空文字のいずれかの場合はデフォルト画像を使用）
    const profileImage = sessionStorage.getItem("profileImage");
    const imgElement = document.createElement("img");
    if (!profileImage || profileImage === "false" || profileImage.trim() === "") {
      imgElement.src = "https://img.icons8.com/color/96/test-account.png";
    } else {
      imgElement.src = profileImage;
    }

    // profile-preview を設定
    const profileImageDiv = document.getElementById("profile-preview");
    if (profileImageDiv) {
      profileImageDiv.innerHTML = "";
      profileImageDiv.appendChild(imgElement);
    } else {
      console.error("profile-preview element not found");
    }

    // toggleMenu 関数
    function toggleMenu(event, menuClass) {
      const menu = document.querySelector(menuClass);

      if (!menu) {
        console.log("Menu not found");
        return;
      }

      if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
        setTimeout(() => {
          menu.classList.add("show");
        }, 10); // showクラスを追加してアニメーション開始
      } else {
        menu.classList.remove("show");
        setTimeout(() => {
          menu.style.display = "none";
        }, 300); // 非表示にするまでの時間を設定
      }
    }

    // LINE 연결をクリックした時に吹き出しの表示・非表示を切り替える
    document.getElementById("line-toggle")?.addEventListener("click", function (event) {
      console.log("LINE click");
      toggleMenu(event, ".line_torisetu");
    });

    // 吹き出し内の閉じるボタンをクリックした時に吹き出しを閉じる
    document.querySelector(".torisetu_batsu")?.addEventListener("click", function () {
      const menu = document.querySelector(".line_torisetu");
      if (menu) {
        menu.classList.remove("show");
        setTimeout(() => {
          menu.style.display = "none";
        }, 300); // 非表示にするまでの時間を設定
      }
      setTimeout(() => {
        location.reload();
      }, 500);
    });

    window.copyToken = async function () {
      try {
        // セッションストレージからトークンを取得（キー名は "token"）
        const myToken = sessionStorage.getItem("token");
        if (!myToken) throw new Error("セッションストレージにトークンが見つかりません");

        // Bearer 認証付きでリクエスト送信
        const response = await fetch("https://bannote.org/api/message", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        });

        if (!response.ok) throw new Error("APIからのレスポンスが不正です");

        const data = await response.json();
        const token = data.data;

        // トークンをクリップボードにコピー
        await navigator.clipboard.writeText(token);

        // 成功メッセージ表示
        document.getElementById("copyTarget").innerText = "복사 완료!";
      } catch (err) {
        console.error("トークン取得失敗:", err);
        document.getElementById("copyTarget").innerText = "복사 실패";
      }
    };

    document.getElementById("logout-text").addEventListener("click", function () {
      // 確認ダイアログを表示
      let confirmLogout = confirm("로그아웃하셔도 괜찮으시겠어요?");

      // ユーザーが「OK」を押したらログアウト処理
      if (confirmLogout) {
        sessionStorage.removeItem("token"); // トークン削除
        window.location.href = "../login/login.html"; // ログインページへ移動
      }
    });
  } catch (error) {
    console.error("Error loading profile HTML:", error);
  }
});

async function copyText() {
  const accessToken = sessionStorage.getItem("token");
  // APIからBearer Tokenを取得
  try {
    const response = await fetch("https://bannote.org/api/message", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw new Error("APIリクエストが失敗しました");
    }

    const data = await response.json();
    console.log("API 응답 데이터:", data);

    if (data && data.data) {
      const token = data.data;
      let textarea = document.createElement("textarea");
      textarea.value = token;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert("복사 : 정보코드");
    } else {
      alert("토큰을 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error("トークンのコピー中にエラーが発生しました:", error);
  }
}

async function updateProfileImage(file) {
  const accessToken = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("https://bannote.org/api/members/me/profile-image", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: formData,
    });
  } catch (error) {
    console.error("プロフィール画像の更新に失敗しました:", error);
  }
}
