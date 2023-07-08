//COMPUTER IS MIN

const MAX='O';  //1

function Terminal(s){
    if(s[0][0]===s[1][1] && s[0][0]===s[2][2]) return true;
    if(s[0][2]===s[1][1] && s[0][2]===s[2][0]) return true;

    let rez=[];
    for(let i=0;i<3;i++){
        if(s[i][0]===s[i][1] && s[i][0]===s[i][2]){
            return true;
        }
        if(s[0][i]===s[1][i] && s[0][i]===s[2][i]){
            return true;
        }
        rez[i]=s[i].every(el=>el!=='');
    }
    let j=rez.some(el=>el===false);
    return !j;
};
function Value(s){
    let rez;
    for(let i=0;i<3;i++)
    {
        //ROW
        rez=s[i].every(el=>el===s[i][0]);
        if(rez){
            if(s[i][0]==='X') return 1;
            if(s[i][0]==='O') return -1;
        }
        //COLUMN
        rez=s[i].every(el=>el===s[0][i]);
        if(rez){
            if(s[0][i]==='X') return 1;
            if(s[0][i]==='O') return -1;
        }
    }
    //DIAGONALS
    if(s[0][0]===s[1][1] && s[0][0]===s[2][2]){
        if(s[0][0]==='X') return 1;
        if(s[0][0]==='O') return -1;
    }
    if(s[0][2]===s[1][1] && s[0][2]===s[2][0]){
        if(s[0][2]==='X') return 1;
        if(s[0][2]==='O') return -1;
        
    }
    return 0;
};
function Player(s){
    //X ALWAYS GOES FIRST
    let count=0;
    s.forEach(arr=>{
        count+=arr.reduce((accumulator,el)=>{
            if(el!=='') return accumulator+1;
            else return accumulator;
        },0);
    });
    if(count%2===0) return 'MAX';
    return 'MIN';

}
function Actions(s){
    let options=[];
    let indexes=[];
    let count=0;
    let pom;
    for(let i=0;i<3;i++){
        count+=s[i].reduce((accumulator,el)=>{
            if(el==='')return accumulator+1;
            else return accumulator;
        },0)
        for(let j=0;j<3;j++){
            if(s[i][j]===''){
                indexes.push([i,j]);
            }
        }
    }
    for(let i=0;i<count;i++){
        pom = JSON.parse(JSON.stringify(s));
        pom[indexes[i][0]][indexes[i][1]]='O';
        options.push(pom);
    }
    return [...options];
}
function Result(s,a){
    return a;
}




