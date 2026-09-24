/**
 * Сокращение ФИО автора для списков: «Михаил Афанасьевич Булгаков» → «Булгаков М. А.»
 *
 * Понимает оба порядка слов:
 *  - «Имя Отчество Фамилия» и «Имя Фамилия» (так приходит из OpenLibrary);
 *  - «Фамилия Имя Отчество» (если отчество стоит последним).
 * Несколько авторов через запятую сокращаются по отдельности.
 * Уже сокращённые имена («Булгаков М. А.») и не-имена («Неизвестный автор») не меняются.
 */
export default class AuthorNameFormatter {
    /** Русские отчества: -вич, -вна, -ична, -инична, -ич; тюркские оглы/кызы */
    private static readonly PATRONYMIC = /(вич|вна|ична|ич|оглы|кызы)$/i;
    /** Уже инициал: «М», «М.», «М.А.» */
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

        // Уже с инициалами: «М.А. Булгаков» → «Булгаков М. А.», «Булгаков М. А.» — без изменений
        const isInitial = (w: string) => w.includes('.') && AuthorNameFormatter.INITIAL.test(w);
        if (words.some(isInitial)) {
            const rest = words.filter((w) => !isInitial(w));
            if (rest.length !== 1) return words.join(' ');
            const initials = words
                .filter(isInitial)
                .flatMap((w) => w.split('.').filter(Boolean).map((letter) => `${letter.toUpperCase()}.`));
            return `${rest[0]} ${initials.join(' ')}`;
        }
        // Последнее слово с маленькой буквы — это не ФИО («Неизвестный автор»)
        if (!AuthorNameFormatter.startsWithUpper(words[words.length - 1])) {
            return words.join(' ');
        }

        let surname: string;
        let given: string[];

        if (words.length >= 3 && AuthorNameFormatter.PATRONYMIC.test(words[words.length - 1])) {
            // Фамилия Имя Отчество
            surname = words[0];
            given = words.slice(1);
        } else {
            // Имя [Отчество] Фамилия; частицы перед фамилией («de», «van») — часть фамилии
            let i = words.length - 1;
            while (i > 1 && !AuthorNameFormatter.startsWithUpper(words[i - 1])) i--;
            surname = words.slice(i).join(' ');
            given = words.slice(0, i);
        }

        return `${surname} ${given.map((w) => AuthorNameFormatter.initial(w)).join(' ')}`;
    }

    /** «Михаил» → «М.», «Жан-Поль» → «Ж.-П.» */
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
