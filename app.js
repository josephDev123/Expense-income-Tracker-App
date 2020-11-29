'use strict';
//DOMS of the project
const balance = document.getElementById('total');
const income = document.getElementById('inc_price');
const expense = document.getElementById('exp_price');
const list = document.querySelector('.list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const number = document.getElementById('number');

//submitted data
// const transactions = [
//     {'id':1, 'text':'Flower', 'amount':200},
//     {'id':2, 'text':'Udemy', 'amount': -300},
//     {'id':3, 'text':'Youtube', 'amount': 400}

// ];


const localstorage = JSON.parse(localStorage.getItem('transaction'));

let newTransaction= localStorage.getItem('transaction') !==null?localstorage:[];
// let newTransaction = transactions

//Enter Text through input form to dom
function addTransactionFromInput(e){
    e.preventDefault();

   if (text.value.trim() =="" || number.value.trim() =="") {
       alert('Field(s) is(are) empty. ')
   }else{
        const inputValues = {
            'id':generateId(),
            'text':text.value,
            'amount':+number.value
        }
        text.textContent ='';
        number.textContent =''; 

newTransaction.push(inputValues);

addTransactionToDom(inputValues);

updateDom()

updatelocalStorage()
text.value = '';
number.value = '';
   }
   
}


//Add to history dom
function addTransactionToDom(transaction){
    const sign = transaction.amount < 0 ?'-':'+';

    const listItem = document.createElement('li');
    listItem.classList.add(transaction.amount < 0 ? 'rightBorderExp':'rightBorderInc');

    listItem.innerHTML = `
    ${transaction.text}<span id="list_price">${sign}${Math.abs(transaction.amount)}</span><button class="delete_btn" onClick='Delete(${transaction.id});'>x</button></li> 
    `
    
    list.appendChild(listItem);
    
}

//getting to balance, income and expense
function updateDom(){
    const amount = newTransaction.map(item => item.amount);

    //balance value
    const total = amount.reduce((acc,item)=> {
        return acc+=item;
    },0).toFixed(2);
    
    //income value
    const income_value = amount.filter(item => item > 0).reduce((acc, item) =>{
       return acc+=item
    },0).toFixed(2);
    
    //expense value
     const expense_values = (amount.filter(item=> item < 0).reduce((acc, item)=>{
        return acc+=item;
    },0)*-1).toFixed(2);
    
    //adding values to DOMS
    balance.textContent = `$${total }`;
    income.textContent = `$${income_value}`;
    expense.textContent = `$${expense_values}`;

}

function Delete(id){
   newTransaction = newTransaction.filter(item =>item.id !==id);
   
   updatelocalStorage()

    init();
    
}


//local storage
function updatelocalStorage(){
    localStorage.setItem('transaction', JSON.stringify(newTransaction))

}



//generate random id
function generateId(){
    return Math.floor(Math.random()* 100000);
    updatelocalStorage()
}


//init
function init(){
    list.innerHTML ='';
    newTransaction.forEach(addTransactionToDom);
   
    updateDom()
    
}
init();

form.addEventListener('submit', addTransactionFromInput);
