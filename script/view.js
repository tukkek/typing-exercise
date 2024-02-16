import * as quotes from './quotes.js'

const QUOTE=document.querySelector('#quote')
const CREDIT=document.querySelector('#credit')
const CHARACTER=document.querySelector('#character').content.childNodes[0]

var progress=''

function press(e){
  progress+=e.key
  let c=quotes.current
  if(progress.length==c.length){
    quotes.next()
    setup()
    return
  }
  if(c.indexOf(progress)!=0) progress=''
  let character=QUOTE.querySelectorAll('.character')
  for(let i=0;i<c.length;i++)
    character[i].classList.toggle('typed',i<progress.length)
}

export function setup(){
  progress=''
  for(let c of QUOTE.querySelectorAll('.character')) c.remove()
  CREDIT.textContent=quotes.credit
  for(let q of quotes.current){
    let c=CHARACTER.cloneNode(true)
    c.textContent=q
    QUOTE.append(c)
  }
  window.onkeypress=press
}
