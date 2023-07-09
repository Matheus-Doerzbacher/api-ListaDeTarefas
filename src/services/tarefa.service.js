import { 
    adicionarTarefaRepository,
    buscarTodasTarefasRepository,
    buscarTarefaPeloIdRepository,
    editarTarefaRepository,
    alterarRealizadaRepository,
    deletarTarefaRepository
} from "../repositories/tarefa.repository.js"

export const adicionarTarefaService = async (body) => {
    const { nome, prioridade} = body

    if (!nome || !prioridade) throw new Error("Insira todos os campos para o cadastro")

    if (prioridade !== "URGENTE" && prioridade !== "ALTA" && prioridade !== "MEDIA" &&  prioridade !== "BAIXA") {
        throw new Error("A prioridade precisa ser: URGENTE, ALTA, MEDIA ou BAIXA")
    }

    const tarefa = await adicionarTarefaRepository(body)

    if (!tarefa) throw new Error("Erro ao adicionar a tarefa!")

    return (tarefa)
} 

export const buscarTodasTarefasService = async () => {
    const tarefas = await buscarTodasTarefasRepository()

    if(tarefas.length === 0) throw new Error("Não foram encontradas tarefas!")

    return tarefas
}

export const buscarTarefaPeloIdService = async (id) => {
    const tarefa = await buscarTarefaPeloIdRepository(id)

    if (!tarefa) throw new Error("Tarefa não encontrada")

    return tarefa
}

export const editarTarefaService = async (id, body) => {

    const {prioridade, nome} = body

    if(!prioridade && !nome) throw new Error("Parametros Inválidos ou sem valores")

    if (prioridade && (prioridade !== "URGENTE" && prioridade !== "ALTA" && prioridade !== "MEDIA" &&  prioridade !== "BAIXA")) {
        throw new Error("A prioridade precisa ser: URGENTE, ALTA, MEDIA ou BAIXA")
    }

    const tarefaEncontrada = await buscarTarefaPeloIdRepository(id)

    if (!tarefaEncontrada) throw new Error("Tarefa não encontrada")
    
    if(prioridade){
        tarefaEncontrada.prioridade = prioridade
    }

    if(nome){
        tarefaEncontrada.nome = nome
    }

    const tarefa = await editarTarefaRepository(id, tarefaEncontrada)

    if(!tarefa) throw new Error("Erro ao alterar a tarefa")

    return tarefa

}

export const alterarRealizadaService = async (id) => {

    const tarefaEncontrada = await buscarTarefaPeloIdRepository(id)

    if (!tarefaEncontrada) throw new Error("Tarefa não encontrada")

    const valor = !tarefaEncontrada.realizada
    
    const tarefa = await alterarRealizadaRepository(id, valor)

    if(!tarefa) throw new Error("Erro ao alterar o status de realizado da tarefa")

    return tarefa
}

export const deletarTarefaService = async (id) => {

    await deletarTarefaRepository(id)
}
