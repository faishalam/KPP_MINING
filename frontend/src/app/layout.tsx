import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <html lang="en">
                <body className="max-w-full min-h-screen">
                    {children}
                </body>
            </html>
        </>
    );
}
