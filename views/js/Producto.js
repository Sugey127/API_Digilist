//ajustalo para productos


const inputs = document.querySelectorAll('.form-control');
const [descripcion, stock, precio] = inputs;
console.log(stock, descripcion, precio);
const boton = document.querySelector('.btn');

const post = "http://localhost:4000/autopartes/registro";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiIwNDIyZDFkZi1hZDU1LTRkNGItODhmMC1lZGM3YzVlZWRjMjEiLCJmZWNoYVJlZ2lzdHJvVXN1YXJpbyI6IjIwMjMtMDItMDkiLCJ1c2VyTm9tYnJlIjoicm9vdCIsInVzdWFyaW9BcGVsbGlkbyI6InJvb3QiLCJ0ZWxlZm9ubyI6Ijk5OS05MjQtNjI1MyIsImVtYWlsIjoicm9vdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6Ik5vbG9zZSQxMiIsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjc1OTcyNDkwfQ.l5M8s3_N5k0c02v1DfJrvPSoKfuEdvP4KhzSa8jCvlI";

const table = document.getElementById('tr');

boton.addEventListener('click', () => {
    fetch(post, {
        method: 'post',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description: descripcion.value,
            stock: stock.value,
            precio: precio.value,
            Imagen: "soy una imagen",
            EntradaIdEntradas: '964db4b0-a784-11ed-a8c7-b7abec46328d'
        })
    }).then(res => res.json()).then(data => console.log(data));

    location.reload();
})

const tbody = document.getElementById('tbody');

const get = "http://localhost:4000/autopartes/buscarTodos"

fetch(get, {
    method: 'get',
    headers: {
        'authorization': `Bearer ${token}`,
    },
}).then(res => res.json()).then(data => data.forEach(x => {

    console.log(data)

    tbody.innerHTML += `
    <th scope="col"><input type"text" value="${x.idAutopartes}"></th>
    <th scope="col"><input type"text" value="${x.description}"></th>
    <th scope="col"><input type"text" value="${x.stock}"></th>
    <th scope="col"><input type"text" value="${x.precio}"></th>
    <th scope="col"><input type"text" value="${x.fechaRegistroAutoparte}"></th>
    <th><button type="button" class="${x.idAutopartes} update">update</button></th>
    <th><button type="button" class="${x.idAutopartes} delete">delete</button></th>
    `
}))

const put = "http://localhost:4000/autopartes/actualizar";

const deleteUrl = "http://localhost:4000/autopartes/eliminar";


tbody.addEventListener('click', e => {

    console.log(e.target.className.split(' ')[1] == 'update')


    if (e.target.className.split(' ')[1] == 'update' || e.target.className.split(' ')[1] == 'delete') {

        if (e.target.className.split(' ')[1] === 'update') {

            if (confirm('desea guardar los cambios')) {
                const prueba = e.target.parentElement;

                const fechaRegistroAutoparte = prueba.previousElementSibling;
                const precio = fechaRegistroAutoparte.previousElementSibling;
                const stock = precio.previousElementSibling;
                const description = stock.previousElementSibling;
                const id = description.previousElementSibling;

                console.log(fechaRegistroAutoparte, id, description, stock);

                fetch(put, {
                    method: 'put',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idAutopartes: id.children[0].value,
                        precio: precio.children[0].value,
                        Imagen: "soy una imagen",
                        EntradaIdEntradas: '964db4b0-a784-11ed-a8c7-b7abec46328d',
                        description: description.children[0].value,
                        stock: stock.children[0].value,

                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload();
            }

        }

        if (e.target.className.split(' ')[1] === 'delete') {

            if (confirm('desea guardar los cambios')) {
                const prueba = e.target.parentElement.previousElementSibling;

                const fechaRegistroAutoparte = prueba.previousElementSibling;
                const precio = fechaRegistroAutoparte.previousElementSibling;
                const stock = precio.previousElementSibling;
                const description = stock.previousElementSibling;
                const id = description.previousElementSibling;

                console.log(fechaRegistroAutoparte, id, description, stock);

                fetch(deleteUrl, {
                    method: 'delete',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idAutopartes: id.children[0].value,
                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload()
            }
        }
    }
})



