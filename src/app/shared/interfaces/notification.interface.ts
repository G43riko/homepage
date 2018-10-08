export interface NotificationInterface {
    showError(title: string, text: string): void;

    showSuccess(title: string, text: string): void;

    showWarn(title: string, text: string): void;
}
