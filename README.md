## Descrição do projeto
```
Existem dois projetos dentro do mesmo sendo eles:
Ship-smart-library
 - utilizamos esse projeto para criar os componetes e fazer a exportação para o npm.
Storybook
 - utilizamos para visualizar o componente em projeto vue comum e tambem para criar nossas history.
```
## Criação de um novo componente
```
Criar um componente dentro da pasta ship-smart-library\src\lib-components\lib
```
## Teste do componente criado
```
Importar o componente para o arquivo src\App.vue
Rodar o comando npm run build
```
## Escrevendo uma historia do componente
```
Importar o componente para a pasta src\stories\lib e criar uma pasta referente ao novo componente
```
## Visualizando o componente no storybook
```
Somente após criar uma historia o componente estara visivel no storybook npm storybook
```
## Build do storybook para arquivos staticos
```
rodar o comando "npm storybook", ira gerar uma pasta statica que sera utilizado para subir no server(como um site comum)
```
## Gerando um novo componente no NPM
```
Dentro da pasta ship-smart-library rodar o comando "npm install"
Exportar seu componente para o arquivo ship-smart-library\src\lib-components\index.js
Rodar o comando "npm build"
Após o build estar completo rodar o comando "npm publish"
```


