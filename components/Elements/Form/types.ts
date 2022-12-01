export type TField = {
    name: string;
    label: string;
    value?: string;
    disabled?: boolean;
    autoFocus?: boolean;
};
export type TFormStatus = {
    disabled?: boolean;
};
export type TRules = {
    rules?: { required?: boolean; };
};

type TRulesText = TRules & {
    rules?: {
        min?: number;
        max?: number;
    };
};

export type TFieldText = TField & TRulesText & { multiline?: boolean };
export type TFieldEmail = TField & TRules;

export type TSchema = Array<{ text: TFieldText } | { email: TFieldEmail }>;

export interface IValidate {
    (schemaIn: TField & { rules: any }): TField & { schema: any };
}
