function dontFive(start, end) {

    const startSigh = Math.sign(start)
    const endSigh = Math.sign(end)

    const calculation = (x, sign) => {
        let isCeil = false
        x = Math.abs(x)
        let i=0
        let y = 0
        let tempResult = 0
        for(;x;i++) {
            y = x%10
            x /= 10
            x = Math.floor(x)
            if(y===5) {
                isCeil = true
                tempResult = (9**i)*y
                continue
            }
            if (y>5) y-=1
            tempResult +=(9**i)*y
        }
        let result = tempResult*sign
        if (isCeil) result -= 1
        return [result, isCeil]
    }

    const s = calculation(start, startSigh)
    const e = calculation(end, endSigh)

    const result = (e[0] - s[0]) + 1

    if (s[1] && !e[1]){
        if(startSigh === -1 && endSigh === -1) return result - 2
    }
    if (s[1]){
        if(startSigh === endSigh) return result - 1
        if(startSigh!== endSigh) return result - 2
    }
    if (e[1]) {
        if(startSigh === -1 && endSigh === -1) return result + 1
    }

    return result
}