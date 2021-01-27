(()=>{"use strict";const t=class{constructor(){this.rotation_index=0,this.rotations=[]}getShape(){return this.rotations[this.rotation_index]}rotate(t){const e=this.rotations.length;this.rotation_index=this.rotation_index+t,this.rotation_index>=e&&(this.rotation_index=0),this.rotation_index<0&&(this.rotation_index=e-1)}},e=class extends t{constructor(){super(),this.color="green",this.rotations=[[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]],[[1,1,0],[0,1,0],[0,1,0]]]}},i=[e,class extends t{constructor(){super(),this.color="blue",this.rotations=[[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]]]}},class extends t{constructor(){super(),this.color="yellow",this.rotations=[[[1,1],[1,1]]]}}],s=(new e,new class{constructor(){this.board=new class{constructor(t,e){this.width=t,this.height=e,this.board=Array(this.height).fill().map((()=>Array(this.width)))}clearLines(){let t=0,e=this.height-1;for(;e>0;){let i=!0;for(let t=0;t<this.width;t++)if(null==this.board[e][t]){i=!1;break}i?(this.board.splice(e,1),this.board.unshift(Array(this.width)),t++):e--}return t}isSpotAvailable(t,e,i){if(i>=this.height)return!1;const s=t.getShape();for(let t=0;t<s.length;++t)for(let h=0;h<s[t].length;++h)if(0!=s[h][t]){if(i+h>=this.height)return!1;if(e+t<0||e+t>=this.width)return!1;if(null!=this.board[i+h][e+t])return!1}return!0}placePiece(t,e,i){const s=t.getShape();for(let h=0;h<s.length;++h)for(let o=0;o<s[h].length;++o)0!=s[o][h]&&(this.board[i+o][e+h]=t.color)}}(10,22),this.canvas=new class{constructor(t){this.boardPosX=28,this.boardPosY=28,this.cellSize=28,this.board=t,this.boarderColor="#fff",this.borderThickness=.5,this.canvas=document.querySelector("canvas.tetris"),this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.context=this.canvas.getContext("2d")}drawBorders(){const t=[this.boardPosX-this.borderThickness,this.boardPosY-this.borderThickness,this.borderThickness+this.boardPosX+this.board.width*this.cellSize,this.borderThickness+this.boardPosY+this.board.height*this.cellSize];this.context.beginPath(),this.context.lineWidth=1,this.context.moveTo(t[0],t[1]),this.context.lineTo(t[2],t[1]),this.context.lineTo(t[2],t[3]),this.context.lineTo(t[0],t[3]),this.context.closePath(),this.context.strokeStyle=this.borderColor,this.context.stroke()}drawGrid(){this.context.strokeStyle=this.borderColor,this.context.lineWidth=.5;const t=this.boardPosX+this.cellSize*this.board.width;for(let e=1;e<this.board.height;e++){const i=this.boardPosY+e*this.cellSize;this.context.beginPath(),this.context.moveTo(this.boardPosX,i),this.context.lineTo(t,i),this.context.closePath(),this.context.stroke()}this.context.strokeStyle=this.borderColor;const e=this.boardPosY+this.cellSize*this.board.height;for(let t=1;t<this.board.width;t++){const i=this.boardPosX+t*this.cellSize;this.context.beginPath(),this.context.moveTo(i,this.boardPosY),this.context.lineTo(i,e),this.context.closePath(),this.context.stroke()}}drawBoard(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawBorders(),this.drawGrid();for(let t=0;t<this.board.height;t++)for(let e=0;e<this.board.width;e++)null!=this.board.board[t][e]&&this.drawSquare(this.boardPosX+e*this.cellSize,this.boardPosY+t*this.cellSize,this.board.board[t][e])}drawSquare(t,e,i){this.context.beginPath(),this.context.fillStyle=i,this.context.fillRect(t+.5,e+.5,this.cellSize-1,this.cellSize-1)}drawPiece(t,e,i){const s=t.getShape();for(let h=0;h<s.length;++h)for(let o=0;o<s[h].length;++o)0!=s[h][o]&&this.drawSquare(this.boardPosX+(e+o)*this.cellSize,this.boardPosY+(i+h)*this.cellSize,t.color)}}(this.board),this.state=0,this.gameSpeed=1e3,this.speedMode=!1,this.speedAmount=10,this.level=1,this.score=0,this.numClears=0}placeNewPiece(){const t=new this.nextPiece;this.setNextPiece(),this.currentPiece=t,this.pieceX=3,this.pieceY=0,this.board.isSpotAvailable(this.currentPiece,this.pieceX,this.pieceY)||this.gameOver()}rotate(t){let e=Object.assign(this.currentPiece,{});e.rotate(t),this.verifyRotation(e,0)&&(this.currentPiece=e),this.render()}verifyRotation(t,e){return this.board.isSpotAvailable(t,this.pieceX+e,this.pieceY)?(this.pieceX+=e,!0):(console.log("invalid!"),0==e?this.verifyRotation(t,1):1==e&&this.verifyRotation(t,-1))}gameOver(){this.state=1,this.canvas.drawPiece(this.currentPiece)}movePieceLeft(){this.board.isSpotAvailable(this.currentPiece,this.pieceX-1,this.pieceY)&&(this.pieceX-=1),this.render()}movePieceRight(){this.board.isSpotAvailable(this.currentPiece,this.pieceX+1,this.pieceY)&&(this.pieceX+=1),this.render()}speedOn(){this.speedMode=!0}speedOff(){this.speedMode=!1}incrementPiece(){if(this.board.isSpotAvailable(this.currentPiece,this.pieceX,this.pieceY+1))this.pieceY=this.pieceY+1;else{this.board.placePiece(this.currentPiece,this.pieceX,this.pieceY);const t=this.board.clearLines();t>0&&this.numClears++,10==this.numClears&&(this.level++,this.numClears=0),this.addScore(t),this.placeNewPiece(this.currentPiece)}}addScore(t){this.score+=this.level*(2^t-1)*100}setNextPiece(){const t=Math.floor(3*Math.random());this.nextPiece=i[t]}startGame(){this.lastRenderTime=Date.now(),this.setNextPiece(),window.requestAnimationFrame(this.tick.bind(this))}render(){this.canvas.drawBoard(),this.currentPiece&&this.canvas.drawPiece(this.currentPiece,this.pieceX,this.pieceY)}tick(){1!=this.state&&(Date.now()-this.lastRenderTime>(this.speedMode?this.speedAmount:this.gameSpeed)&&(this.canvas.drawBoard(),this.currentPiece?this.incrementPiece():this.placeNewPiece(),this.render(),this.lastRenderTime=Date.now()),window.requestAnimationFrame(this.tick.bind(this)))}});s.startGame(),window.addEventListener("keydown",(function(t){if(!t.repeat)switch(t.key,t.key){case"ArrowLeft":case"a":s.movePieceLeft();break;case"ArrowRight":case"d":s.movePieceRight();break;case"ArrowDown":case"s":s.speedOn();break;case"q":s.rotate(-1);break;case"e":s.rotate(1);break;default:return}})),window.addEventListener("keyup",(function(t){switch(t.key){case"ArrowDown":case"s":s.speedOff();break;default:return}}))})();
//# sourceMappingURL=bundle.fd77add2e94badbb77d8.js.map