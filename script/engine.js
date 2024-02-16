import * as quotes from './quotes.js'
import * as view from './view.js'

export async function setup(){
  await quotes.setup()
  view.setup()
}
