import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const usePagination = (endpoint, initialPage = 1) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(endpoint, {
          params: { page }
        });
        
        if (page === 1) {
          setData(response.data.results);
        } else {
          setData(prev => [...prev, ...response.data.results]);
        }
        
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, page]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return { data, loading, loadMore, hasMore: page < totalPages };
};