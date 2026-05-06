import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMonitors() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMonitors = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/monitors`);
      setMonitors(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitors();
    const interval = setInterval(fetchMonitors, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  return { monitors, loading, error, refresh: fetchMonitors };
}
