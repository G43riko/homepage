export abstract class AbstractDetailComponent {
    public disabled = true;
    public isNew    = false;

    public abstract save(): void;

    public abstract back(): void;

    public edit(): void {
        this.disabled = false;
    }
}
