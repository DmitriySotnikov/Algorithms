// Функция складывает две строки состоящие из целых чисел

function Sum (a,b) {
    const maxStr=a.length>b.length?a:b;
    const minStr=a.length>b.length?b:a;
    const diff = maxStr.length-minStr.length;
    let result=[];
    let x=0;
    let y=0;
    let template=0;
    let acc=0;
    let e=0;
    for(let i=maxStr.length-1; i>=0; --i){
        x = +maxStr.charAt(i);
        y = +minStr.charAt(i-diff);
        template = x+y+acc;
        if(!i){
            result.unshift(template);
            continue
        }
        acc=0;
        if(template>=10){
            e=template%10;
            acc=Math.floor(template/10);
            result.unshift(e);
            continue;
        }
        result.unshift(template);
    }
    for (let i=0; i<result.length; ++i){
        if (result[i]===0) {
            result.shift()
        } else break
    }
    return result.join("")
}