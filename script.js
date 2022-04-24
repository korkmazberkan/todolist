const form = document.querySelector(".todo_form")
const input = document.querySelector(".todo_input")
const todo_container = document.querySelector(".todo_container")
let deleteBtns; //bu satırda tanımlanırsa delete buttonlara işlevini veren kodlar aşağıda olduğu için bulamaz.
let checkBoxes;
let editButtons;

const addHTML = (todo) => { //yazılan özelliklerin eklenen her todo için geçerli olmasını sağlayan fonksiyon.
    //***eklenen todo'ların html de gözükmesi***

    //container'i oluşturma
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //todo_left
    const todoLeft = document.createElement("div")
    todoLeft.classList.add("todo_left")

    //tik kutucuğu
    const todoCheckBox = document.createElement("input")
    todoCheckBox.type = "checkbox"
    todoCheckBox.checked = todo.isCompleted //check olup olmamasını isCompleted'tan alma (eğer tamamlanmışsa tikli gelsin)
    todoCheckBox.classList.add("todo_cb")

    // text
    const tdText = document.createElement("span")
    tdText.classList.add("todo_text")
    tdText.textContent = todo.text //text'in içeriği yukarıda hazırlanan todo.text içeriği olacak.

    // text ve checkbox'u todo_left'e ekleme
    todoLeft.appendChild(todoCheckBox)
    todoLeft.appendChild(tdText)

    // todo_Right
    const todoRight = document.createElement("div")
    todoRight.classList.add("todo_right")

    // delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("todo_delete")
    deleteBtn.textContent = "Delete"

    // edit button
    const editBtn = document.createElement("button")
    editBtn.classList.add("todo_edit")
    editBtn.textContent = "Edit"

    //edit ve delete'i todo right'a ekleme
    todoRight.appendChild(deleteBtn)
    todoRight.appendChild(editBtn)

    // todo-left ve right'ı genel container'a ekleme
    todoDiv.appendChild(todoLeft)
    todoDiv.appendChild(todoRight)

    todo_container.appendChild(todoDiv)

}

//sayfa açıldığı zaman localstorage'dan item çağırma ve ekrana yansıtma fonksiyonu
const startConf = () => {
    //başlangıç ayarları
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) { //eğer başlangıçta todo yoksa boş bir tane oluştur
        localStorage.setItem("todos", JSON.stringify([])) //string hale çevrilmiş boş listeyi localstorage'a kaydetmek
    } else { //önceden kaydedilmiş todo varsa direkt ekrana yazdırma
        todos.forEach(todo => {
            addHTML(todo)
        })
        deleteBtns = document.querySelectorAll(".todo_delete")
        checkBoxes = document.querySelectorAll(".todo_cb") //işaretlenen maddelerin kalıcı olması için önce bütün checkboxları seç
        editButtons = document.querySelectorAll(".todo_edit")
    }
}

startConf()

//todo ekleme

const addTodo = (e) => {
    e.preventDefault();

    const todoText = input.value;

    // text'in tamamlanıp tamamlanmadığını belirten object
    const todo = {
        text: todoText,
        isCompleted: false,
    };
    //localStorage'a önceden eklenen todo'ları(veya stringe çevrilmiş boş array'i) array'e döndürerek çekip array'in içerisine yeni todo'yu ekleyip tekrar localStorage'a kaydetmek
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

    addHTML(todo)
    form.reset()
}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement //delete'in 2 üzerindeki etikete çıkabilsin ki oraya ait texti silsin.
    const text = todo.firstChild.children[1].textContent //todo'nun first child'ının children'ları arasında 2. elemanı seçme

    //todoları localstorage'dan da silme
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text) //text'e eşit olmayanları seç olanları ele
    localStorage.setItem("todos", JSON.stringify(todos))
    todo.remove()
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement 
    const text = todo.firstChild.children[1].textContent 

   
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(td => {
        if( td.text === text) td.isCompleted = !td.isCompleted //değeri tersine çevirme (false - true veya true - false)

    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement 
    const text = todo.firstChild.children[1].textContent 
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text) 
    localStorage.setItem("todos", JSON.stringify(todos))
    todo.remove()

    input.value=text
}

form.addEventListener("submit", addTodo)
deleteBtns.forEach(btn => btn.addEventListener("click", deleteTodo))
checkBoxes.forEach(btn => btn.addEventListener("click", completeTodo))
editButtons.forEach(btn => btn.addEventListener("click", editTodo))