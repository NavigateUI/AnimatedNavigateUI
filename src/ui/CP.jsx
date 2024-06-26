'use client';
import { useEffect, useState } from 'react';
import { RiBookmark2Fill, RiBookmark2Line } from 'react-icons/ri';
import Highlighter from './Highlighter';
import { addBookmark, getBookmarkById, removeBookmark } from './Client';

export default function CP({ children, code, info }) {
    const [tabNum, setTabNum] = useState(0);
    const [cat, setCat] = useState();
    const [bookmarked, setBookmarked] = useState(false);
    const totalConfig = [
        {
            item: 0,
            name: 'Preview',
            component: <div className="h-full w-full px-5 py-10">{children}</div>
        },
        {
            item: 1,
            name: 'React',
            component: <Highlighter code={code} />
        }
    ];
    useEffect(() => {
        const categories = ['components', 'animated', 'blocks'];
        const category = categories.find((cat) => info?.url?.includes(cat)) || '';
        const bookmarkInfo = getBookmarkById(category, info?.id);
        setCat(category);
        if (bookmarkInfo) {
            setBookmarked(true);
        }
    }, [info]);

    return (
        <div className={`relative my-5 h-fit w-full min-w-80 max-w-full`} id={info?.id}>
            <div className="item-center mb-2 flex justify-between gap-2">
                <div className="flex w-full items-center justify-between">
                    <div className={`item-center ${tabNum === 1 ? 'border-sky-500' : 'border-gray-800 dark:border-slate-400/50'} relative flex overflow-hidden rounded-sm border duration-300`}>
                        <div
                            className={`absolute z-30 flex h-9 w-20 items-center ${tabNum === 1 ? 'bg-sky-500' : 'bg-gray-800 dark:bg-slate-400/50'}  duration-300`}
                            style={{ transform: `translateX(${tabNum * 101}%)` }}
                        ></div>

                        <button
                            onClick={() => setTabNum(0)}
                            className={`z-40 w-20 cursor-pointer select-none px-3 py-2 text-center text-sm ${tabNum === 0 ? 'text-white' : 'text-black dark:text-white'} `}
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => setTabNum(1)}
                            className={`z-40 w-20 cursor-pointer select-none px-3 py-2 text-center text-sm ${tabNum === 1 ? 'text-white' : 'text-black dark:text-white'} `}
                        >
                            React
                        </button>
                    </div>
                    {info && (
                        <div className="text-xl">
                            {bookmarked ? (
                                <RiBookmark2Fill
                                    onClick={() => {
                                        removeBookmark(cat, info.id);
                                        setBookmarked(!bookmarked);
                                    }}
                                />
                            ) : (
                                <RiBookmark2Line
                                    onClick={() => {
                                        addBookmark(cat, info);
                                        setBookmarked(!bookmarked);
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className={`relative mb-20 w-full rounded-sm`}>
                <div
                    className={`absolute inset-0 -z-50 overflow-hidden rounded-sm backdrop-blur-lg ${tabNum === 1 ? 'bg-slate-800 dark:bg-slate-400/20' : 'border border-gray-300/80 dark:border-gray-50/10'}`}
                ></div>
                {totalConfig[tabNum].component}
            </div>
        </div>
    );
}
