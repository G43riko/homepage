export abstract class AbstractFixture<Obj extends {id: number}> {
    public readonly detail: Obj;

    protected constructor(public readonly list: Obj[]) {
        this.detail = list[0];
    }

    public getById(id: number): Obj | undefined {
        return this.list.find((item) => item.id === id);
    }
}
