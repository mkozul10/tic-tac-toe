function gameSet(){
    let arr=[];
    for(let i=0;i<3;i++){
        arr[i]=[];  
        for(let j=0;j<3;j++) arr[i].push(field());
    }
    const setItem=(posX,posY,item)=>{(arr[posX][posY]).addToken(item)};
    const getArrValue=(x,y)=>{
        return (arr[x][y]).getValue();
    };
    const getArrRow=(x)=>{
        let pArr=[];
        for(let y=0;y<3;y++){
            pArr[y]=getArrValue(x,y);
        }
        return pArr;
    }
    const getArrColumn=(y)=>{
        let pArr=[];
        for(let x=0;x<3;x++){
            pArr[x]=getArrValue(x,y);
        }
        return pArr;
    }
    const getArrDiagonal=(type)=>{
        let pArr=[];
        if(type==='toleft'){
            for(let i=0;i<3;i++)
                for(let j=0;j<3;j++){
                    if((i+j)/2===1)
                    pArr[i]=getArrValue(i,j);
                }
        }
        else if(type==='toright'){
            for(let i=0;i<3;i++)
                for(let j=0;j<3;j++){
                    if((i-j)===0)
                    pArr[i]=getArrValue(i,j);
                }
        }
        return pArr;
    };
    return {getArrRow,getArrColumn,getArrDiagonal,setItem};
}
function field(){
    let value = '';

    const addToken = (playersItem) => {
        value = playersItem;
    };

    const getValue = () => value;

    return{addToken,getValue};
}
function gameController(){
    let winner;
    let moveCounter=0;
    const players=[{name:'Player1',token:'X'},{name:'Player2',token:'O'}];
    const changePlayerName=(player,newName)=>{players[player].name=newName};
    const getWinner=()=>winner;
    const board=gameSet();
    const checkWinner=()=>{
        let p;
        let arrEnd=new Array(3);
        let arrOfColumns=new Array(3);
        let arrOfRows=new Array(3);
        let arrOfDiagonals=new Array(2);
        for(let i=0;i<3;i++){
            arrOfColumns[i]=board.getArrColumn(i);
            arrOfRows[i]=board.getArrRow(i);
            if(i===0) arrOfDiagonals[i]=board.getArrDiagonal('toleft');
            if(i===1) arrOfDiagonals[i]=board.getArrDiagonal('toright');
        }
        p=arrOfRows.find(ar=>(ar[0]===ar[1] && ar[0]===ar[2]));
        if(p!==undefined) arrEnd[0]=p[0];
        else arrEnd[0]='';
        p=arrOfColumns.find(ar=>(ar[0]===ar[1] && ar[0]===ar[2]));
        if(p!==undefined) arrEnd[1]=p[0];
        else arrEnd[1]='';
        p=arrOfDiagonals.find(ar=>(ar[0]===ar[1] && ar[0]===ar[2]));
        if(p!==undefined) arrEnd[2]=p[0];
        else arrEnd[2]='';
        winner=arrEnd.find(el=>(el!==undefined && el!==''));
        if(moveCounter===9 && winner===undefined) winner='Tie';
    }
    const makeMove=(posX,posY)=>{
        if(moveCounter%2===0)   board.setItem(posX,posY,'X');
        else                    board.setItem(posX,posY,'O');
        moveCounter++;
        if(moveCounter>=3)      checkWinner();
    }
    const  getCounter=()=>moveCounter;
    const getPlayer=(token)=>{
        if(token==='X') return players[0].name;
        else return players[1].name;
    };
    return {changePlayerName,makeMove,getCounter,getPlayer,getWinner};
}
function DOMControl(){
    var gc=gameController();
    const form=document.querySelector('#form1');
    const formContainer=document.querySelector('#form-container');
    const board=document.querySelector('#container-all');
    const fields=document.querySelectorAll('.field');
    const paraWinner=document.querySelector('#winner-p');
    const paraTurn=document.querySelector('#turn-p');
    const refreshButton=document.querySelector('#refresh-button');

    const processStartingButton=(event)=>{
        event.preventDefault();
        let player1=document.querySelector('#player1').value;
        let player2=document.querySelector('#player2').value;
        if(player1 && player2){
            gc.changePlayerName(0,player1);
            gc.changePlayerName(1,player2);
        }
        event.srcElement.reset();
        formContainer.style.setProperty('display','none');
        board.style.setProperty('display','flex');
    }
    form.addEventListener('submit',processStartingButton);

    const updatingScreen=(event)=>{
        let posX=event.srcElement.dataset.x;
        let posY=event.srcElement.dataset.y;
        if(gc.getCounter() % 2===0) {
            paraTurn.innerText=`${gc.getPlayer('O')}'s turn!`;
            event.srcElement.innerText='X';
        }
        else{
            paraTurn.innerText=`${gc.getPlayer('X')}'s turn!`;
            event.srcElement.innerText='O';
        }                     
        gc.makeMove(posX,posY);
        event.srcElement.style.setProperty('pointer-events','none');
        const winnerToken=gc.getWinner();
        if(winnerToken){
            paraTurn.innerText='';
            event.target.parentNode.style.setProperty('pointer-events','none');
            paraWinner.style.setProperty('display','flex');
            refreshButton.style.setProperty('display','flex');
            if(gc.getWinner()==='Tie') paraWinner.innerText='Tied';
            else paraWinner.innerText=`Winner is ${gc.getPlayer(winnerToken)}`;
        }
    }
    fields.forEach(field=>{
        field.addEventListener('click',updatingScreen);
    })

    refreshButton.addEventListener('click',()=>{window.location.reload()});
    

};

DOMControl();