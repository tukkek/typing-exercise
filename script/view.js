import * as quotes from './quotes.js'
import * as timer from './timer.js'

const QUOTE=document.querySelector('#quote')
const CREDIT=document.querySelector('#credit')
const CHARACTER=document.querySelector('#character').content.childNodes[0]
const PAUSE=document.querySelector('#pause')

var progress=''

function display(elements,show=true){
  for(let e of elements) e.classList.toggle('hidden',!show)
}

async function press(e){
  e.preventDefault()
  progress+=e.key
  let c=quotes.current
  if(progress.length==c.length){
    let left=PAUSE.querySelector('span')
    while(await timer.rest()>1){
      left.textContent=moment.duration(timer.pause,'seconds').humanize()
      display([QUOTE,CREDIT],false)
      display([PAUSE])
    }
    await quotes.next()
    setup(false)
    return
  }
  if(c.indexOf(progress)!=0) progress=''
  let character=QUOTE.querySelectorAll('.character')
  let l=progress.length
  for(let i=0;i<c.length;i++) 
    character[i].classList.toggle('typed',i<l)
  let r=QUOTE.querySelector('.recent')
  if(r) r.classList.toggle('recent',false)
  if(l>0) character[l-1].classList.toggle('recent',true)
}

export function setup(first=true){
  progress=''
  for(let c of QUOTE.querySelectorAll('.character')) c.remove()
  CREDIT.textContent=quotes.credit
  for(let q of quotes.current){
    let c=CHARACTER.cloneNode(true)
    c.textContent=q
    QUOTE.append(c)
  }
  timer.time()
  display([QUOTE,CREDIT])
  display([PAUSE],false)
  if(first) window.addEventListener('keypress',press)
}
