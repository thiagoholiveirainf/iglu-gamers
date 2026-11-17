import * as React from 'react';
import * as layoutStyles from "./index.module.css";

export default function Layout({ children }) {
    return (
        <main>
             {children}
        </main>
    );
}