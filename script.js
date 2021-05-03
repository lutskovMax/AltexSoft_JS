const select = document.querySelector('select'),
      ul = document.querySelector('ul');

function foundElement(element, array) {
    while (!array.push(element)){
        element = Math.random().toString(36).replace(/[^a-z]+/g,'').substr(0,1);
        array.push(element);
    } 
}


let arr = [];

for (let i =0;i<5;i++) {
    let el = Math.random().toString(36).replace(/[^a-z]+/g,'').substr(0,1);
    if (arr.includes(el)) {
        i--;
    } else {
        arr.push(el);
    }
}





console.log(arr);

arr.forEach((item) => {
    let selectName = document.createElement('option');
    select.append(selectName);
   selectName.innerHTML = `${item}`;
})

function createUl() {
    ul.innerHTML = '';
    let l = select.value;
    getUl(l);
}

async function getUl(l) {
    await fetch('list.json')
    .then(response => response.json())
    .then(data => {
        let array = [];
        data.forEach((item) => {
            if (item.name[0] === l.toUpperCase()) {
                array.push(item.name)
            }
        })
        return array;
    })
    .then(data => {
        if (data.length==0) {
            const div = document.createElement('div');
            ul.append(div);
            div.innerHTML = `Not Found`;
        } else {
            data.forEach(item => {
                const li = document.createElement('li');
                ul.append(li);
                li.innerHTML = `${item}`
            })
        }
       
    })
}
createUl();
    
select.addEventListener('change', () => {
    createUl();
})

