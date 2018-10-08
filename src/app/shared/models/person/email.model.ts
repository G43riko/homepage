export class Email {
    public email: string;
    public active: boolean;
    public email_id: string;

    public constructor(email: string = "@", active = true) {
        this.email  = email;
        this.active = active;
    }

    public static parse(email: any): Email | null {
        if (!email) {
            return null;
        }
        const result: Email = new Email();

        result.email_id = email.email_id;
        result.email    = email.email;
        result.active   = email.active;

        return result;
    }
}
