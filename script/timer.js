export var pause=-1

var start=-1

function now(){return new Date().getTime()/1000}

export function time(){
  start=now()
  pause=-1
}

export async function rest(){
  if(pause<=0) pause=now()-start
  pause-=1
  return new Promise(callback=>{setInterval(()=>callback(pause),1000)})
}

function skip(event){if(event.key=='Enter'&&pause>0) pause=.1}

export function setup(){window.addEventListener('keypress',skip)}
