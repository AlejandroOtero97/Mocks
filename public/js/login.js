const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {
    const name = document.getElementById('nombre').value;
    if (name === '') {
        alert('Ingresa un nombre valido');
    } else {
        const options = {
            method: 'POST',
        };
        fetch(`/api/login/${name}`, options)
        .then(response => response.json())
        .then(data => {
            if (data.logged) {
                window.location.href = '/';
            } else {
                alert('Usuario no encontrado');
            }
        })
        .catch(error => console.log(error));
    }
});