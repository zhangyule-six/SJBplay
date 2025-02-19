const nextbnt = document.getElementsByClassName("next-round");
const dialog = document.querySelector("dialog");

// 显示对话框
function showDialog(){
  dialog.show();
}
nextbnt.addEventListenner("click", showDialog())

// 1. 正确获取 DOM 元素（使用 [0] 获取第一个匹配元素）
const rGesture = document.getElementsByClassName("r-gesture")[0];
const hGesture = document.getElementsByClassName("h-gesture")[0];
const selectGesture = document.getElementsByClassName("select-gesture")[0];
const confirmBtn = document.getElementsByClassName("confirm")[0];

// 2. 统一更新手势的函数
function updateGesture(container, gestureName) {
  container.innerHTML = ''; // 清空容器
  const img = document.createElement('img');
  img.innerHTML = `<img src = "/img/${gestureName}.png">`
  //img.src = `/img/${gestureName}.png`;
  container.appendChild(img);
}

// 3. 整合后的选择逻辑
function handleChoice() {
  // 机器人选择
  const robotGestures = ['剪刀', '石头', '布'];
  const robotChoice = robotGestures[Math.floor(Math.random() * 3)];
  updateGesture(rGesture, robotChoice);

  // 玩家选择
  const humanGestures = ['剪刀', '石头', '布']; 
  const humanChoice = humanGestures[selectGesture.selectedIndex];
  updateGesture(hGesture, humanChoice);
}

// 4. 绑定事件监听器
confirmBtn.addEventListener('submit', handleChoice); 