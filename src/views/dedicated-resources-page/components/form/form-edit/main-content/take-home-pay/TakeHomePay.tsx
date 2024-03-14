import React, { useEffect, useState } from 'react';
import IStore from 'models/IStore';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import IUserResult from 'selectors/user/models/IUserResult';
import { selectUserResult } from 'selectors/user/UserSelector';
import { Pagination, Tooltips, Button, CheckBox } from 'views/components/UI';
import { Grid, Header } from 'semantic-ui-react';
import './TakeHomePayStyle.scss';


interface IProps {
    SelectTakeHomePay: any;
}

const TakeHomePay: React.FC<IProps> = (props: React.PropsWithChildren<IProps>) => {
    const { SelectTakeHomePay } = props;
    const dispatch: Dispatch = useDispatch();
    return (
        <>
            <Grid>
                <Grid.Row >
                    <Grid.Column className='TakeHomePay'>
                        <p>Take Home Pay</p>
                        <div className='wrapperPayment'>
                            <p className='Payment'>Rp.{parseInt(SelectTakeHomePay > 0 ? SelectTakeHomePay : 0).toLocaleString()}
                            <span>/Month</span></p>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};

export default TakeHomePay;
