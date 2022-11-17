let id = 0

const informacoes = {
   obterTarefas: () => JSON.parse(localStorage.getItem('lista-tarefas')),
   editarTarefas: (listaTarefas) => localStorage.setItem('lista-tarefas', JSON.stringify(listaTarefas))
}

const tarefa = (id, novaTarefa) => `<div>
<p id = '${id}'>
${novaTarefa.finalizada ? `<trike id="strike${id}">` : ''}
${novaTarefa.tarefa}
${novaTarefa.finalizada ? '</strike>' : ''}
</p>
<input type="checkbox" ${novaTarefa.finalizada ? 'checked' : ''} onchange="marcarTarefa(${id})" />
<button onclick="removerTarefa(${id})">Remover</button>
</div`

const marcarTarefa = (id) => {
   const strike = document.getElementById(`strike${id}`)
   const listaTarefas = informacoes.obterTarefas()
   console.log(strike)

   if (strike) {
      document.getElementById(id).innerHTML = strike.innerHTML
      const tarefaPendente = document.getElementById(id).innerHTML.replace(/\\n/g, '')
      console.log(tarefaPendente)
   } else {
      const tarefaConcluida = document.getElementById(id).innerHTML
      document.getElementById(id).innerHTML = `<strike id='strike${id}'>${tarefaConcluida}</strike>`
      listaTarefas[index].finalizada = true
      informacoes.editarTarefas(listaTarefas)
   }
}

const mudarStatusTarefa = (tarefa, status) => {
   const index = listaTarefas.findIndex(tarefaListada => tarefaListada.tarefa === tarefa)
   listaTarefas[index].finalizada = status
   informacoes.editarTarefas(listaTarefas)
}

function exibirLista() {
   const tarefas = informacoes.obterTarefas()
   if (tarefas) {
      tarefas.forEach(tarefaListada => {
         id++
         document.querySelector('#lista-tarefas').innerHTML += tarefa(id, tarefaListada)
      })
   }
}

const validandoTarefa = (novaTarefa) => {
   let tarefaExistente = false
   const listaTarefas = informacoes.obterTarefas()

   if (listaTarefas) {
      listaTarefas.map(tarefa => {
         if (tarefa.tarefa === novaTarefa.tarefa) {
            tarefaExistente = true
            alert('Tarefa já existente')
         }
      })

      return tarefaExistente
   }
}

function adicionarTarefa() {
   id++
   const novaTarefa = {
      tarefa: document.getElementById('nome-tarefa').value,
      finalizada: false
   }
   const listaTarefas = localStorage.getItem('lista-tarefas')
   if (validandoTarefa(novaTarefa)) {
      return
   }

   document.querySelector('#lista-tarefas').innerHTML += tarefa(id, novaTarefa)

   if (listaTarefas) {
      const novaLista = JSON.parse(listaTarefas)
      novaLista.push(novaTarefa)
      informacoes.editarTarefas(novaLista)
   } else {
      informacoes.editarTarefas([novaTarefa])
   }

}

const removerTarefa = (id) => {
   const tarefaRemovida = document.getElementById(id).innerHTML
   const listaTarefas = informacoes.obterTarefas()
   const novaListaTarefa = listaTarefas.filter(tarefa => tarefa.tarefa !== tarefaRemovida)
   informacoes.editarTarefas(novaListaTarefa)
   document.querySelector('#lista-tarefas').innerHTML = ''
   exibirLista()
}


exibirLista()