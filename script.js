const change1 = document.getElementById("c-1");
const change2 = document.getElementById("c-2");
const change3 = document.getElementById("c-3");

const changeText=(text,value)=>{
    let count=0;
    if(value<50){
        let change=setInterval(() => {
            text.innerHTML=`${count}+`;
            count++;
        }, 100);
        setTimeout(() => {
            clearInterval(change)
        }, (value+1)*100);
    }else{
        let change=setInterval(() => {
            text.innerHTML=`${count}+`;
            count++;
        }, 50);
        setTimeout(() => {
            clearInterval(change)
        }, (value+1)*50);
    }
    
};

changeText(change1,15);
changeText(change2,240);
changeText(change3,2);

