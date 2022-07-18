const text = document.getElementById('logout');

const options = {
    method: 'GET',
};

fetch('/api/login')
 .then(response => response.json())
 .then(data => {
    if(data.name)
    text.innerHTML = `Hasta Luego ${data.name}`;
    else
    window.location.href = '/login';
})
.catch(error => console.log(error));

setTimeout(function(){
    fetch('/api/logout', options)
    .then(res => res.json())
    .then(data => {
        if(!data.logged){
            window.location.href = '/login';
        }
    })
    .catch(err => { console.log(err); })
}, 3000);