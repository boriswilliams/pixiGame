export abstract class Builder<E extends any> {
  abstract build(...args: any[]): Promise<E>;
}