import { useState, useEffect } from 'react';

// Define a estrutura (interface) de um Cliente
interface Cliente {
  id: number;
  nome: string;
  email: string;
}


const ClientePython = () => {

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteForm, setClienteForm] = useState<{ nome: string; email: string }>({ nome: '', email: '' });
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar clientes do Python
  const buscarClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clients');
      const data: Cliente[] = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao conectar com o Python:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega ao montar o componente
  useEffect(() => {
    buscarClientes();
  }, []);

  const adicionarCliente = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!clienteForm.nome || !clienteForm.email) return;

    try {
      const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteForm),
      });

      if (response.ok) {
        setClienteForm({ nome: '', email: '' });
        buscarClientes();
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };




  // Deleta cliente
  const deletarCliente = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/cliente/${id}`, { method: 'DELETE' });
      setClientes(clientes.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Lista de Clientes (Python)</h2>

      {/* Formulário */}
      <form onSubmit={adicionarCliente} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={clienteForm.nome}
          onChange={(e) => setClienteForm({ ...clienteForm, nome: e.target.value })}
          className="border p-2 rounded flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={clienteForm.email}
          onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value })}
          className="border p-2 rounded flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          Adicionar
        </button>
      </form>

      {/* Lista */}
      {loading ? (
        <p className="text-gray-500 text-center">Carregando do Python...</p>
      ) : (
        <ul className="space-y-2">
          {clientes.map((client) => (
            <li key={client.id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
              <div>
                <p className="font-semibold text-gray-800">{client.nome}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
              <button
                onClick={() => deletarCliente(client.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
  
export default ClientePython


