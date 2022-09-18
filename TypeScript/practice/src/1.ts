interface Person {
  name: string;
  readonly height: number; //재할당 불가
  [asd: string]: string | number;
}

const player: [number, boolean] = [1, true]