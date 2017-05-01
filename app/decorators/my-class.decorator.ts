import { ClassDecorator } from './type-decorator';

export function MyClass(): ClassDecorator {

    return (target: Function): void => {

        // Tries to create a property:
        // in AoT mode it doesn't work: Property 'myProperty' does not exist on type 'HomeComponent'.

        // target.prototype.myProperty;

        const targetNgOnInit: Function = target.prototype.ngOnInit;

        // Tries to modify the 'ngOnInit' method: it works in JiT mode,
        // but in AoT mode it works only if 'ngOnInit' method already exists in the component.
        target.prototype.ngOnInit = function (): void {
            // Tries to retrieve the name of params of the constructor:
            // it works only in JiT mode: AoT changes the names.
            const params: string[] = getArgs(target);
            console.log(params);

            this.myProperty = "ngOnInit is working";

            if (targetNgOnInit) {
                targetNgOnInit.apply(this);
            }
        };
    };

}

function getArgs(ctor: Function): string[] {
    const args: string = ctor.toString().match(/function\s.*?\(([^)]*)\)/)[1];
    return args.split(',').map((arg: string) => {
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter((arg: string) => {
        return arg;
    });
}
