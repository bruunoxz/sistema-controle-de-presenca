  let res = document.querySelector("div#res");  
  let Data = new Date().toLocaleDateString()
  
  function enviarValor() {
    let valor = document.getElementById('txtrm').value;
    let res = document.querySelector("div#res");
    let RmInseridosDia = JSON.parse(localStorage.getItem(Data)) || []          

    fetch('/verificar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txtrm: valor })
    })
    .then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error('Erro na requisição');
      }
    })
    .then(data => {
        if (data.message == 'Aluno não identificado') {
            res.innerHTML = 'Aluno não identificado';
          } else if (data.message == 'Aluno já registrado' || RmInseridosDia.includes(valor)) {
            res.innerHTML = `Aluno do RM ${valor} já registrado`;
            document.getElementById('txtrm').value = '';
          } else if (data.message == 'Aluno liberado') {
            const Nome = data.Nome
            const Serie = data.Serie
            res.innerHTML = `Aluno: ${Nome}`;
            res.innerHTML += `<br> Série: ${Serie}`;
            res.innerHTML += `<br> RM: ${valor}`
            res.innerHTML += '<br> Liberado!'
            RmInseridosDia.push(valor);
            localStorage.setItem(Data, JSON.stringify(RmInseridosDia));
            localStorage.setItem("presentes", RmInseridosDia.length)
            document.getElementById('txtrm').value = '';
          }else {
            throw new Error('Resposta inválida do servidor');
          }
        })
          .catch(error => {
           console.log(error)
          res.innerHTML = `Erro de conexão`;
    });
  }
  
  document.getElementById('txtrm').addEventListener("input", enviarValor);


  let dataAtual = new Date().toDateString() //Captura a data atual escrita
  let dataArmazenada = localStorage.getItem("data") //Guarda na variável a data anterior para comparação com a atual

  if(dataAtual !== dataArmazenada){ //Verifica se não é identica a data anterior
    resetarContagem()
    localStorage.setItem("data", dataAtual) //Armazena a data para verificar a cada vez que a aplicação for aberta se é igual ou diferente
  }

  setInterval(function() {
    let horaAtual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (horaAtual === '12:20') {
      resetarContagem();
      //localStorage.setItem("hora", horaAtual)
    }else if(horaAtual === '18:50'){
      resetarContagem();
    }
  }, 60000);


  function resetarContagem(){
    localStorage.setItem("presentes", 0)
    localStorage.setItem(dataAtual, JSON.stringify([]));
    res.innerHTML = ""
}

function resumir(){
  res.innerHTML = ""
  let totalPresentes = localStorage.getItem("presentes") || 0 
  let ausentes = 364
  let aus = ''
  aus = ausentes - totalPresentes
  res.innerHTML += `<br>${totalPresentes} alunos presentes <br>${aus} alunos ausentes`
}