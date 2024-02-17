export var pause=-1

var start=-1

function now(){return new Date().getTime()/1000}

export function time(){start=now()}

export async function rest(){
  if(pause<=0) pause=now()-start
  pause-=1
  return new Promise(callback=>{
    setInterval(()=>callback(pause),1000)
  })
}

export function setup(){
  window.addEventListener('keypress',event=>{if(event.key=='Enter') pause=.1})
}
