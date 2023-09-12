//criando a variavel const produto aonde recebe as iformações do tipo number e string
const produtos = [
       {
           id: "1",
           nome: 'Informatica para internet',
           prof: 'Kelly',
           preco_de: 80,
           preco_por: 50,
           descricao: 'O melhor curso de JavaScript',
           imagem: 'assets/1.png'
       },
       {
           id: '2',
           nome: 'Gestão de conteúdo Web II',
           prof: 'Kelly',
           preco_de: 80,
           preco_por: 50,
           descricao: 'O melhor curso de JavaScript',
           imagem: 'assets/3.png'
       }
   ];
   
   
   
   function renderizarProdutos() {
       //cria uma varivel para armazenar os dados no HTML
       let html = '';
   
       //Repete as informações do produto
       for (let i = 0; i < produtos.length; i++) {
   
           //cria uma função para armazenar as informações em um unico produto
           html += criaProduto(produtos[i], i);
       }
   
       //E depois utilizasse a função return para voltar no html
       return html;
   }
   
   // cria uma função que enterage com os dados do produto
   function criaProduto(produto, index) {
    //cria um elemento que são utilizados para a interpolação dos produtos
       return `
           <div class="curso">
               <img class="inicio" src="${produto.imagem}" />
               <div class="curso-info">
                   <h4>${produto.nome}</h4>
                   <p>${produto.prof}</p>
                   <p>${produto.descricao}</p>
               </div>
               <div class="curso-preco">
                   <span class="preco-de">R$${produto.preco_de}</span>
                   <span class="preco-por">R$${produto.preco_por}</span>
                   <button class="btn-add" data-index="${index}">Adicionar ao Carrinho</button>
               </div>
           </div>
       `;
   }
   
   //chamado o CSS para o seletor que tem como nome #container
   const container = document.querySelector('#container');
   
   //e o container ira printar a função "renderizarProdutos"
   container.innerHTML = renderizarProdutos();
   
   //Criando uma variavel para armazenar valores dos produtos
   const carrinhoItens = {};
   
   //Crindo uma função aonde o ProdutoId interage com o carrinhoItens
   function renderizarCarrinho() {
       let html = '';
       for (let produtoId in carrinhoItens) {
           html += criarItemCarrinho(carrinhoItens[produtoId]);
       }
       document.querySelector('.carrinho_itens').innerHTML = html;
   }
   
   //Criando uma função "criarItemCarrinho" com parametro produto para a interação com o HTML 
   
   function criarItemCarrinho(produto) {
       return `
           <div class="carrinho_compra">
               <h4>${produto.nome}</h4>
               <p>Preço unidade: R$${produto.preco_por}</p>
               <p>Quantidade: ${produto.preco_de}</p>
               <p>Valor: R$${produto.preco_por * produto.preco_de}</p>
               <button data-produto-id="${produto.id}" class="btn-remove">Remover</button>
           </div>
       `;
   }
   
   //Cria uma função que chama a função "carrinhoItems" para multiplicar o preco_por e tambem o proco_de
   function criarCarrinhoTotal() {
       let total = 0;
       for (let produtoId in carrinhoItens) {
           total += carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].preco_de;
       }
       document.querySelector('.carrinho_total').innerHTML = `
           <h4>Total: <strong>R$${total.toFixed(2)}</strong></h4>
           <a href="#" target="_blank">
               <ion-icon name="card-outline"></ion-icon>
               <strong>Comprar agora</strong>
           </a>
       `;
   }
   
   // Criando uma função que detecta se tem algum produto no carrinho
   function adicionarNoCarrinho(produto) {
       if (!carrinhoItens[produto.id]) {
           carrinhoItens[produto.id] = { ...produto, quantidade: 0 };
       }
   
       //Aumenta a quantidade de produto no carrinho
       carrinhoItens[produto.id].quantidade++;
       renderizarCarrinho();
       criarCarrinhoTotal();
   }
   
   document.body.addEventListener('click', function (event) {
   
       //Obtendo uma informaçãoes do html para um evento
       const elemento = event.target;
   
       //Se não estiver produto no carrinho ou so um utilizara a classe btn-add para adicionar produtos 
       if (elemento.classList.contains('btn-add')) {
           const index = parseInt(elemento.getAttribute('data-index'), 10);
           const produto = produtos[index];
           adicionarNoCarrinho(produto);
       }
   
   
       //se ja estiver cheio o carrinho ira utilizar a classe btn remove para remover do carrinho
       if (elemento.classList.contains('btn-remove')) {
           const produtoId = elemento.getAttribute('data-produto-id');
           if (carrinhoItens[produtoId].quantidade <= 1) {
               //vai excluir todos os produtos do carrinho 
               delete carrinhoItens[produtoId];
           } else {
               //diminuira a quantidade de produtos do carrinho
               carrinhoItens[produtoId].quantidade--;
           }
           renderizarCarrinho();
           criarCarrinhoTotal();
       }
   });