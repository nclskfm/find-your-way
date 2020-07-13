import { Location } from './location.interface';

/**
 * Interface to store the calculated result.
 */
export interface Solution {
  path: number[];
  minimumCosts: number;
  seconds?: number;
  locations?: Location[];
}
