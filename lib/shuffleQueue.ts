function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export class PaintingQueue {
  private queue: string[] = [];
  private lastShown: string | null = null;

  constructor(private readonly ids: string[]) {
    if (ids.length === 0) {
      throw new Error("PaintingQueue requires at least one painting id");
    }
    this.refill();
  }

  private refill(): void {
    const nextQueue = shuffle(this.ids);

    if (
      this.lastShown &&
      nextQueue.length > 1 &&
      nextQueue[0] === this.lastShown
    ) {
      [nextQueue[0], nextQueue[1]] = [nextQueue[1], nextQueue[0]];
    }

    this.queue = nextQueue;
  }

  next(): string {
    if (this.queue.length === 0) {
      this.refill();
    }

    const id = this.queue.shift()!;
    this.lastShown = id;
    return id;
  }

  peek(): string {
    if (this.queue.length === 0) {
      this.refill();
    }
    return this.queue[0];
  }

  get total(): number {
    return this.ids.length;
  }
}
