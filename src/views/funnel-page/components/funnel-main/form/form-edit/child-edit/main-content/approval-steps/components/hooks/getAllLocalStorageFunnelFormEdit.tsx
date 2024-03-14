import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { useSelector } from 'react-redux';
import UseUnsaveChangeWarning from './useUnsaveChangeWarning';

const GetAllLocalStorageFunnelFormEdit = () => {
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.modalFirstLevel.bOpen); // triger update
  const [, handleCloseTab] = UseUnsaveChangeWarning();

  const [isStorageAll, setIsStorageAll] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        JSON.parse(localStorage.getItem('editViewFunnelStatusEdit')) ||
        JSON.parse(localStorage.getItem('editViewFunnelCustomerPOEdit')) ||
        JSON.parse(localStorage.getItem('editViewFunnelCustomerEdit')) ||
        JSON.parse(localStorage.getItem('editViewFunnelSellingEdit')) ||
        JSON.parse(localStorage.getItem('editViewFunnelCommissionIndexEdit')) ||
        //
        JSON.parse(localStorage.getItem('productService')) ||
        JSON.parse(localStorage.getItem('funnelCost')) ||
        JSON.parse(localStorage.getItem('funnelTop')) ||
        JSON.parse(localStorage.getItem('splitPerFormance'))
      ) {
        handleCloseTab(true);
        setIsStorageAll(true);
      } else {
        handleCloseTab(false);
        setIsStorageAll(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return [isStorageAll] as const;
};

export default GetAllLocalStorageFunnelFormEdit;
