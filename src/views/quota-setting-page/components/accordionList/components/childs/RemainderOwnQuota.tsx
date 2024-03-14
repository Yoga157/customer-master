import React, { useEffect, useState } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import { selectQuotaMaster, selectQuotaMasterTeam } from 'selectors/quota/QuotaSelectors';
import QuotaMasterModel from 'stores/quota/models/QuotaMasterModel';
import { selectUserResult } from 'selectors/user/UserSelector';
import IUserResult from 'selectors/user/models/IUserResult';
import { NumberInput } from 'views/components/UI';
import IStore from 'models/IStore';

function RemainderOwnQuota({ model, onChangeRow }) {
  const [initValues, setInitValues] = useState({});

  const quotaMasterMyTeam: QuotaMasterModel[] = useSelector((state: IStore) => selectQuotaMasterTeam(state));
  const quotaMasterMyOwn: QuotaMasterModel = useSelector((state: IStore) => selectQuotaMaster(state));
  const currentUser: IUserResult = useSelector((state: IStore) => selectUserResult(state));

  useEffect(() => {
    const localValue = localStorage.getItem('@myTeamQuota');
    if (JSON.parse(localValue)?.length > 0) {
      const newArr = JSON.parse(localValue).filter((e) => e.salesID !== currentUser.employeeID);

      const sumQuota = newArr.reduce((a, b) => ({ quotaGPM: a.quotaGPM + b.quotaGPM }));
      const sumSelling = newArr.reduce((a, b) => ({ quotaSelling: a.quotaSelling + b.quotaSelling }));

      setInitValues({
        ...initValues,
        quotaGPM: quotaMasterMyOwn.quotaGPM - sumQuota.quotaGPM,
        quotaSelling: quotaMasterMyOwn.quotaSelling - sumSelling.quotaSelling,
      });
    } else {
      const newArr = quotaMasterMyTeam.filter((e) => e.salesID !== currentUser.employeeID);

      const sumQuota = newArr.reduce((a, b) => ({ quotaGPM: a.quotaGPM + b.quotaGPM } as any));
      const sumSelling = newArr.reduce((a, b) => ({ quotaSelling: a.quotaSelling + b.quotaSelling } as any));

      setInitValues({
        ...model,
        quotaGPM: quotaMasterMyOwn.quotaGPM - sumQuota.quotaGPM,
        quotaSelling: quotaMasterMyOwn.quotaSelling - sumSelling.quotaSelling,
      });
    }
  }, [onChangeRow, quotaMasterMyOwn, quotaMasterMyTeam]);

  const onSubmitHandler = (values) => {};
  return (
    <Grid className={`TeamQuotaParent`}>
      <Grid.Row className="pb-0">
        <Grid.Column className="p-0">
          <FinalForm
            onSubmit={(values: any) => onSubmitHandler(values)}
            initialValues={initValues}
            render={({ handleSubmit, pristine, invalid }) => (
              <Form onSubmit={handleSubmit}>
                <Grid>
                  <Grid.Row className="pt-0 px-2r" columns="equal">
                    <Grid.Column className="ViewForm" verticalAlign="middle">
                      <Grid.Row>
                        <Grid.Column width={4} verticalAlign="middle">
                          {model.salesName} <br />
                          <span>{model.salesInfo}</span>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                    <Grid.Column className="ViewForm p-0" width={4}>
                      <Field
                        name="quotaGPM"
                        component={NumberInput}
                        placeholder="e.g.01234"
                        disabled={true}
                        thousandSeparator={true}
                        labelName="Quota GPM"
                        // values={'12312412'}
                        // onChange={(e) => handleChange(e, 'gpm')}
                        // defaultValue={`${quotaGPM}`}
                        // readonly
                      />
                      <span>{model?.quotaEffective}</span>
                    </Grid.Column>
                    <Grid.Column className="ViewForm p-0" width={4}>
                      <Field
                        name="quotaSelling"
                        component={NumberInput}
                        placeholder="e.g.01234"
                        disabled={true}
                        thousandSeparator={true}
                        labelName="Quota Selling"
                        // values={'12000'}
                        // onChange={(e) => handleChange(e, 'selling')}
                        // readonly={item.directorat === 'SI'}
                        // defaultValue={`${quotaGPM}`}
                      />
                      <span>{model?.quotaEffective}</span>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            )}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default RemainderOwnQuota;
