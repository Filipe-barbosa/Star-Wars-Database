# Desafio Start Wars PLanets

Ola seja bem vindo ao desafio Star Wars Planets!!

Este é um projeto desenvolvido como parte para a aprovação no processo seletivo da empresa Trybe.

![Ilustração do app](./public/designApp.jpeg?raw=true=10x20 "Tela do app")

## O Que é o Star Wars Planets

Uma tabela que faz requisições em um Api e retorna os todos os planetas e seus devidos atributos. Esses resultados podem ser filtrados pelo nome do planeta e tambem por uma combinação de filtros que selecionam algumas colunas e valores .

## Rodando o projeto

Para rodar o projeto   instala-se as dependências com yarn ou npm install, para rodar apenas com o comando `yarn run` ou `npm start`.
Para o desenvolvimento foi usada a biblioteca yarn.

## Estruturação do projeto

O projeto segue estruturado em pastas onde temos a pasta components que contém todos os componentes, e a context onde estão alocados os contextos usados.

#### Ferramentas.

O projeto foi desenvolvido com a linguagem `JavaScript` e a biblioteca react. Como pre processador de css foi utilizado o chakra ui, dada a sua compatibilidade e facilidade de manuseio.

## Estratégia de desenvolvimento.

Dado que para se ter um código legível e menos verboso o projeto está dividido em componentes de estilos e componentes de lógica. O context `ApiContext` é onde está contido todo o context utilizado no projeto. Esta estratégia foi adotada para se evitar cair em uma dependência cíclica ao separar um context para o comportamento da API e outro para filtros.

### ApiContext

Este é o provedor de estados da aplicação, e foi dividido em 2 grandes tarefas que provém todos os comportamentos. A primeira lida com os comportamentos da api, fazendo as requisições dinâmicas que são alteradas sempre que o filtro nome sobre um alteração. Dada a documentação da api, foi concluído que a mesma so daria suporte para chamadas com filtro apenas de nome.

A segunda problemática que o ApiContext procurar resolver é provê o resultados dos filtros, ele executa esta tarefa processando em algumas funções que limitam-se a pequenas tarefas e provendo os resultados a um objeto complexo e prover os estados dos filtros que foram dividos da seguinte maneira. Separados em um objeto de 3 grandes classes sendo `FiltroByName`, que faz uma nova requisição sempre que o filtro é alterado. O `FilterByNumericValues` que é o objeto responsável por gerenciar o segundo filtro que é a combinação de seleção de coluna, condição e valor  `filteredResulted` que provê para a tabela.

Todos os dados os comportamentos são providos pelo ApiContext.

### Filters

Todos os filtros são gerenciados por um estado `filtersState`, que por sua vez é um objeto complexo, tal implementação tem como beneficio a centralização de toda a logica do filtro, o que nos da com a verificação de apenas um objeto a situação dos diversos filtros, o que deixa o código mais desacoplado e legível.

Os comportamentos dos filtros foram dividos algumas funções que serão explanandas no decorrer deste tópico.

#### Filtrar por nome.

`filterbyName`, O campo de input grava a alteração no objeto que por sua vez chama a api passando os parâmetros, os dados recebidos da chamada são gravados no objeto `filterResult`, que é provido para o componente table e é renderizado na tela.

#### Combinação de filtros de valores

Na aplicação denominado de `filterByNumericValue` que por sua vez é uma lista de objetos. Diferente do `filterByName` ele não altera a requisição, apenas itera no `filterResults` gerando um novo que satisfaça as condições dos filtros passados e passa a nova lista para o componente `Table`.
Para gerar cada filtro foi criada uma função que chama outras funções onde cada uma e responsável por gravar uma coluna do objeto.

#### Exclusão dos filtros

Quando algum desses filtros é excluído, é gerado um novo objeto sem o filtro excluído, que faz a comparação através do id e a exibição dos dados na tabela volta a ser como eram antes da aplicação do filtro.

#### Gerando vários filtros sem repetição.

Para gerar vários filtros e garantir que eles não estejam repetidos, foi criada uma função que verifica quais as colunas ainda não foram selecionadas e quais ja estão selecionados, esse dado e provido para o Html que por sua vez desabilita todos os filtros que estão selecionados evitando assim a redundância de filtros.
A quantidade de filtros e limitada ao número de colunas disponíveis.

### Componentes de exibição.

Para agilizar o desenvolvimento foi aplicado o uso pro processador de Css Chakra Ui. Sua escolha foi dada pela a experiência da pessoa desenvolvedora com a ferramenta e suas dependências serem baseadas todas em `js`.

A renderização esté condicionada a 3 condições principais, que é o estado de loading, a tabela sendo renderizada, e quando o filtro aplicado não motra nenhum resultado. A prática de renderização condicional foi aplicada para que nenhum componente estaja ocupando o Dom virtual sem estar presente na tela, o que evita vários comportamentos adversos na aplicação.

Para gerar as colunas da tabela que por sua vez é constituída das chaves do objeto resultante da chamada, uma variável mapeia todas as chaves e gera o cabeçalho da tabela.Um filtro é aplicado no objeto assim que ele é resultante da função para renderizar apenas as colunas desejadas. As linhas seguem o mesmo parâmetro, mas são alteradas sempre que o objeto `filter.filtersResults` sofre alteração.

O componente table na sua composição chama componente `desingedFilters` e é o componente responsável pela estilização de todos os filtros.

Para um bom dimencionamento da tabela ela possui um scrol lateral.

### Formatação de código

Durante o desenvolvimento foi usado o es-Lint mas não instalado como dependência do projeto, configurado do editor de texto.

## Melhorias.

Dada a condição de tempo o produto até então desenvolvido trata-se da versão 0. Como versão 1 foram pensadas algumas melhorias tais como:

<ul>

#### Em Aplicação de Debounce

 <ul>
Aplicar um debounce na hora da chamada, porém para adotar tal estratégia é necessário um tempo hábil maior devido às suas complexidades inerentes a seu uso atrelado ao useContext. Outros interessantes de serem explorados seriam useMemo e useCalback, porém seus usos também implicariam em maior tempo de execução desta tarefa.

#### Paginação ou Scroll Infinito.

<ul>
Adotar uma estratégia de paginar as chamadas ou ate mesmo a implementação de um scroll infinito.
</ul>

#### Uso de linguagem fortemente Tipada.

<ul>
O uso de uma linguagem fortemente tipada, o que traria mais segurança na inferência dos tipos, e uma maior agilidade no desenvolvimento, pois com os objetos devidamente tipados o código te conta mais sobre cada objeto, evitando várias consultas em outros arquivos para verificar tipos. Apesar das vantagens apresentadas por linguagens tipadas, a sua utilização apresenta uma complexidade maior, e por isso o uso desta é sugerido como uma melhoria deste projeto caso o mesmo fosse desenvolvido em um tempo maior.
</ul>

#### Teste unitário.

<ul>
Estratégia que faz muito sentido para a evolução do produto, o que seria de muito valor para uma versão um com o aumento de elementos e equipe, o teste embora custoso se faz indispensável.

</ul>

#### Tratamento de resultados

<ul>
Tratar os resultados  retornados pela api como  unknown e formatação dos valores na tabela, como data links etc.
<ul>
</ul>

## Considerações finais

As práticas desenvolvidas levaram em consideração uma boa qualidade de código mas tambem visando entregar em tempo hábil.
