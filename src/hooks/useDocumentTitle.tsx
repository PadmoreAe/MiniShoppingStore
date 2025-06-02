import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
    useEffect(() => {
        document.title = `${title} | Kraado`;
    }, [title]);
};

export default useDocumentTitle;