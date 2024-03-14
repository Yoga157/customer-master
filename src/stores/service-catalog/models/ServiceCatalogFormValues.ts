export default class ServiceCatalogFormValues {
  svcCatGenID: number = 0;
  svcCatReffID: string = '';
  svcCatID: number = 0;
  employeeID: string = '';
  svcName: string = '';

  constructor(init?: ServiceCatalogFormValues) {
    Object.assign(this, init);
  }
}
