export function roll(min,max){return Math.floor((max-min+1)*Math.random())+min}

export function pick(array){return array[roll(0,array.length-1)]}
