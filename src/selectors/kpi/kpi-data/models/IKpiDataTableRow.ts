export default interface IKpiDataTableRow {
  readonly udcid: number;
  readonly emplid: number;
  readonly year: number;
  readonly pic: string;
  readonly dept: string;
  readonly remark: string;
  readonly measurementNumber: string;
  readonly keyActivity: string;
  readonly kpiDireksi: string;
  readonly measurement: string;
  readonly weight: number;
  readonly point: number;
  readonly q1Point: number;
  readonly q2Point: number;
  readonly q3Point: number;
  readonly q4Point: number;
  readonly yearlyPoint: number;
  readonly q1Nilai: number;
  readonly q2Nilai: number;
  readonly q3Nilai: number;
  readonly q4Nilai: number;
  readonly yearlyNilai: number;
  readonly manual: number;
  readonly detail: number;
  readonly fileNameQ1: string;
  readonly fileNameQ2: string;
  readonly fileNameQ3: string;
  readonly fileNameQ4: string;
  readonly fileNameYearly: string;
  readonly logDate: string;
  readonly totalNilai: number;
  readonly totalNilaiYearly: number;
  readonly percentNilai: number;
}
