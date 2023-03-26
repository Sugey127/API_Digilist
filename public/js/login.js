const inputs = document.querySelectorAll('.login');

const [v1, v2] = inputs;

document.forms[0].addEventListener('submit', e => {
    e.preventDefault();
    fetch('https://digilist.fly.dev/usuario/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: v1.value,
            password: v2.value
        })
    }).then(res => res.json()).then(data => localStorage.setItem('token', data[0]));
});

