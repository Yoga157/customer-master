import { BaseModel, ConversionTypeEnum, IConversionOption } from 'sjs-base-model';

export default class KpiDataDashboardModel extends BaseModel {
  udcid: number = 0;
  emplid: number = 0;
  year: number = 0;
  pic: string = '';
  dept: string = '';
  remark: string = '';
  fileNameQ1: string = '';
  fileNameQ2: string = '';
  fileNameQ3: string = '';
  fileNameQ4: string = '';
  fileNameYearly: string = '';
  keyActivity: string = '';
  kpiDireksi: string = '';
  measurement: string = '';
  logDate: string = '';
  measurementNumber: string = '';
  userlogin: number = 0;
  weight: number = 0;
  point: number = 0;
  q1Point: number = 0;
  q2Point: number = 0;
  q3Point: number = 0;
  q4Point: number = 0;
  yearlyPoint: number = 0;
  q1Nilai: number = 0;
  q2Nilai: number = 0;
  q3Nilai: number = 0;
  q4Nilai: number = 0;
  yearlyNilai: number = 0;
  totalNilai: number = 0;
  totalNilaiYearly: number = 0;
  manual: number = 0;
  detail: number = 0;
  percentNilai: number = 0;

  constructor(data: Partial<KpiDataDashboardModel>) {
    super();
    this.update(data);
  }

  public update(data: Partial<KpiDataDashboardModel>) {
    const conversionOptions: IConversionOption = {
      udcid: ConversionTypeEnum.Number,
      emplid: ConversionTypeEnum.Number,
      year: ConversionTypeEnum.Number,
      userlogin: ConversionTypeEnum.Number,
      pic: ConversionTypeEnum.String,
      dept: ConversionTypeEnum.String,
      measurementNumber: ConversionTypeEnum.String,
      remark: ConversionTypeEnum.String,
      keyActivity: ConversionTypeEnum.String,
      kpiDireksi: ConversionTypeEnum.String,
      measurement: ConversionTypeEnum.String,
      logDate: ConversionTypeEnum.String,
      weight: ConversionTypeEnum.Number,
      point: ConversionTypeEnum.Number,
      q1Point: ConversionTypeEnum.Number,
      q2Point: ConversionTypeEnum.Number,
      q3Point: ConversionTypeEnum.Number,
      q4Point: ConversionTypeEnum.Number,
      q1Nilai: ConversionTypeEnum.Number,
      q2Nilai: ConversionTypeEnum.Number,
      q3Nilai: ConversionTypeEnum.Number,
      q4Nilai: ConversionTypeEnum.Number,
      manual: ConversionTypeEnum.Number,
      totalNilai: ConversionTypeEnum.Number,
      totalNilaiYearly: ConversionTypeEnum.Number,
      percentNilai: ConversionTypeEnum.Number,
    };

    super.update(data, conversionOptions);
  }
}
