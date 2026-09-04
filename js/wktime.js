function updateDisplay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const currentMins = hours * 60 + minutes;
    
    // 格式化日期时间
	const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    const pad = n => String(n).padStart(2, '0');
	const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const currentTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    const formatTime = mins => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;
    
    // 作息时间表 [开始分钟, 结束分钟, 描述]
    const schedule = [
        [480, 520, '第一节'],
        [535, 575, '第二节'],
        [580, 625, '大课间'],
        [625, 665, '第三节'],
        [680, 720, '第四节'],
        [750, 800, '午自习'],
        [810, 850, '第五节'],
        [865, 905, '第六节'],
        [925, 965, '第七节'],
        [980, 1025, '托管一'],
		[1025, 1070, '托管二'],
    ];
    
    // 查找当前时间段
    const currentActivity = schedule.find(([start, end]) => 
        currentMins >= start && currentMins < end
    );
    
    // 获取所有活动开始时间
    const startTimes = schedule.map(item => item[0]);
    
    // 判断当天是否有活动（是否在第一个活动开始之前或最后一个活动结束之后）
    const firstStart = startTimes[0];
    const lastEnd = schedule[schedule.length - 1][1];
    const isBeforeFirst = currentMins < firstStart;
    const isAfterLast = currentMins >= lastEnd;
    
    let displayText, displayClass;
    
    if (currentActivity) {
        // 正在活动中
        const [start, end, name] = currentActivity;
        displayText = `${name}👉${formatTime(start)}-${formatTime(end)}<br>🌼🌼🌼 进行中...`;
        displayClass = 'doing';
    } else if (isBeforeFirst) {
        // 作息开始之前
        const nextStart = startTimes[0];
        displayText = `⏰ 今日课程尚未开始<br>🛑🛑🛑 休息中...<br>距第一节还有 ${formatTime(nextStart - currentMins)}`;
        displayClass = 'waiting';
    } else if (isAfterLast) {
        // 放学之后
        displayText = `🎉 今日课程已结束<br>🛑🛑🛑 休息中...`;
        displayClass = 'waiting';
    } else {
        // 两个活动之间的休息时间
        // 找到下一个活动
        let nextActivity = null;
        for (let i = 0; i < startTimes.length; i++) {
            if (startTimes[i] > currentMins) {
                nextActivity = schedule[i];
                break;
            }
        }
        
        if (nextActivity) {
            const [start, end, name] = nextActivity;
            const waitTime = start - currentMins;
            displayText = `🛑🛑🛑 休息中...<br>距 ${name} 还有 ${formatTime(waitTime)}`;
        } else {
            displayText = `🛑🛑🛑 休息中...`;
        }
        displayClass = 'waiting';
    }
    
    // 更新DOM
    const actTimeEl = document.getElementById('actTime');
    actTimeEl.innerHTML = displayText;
    actTimeEl.className = displayClass;
    document.getElementById('currentTime').textContent = currentTime;
    document.getElementById('today').textContent = today;
    document.getElementById('week').textContent = week;
    
const holiday = [
    [0, 1, '元旦'],   
    [1, 6, '春节'],  //modi
    [1, 20, '元宵节'], //modi
    [3, 5, '清明节'], //modi
	[4, 1, '劳动节'],
	[5, 9, '端午节'], //modi
	[5, 20, '中考'],
	[8, 10, '教师节'],
	[8, 25, '中秋节'],//modi
    [9, 1, '国庆节']   
];

// 计算每节日的倒计天数
const festfival = holiday.map(([month, day, name]) => {
    const thisFestfival = new Date(now.getFullYear(), month, day);
	let daysUntil = Math.ceil((thisFestfival - now) / (1000 * 60 * 60 * 24));
    
    // 如果今年的节日已过，则改为明年
    if (daysUntil < 0) {
        thisFestfival.setFullYear(now.getFullYear() + 1);
		daysUntil = Math.ceil((thisFestfival - now) / (1000 * 60 * 60 * 24));
    }    
    return {
        name,
        daysUntil		
    };
});

// 找到距离最近的下一个节日
const nearest = festfival.reduce((prev, curr) => {
    return prev.daysUntil < curr.daysUntil ? prev : curr;
});

const festfivalMsg = nearest.daysUntil===0?`今天是 ${nearest.name}`:`距 ${nearest.name}，还有 ${nearest.daysUntil} 天`;

// 显示结果
document.getElementById('daysCountdown').textContent = festfivalMsg;	
document.getElementById('footer').textContent = "⚡ 近期要事提醒：...";
}

// 初始化并每秒更新
updateDisplay();
setInterval(updateDisplay, 1000);