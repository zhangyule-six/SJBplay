// 显示对话框
const nextbnt = document.getElementsByClassName("next-round")[0];
const dialog = document.querySelector("dialog");
const rGesture = document.getElementsByClassName("r-gesture")[0];
const hGesture = document.getElementsByClassName("h-gesture")[0];
const selectGesture = document.getElementsByClassName("select-gesture")[0];
const confirmBtn = document.getElementsByClassName("confirm")[0];

nextbnt.addEventListener("click", () =>{
  dialog.showModal();
});


// 绑定事件监听器
confirmBtn.addEventListener('click', () =>{
  const robotChoice = robotGes();
  const humanChoice = humanGes();
  judgeWinner(robotChoice,humanChoice);
  showRound();
  gameOver();
});

//手势显示

// 2. 统一更新手势的函数
function updateGesture(name, container, gestureName) {
  container.innerHTML = ''; // 清空容器
  const img = document.createElement('img');
  img.src = `./img/${gestureName}.png`;
  img.id = "images";
  img.className = `${name}`
  container.appendChild(img);
}

// 3. 整合后的选择逻辑
function robotGes() {
  // 机器人选择
  const robotName = "robot-img";
  const robotGestures = ['剪刀', '石头', '布'];
  const robotChoice = robotGestures[Math.floor(Math.random() * 3)];
  updateGesture(robotName,rGesture, robotChoice);
  return robotChoice;
}

function humanGes(){
  // 玩家选择
  const humanName = "human-img";
  const humanGestures = ['剪刀', '石头', '布']; 
  const humanChoice = humanGestures[selectGesture.selectedIndex];
  updateGesture(humanName,hGesture, humanChoice);
  return humanChoice;
}


//判断胜负
const winner = document.getElementsByClassName("win-text")[0]; // 直接获取元素
const round = document.getElementsByClassName("content")[0];
const playerGrade = { win: 0, lose: 0 };
const robotGrade = { win: 0, lose: 0 };
let currentRound = 0;

function judgeWinner(robotChoice, humanChoice) {
  if (robotChoice === humanChoice) {
    winner.innerText = "本回合平局";
  } else {
    const playerWins = (
      (humanChoice === '石头' && robotChoice === '剪刀') ||
      (humanChoice === '布' && robotChoice === '石头') ||
      (humanChoice === '剪刀' && robotChoice === '布')
    );

    if (playerWins) {
      winner.innerText = "本回合玩家获胜";
      playerGrade.win++;
      robotGrade.lose++;
    } else {
      winner.innerText = "本回合机器人获胜";
      robotGrade.win++;
      playerGrade.lose++;
    }
  }
  currentRound++;
  getScore();
}
//展示回合
function showRound() {
  round.innerText = `第${currentRound}回合（共三回合）`;
}


function getScore(){
  const rScore = document.getElementsByClassName("r-score")[0];
  const hScore = document.getElementsByClassName("h-score")[0];
  rScore.innerText = `胜：${playerGrade.win} | 负：${playerGrade.lose}`;
  hScore.innerText = `胜：${robotGrade.win} | 负：${robotGrade.lose}`;
}

const btnChange = document.getElementsByClassName("next")[0];
//判断游戏是否结束
function gameOver() {
  if (playerGrade.win >= 2 || robotGrade.win >= 2 || currentRound === 3 ) {
    dialog.close();
    const winner = playerGrade.win > robotGrade.win ? '玩家' : '机器人';
  setTimeout(() => {
    btnChange.innerHTML = '';
    const showEnd = document.createElement('p');
    showEnd.className = "show-end";
    if(playerGrade.win === robotGrade.win){
      showEnd.innerText = "不错嘛，平局了";
    }else{
      showEnd.innerText = `恭喜!${winner}获得胜利！`;
    }
    btnChange.appendChild(showEnd);
  }, 0); // 确保对话框关闭后弹出

  
  }
}


       
