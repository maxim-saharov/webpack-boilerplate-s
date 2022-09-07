//import './index.html';
import './main.html'
//import './index.scss';
import './main.scss'
import code from './img/code.png'
import {mult, sum} from './modules/calc'

const imgWrap = document.querySelector( '.imgJS' )
const img = new Image()

img.src = code

img.width = 700

//debugger
img.style.height = '160px'

imgWrap.append( img )

console.log( mult( 3, 4 ) )
console.log( sum( 3, 4 ) )