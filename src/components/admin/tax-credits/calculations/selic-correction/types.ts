
export type SelicRate = {
  month: string;
  year: number;
  rate: number;
  accumulated: number;
};

export type MonetaryCorrection = {
  id: string;
  creditId: string;
  originalValue: number;
  correctedValue: number;
  difference: number;
  correctionDate: string;
  months: number;
  accumulatedRate: number;
};
