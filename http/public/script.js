const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load(){
    const res = await fetch("http://localhost:3000").then((data)=>data.json());
    res.urls.map(url => addElement(url))
}

async function create(name, url){
    await fetch(`http://localhost:3000?name=${name}&url=${url}`).then((data)=>data.json());
    return alert('Save success')
}

async function remove(name, url){
    await fetch(`http://localhost:3000?name=${name}&url=${url}&del=delete`).then((data)=>data.json());
    return alert('Delete success')
}

load()

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash,url,name)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el,url,name) {
    if (confirm('Are you sure you want to delete?'))
        remove(name, url)
        el.parentNode.remove()
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('fill in the field')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('format the text correctly')

    if (!/^http/.test(url)) 
        return alert("Enter the url correctly")
    create(name,url)
    addElement({ name, url })

    input.value = ""
})