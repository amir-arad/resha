declare module 'tape-worm';

declare module 'browserify-middleware';

declare module 'simple-html-index' {
    import {Readable} from 'stream'
    export = createHtml;

    interface Options {
        base?: string;
        css?: string;
        favicon?: boolean;
        title?: string;
        entry?: string;
        lang?: string;
        dir?: 'ltr' | 'rtl';
    }

    function createHtml(opt?: Options): Readable;
}
