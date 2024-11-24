let tabs = []; // 開いたタブを保存
let intervalId; // setIntervalのIDを保存

// ランダムな5桁の二進数を生成
function generateRandomBinary() {
  let binary = "";
  for (let i = 0; i < 5; i++) {
    binary += Math.random() < 0.5 ? "0" : "1"; // 0または1をランダムに追加
  }
  return binary;
}

document.getElementById("start").addEventListener("click", () => {
  const message = document.getElementById("message").value;
  const breaks = parseInt(document.getElementById("breaks").value);

  if (!message) {
    alert("メッセージを入力してください！");
    return;
  }

  if (breaks < 1 || breaks > 50) {
    alert("改行数は1〜50の間で設定してください！");
    return;
  }

  // メッセージ生成
  let content = "";
  for (let i = 0; i < breaks; i++) {
    content += message + "\n#" + generateRandomBinary() + "\n"; // ランダム二進数を追加
  }

  // 0.5秒ごとにタブを1つずつ開く
  let count = 0; // 開いたタブのカウンター
  intervalId = setInterval(() => {
    if (count >= 500) {
      // 最大500タブで停止
      clearInterval(intervalId);
      alert("すべてのタブを開きました！");
      return;
    }

    const url = `https://line.me/R/msg/text/${encodeURIComponent(content)}`;
    const tab = window.open(url, `_blank`);
    tabs.push(tab); // タブを保存
    count++;
  }, 500); // 0.5秒ごとに実行
});

document.getElementById("stop").addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId); // タブを開く処理を停止
  }

  if (tabs.length > 0) {
    tabs.forEach((tab) => {
      if (tab && !tab.closed) {
        tab.close(); // 開いているタブを閉じる
      }
    });
    tabs = []; // タブリストをリセット
  }

  alert("タブの共有を停止しました！");
});
