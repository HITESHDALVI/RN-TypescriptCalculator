export type Props = {
  theme: boolean;
};
export type operationType = {
  firstNumber: number | string;
  secondNumber: number | string;
  operation: number | string;
  result: number | null;
};
export type buttonType = {
  name: string | (() => void);
  height: number;
  width: number;
  theme: boolean;
  handlePress: string | (() => void);
};
