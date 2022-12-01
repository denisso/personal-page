/**
 * not implemented yet
 */
import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_KEY,
});

interface ITokenGenerate {
    (): Promise<string>;
}
export const tokenGenerate: ITokenGenerate = () => {
    return new Promise((resolve, reject) => {
        client
            .query(q.Create(q.Collection("tokens")))
            .then((ret: any) => {
                const token = ret?.ref?.value?.id;
                if (typeof token === "string") {
                    resolve(token);
                } else {
                    reject("token not valid" + Date.now());
                }
            })
            .catch((err) =>
                reject(
                    `Error: ${err.name}, ${err.message}, ${
                        err.errors()[0].description
                    }`
                )
            );
    });
};
interface ITokenExist {
    (token: string): Promise<boolean>;
}
export const tokenExist: ITokenExist = (token) => {
    return new Promise((resolve, reject) => {
        client
            .query(q.Get(q.Ref(q.Collection("tokens"), token)))
            .then(() => resolve(true))
            .catch(() => reject(true));
    });
};

interface ITokenDelete {
    (token: string): Promise<boolean>;
}

export const tokenDelete: ITokenDelete = (token) => {
    return new Promise((resolve, reject) => {
        client
            .query(q.Delete(q.Ref(q.Collection("tokens"), token)))
            .then(() => resolve(true))
            .catch(() => reject(true));
    });
};
