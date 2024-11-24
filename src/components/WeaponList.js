import React, { useEffect, useState } from 'react';
import { fetchWeapons } from './api';
import '../styles/WeaponList.css'; // Importa o arquivo de estilo

const WeaponList = () => {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWeapons = async () => {
      try {
        const data = await fetchWeapons();

        // Ordena os itens de forma decrescente pelo nível
        const sortedWeapons = data.sort((a, b) => b.level - a.level);
        setWeapons(sortedWeapons);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os weapons.');
        setLoading(false);
      }
    };

    loadWeapons();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="weapon-list-container">
      <h1>Lista de equipamentos</h1>
      <ul className="weapon-list">
        {weapons.map((Armas) => (
          <li className="weapon-list-item" key={Armas._id}>
            <img
              src={Armas.img}
              alt={Armas.name?.pt || Armas.name?.en}
            />
            <div>
              <h2>{Armas.name?.pt || Armas.name?.en}</h2>
              <p>ID: {Armas.id}</p>
              <p>Nível: {Armas.level}</p>
              <p>Desc: {Armas.description.pt} </p>
              <p>Range {Armas.minRange} - {Armas.range} </p>

              {Armas.effects
              .filter(effect => effect.characteristic === -1) // Filtra apenas os efeitos com characteristic === -1
              .map((effect, index) => (
                <React.Fragment key={index}>
                  {effect.elementId === -1 ? (
                    <>
                      <p>{effect.from} PA</p>
                    </>
                  ) : (
                    <p>
                      Dano {effect.from} a {effect.to}{" "}
                      {effect.elementId === 0
                        ? "Neutro"
                        : effect.elementId === 1
                        ? "Terra"
                        : effect.elementId === 2
                        ? "Fogo"
                        : effect.elementId === 3
                        ? "Água"
                        : effect.elementId === 4
                        ? "Ar"
                        : ""}
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
