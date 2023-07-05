function gameSet(){
    let arr=[];
    for(let i=0;i<3;i++){
        arr[i]=[];  
        for(let j=0;j<3;j++) arr[i].push(field());
    }
    const setItem=(posX,posY,item)=>{(arr[posX][posY]).addToken(item)};
    const getArr=()=>arr;
    const getArrValue=(x,y)=>{
        return (arr[x][y]).getValue();
    };
    return {getArr,setItem,getArrValue};
}
function field(){
    let value = '';

    const addToken = (playersItem) => {
        value = playersItem;
    };

    const getValue = () => value;

    return{addToken,getValue};
}
let board=gameSet();
board.setItem(0,0,'X');
console.table(board.getArr());
console.log(board.getArrValue(0,0));
