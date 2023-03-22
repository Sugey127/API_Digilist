const inputs = document.querySelectorAll('.form-control');
const [modelo, año, marca] = inputs;
console.log(año, modelo, marca);
const boton = document.querySelector('.btn'); //boton formulario

const post = "http://localhost:4000/automoviles/registro";
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
            modelo: modelo.value,
            año: año.value,
            marca: marca.value,
        })
    }).then(res => res.json()).then(data => console.log(data));

    location.reload();
})

const tbody = document.getElementById('tbody');

const get = "http://localhost:4000/automoviles/buscarTodos"

fetch(get, {
    method: 'get',
    headers: {
        'authorization': `Bearer ${token}`,
    },
}).then(res => res.json()).then(data => data.forEach(x => {

    console.log(data)

    tbody.innerHTML += `
    <th scope="col"><input type"text" value="${x.idAutomovil}"></th>
    <th scope="col"><input type"text" value="${x.modelo}"></th>
    <th scope="col"><input type"text" value="${x.año}"></th>
    <th scope="col"><input type"text" value="${x.marca}"></th>
    <th scope="col"><input type"text" value="${x.fechaRegistroAuto}"></th>
    <th><button type="button" class="${x.idAutomovil} update">update</button></th>
    <th><button type="button" class="${x.idAutomovil} delete">delete</button></th>
    `
}))

const put = "http://localhost:4000/automoviles/actualizar";

const deleteUrl = "http://localhost:4000/automoviles/eliminar";


tbody.addEventListener('click', e => {

    console.log(e.target.className.split(' ')[1] == 'update')


    if (e.target.className.split(' ')[1] == 'update' || e.target.className.split(' ')[1] == 'delete') {

        if (e.target.className.split(' ')[1] === 'update') {

            if (confirm('desea guardar los cambios')) {
                const papaBotones = e.target.parentElement;

                const fechaRegistroAuto = papaBotones.previousElementSibling;
                const marca = fechaRegistroAuto.previousElementSibling;
                const año = marca.previousElementSibling;
                const modelo = año.previousElementSibling;
                const id = modelo.previousElementSibling;

                console.log(fechaRegistroAuto, id, modelo, año);

                fetch(put, {
                    method: 'put',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idAutomovil: id.children[0].value,
                        marca: marca.children[0].value,
                        modelo: modelo.children[0].value,
                        año: año.children[0].value,
                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload();
            }

        }

        if (e.target.className.split(' ')[1] === 'delete') {

            if (confirm('desea guardar los cambios')) {
                const prueba = e.target.parentElement.previousElementSibling;

                const fechaRegistroAuto = prueba.previousElementSibling;
                const marca = fechaRegistroAuto.previousElementSibling;
                const año = marca.previousElementSibling;
                const modelo = año.previousElementSibling;
                const id = modelo.previousElementSibling;

                console.log(fechaRegistroAuto, id, modelo, año);

                fetch(deleteUrl, {
                    method: 'delete',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idAutomovil: id.children[0].value,
                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload()
            }
        }
    }
})



