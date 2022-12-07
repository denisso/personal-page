export enum EErrorAPI {
    noError = 0,
    limitReached = "the plan limit has been reached", // the plan limit has been reached, it is useless to try until the end of the period
    requestError = "request error, you can try to update later", // request error, you can try to update later
}

export type TErrorAPI = {
    error: EErrorAPI | boolean;
};

export enum EEntities {
    category = "Category",
    pages = "Pages",
    posts = "Posts",
    notes = "Notes",
    blog = "Blog",
}

export type TEntities = {
    category: "Category";
    pages: "Pages";
    posts: "Posts";
    notes: "Notes";
    blog: "Blog";
};

export type TError = string | boolean;

export type THandleResponseResult<T = TPropsGeneric> = {
    [key: string]: {
        [key: string]: any;
        items?: Array<T>;
    };
};

export type TResponseGeneric<T = TPropsGeneric> = {
    data: THandleResponseResult<T> | Array<T>;
    error: TError;
};

export const entitiesNames: {
    [type in keyof TEntities]: { single: string; mulpiple: string };
} = {
    category: { single: "Категория", mulpiple: "Категории" },
    pages: { single: "Страница", mulpiple: "Страницы" },
    posts: { single: "Пост", mulpiple: "Посты" },
    notes: { single: "Заметка", mulpiple: "Заметки" },
    blog: { single: "Запись в блоге", mulpiple: "Записи в блоге" },
};

export type TJobs = Partial<{
    company: string;
    description: string;
    responsibilities: string;
    dateFrom: Date;
    dateTo: Date | string | undefined;
}>;

export type TMenuItem = Partial<{
    type: keyof TEntities;
    title: string;
    slug: string;
    total: number;
}>;

export type TMenu = {
    menu: Array<TMenuItem>;
};

export type TImage = {
    height: number;
    width: number;
    url: string;
    path: string;
};

export type TRefLinks = Partial<{
    [type: string]: Array<TPropsGeneric>;
    _all: Array<TPropsGeneric>;
}>;

export type TPropsGeneric = Partial<{
    id: string;
    title: string;
    subtitle: string;
    slug: string;
    image: TImage;
    body: string;
    type: string;
    publishedAt: string;
    firstPublishedAt: string;
    _extra: any; // don't think about it too much
    [key: string]: any; // don't think about it too much
    ref: TRefLinks;
    links: TRefLinks;
}>;

export type TPageGeneric = {
    data: TPropsGeneric;
    error?: string | boolean;
};

export type TPageHome = TPageGeneric & {
    data: {
        hello?: string;
        short?: string;
    };
};
export interface IGetEntityById<T> {
    ({ id }: { id: string }): Promise<T>;
}
export interface IGetEntityBySlugGeneric<T> {
    ({ slug, type }: { slug: string; type: string }): Promise<T>;
}

export type TPath = {
    params: { [key: string]: string };
};
export type TPathArray = Array<TPath>;
