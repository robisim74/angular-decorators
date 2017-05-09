import { ClassDecorator } from './type-decorator';

export function MyClass(): ClassDecorator {

    function DecoratorFactory(target: Function): void {
        // Tries to create a property:
        // in AoT mode it doesn't work: Property 'myProperty' does not exist on type 'HomeComponent'.

        // target.prototype.myProperty;

        const targetNgOnInit: Function = target.prototype.ngOnInit;

        function ngOnInit(): void {
            this.myProperty = "ngOnInit is working";

            if (targetNgOnInit) {
                targetNgOnInit.apply(this);
            }
        }

        // Tries to modify the 'ngOnInit' method: it works in JiT mode,
        // but in AoT mode it works only if 'ngOnInit' method already exists in the component.
        target.prototype.ngOnInit = ngOnInit;
    }

    return DecoratorFactory;

}

