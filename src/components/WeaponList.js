import React, { useEffect, useState } from 'react';
import { fetchWeapons } from './api';
import '../styles/WeaponList.css'; // Importa o arquivo de estilo

const WeaponList = () => {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(2); // ID inicial (Arcos)

  const loadWeapons = async (typeId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeapons(typeId);

      // Ordena os itens de forma decrescente pelo nível
      const sortedWeapons = data.sort((a, b) => b.level - a.level);
      setWeapons(sortedWeapons);
    } catch (err) {
      setError('Erro ao carregar os weapons.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWeapons(selectedTypeId); // Carrega armas para o tipo selecionado
  }, [selectedTypeId]);

  const handleSelectChange = (event) => {
    const typeId = parseInt(event.target.value, 10);
    setSelectedTypeId(typeId);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weapon-list-container">
      <h1>Lista de equipamentos</h1>

      <select
        value={selectedTypeId}
        onChange={handleSelectChange}
        className="weapon-select"
      >
        <option value={2}>Arcos</option>
        <option value={3}>Varinhas</option>
        <option value={4}>Bastões</option>
        <option value={5}>Adaga</option>
        <option value={6}>Espada</option>
        <option value={7}>Martelo</option>
        <option value={8}>Pá</option>
        <option value={19}>Machado</option>
        <option value={22}>Gadanha</option>
        <option value={271}>Lança</option>
        <option value={82}>Escudo</option>
      </select>

      <ul className="weapon-list">
        {weapons.map((Armas) => (
          <li className="weapon-list-item" key={Armas._id}>
            <img src={Armas.img} alt={Armas.name?.pt || Armas.name?.en} />
            <div className="weapon-content">
              <h2>{Armas.name?.pt || Armas.name?.en}</h2>
              <p>ID: {Armas.id}</p>
              <p>Nível: {Armas.level}</p>
              {/* <p>Desc: {Armas.description.pt}</p> */}
              <p>
                Range {Armas.minRange} - {Armas.range}
              </p>

              {Armas.effects
                .filter((effect) => effect.characteristic === -1)
                .map((effect, index) => (
                  <React.Fragment key={index}>
                    {effect.elementId === -1 ? (
                      <p>{effect.from} PA</p>
                    ) : (
                      <p>
                        Dano {effect.from} a {effect.to}{' '}
                        {effect.elementId === 0
                          ? 'Neutro'
                          : effect.elementId === 1
                          ? 'Terra'
                          : effect.elementId === 2
                          ? 'Fogo'
                          : effect.elementId === 3
                          ? 'Água'
                          : effect.elementId === 4
                          ? 'Ar'
                          : ''}
                      </p>
                    )}
                  </React.Fragment>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeaponList;
