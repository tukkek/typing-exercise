import * as rpg from './rpg.js'

const DEBUG=location.toString().indexOf('debug')>=0
const REPLACE=new Map([
  ['’',"'"],
  ['“','"'],
  ['”','"'],
  ['<br/>',' '],
  ['—','-'],
])

export var current='Test.'
export var credit=''

function pad(number){return new String(number).padStart(2,'0')}

async function get(hour,minute){
  try{
    let quotes=await fetch(`literature-clock/docs/times/${pad(hour)}_${pad(minute)}.json`)
    quotes=await quotes.json()
    return rpg.pick(quotes)
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
  for(let r of REPLACE.keys()) current=current.replaceAll(r,REPLACE.get(r))
  while(current.indexOf('  ')>=0) current=current.replace('  ',' ')
  credit=`-- ${q['author']}, ${q['title']}`
}

export async function setup(){await next()}
