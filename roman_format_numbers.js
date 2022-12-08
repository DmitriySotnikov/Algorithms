// Перевод чисел в Римские и обратно.

const numbers = new Map([
    ["I", 1],
    ["II", 2],
    ["III", 3],
    ["IV", 4],
    ["V", 5],
    ["VI", 6],
    ["VII", 7],
    ["VIII", 8],
    ["IX", 9]
]);

const dozens = new Map([
    ["X", 10],
    ["XX", 20],
    ["XXX", 30],
    ["XL", 40],
    ["L", 50],
    ["LX", 60],
    ["LXX", 70],
    ["LXXX", 80],
    ["XC", 90]
]);
const hundreds = new Map([
    ["C", 100],
    ["CC", 200],
    ["CCC", 300],
    ["CD", 400],
    ["D", 500],
    ["DC", 600],
    ["DCC", 700],
    ["DCCC", 800],
    ["CM", 900]
]);
const thousands = new Map([
    ["M", 1000],
    ["MM", 2000],
    ["MMM", 3000],
    ["MV", 4000]
]);

class RomanNumerals {
    static toRoman (number){
        const numArr = [...number.toString()]; // приводим число к массиву
        const length = numArr.length-1; // константа длинны массива
        let current = 0;
        let res = []; // результат
        const numerator = (i, current, k, length, j, map) => {
            if (length-i === j){
                for(let [key, value] of map.entries()){
                    if(+current === 0) break
                    if(+current === value/k){
                        res.push(key)
                        break
                    }
                }
            }
        }
        for (let i=0; i<=length; ++i){
            current = numArr[i] // текущее значение
            numerator(i, current, 1000, length, 3, thousands)
            numerator(i, current, 100, length, 2, hundreds)
            numerator(i, current, 10, length, 1, dozens)
            numerator(i, current, 1, length, 0, numbers)
        }
        return res.join("")
    }
    static fromRoman (number) {
        let tempNum = [...number];
        let res = 0;
        if(tempNum[0] === "M" && tempNum[1] === "V"){
            res+=4000;
            tempNum.splice(0, 2)
        }
        if(tempNum[0] === "M" && tempNum[1] !== "M"){
            res+=1000;
            tempNum.splice(0, 1)
        }
        if(tempNum[0] === "M" && tempNum[1] === "M" && tempNum[2] !== "M"){
            res+=2000;
            tempNum.splice(0, 2)
        }
        if(tempNum[0] === "M" && tempNum[1] === "M" && tempNum[2] === "M"){
            res+=3000;
            tempNum.splice(0, 3)
        }
        if(~tempNum.join("").indexOf("XC")){
            tempNum.forEach((v,i,a)=>{
                if(v==="X" && a[i+1]==="C"){
                    res=res+90
                    return tempNum.splice(i, 2)
                }
            })
        }
        const hundred = tempNum.filter(v=>v==="C" || v==="M" || v==="D").join("")
        if(hundred){
            res = res + hundreds.get(hundred)
        }
        tempNum = tempNum.filter(v=>v!=="C" && v!=="M" && v!=="D")
        if(~tempNum.join("").indexOf("IX")){
            tempNum.forEach((v,i,a)=>{
                if(v==="I" && a[i+1]==="X"){
                    res=res+9
                    return tempNum.splice(i, 2)
                }
            })
        }
        const dozen = tempNum.filter(v=>v==="L" || v==="C" || v==="X").join("")
        if(dozen) res = res + dozens.get(dozen)
        tempNum = tempNum.filter(v=>v!=="L" && v!=="C" && v!=="X")
        if(tempNum.length) res = res + numbers.get(tempNum.join(""))
        return res
    }
}