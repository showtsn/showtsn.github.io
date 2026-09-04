const now = new Date();
const pad = n => String(n).padStart(2, '0');
const pa = n => String(n).padStart(6, '…');

const birth = [
    [0, 23, '👸'],
    [5, 29, '👨‍💼'],
    [6, 28, '👩‍💼'],
	[8, 27, '👴'],
    [0, 1, '👵'],     
];
const members = birth.map(([month, day, name]) => {
	const thisBirthday = new Date(now.getFullYear(), month, day);
	let daysUntil = Math.ceil((thisBirthday - now) / (1000 * 60 * 60 * 24))
	if (daysUntil < 0){
		thisBirthday.setFullYear(now.getFullYear() + 1);
		daysUntil = Math.ceil((thisBirthday - now) / (1000 * 60 * 60 * 24))
	};
	return {
		name,
		birthday:`${thisBirthday.getFullYear()}-${pad(month + 1)}-${pad(day)}`,
		daysUntil
	};
});

const nearst = members.reduce((pre, cur)=>{
	return pre.daysUntil < cur.daysUntil ? pre : cur
});
const mainMsg = nearst.daysUntil === 0 ? `${nearst.name}生日快乐🎉` : `距离生日 ${nearst.daysUntil} 天`;
const birthMsg = nearst.daysUntil === 0 ? `<strong style="color:#bf3010;">今天是 ${nearst.name} 的生日🎂</strong>` : `${nearst.name} 生日快到啦 ⏳`;

document.getElementById("birth-msg").innerHTML = birthMsg;
document.getElementById("main-msg").textContent = mainMsg;

for (let i = 0; i < 5; i++) {
    let birthEl = document.getElementById(`birth${i}`);
    birthEl.textContent = `${members[i].birthday}${pa(members[i].daysUntil)}天`;
}
document.getElementById('today').textContent = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
document.getElementById('week').textContent = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][now.getDay()];
document.getElementById("footer").textContent = `生日：${nearst.birthday}`;


