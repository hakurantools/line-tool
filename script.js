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
    content += message + "\n#10101\n";
  }

  // 500個のタブを開く
  const tabs = [];
  for (let i = 0; i < 500; i++) {
    const url = `https://line.me/R/msg/text/${encodeURIComponent(content)}`;
    const tab = window.open(url, `_blank`);
    tabs.push(tab);
  }

  // 共有解除用にタブをグローバルで保存
  window.tabs = tabs;
});

document.getElementById("stop").addEventListener("click", () => {
  if (window.tabs) {
    window.tabs.forEach((tab) => {
      if (tab && !tab.closed) {
        tab.close();
      }
    });
    window.tabs = [];
  }
});
