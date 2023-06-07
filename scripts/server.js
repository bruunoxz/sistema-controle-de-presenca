const express = require('express')
const app = express()
const path = require('path')
const {Usuario, Alunos} = require('./Tabelas')
const session = require('express-session');

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.use(express.urlencoded({extended:false})) // Análisa e disponibiliza os dados da requisição
app.use(express.json())

function verificarAutenticacao(req, res, next) {
    if (req.session.autenticado) { //Verifica se o usuário está autenticado
      next(); // Permite o acesso à próxima rota
    } else {
      res.redirect('/');
    }
  }

app.get('/menu',verificarAutenticacao, (req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/menu.html');
    res.sendFile(filePath)
})

app.get('/', (req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/login.html')
    res.sendFile(filePath)
})

app.post('/', (req, res)=>{
    Usuario.findOne({
        attributes: ['userName', 'senha'],
        where: 
        {
            userName: req.body.usuarioL,
            senha: req.body.senhaL
        }
    }).then((user)=>{
        if(user === null){
            res.redirect('/')
          }else{
            req.session.autenticado = true;
            res.redirect("/menu")
          }
      }).catch((erro)=>{
        res.status(500).json({ message: 'Houve um erro: ' + erro });
    });
})


app.get('/cadaluno',verificarAutenticacao, (req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/CadAluno.html')
    res.sendFile(filePath)
})

app.post('/cadaluno', (req, res) =>{
    if(req.body.nome === '' || req.body.dt === '' || req.body.RM === ''){
        res.redirect('/cadaluno')
    }else{
        Alunos.create({
            Nome: req.body.nome,
            dtNascimento: req.body.dt,
            serie: req.body.Série,
            sexo: req.body.sexo,
            rm: req.body.RM
        }).then(()=>{
            res.redirect('/menu')
        }).catch((erro)=>{
            res.status(500).json({ message: 'Houve um erro: ' + erro });
        })
    }
})

app.get('/caduser', verificarAutenticacao,(req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/CadUser.html')
    res.sendFile(filePath)
})

app.post('/caduser', (req, res)=>{
    if(req.body.usuario === '' || req.body.senha === '' || req.body.confirmsenha === ''){
        res.redirect('/caduser')
     }else if (req.body.senha != req.body.confirmsenha){
        res.redirect('/caduser')
     }else{
            Usuario.create({
            userName: req.body.usuario,
            senha: req.body.senha
        }).then(()=>{
            res.redirect('/menu')
        }).catch((erro)=>{
            res.status(500).json({ message: 'Houve um erro: ' + erro });
        })
     }
})

app.get('/cadastro',verificarAutenticacao, (req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/Cadastro.html')
    res.sendFile(filePath)
})

app.get('/verificar',verificarAutenticacao, (req, res) =>{
    const filePath = path.resolve(__dirname, '../paginas/verific.html')
    res.sendFile(filePath)
})

app.post('/verificar', (req, res)=>{
    valor = req.body.txtrm
    if (!req.session.rmInserido) {
        req.session.rmInserido = [];
      }
    Alunos.findOne({
        attributes: ['rm', 'Nome', 'serie'],
        where: 
        {
            rm: valor
        }
    }).then((aluno)=>{
        if (aluno === null) {
            res.send({message: 'Aluno não identificado'});
          } else if (req.session.rmInserido.includes(valor)) {
            res.send({message: 'Aluno já registrado'});
          }
         else{
            const nome = aluno.Nome
            const serie = aluno.serie
            req.session.rmInserido.push(valor);
            res.send({ message: 'Aluno liberado', Nome: nome, Serie: serie });
         }
        }).catch((erro) => {
            if (erro.name === 'SequelizeConnectionError') {
                res.status(500).send({ message: 'Erro de conexão com o banco de dados' });
              } else {
                res.status(500).send({ message: `Erro ao buscar o aluno do RM ${valor}: ${erro.message}` });
              }
        })
})

app.get('/scripts/script.js', (req, res) => {
    const filePath = path.resolve(__dirname, '../scripts/script.js');
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(filePath);
});

app.get('/estilo/estilo.css', (req, res) => {
    const filePath = path.resolve(__dirname, '../estilo/estilo.css');
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(filePath);
  });

app.get('/estilo/sesilogo.png', (req, res) => {
    const filePath = path.resolve(__dirname, '../estilo/sesilogo.png');
    res.setHeader('Content-Type', 'png');
    res.sendFile(filePath);
  });

app.get('/scripts/cont.js', (req, res) => {
    const filePath = path.resolve(__dirname, '../scripts/cont.js');
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(filePath);
  });

  app.post('/logout', (req, res) => {
    req.session.autenticado = false;
    res.redirect('/');
  });


app.listen(8080, (req, res)=>{
    console.log('Servidor rodando!')
})