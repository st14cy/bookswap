export default async function readErrorMessage(response: Response): Promise<string> {
    let text = '';
    try {
        text = await response.text();
    } catch {
    }

    if (text) {
        try {
            const data = JSON.parse(text);
            if (data && typeof data.message === 'string') return data.message;
            if (data && data.errors && typeof data.errors === 'object') {
                const messages = Object.values(data.errors as Record<string, string[]>).flat();
                if (messages.length > 0) return messages.join('\n');
            }
            if (data && typeof data.title === 'string') return data.title;
        } catch {
            return text;
        }
    }

    if (response.status === 401) return 'Необходимо войти в аккаунт';
    if (response.status >= 500) return 'Ошибка сервера. Попробуйте позже';
    return `Ошибка запроса (${response.status})`;
}
