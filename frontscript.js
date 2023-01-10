//console.log('Hello, frontscript.js')
let data = localStorage.getItem('data');
let counter = localStorage.getItem('taskId');
if(counter === null){
    //console.log('first iteration');
    counter = 0;
}

const removeScript = (node) =>{
    console.log('Function running');
    Object.keys(data).forEach(key =>{
        //console.log(node);
        if(data[key] == node.path[0].innerText){
            console.log(key);
            console.log('Do skasowania jest'+ node.path[0].innerText);
            console.log(data);
            delete data[key];
            console.log(data);
            localStorage.setItem('data', JSON.stringify(data));
            showTask();
        }
    })
}
const showTask = () =>{
    if(data === null){
        data = {};
    }else{
        data = localStorage.getItem('data');
        data = JSON.parse(data);
        //console.log(data);
        const toDoPanel = document.querySelector('.todo');
        toDoPanel.innerHTML = '';
        Object.keys(data).forEach(key =>{
            const para = document.createElement("p");
            const node = document.createTextNode(data[key]);
            para.appendChild(node);
            para.classList.add('task');
            toDoPanel.appendChild(para);
            const taskArr = document.querySelectorAll('.task');
            taskArr.forEach(task =>{
                task.addEventListener('click', removeScript)
            })
        })
    }
    const taskArr = document.querySelectorAll('.task');
    taskArr.forEach(task =>{
        task.addEventListener('click', removeScript)
    })
}
showTask();
const createTask = () =>{
    //console.log(data);
    let innerCounter = 0;
    const src = document.querySelector('.task-input').value;
    Object.keys(data).forEach(key => {
        if(data[key] === src){
            console.log('odjebale lipe')
            return;
        }else{
            innerCounter++;
        }
    })
    console.log(innerCounter);
    console.log(Object.keys(data).length)
    if(innerCounter == Object.keys(data).length){
        console.log('this might be it!');
        counter++;
        data[`${counter}`] = src;
        //console.log(data);
        localStorage.setItem('taskId', `${counter}`);
        localStorage.setItem('data', JSON.stringify(data));
        //console.log('Working')
        //console.log(data);
        showTask();
    }

}

const addButton = document.querySelector('.add');

//console.log(addButton);
addButton.addEventListener('click', createTask);

//Powinniśmy odczytywać taska po prostu z JSONA, ale! to wymaga require a to gowno działa nie na nodzie tylko w przeglądarce
//mam nadzieje ze nam wytłumaczą na megaK jak to sie robi xd