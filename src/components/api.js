import axios from 'axios';

const API_BASE_URL = 'https://api.beta.dofusdb.fr';

/**
 * Função para buscar montarias.
 * @returns {Promise<Array>} Lista de montarias.
 */
export const fetchMounts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mounts`);
    return response.data.data; // Retorna apenas a lista de montarias.
  } catch (error) {
    console.error('Erro ao buscar montarias:', error);
    throw error; // Propaga o erro para tratamento.
  }
};

/**
 * Função para buscar Weapons filtrados pelo categoryId.
 * @returns {Promise<Array>} Lista de Weapons.
 */
export const fetchWeapons = async (typeId) => {
  let allWeapons = [];
  let skip = 0;
  const limit = 50; // Limite por requisição

  try {
    while (true) {
      const response = await axios.get(
        `${API_BASE_URL}/items?&typeId=${typeId}&$limit=${limit}&$skip=${skip}`
      );
      const weaponsPage = response.data.data;

      // Adiciona os resultados da página atual à lista total
      allWeapons = [...allWeapons, ...weaponsPage];

      // Se a página atual não retornou 50 itens, significa que chegamos ao final
      if (weaponsPage.length < limit) break;

      // Incrementa o skip para buscar a próxima página
      skip += limit;
    }

    return allWeapons.filter((item) => item.type?.categoryId === 0); // Filtra pelo categoryId se necessário
  } catch (error) {
    console.error('Erro ao buscar Equipamentos:', error);
    throw error;
  }
};

