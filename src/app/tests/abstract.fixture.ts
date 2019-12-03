export abstract class AbstractFixture<Obj> {
    public readonly detail: Obj;

    protected constructor(public readonly list: Obj[]) {
        this.detail = list[0];
    }
}
