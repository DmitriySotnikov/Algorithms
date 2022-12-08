// Алгоритм по перебору массива из 90к элементов. Результат работы функции это массив в котором содержится
// массив счетчиков чисел меньших по значению справа от текущего значения элемента массива.

let array = Array(90000)
for (let i=0; i<array.length; ++i){
    //array[i]=Math.floor(Math.random()*(1000-300)+300)
    array[i]=Math.floor(Math.random() * (-900-1000) + 1000)
}

// console.log(array)

function smaller(arr) {

    const negativeStack = [];
    const stack = [];
    const result = [];

    const length = arr.length - 1;
    let i = length-1;

    let current = arr[length];

    if(Math.sign(current) === 1){
        stack[current]=1;
    } else {
        current=current*-1;
        negativeStack[current]=1;
    }
    for(; i>=0; --i){
        current = arr[i];
        if(Math.sign(current)===1){
            if(stack[current]===undefined){
                stack[current]=1;
            } else {
                stack[current]+=1;
            }
        } else {
            current=current*-1
            if(negativeStack[current]===undefined){
                negativeStack[current]=1;
            } else {
                negativeStack[current]+=1;
            }
        }
    }

    const associativeArr = [];
    const oneHalf = [];

    const negativeAssociativeArr = [];
    const oneHalfNegative = [];

    for (let key in stack){
        if(+key <= 500) {
            oneHalf.push([+key, stack[key]])
        } else associativeArr.push([+key, stack[key]]);
    }

    for (let key in negativeStack){
        if(+key <= 500) {
            oneHalfNegative.push([+key, negativeStack[key]])
        } else negativeAssociativeArr.push([+key, negativeStack[key]]);
    }

    let j = 0;

    let counter = 0;
    let oneHalfCount = 0;

    let oneHalfNegCount = 0;
    let negCount = 0;

    for (let k=0; k<=oneHalf.length-1; ++k){
        oneHalfCount+=oneHalf[k][1];
    }

    for (let k=0; k<=oneHalfNegative.length-1; ++k){
        oneHalfNegCount+=oneHalfNegative[k][1];
    }

    for (let k=0; k<=negativeAssociativeArr.length-1; ++k){
        negCount+=negativeAssociativeArr[k][1];
    }

    const oneHalfArr = oneHalf.length-1
    const assArrL = associativeArr.length-1
    const arrL = arr.length-1;
    let val = 0;


    for (i=0; i<arrL; ++i){
        current = arr[i];
        if (current > 500){
            counter=oneHalfCount+oneHalfNegCount+negCount;
            for (j=0; j<assArrL; ++j){
                val = associativeArr[j][0]
                if(current>val){
                    counter+=associativeArr[j][1];
                    continue;
                }
                if(current===val){
                    associativeArr[j][1]-=1;
                    break;
                }
            }
        } else if (current > 0 && current <= 500) {
            oneHalfCount-=1;
            counter=oneHalfNegCount+negCount;
            for (j=0; j<oneHalfArr; ++j){
                val = oneHalf[j][0]
                if(current>val){
                    counter+=oneHalf[j][1];
                    continue;
                }
                if(current===val){
                    oneHalf[j][1]-=1;
                    break;
                }
            }
        } else if (current <= 0 && current > -500) {
            counter+=negCount
            oneHalfNegCount-=1;
            current=current*-1;
            j = oneHalfNegative.length-1;
            val = oneHalfNegative[j][0];
            for (; j>=0; --j){
                val = oneHalfNegative[j][0]
                if(current<val){
                    counter+=oneHalfNegative[j][1];
                    continue;
                }
                if(current===val){
                    oneHalfNegative[j][1]-=1;
                    break;
                }
            }
        } else {
            negCount-=1;
            current=current*-1;
            j = negativeAssociativeArr.length-1;
            val = negativeAssociativeArr[j][0];
            for (; j>=0; --j){
                val = negativeAssociativeArr[j][0]
                if(current<val){
                    counter+=negativeAssociativeArr[j][1];
                    continue;
                }
                if(current===val){
                    negativeAssociativeArr[j][1]-=1;
                    break;
                }
            }
        }
        j=0;
        result.push(counter);
        counter=0;
    }
    result.push(0);
    return result;
}

smaller(array)

time = performance.now() - time;
console.log('Время выполнения = ', time);