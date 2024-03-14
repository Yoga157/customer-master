import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { useSelector } from 'react-redux';

const RemoveAllLocalStorageFunnelFormEdit = () => {
  const isSalesAnalis: boolean = useSelector((state: IStore) => state.modalFirstLevel.bOpen); // triger update
  const [isClearStorage, setClearStorage] = useState(false);

  useEffect(() => {
    if (isClearStorage) {
      localStorage.removeItem('editViewFunnelStatusEdit');
      localStorage.removeItem('editViewFunnelCustomerPOEdit');
      localStorage.removeItem('editViewFunnelCustomerEdit');
      localStorage.removeItem('editViewFunnelSellingEdit');
      localStorage.removeItem('editViewFunnelCommissionIndexEdit');
      //
      localStorage.removeItem('productService');
      localStorage.removeItem('funnelCost');
      localStorage.removeItem('funnelTop');
      localStorage.removeItem('splitPerFormance');
    }
  }, [isClearStorage]);

  return [isClearStorage, (e: boolean) => setClearStorage(e)] as const;
};

export default RemoveAllLocalStorageFunnelFormEdit;
