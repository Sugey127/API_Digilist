const inputs = document.querySelectorAll('.form-control');
const [nombreProveedor] = inputs;
console.log(nombreProveedor);
const boton = document.querySelector('.btn'); //boton formulario

const post = "https://apidigilist-production.up.railway.app/proveedores/registro";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOiI5NTRhZTdjZi1kOGFjLTRiOWQtODcyYy0yZmE2MTA2MjY3NzEiLCJmZWNoYVJlZ2lzdHJvVXN1YXJpbyI6IjIwMjMtMDMtMDUiLCJ1c2VyTm9tYnJlIjoiTWFyaWFuYSIsInVzdWFyaW9BcGVsbGlkbyI6IlRydWppbGxvIiwidGVsZWZvbm8iOiI5MDYtNDQ2LTkxODAiLCJlbWFpbCI6Im1hcmlhbmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJOb2xvc2UkMTIiLCJyb2xlIjoiYWRtaW5pc3RyYWRvciIsIlN0YXR1c0lkIjoxLCJJbWFnZW5JZCI6IjY1YWJiYzNmLWY3ZTMtNDY2Mi05ZDAzLTg3NmM3Mzk4ZTc5MiIsImlhdCI6MTY3ODAzODAwMX0.3uZXBC9vs7hv81tLI8F7p5UqD5T07Kl7p2xG5_txQiQ";

const table = document.getElementById('tr');

boton.addEventListener('click', () => {
    fetch(post, {
        method: 'post',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombreProveedor: nombreProveedor.value
        })
    }).then(res => res.json()).then(data => console.log(data));

    location.reload();
})

const tbody = document.getElementById('tbody');

const get = "https://apidigilist-production.up.railway.app/proveedores/buscarTodos"

fetch(get, {
    method: 'get',
    headers: {
        'authorization': `Bearer ${token}`,
    },
}).then(res => res.json()).then(data => data.forEach(x => {

    console.log(data)

    tbody.innerHTML += `
    <th scope="col"><input type"text" value="${x.idTipoProveedor}"></th>
    <th scope="col"><input type"text" value="${x.nombreProveedor}"></th>
    <th scope="col"><input type"text" value="${x.fechaRegistroProveedor}"></th>
    <th><button type="button" class="${x.idTipoProveedor} update">update</button></th>
    <th><button type="button" class="${x.idTipoProveedor} delete">delete</button></th>
    `
}))

const put = "https://apidigilist-production.up.railway.app/proveedores/actualizar";

const deleteUrl = "https://apidigilist-production.up.railway.app/proveedores/eliminar";


tbody.addEventListener('click', e => {

    console.log(e.target.className.split(' ')[1] == 'update')


    if (e.target.className.split(' ')[1] == 'update' || e.target.className.split(' ')[1] == 'delete') {

        if (e.target.className.split(' ')[1] === 'update') {

            if (confirm('desea guardar los cambios')) {
                const papaBotones = e.target.parentElement;

                const fechaRegistroProveedor = papaBotones.previousElementSibling;
               
                const nombreProveedor = fechaRegistroProveedor.previousElementSibling;
                const id = nombreProveedor.previousElementSibling;

                console.log(fechaRegistroProveedor, id, nombreProveedor);

                fetch(put, {
                    method: 'put',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idTipoProveedor: id.children[0].value,
                        nombreProveedor: nombreProveedor.children[0].value,
                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload();
            }

        }

        if (e.target.className.split(' ')[1] === 'delete') {

            if (confirm('desea guardar los cambios')) {
                const prueba = e.target.parentElement.previousElementSibling;

                const fechaRegistroProveedor = prueba.previousElementSibling;
                const nombreProveedor = fechaRegistroProveedor.previousElementSibling;
                const id = nombreProveedor.previousElementSibling;

                console.log(fechaRegistroProveedor, id, nombreProveedor);

                fetch(deleteUrl, {
                    method: 'delete',
                    headers: {
                        'authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idTipoProveedor: id.children[0].value,
                    })
                }).then(res => res.json()).then(data => console.log(data))
                location.reload()
            }
        }
    }
})

