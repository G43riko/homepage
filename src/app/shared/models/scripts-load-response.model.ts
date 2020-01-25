export class ScriptsLoadResponse {
    public script: string;
    public loaded = true;
    public status: string;

    public constructor({name, loaded, status}: { name?: string; loaded?: boolean; status?: string }) {
        if (name) {
            this.script = name;
        }

        if (typeof loaded === "boolean") {
            this.loaded = loaded;
        }

        if (status) {
            this.status = status;
        }
    }
}
