import React from "react";

export const Sidebar = () => {
    
    
    const style = "h-6 w-6 cursor-pointer transform hover:scale-110 hover:text-indigo-400 ease-in-out duration-300"
    return (
        <div className="flex lg:fixed lg:h-full lg:w-16 h-16 w-full lg:left-0 z-30 lg:flex-col flex-row gap-12 my-2 rounded-2xl items-center justify-center lg:row-span-2 bg-opacity-20 bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" opacity="0.7">
            <a href="https://github.com/Chashm-e-Afreen" target="_blank" rel="noreferrer">
                <title>GitHub</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </a>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24">
            <a href="https://xn--mgbqf7g.com/%D8%B9%D8%B1%D9%88%D8%B6" target="_blank" rel="noreferrer">
                <path strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" opacity="0.7" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </a>
            </svg>
        </div>
    )
}