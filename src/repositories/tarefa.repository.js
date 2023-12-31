import Tarefa from "../models/Tarefa.js";

export const adicionarTarefaRepository = (body) => Tarefa.create(body);

export const buscarTodasTarefasRepository = (id) =>
    Tarefa.find({ usuario: id }).populate("usuario");

export const buscarTarefaPeloIdRepository = (id) => Tarefa.findById(id).populate("usuario");

export const editarTarefaRepository = (id, tarefa) =>
    Tarefa.findOneAndUpdate({ _id: id }, { $set: tarefa }, { new: true });

export const alterarRealizadaRepository = (id, valor) =>
    Tarefa.findOneAndUpdate({ _id: id }, { realizada: valor }, { new: true });

export const alterarFavoritoRepository = (id, valor) =>
    Tarefa.findOneAndUpdate({ _id: id }, { favorito: valor }, { new: true });

export const deletarTarefaRepository = (id) => Tarefa.findByIdAndDelete(id);
