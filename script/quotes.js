const DEBUG=location.toString().indexOf('debug')>=0

export var current='Test.'
export var credit=''

function pad(number){return new String(number).padStart(2,'0')}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function get(hour,minute){
  try{
    let quotes=await fetch(`literature-clock/docs/times/${pad(hour)}_${pad(minute)}.json`)
    quotes=await quotes.json()
    return quotes[getRandomInt(0,quotes.length)]
  }catch{
    minute+=1
    if(minute==60){
      minute=0
      hour+=1
      if(hour==24) hour=0
    }
    return get(hour,minute)
  }
}

export async function next(){
  if(DEBUG) return
  let d=new Date()
  let q=await get(d.getHours(),d.getMinutes())
  current=q['quote_first']+q['quote_time_case']+q['quote_last']
  credit=`-- ${q['author']}, ${q['title']}`
}

export async function setup(){await next()}
