export interface ClassDecorator {
    <T extends Function>(type: T): T;
    (target: Object): void;
}

export interface PropertyDecorator {
    <T extends Function>(type: T): T;
    (target: Object, propertyKey?: string): void;
}
