import {useId} from 'react';

export interface RadioOption<T> {
    value: T;
    label: string;
}

interface RadioGroupProps<T> {
    label: string;
    name?: string;
    options: RadioOption<T>[];
    value: T;
    onChange: (value: T) => void;
    disabled?: boolean;
}

function RadioGroup<T extends string | number | boolean>({
    label,
    name,
    options,
    value,
    onChange,
    disabled = false,
}: RadioGroupProps<T>) {
    const generatedName = useId();
    const groupName = name ?? generatedName;

    return (
        <fieldset className="flex flex-wrap gap-8" disabled={disabled}>
            <legend className="visually-hidden">{label}</legend>
            {options.map((option, index) => {
                const checked = option.value === value;
                return (
                    <label key={String(option.value)} className="cursor-pointer">
                        <input
                            type="radio"
                            name={groupName}
                            value={String(index)}
                            checked={checked}
                            onChange={() => onChange(option.value)}
                            className="peer visually-hidden"
                        />
                        <span
                            className={[
                                'inline-block rounded-12 py-22 px-20 text-white select-none transition-colors',
                                'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
                                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                                checked ? 'bg-accent' : 'bg-accent-6 hover:bg-accent/80',
                            ].join(' ')}
                        >
                            {option.label}
                        </span>
                    </label>
                );
            })}
        </fieldset>
    );
}

export default RadioGroup;
