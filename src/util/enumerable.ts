/**
 * @enumerable decorator that sets the enumerable property of a class field to false.
 * @param value true|false
 */
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
        if (descriptor.enumerable != value) {
            descriptor.enumerable = value;
            descriptor.writable= true;
            Object.defineProperty(target, propertyKey, descriptor)
        }
    };
}
export = enumerable