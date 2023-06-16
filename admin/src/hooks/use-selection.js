import {useCallback, useEffect, useState} from 'react';

export const useSelection = (items ) => {

  //console.log('***', items)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setSelected(items)
  }, []);


  const handleSelectAll = useCallback(() => {
    setSelected([...items]);
  }, [items]);

  const handleSelectOne = useCallback((item) => {
    setSelected((prevState) => [...prevState, item]);
  }, [items]);

  const handleDeselectAll = useCallback(() => {
    setSelected([]);
  }, [items]);

  const handleDeselectOne = useCallback((item) => {
    setSelected((prevState) => {
      return prevState.filter((_item) => _item !== item);
    });
  }, [items]);

  return {
    handleDeselectAll,
    handleDeselectOne,
    handleSelectAll,
    handleSelectOne,
    selected
  };
};
