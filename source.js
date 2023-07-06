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
                    //pArr[i][j]=getArrValue(i,j);
                    pArr[i]=getArrValue(i,j);
                }
        }
        else if(type==='toright'){
            for(let i=0;i<3;i++)
                for(let j=0;j<3;j++){
                    if((i-j)===0)
                    // pArr[i][j]=getArrValue(i,j);
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
    const players=[{name:'player_1',token:'X'},{name:'player_2',token:'O'}];
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


let i=gameController();
i.makeMove(0,0);
i.makeMove(1,0);
i.makeMove(0,1);
i.makeMove(2,0);
i.makeMove(0,2);
console.log('Winner is '+i.getPlayer(i.getWinner()));
