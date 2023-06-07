  //----------------------------------------------Redirecionamento de Página-----------------------------------------------------

  const abreV = () => {window.location.href = '/verificar'}

  const abreCad = () => {window.location.href = "/cadastro"}
  
  const abreAluno = () => {window.location.href = "/cadaluno"}
  
  const vtCad = () => {window.location.href = "/cadastro"}
  
  const vtMenu = () => {window.location.href = "/menu"}

  const abreUser = () => {window.location.href = "/caduser"}

//---------------------------------------------Cadastro---------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const cadUser = document.getElementById("caduser");
    const cadAluno = document.getElementById("cadaluno");
    const Login = document.getElementById('login');
    Login.addEventListener("click", logar);
    cadUser.addEventListener("click", cadastrarUser);
    cadAluno.addEventListener("click", cadastrarAluno);
});

function logar(){
  const userL = document.getElementById('usuarioL').value
  const senhaL = document.getElementById('senhaL').value

  if(userL === '' || senhaL === ''){
    exibirAlerta('Não foi possível logar, insira valores em todos os campos')
  }else {
    const data = {
      userName: userL,
      senha: senhaL
    };

    // Enviar solicitação POST para o servidor
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          // Aguardar 1 segundo antes de redirecionar para a página do menu
          exibirAlerta('Usuário logado com sucesso');
          setTimeout(() => {
            window.location.href = response.url;
          }, 1000);
        }else {
          // Exibir alerta de login inválido
          exibirAlerta('Usuário ou senha inválidos');
        }
      })
      .catch((error) => {
        console.error('Ocorreu um erro:', error);
      });
  }
}

function exibirAlerta(mensagem) {
  const alerta = document.createElement('p');
  alerta.classList.add('alerta');
  alerta.textContent = mensagem;
  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 5000);

}

function cadastrarUser(){
    const usuario =  document.getElementById('user').value
    const senha = document.getElementById('senhaa').value
    const confirmsenha = document.getElementById('cfsenhaa').value
    if( usuario === '' || senha === '' || confirmsenha === ''){
        exibirAlerta('Não foi possível cadastrar o usuário, insira valores em todos os campos.')
     }else if(senha !== confirmsenha){
        exibirAlerta('Digite a mesma senha nos dois campos!')
     }else{
        exibirAlerta('Usuário cadastrado com sucesso.')
     }
}

function cadastrarAluno() {
  const nome = document.getElementById('nm').value;
  const rm = document.getElementById('rm').value;
  const dataNascimento = document.getElementById('dt').value;
  
  if (nome === '' || dataNascimento === '' || rm === '') {
    exibirAlerta('Não foi possível cadastrar o aluno. Preencha todos os campos!');
  } else {
    exibirAlerta('Aluno cadastrado com sucesso!');
  }
}


  function logout() {
    fetch('/logout', {
      method: 'POST'
    }).then(function(response) {
      if (response.ok) {
        window.location.href = '/';
      } else {
        alert('Ocorreu um erro ao fazer logout. Por favor, tente novamente.');
      }
    }).catch(function(error) {
      alert('Ocorreu um erro ao fazer logout. Por favor, tente novamente.');
      console.log(error)
    });
  }

