import * as quotes from './quotes.js'
import * as view from './view.js'
import * as timer from './timer.js'

export async function setup(){
  await quotes.setup()
  view.setup()
  timer.setup()
}
