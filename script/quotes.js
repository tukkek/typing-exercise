const DEBUG=location.toString().indexOf('debug')>=0

export var current='Test.'
export var credit=''

var quotes={}

function pad(number){return new String(number).padStart(2,'0')}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function get(hour,minute){
  let q=quotes[`${pad(hour)}:${pad(minute)}`]
  if(q) return q[getRandomInt(0,q.length)]
  minute+=1
  if(minute==60){
    minute=0
    hour+=1
    if(hour==24) hour=0
  }
  return get(hour,minute)
}

export function next(){
  if(DEBUG) return
  let d=new Date()
  let q=get(d.getHours(),d.getMinutes())
  current=q['prefix']+q['time']+q['suffix']
  credit=`-- ${q['author']}, ${q['book']}`
}

export async function setup(){
  quotes=await fetch("./literature-clock/quotes.json")
  quotes=await quotes.json()
  next()
}
