```markdown
# TODO

## PATCH /pedidos/{id}/status
- [ ] Verificar se o pedido com o `{id}` fornecido existe.
- [ ] Verificar se a transição de status é permitida com base no status atual.

## Excluir / Cancelar Pedido
- [ ] Responsável: Cliente (enquanto status for "Pendente").
- [ ] Verificar se o pedido com o `{id}` fornecido existe.
- [ ] Verificar se o status atual do pedido é “Pendente”. Se for diferente (“Em preparação”, “Pronto”, “Cancelado”), o cancelamento não é permitido.

## Listar Categorias GET /categorias
- [ ] A API deve retornar uma lista de objetos de categoria.
- [ ] Cada objeto deve conter pelo menos o `id` e o `nome` da categoria.
- [ ] A ordem de retorno pode ser alfabética ou definida pelo estabelecimento (melhoria futura: incluir campo de ordenação).

## Criar Categoria
- [ ] O corpo da requisição deve conter o `nome` da nova categoria.
- [ ] O usuário deve estar autenticado como Estabelecimento.
- [ ] O campo `nome` não pode ser vazio.
- [ ] O `nome` da categoria deve ser único para o estabelecimento (evitar duplicatas).

## Listar Todos os Produtos
- [ ] A API deve retornar um array de objetos de produto.
- [ ] Cada objeto deve conter `id`, `nome`, `descricao`, `preco`, `imagemUrl` e `categoriaId` (ou o objeto de categoria embutido).
- [ ] Pode incluir filtros opcionais (ex.: por nome, faixa de preço) em futuras versões.

## Listar Produtos por Categoria
- [ ] A API deve retornar um array de objetos de produto que correspondam à `categoriaId` fornecida.
- [ ] Cada objeto deve conter os mesmos detalhes do endpoint de listar todos os produtos.
- [ ] Verificar se a `categoriaId` fornecida existe.

## Criar Produto
- [ ] O corpo da requisição deve conter os campos necessários do produto (nome, descricao, preco, imagemUrl e categoriaId).
- [ ] O usuário deve estar autenticado como Estabelecimento.
- [ ] Campo `nome` não pode ser vazio.
- [ ] Campo `preco` deve ser um número maior que zero.
- [ ] Campo `categoriaId` é obrigatório e deve corresponder a uma categoria existente.
- [ ] O `nome` do produto pode precisar ser único dentro da mesma categoria ou para todo o estabelecimento (a definir).

## Excluir Produto
- [ ] Remover o produto identificado pelo `{id}` do banco de dados.
- [ ] O usuário deve estar autenticado como Estabelecimento.
- [ ] Verificar se o produto com o `{id}` fornecido existe.
```
