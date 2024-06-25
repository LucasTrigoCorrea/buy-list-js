const text = document.querySelector('input');
const btnInsert = document.querySelector('.divInsert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');
const error = document.querySelector('.error');

var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = [];
  updateDB()
}

text.addEventListener('keypress', e => {
  if (e.key == 'Enter' && text.value != '') {
    setItemDB();
    text.value = '';
    error.innerHTML = '';
    error.classList.remove('error-set');
    return;

  }

})

text.addEventListener('keyup', e => {
    if(text.value) 
        error.innerHTML = '';
        error.classList.remove('error-set');
        return;
})

btnInsert.onclick = () => {

  if (text.value != '') {
    setItemDB();
    error.innerHTML = '';
    error.classList.remove('error-set');
    text.value = '';
    return;
   }

   if(!text.value){
    error.innerHTML = 'Insert an item';
    error.classList.add('error-set');
    return;
   }

}

function setItemDB() {
  if (itensDB.length >= 30) {
    alert('Limite máximo de 30 itens atingido!');
    return;
  }

  itensDB.push({ 'item': text.value, 'status': '' });
  updateDB();
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB));
  loadItens();
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? [];
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i);
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li');
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li);

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  text.value = '';
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' ;
  } else {
    itensDB[i].status = '' ;
  }

  updateDB();
}

function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}

loadItens();