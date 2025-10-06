declare module "shufflejs" {
  interface ShuffleOptions {
    itemSelector: string;
  }

  export default class Shuffle {
    constructor(element: HTMLElement, options: ShuffleOptions);

    filter(selector: string | null): HTMLElement[];
  }
}
