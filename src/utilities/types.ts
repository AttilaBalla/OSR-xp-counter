export enum ProgressBarTypes {
  primary = 'primary',
  secondary = 'secondary',
  info = 'info'
}

export enum FixTypes {
  ordinary = 'ordinary', // green
  probRa = 'probRa', // blue
  minmaxRa = 'minmaxRa', // red
  probMinmax = 'propMinmax', // orange
  pierce = "pierce" // yellow
}

export interface IProgressBar {
  percent: number,
  color: ProgressBarTypes
}

export interface IFixVisualizerJSON {
  mode: 'string',
  totalTime: 'string'
  iterations: number,
  fixes: string[]
}