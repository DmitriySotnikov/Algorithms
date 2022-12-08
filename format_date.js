// Перевод секунд в формат - год, дни, часы, минуты, секунды

function formatDuration (seconds) {

    if(!seconds)return`now`

    let dateArr = [];

    const second = seconds%60;
    const secondStr = second%60===0?``: `${second%60} ${second%60===1?`second`:`seconds`}`
    if(second) dateArr.unshift(secondStr)

    const minute = Math.floor(seconds/60%60);
    const minuteStr = minute>0?`${minute} ${minute===1?`minute`:`minutes`}`:``
    if(minute) dateArr.unshift(minuteStr)

    const hour = Math.floor(seconds/3600%24);
    const hourStr = hour>0?`${hour} ${hour===1?`hour`:`hours`}`:``
    if(hour) dateArr.unshift(hourStr)

    const day = Math.floor(seconds/86400%365);
    const dayStr = day>0?`${day} ${day===1?`day`:`days`}`:``
    if(day) dateArr.unshift(dayStr)

    const year = Math.floor(seconds/31536000);
    const yearStr = year>0?`${year} ${year===1?`year`:`years`}`:``
    if(year) dateArr.unshift(yearStr)

    if(dateArr.length===2){
        return dateArr.join(" and ")
    } else if(!dateArr.length){
        return dateArr.join("")
    }
    let res = "";
    dateArr.forEach((v,i)=> {
        if(i===dateArr.length-2) {
            res += v + " and "
        } else res+=(v+", ")
    })
    return res.slice(0, -2)
}

console.log(formatDuration(5047867)) // '58 days, 10 hours, 11 minutes and 7 seconds'