const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const icon=document.querySelector(".dropdown i");

for(let select of dropdowns){ 
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;    
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";  
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

icon.addEventListener("click",()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
})

const updateExchangeRate=async ()=>{
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amt.value="";
    }

    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    
    let data= await response.json();

    let obj= data[fromCurr.value.toLowerCase()];
    // console.log(obj.gtq);
    let lCase=toCurr.value.toLowerCase();
    let rate=obj[lCase];
    // console.log(rate);
    let finalAmt=amtVal*rate;
    msg.innerText=`${amt.value} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateFlag=(element)=>{
    let currCode=element.value;
    // console.log(currCode);
    let countryCode=countryList[currCode];
    // console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})