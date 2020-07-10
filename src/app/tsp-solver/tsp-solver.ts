import { Solution } from '../core/interfaces/solution.interface';

export class TspSolver {

  adj: number[][] = [];

  n: number;

  maxSize = Infinity;
  finalResult = Infinity;
  finalPath: number[] = [];

  constructor(adj: number[][]) {
    this.adj = adj;
    this.n = adj.length;
  }

  public solve(): Solution {
    const startTime = new Date();
    const visited: boolean[] = new Array(this.n);
    const currentPath: number[] = new Array(this.n + 1);

    let currentBound = 0;

    visited.fill(false);
    currentPath.fill(-1);

    for (let i = 0; i < this.n; i++) {
      currentBound += this.getFirstMin(i) + this.getSecondMin(i);
    }

    currentBound = Math.ceil(currentBound / 2);

    visited[0] = true;
    currentPath[0] = 0;

    this.recursiveStep(currentBound, 0, 1, currentPath, visited);

    const endTime = new Date();
    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    return {
      path: this.finalPath,
      minimumCosts: this.finalResult,
      seconds
    };
  }

  private copyCurrentResultToFinalResult(path: number[], result: number) {
    this.finalPath = path.slice();
    this.finalPath[this.n] = path[0];
    this.finalResult = result;
  }

  private getFirstMin(i: number): number {
    let min = this.maxSize;

    for (let k = 0; k < this.n; k++) {
      if (this.adj[i][k] < min && i !== k) {
        min = this.adj[i][k];
      }
    }
    return min;
  }

  private getSecondMin(i: number): number {
    let firstMin = this.maxSize;
    let secondMin = this.maxSize;

    for (let k = 0; k < this.n; k++) {
      if (i !== k) {
        if (this.adj[i][k] <= firstMin) {
          secondMin = firstMin;
          firstMin = this.adj[i][k];
        } else if (this.adj[i][k] <= secondMin && this.adj[i][k] !== firstMin) {
          secondMin = this.adj[i][k];
        }
      }
    }
    return secondMin;
  }

  /**
   * @param currentBound lower bound of the root node
   * @param currentWeight the weigth of the path so far
   * @param level level of the recursive step
   * @param currentPath the path so far
   * @param visited stores which paths are visited so far
   */
  private recursiveStep(currentBound: number, currentWeight: number, level: number,
                        currentPath: number[], visited: boolean[]) {

    if (level === this.n) {
      if (this.adj[currentPath[level - 1]][currentPath[0]] !== 0) {
        const currentResult = currentWeight + this.adj[currentPath[level - 1]][currentPath[0]];

        if (currentResult < this.finalResult) {
          this.copyCurrentResultToFinalResult(currentPath, currentResult);
        }
      }
      return;
    }

    for (let i = 0; i < this.n; i++) {

      if (this.adj[currentPath[level - 1]][i] !== 0 && !visited[i])  {
        const tempBound = currentBound;
        currentWeight += this.adj[currentPath[level - 1]][i];

        if (level === 1) {
          currentBound -= ((this.getFirstMin(currentPath[level - 1]) + this.getFirstMin(i)) / 2);
        } else {
          currentBound -= ((this.getSecondMin(currentPath[level - 1]) + this.getFirstMin(i)) / 2);
        }

        if (currentBound + currentWeight < this.finalResult) {
          currentPath[level] = i;
          visited[i] = true;

          this.recursiveStep(currentBound, currentWeight, level + 1, currentPath, visited);
        }
        currentWeight -= this.adj[currentPath[level - 1]][i];
        currentBound = tempBound;

        visited.fill(false);
        for (let j = 0; j < level; j++) {
          if (currentPath[j] !== -1) {
            visited[currentPath[j]] = true;
          }
        }
      }
    }

  }
}
