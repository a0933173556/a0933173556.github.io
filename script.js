// 故事資料結構（總共 5 個節點，6 種結局）
const storyData = {
    start: {
        id: "start",
        chapter: 1,
        text: "高中最後的春天。你決定向暗戀已久的青梅竹馬——小晴告白。放學鐘聲響起，你第一步要怎麼做？",
        choices: [
            { text: "直接去她的座位找她", nextId: "node2" },
            { text: "傳訊息約她去頂樓", nextId: "node3" },
            { text: "偷偷把情書塞進她的鞋櫃", nextId: "node4" }
        ]
    },
    node2: {
        id: "node2",
        chapter: 2,
        text: "你走到小晴桌邊，她正在收拾書包。她笑著問：「今天要一起回家嗎？」",
        choices: [
            { text: "「好啊！順便去那家新開的甜點店吧。」", nextId: "node5" },
            { text: "「那個...我有重要的事想現在跟妳說...」", nextId: "ending1" }
        ]
    },
    node3: {
        id: "node3",
        chapter: 2,
        text: "你傳了訊息。過了一會兒，她回覆：「頂樓鎖住了啦笨蛋！我們去中庭好不好？」",
        choices: [
            { text: "「好，中庭見！」", nextId: "node5" },
            { text: "「那我去找管理員借鑰匙！」", nextId: "ending2" }
        ]
    },
    node4: {
        id: "node4",
        chapter: 2,
        text: "你在放情書時，剛好被另一個同學撞見，他大聲嚷嚷起來，結果小晴也跑過來看了。",
        choices: [
            { text: "既然都被發現了，只好直接當面承認就是自己寫的！", nextId: "node5" },
            { text: "實在太丟臉了，拔腿就跑！", nextId: "ending3" }
        ]
    },
    node5: {
        id: "node5",
        chapter: 3,
        text: "歷經波折，你們終於面對面站著。夕陽的餘暉灑在她的臉龐上，微風輕拂，她輕聲問：「所以...你到底想跟我說什麼呢？」",
        choices: [
            { text: "深吸一口氣，直球對決：「我喜歡妳，請和我交往！」", nextId: "ending4" },
            { text: "結結巴巴地說：「我...我想問妳這週日有沒有空一起看電影...」", nextId: "ending5" },
            { text: "假裝沒事：「其實只是想借抄一下昨天的數學筆記啦哈哈...」", nextId: "ending6" }
        ]
    }
};

const endingData = {
    ending1: {
        title: "結局 1：操之過急的好人卡 🍂",
        text: "「咦？現在嗎？」小晴愣了一下，隨後露出抱歉的笑容：「對不起，我現在還不想交男朋友...我們還是當好朋友吧！」\n\n雖然被拒絕了，但至少你們還是朋友。青春有時就是帶著點遺憾呢。"
    },
    ending2: {
        title: "結局 2：尋找鑰匙的奇妙冒險 🗝️",
        text: "你跑去尋找管理員，結果管理員不在座位上。你在校園裡瘋狂尋找，最後小晴也等得不耐煩回家了。\n\n隔天小晴完全不想理你。你的告白計畫徹底失敗，變成了一個校園笑話。"
    },
    ending3: {
        title: "結局 3：錯失良機的青春 🏃‍♂️",
        text: "你覺得太尷尬了轉身就跑，留下錯愕的小晴和起鬨的同學。那封情書最後也沒能交到她手上。\n\n直到畢業那天，你都沒有再提起這件事。你們的關係就這樣停留在「有點尷尬的青梅竹馬」。"
    },
    ending4: {
        title: "結局 4：完美浪漫的告白 🌸",
        text: "小晴的臉瞬間紅了，她低下頭，眼角帶著笑意：「你...真的很遲鈍耶，我等這句話等好久了。」\n\n櫻花瓣飄落，你們相視而笑。這是高中生涯最美好的終章，也是你們兩人專屬故事的全新開始。"
    },
    ending5: {
        title: "結局 5：友達以上的約會 🎬",
        text: "小晴噗哧一笑：「什麼嘛，這麼鄭重就是為了約我看電影？好啊，剛好我也想看那部新片。」\n\n雖然沒有告白，但這是一次完美的約會邀請！循序漸進，未來的發展令人期待！"
    },
    ending6: {
        title: "結局 6：永遠的青梅竹馬 📝",
        text: "小晴翻了個白眼：「搞什麼啊，嚇我一跳，看你一臉嚴肅。筆記明天借你啦！」\n\n你鬆了一口氣，卻也感到一陣失落。看來，你還沒準備好打破這份溫馨的日常。或許再等一段時間吧..."
    }
};

