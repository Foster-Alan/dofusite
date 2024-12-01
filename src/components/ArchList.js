import React, { useEffect, useState } from 'react';
import { fetchArchs } from './api';

const ArchList = () => {
  const [archs, setArchs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArchs = async () => {
      try {
        const data = await fetchArchs();
        setArchs(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os archmonstros.');
        setLoading(false);
      }
    };

    loadArchs();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Arquimonstros</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {archs.map((arch) => (
          <li
            key={arch._id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={arch.img}
              alt={arch.name.pt || arch.name.en}
              style={{ width: '80px', height: '80px', marginRight: '20px' }}
            />
            <div>
              <h2>{arch.name.pt || arch.name.en}</h2>
              <p><strong>ID:</strong> {arch.id}</p>
              <p><strong>Nível:</strong> {arch.grades?.[0]?.level || 'N/A'}</p>
              <p><strong>Vida:</strong> {arch.grades?.[0]?.lifePoints || 'N/A'}</p>
              <p>
                <strong>Resistências:</strong>
                {' '}
                Terra: {arch.grades?.[0]?.earthResistance || 0}%, Fogo: {arch.grades?.[0]?.fireResistance || 0}%, Água: {arch.grades?.[0]?.waterResistance || 0}%, Ar: {arch.grades?.[0]?.airResistance || 0}%, Neutro: {arch.grades?.[0]?.neutralResistance || 0}%
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchList;
