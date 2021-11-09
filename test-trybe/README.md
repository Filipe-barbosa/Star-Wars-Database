# Desafio Start Wars PLanets

Ola seja bem vindo ao desafio Star Wars Planets!!

Este é um projeto desenvolvido como parte para a aprovação no processo seletivo da empresa Trybe.

![Ilustração do app](./public/designApp.jpeg?raw=true=10x20 "Tela do app")

## O que é o Star Wars Planets

Uma tabela que faz requisições em um Api e retorna os todos os planetas e seus devidos atributos. Esses resultados podem ser filtrados pelo nome do planeta e tambem por uma combinação de filtros que selecionam algumas colunas e valores .

## Rodando o projeto

Para rodar o projeto basta clonar instalar as dependencias com yarn ou npm install, para rodar apenas com o comando `yarn run` ou `npm start`.
Para o desenvolvimento foi usada a biblioteca yarn.

## Estruturação do projeto

O projeto segue estruturado em pastas onde temos a pasta components que contem todos os componentes, e a context onde estão alocados os contextos usados.

#### Ferramentas.

O projeto foi desenvolvido com a linguagem `JavaScript` e a biblioteca react. Como pre processador de css foi utilizado o chakra ui, dada a sua compatibilidade e facilidade de manuseio.

## Estratégia de desenvolvimento.

Dado que para se ter um código legivel e menos verboso o projeto está dividido em componentes de estilos e componentes de lógica. O context `ApiContext` é onde está contido todo o context utilizado no projeto. Durante o desenvolvimento foi pensada a estratégia de usar 2 contexts, um detendo o comportamento da Api e outro para os filtros, tal estratégia não seguiu a diante pois eles estavam envolvidos em uma dependência ciclica.

### ContextApi

Provedor de estados dentro da aplicação, o context api foi divido em 2 grandes tarefas que provem todos os comportamentos. A primeira lida com os comportamentos da api, fazendo as requisições dinamicas que são alteradas sempre que o filtro nome sobre um alteração. Dada a documentação da api, foi concluido que a mesma so daria suporte para chamadas com filtro apenas de nome.

A segunda e maior tarefa do context e prover os estados de filtro, que foram dividos da seguinte maneira. Separados em um objetos em 3 grandes classes sendo `FiltroByName`, que faz uma nova requisição sempre que o filtro é alterado. O `FilterByNumericValues` que é o objeto responsável por gerenciar o segundo filtro que é a combinação de seleção de coluna condição e valor.

Todos os dados os comportamentos são providos pelo contextApi.

### Filters

Todos os filtros são gerenciados por um estado `filtersState`, que por sua vez é um objeto complexo, tal implementação tem como beneficio a centralização de toda a logica do filtro, o que nos da com a verificação de apenas um objeto a situação dos diversos filtros, o que deixa o código mais desacoplado e legível.

Os comportamentos dos filtros foram dividos algumas funções que serão explanandas no decorrer deste tópico.

#### Filtrar por nome.

`filterbyName`, O campo de input grava a alteração no objeto que por sua vez chama a api passando os parametros recebidos, os dados recebidos da chamada são gravados no objeto `filterResult`, que é provido para o componente table e é renderizado na tela.

#### Combinação de filtros valores

Na aplicação denominado de `filterByNumericValue` que por sua vez é uma lista de objetos. Diferente do `filterByName` ele não altera a requisição, apenas itera no `filterResults` gerando um novo que satisfaça as condições dos filtros passados e passa a nova lista para o componente `Table`.
Para gerar cada filtro foi criada uma função que chama outras funções onde cada uma e responsãvel por gravar uma coluna do objeto.

#### Exclusão dos filtros

Quando algum desses filtros é excluido, é gerado um novo objeto sem o filtro excluido, que faz a comparação através do id e a exibição dos dados na tabela volta a ser como eram antes da aplicação do filtro.

#### Gerando vários filtros sem repetição.

Para gerar vários filtros e garantir que eles não estejam repetidos, foi criada uma função que verifica quais as colunas ainda não foram selecionadas e quais ja estão selecionados, esse dado e provido para o Html que por sua vez desabilita todos os filtros que estão selecionados evitando assim a redundancia de filtros.
A quantidade de filtros e limitada ao número de colunas disponíveis.

### Componentes de exibição.

Para agilizar o desenvolvimento foi aplicado o uso pro processador de Css Chakra Ui. Sua escolha foi dada pela a experiencia da pessoa desenvolvedora com a ferramenta e suas dependencias serem baseadas todas em `js`.

A renderização esté condicionada a 3 condiçoes principais, que é o estado de loading, a tabela sendo renderizada, e quando o filtro aplicado nao motra nenhum resultado. A prática de renderização condicional foi aplicada para que nenhum componente estaja ocupando o Dom virtual sem estar presente na tela, o que evita vários comportamentos adversos na aplicação.

Para gerar as colunas da tabela que por sua vez é constituida das chaves do objeto resultante da chamada, uma variável mapeia todas as chaves e gera o cabeçalho da tabela.Um filtro é aplicado no objeto assim que ele é resultante da função para renderizar apenas as colunas desejadas. As linhas seguem o mesmo parametro, mas são alteradas sempre que o objeto `filter.filtersResults` sofre alteração.

O componente table na sua composição chama componente `desingedFilters` e é o componente responsável pela estilização de todos os filtros.

Para um bom dimencionamento da tabela ela possui um scrol lateral.

## Formatação de código

Durante o desenvolvimento foi usado o esLint- mas não instalado como dependencia do projeto, mas no configurado do editor de texto.

## Melhorias.

Dada a condição de tempo o produto até então desenvolvido trata-se da versão zero. Como versão um foi pensada algumas melhorias tais como:

<ul>

#### Aplicação de Debounce

 <ul>
Para evitar a chamadas desnecessárias, aplicar um debounce na hora da chamada, tal estratégia foi pensada na v0 mas abortada por uma questão de requerer maiores estudos do uso da ferramente atrelada ao useContext, para tal solução ser aplicada de maneira eficiente o tempo nao era hábil.  O uso de recursos como o useMemo e o useCalback foram cogitadas para aplicar na resolução mas não levadas a diante.
</ul>

#### Paginação ou Scroll Infinito.

<ul>
Adotar uma estratégia de paginar as chamadas ou ate mesmo a implementação de um scroll infinito.
</ul>

#### Uso de linguagem fortemente Tipada.

<ul>
O uso de uma linguagem fortemente tipada, o que traria mais segurança na inferencia dos tipos, e uma maior agilidade no desenvolvimento, pois com os objetos devidamente tipados o código te conta mais sobre cada objeto, evitando várias consultas em outros arquivos para verificar tipos. Tal estratégia não foi implementada dado o maior dominio da pessoa  desenvolvedora com a  linguagem escolhida e um tempo limitante para a entrega.
</ul>

#### Teste unitário.

<ul>
Estratégia que faz muito sentido para a evolução do produto, o que seria de muito valor para uma versão um com o aumento de elementos e equipe, o teste embora custoso se faz indispensável.

</ul>

#### Tratamento de resultados

<ul>
Tratar os resultados  retornados pela api como  unknown e formatação dos valores na tabela, como data links etc.
</ul>

## Considerações finais

As práticas desenvolvidas levaram em consideração uma boa qualidade de código mas tambem visando entregar em tempo hábil.
