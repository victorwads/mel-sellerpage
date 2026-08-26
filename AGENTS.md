# Instruções do repositório

Este diretório é um repositório Git com integração contínua (CI) configurada em `.github/workflows/`.

## Regra de publicação

Quando o usuário pedir para **publicar** uma alteração, isso significa concluir todo o fluxo:

1. verificar as alterações e executar as validações relevantes;
2. criar um commit com uma mensagem clara;
3. enviar (`push`) o commit para a branch remota `master`;
4. considerar a tarefa encerrada após o push, sem deixar a publicação apenas no working tree.

Não publicar alterações sem que o usuário peça explicitamente para publicar. Se o push falhar, informar o erro e não considerar a publicação concluída.

## CI e deploy

As workflows em `.github/workflows/` devem ser preservadas e consideradas parte do fluxo de entrega. Antes de publicar, validar pelo menos o build ou os testes/lint aplicáveis ao escopo da alteração. O deploy pode ser disparado pelo CI conforme os gatilhos configurados nas workflows.

## Cuidados com Git

- Preservar alterações existentes do usuário que não façam parte da tarefa.
- Não usar operações destrutivas, como reset forçado, para contornar conflitos ou falhas.
- Conferir a branch e o remote antes do commit e do push.
- Usar mensagens de commit objetivas e descritivas.

## Autenticação SSH no Windows

No Windows, a chave SSH deste repositório está em:

`C:\Users\melis\.ssh\id_ed25519_mel-sellerpage`

Usar sempre essa chave para operações Git com o GitHub, configurando o SSH com `IdentitiesOnly=yes`. Nunca expor ou compartilhar o arquivo privado; somente a chave `.pub` pode ser cadastrada no GitHub.
