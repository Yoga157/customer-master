import React, { Fragment, useState, useCallback, useEffect, useRef} from "react";
// import "./ViewCustomerSetting.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import IStore from "models/IStore";

import ViewEditCustomer from "./components/base/ViewEditCustomer";
import * as CustomerSetting from "stores/customer-setting/CustomerActivityActions"
import { selectCustomerDataById } from "selectors/customer-setting/CustomerSettingSelector";

interface IProps {
    history: any;
}

interface routeParams {
    id: string;
}

const ViewEditCustomerSettingPage: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const dispatch: Dispatch = useDispatch();
    const { id } = useParams<routeParams>();
    let userLogin = JSON.parse(localStorage.getItem('userLogin'));

    const role = userLogin.role;
    const customer = useSelector((state: IStore) => selectCustomerDataById(state));

    useEffect(() => {
        if(id != undefined) {
            dispatch(CustomerSetting.requestCustomerDataById(Number(id)));
        }
    }, [dispatch, id])
    
    return (
        <Fragment>
            {customer.customerID != undefined &&
                <ViewEditCustomer customer={customer} role={role}/>  
            }
        </Fragment>
    )
}

export default ViewEditCustomerSettingPage;