import { Location } from './location.interface';

export interface Solution {
  path: number[];
  minimumCosts: number;
  seconds?: number;
  locations?: Location[];
}