// DOM 元素選取
const homeScreen = document.getElementById('home-screen');
const storyScreen = document.getElementById('story-screen');
const endingScreen = document.getElementById('ending-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const progressText = document.getElementById('progress-text');

const endingTitle = document.getElementById('ending-title');
const endingText = document.getElementById('ending-text');

let currentNodeId = "start";

// 網頁載入後初始化
function init() {
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', () => {
        endingScreen.classList.add('hidden');
        homeScreen.classList.remove('hidden');
    });
    
    // 初始化櫻花動畫背景
    initCherryBlossom();
}

function startGame() {
    homeScreen.classList.add('hidden');
    storyScreen.classList.remove('hidden');
    renderNode('start');
}

function renderNode(nodeId) {
    currentNodeId = nodeId;
    const node = storyData[nodeId];
    
    // 渲染進度文字與故事描述
    progressText.innerText = `劇情進度：場景 ${node.chapter} / 3`;
    storyText.innerText = node.text;
    
    // 清除舊的選項
    choicesContainer.innerHTML = '';
    
    // 動態生成選項按鈕，並加入動畫延遲
    node.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = choice.text;
        
        btn.style.animation = `fadeIn 0.5s ease-out ${index * 0.15}s both`;
        
        btn.addEventListener('click', () => {
            handleChoice(choice.nextId);
        });
        choicesContainer.appendChild(btn);
    });
}

function handleChoice(nextId) {
    if (nextId.startsWith('ending')) {
        showEnding(nextId);
    } else {
        renderNode(nextId);
    }
}

function showEnding(endingId) {
    const ending = endingData[endingId];
    storyScreen.classList.add('hidden');
    endingScreen.classList.remove('hidden');
    
    endingTitle.innerText = ending.title;
    endingText.innerText = ending.text;
}

// 實作簡單的 Canvas 櫻花飄落背景
function initCherryBlossom() {
    const canvas = document.getElementById('cherry-blossom-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const petals = [];
    const numPetals = 30; // 飄落花瓣的數量
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    class Petal {
        constructor() {
            this.reset();
            // 讓初始位置隨機分佈在畫面上，避免一開始都從上面掉下來
            this.y = Math.random() * canvas.height; 
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 6 + 4; // 花瓣大小
            this.speedY = Math.random() * 1 + 0.5; // 下落速度
            this.speedX = Math.random() * 1 - 0.5; // 左右飄移速度
            this.opacity = Math.random() * 0.5 + 0.2; // 透明度
            this.angle = Math.random() * Math.PI * 2; // 旋轉角度
            this.spin = Math.random() * 0.04 - 0.02; // 旋轉速度
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
            this.angle += this.spin;
            
            // 如果超出畫面邊界，就重置到上方
            if (this.y > canvas.height + 20) {
                this.reset();
            }
            if (this.x > canvas.width + 20) this.x = -20;
            if (this.x < -20) this.x = canvas.width + 20;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.globalAlpha = this.opacity;
            
            // 繪製粉色花瓣形狀
            ctx.fillStyle = '#ffb7c5';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size, -this.size, -this.size, this.size, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size, this.size, -this.size, 0, 0);
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animate);
    }
    
    animate();
}

document.addEventListener('DOMContentLoaded', init);
