import React, { useEffect, useState } from 'react';
import { fetchMounts } from './api';

const MountList = () => {
  const [mounts, setMounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMounts = async () => {
      try {
        const data = await fetchMounts();
        setMounts(data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar as montarias.');
        setLoading(false);
      }
    };

    loadMounts();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {mounts.map((mount) => (
          <li
            key={mount._id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          >
            <h2>{mount.name.pt || mount.name.en}</h2>
            <p>ID: {mount.id}</p>
            <p>Família: {mount.familyId}</p>
            <p>Data de Criação: {new Date(mount.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MountList;
