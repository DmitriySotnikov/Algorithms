function persistence(num) {
   let count = 0
   const calc = (num, count) => {
      const arr = [...num.toString()]
      if (arr.length <= 1) return count
      count++
      let result = arr[0]
      for (let i=0; i<arr.length-1; ++i) {
         result *= +arr[i+1]
      }
      return calc(result, count)
   }
   return calc(num, count)
}