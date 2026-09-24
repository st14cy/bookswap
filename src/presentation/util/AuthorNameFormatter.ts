export default class AuthorNameFormatter {
    private static readonly PATRONYMIC = /(вич|вна|ична|ич|оглы|кызы)$/i;
    private static readonly INITIAL = /^(\p{L}\.?)+$/u;

    static short(fullName: string | null | undefined): string {
        if (!fullName) return '';
        return fullName
            .split(',')
            .map((name) => AuthorNameFormatter.shortOne(name))
            .filter(Boolean)
            .join(', ');
    }

    private static shortOne(name: string): string {
        const words = name.trim().split(/\s+/).filter(Boolean);
        if (words.length <= 1) return words.join('');

        const isInitial = (w: string) => w.includes('.') && AuthorNameFormatter.INITIAL.test(w);
        if (words.some(isInitial)) {
            const rest = words.filter((w) => !isInitial(w));
            if (rest.length !== 1) return words.join(' ');
            const initials = words
                .filter(isInitial)
                .flatMap((w) => w.split('.').filter(Boolean).map((letter) => `${letter.toUpperCase()}.`));
            return `${rest[0]} ${initials.join(' ')}`;
        }
        if (!AuthorNameFormatter.startsWithUpper(words[words.length - 1])) {
            return words.join(' ');
        }

        let surname: string;
        let given: string[];

        if (words.length >= 3 && AuthorNameFormatter.PATRONYMIC.test(words[words.length - 1])) {
            surname = words[0];
            given = words.slice(1);
        } else {
            let i = words.length - 1;
            while (i > 1 && !AuthorNameFormatter.startsWithUpper(words[i - 1])) i--;
            surname = words.slice(i).join(' ');
            given = words.slice(0, i);
        }

        return `${surname} ${given.map((w) => AuthorNameFormatter.initial(w)).join(' ')}`;
    }

    private static initial(word: string): string {
        return word
            .split('-')
            .filter(Boolean)
            .map((part) => `${part.charAt(0).toUpperCase()}.`)
            .join('-');
    }

    private static startsWithUpper(word: string): boolean {
        const first = word.charAt(0);
        return first !== first.toLowerCase() && first === first.toUpperCase();
    }
}
