import React, { useState } from 'react'
import { cn as bem } from '@bem-react/classname';
import useStore from '../../store/use-store';
import './style.css';

function Pagination({ count }) {
    const cn = bem('Pagination');
    const store = useStore();
    const [currentPage, setCurrentPage] = useState(1);

    function generatePageNumbers() {
        const pageNumbers = [];
        const countPages = Math.ceil(count / 10);
        const left = currentPage - 1 // левое соседнее число
        const right = currentPage + 1 // правое соседнее число

        // добавление страницы в диапазоне
        function range(start, end) {
            for (let i = start; i <= end; i++) {
                addPangerNumber(i)
            }
        }
        // добавление страницы
        function addPangerNumber(page) {
            if (page > 0 && page <= countPages) {
                pageNumbers.push(page);
            }
        }
        // если количество страниц маленькое, то выводим все страницы
        if (countPages < 7) {
            range(1, countPages);
            return pageNumbers
        }

        if (left > 2) {
            addPangerNumber(1)
            pageNumbers.push('...')
            
            if (currentPage === countPages) {
                range(left - 1, countPages)
            }
            else {
                range(left, right)
            }
        } 
        else if (left === 2) {
            range(1, 4)
        }
        else {
            range(1, 3)
        }

        if (right === countPages - 1) {
            addPangerNumber(countPages)
        }
        else if (right < countPages - 1) {
            pageNumbers.push('...')
            addPangerNumber(countPages)
        }
        
        return pageNumbers; 
    }
    function handleNext(page) {
        store.actions.catalog.load(10, (page - 1) * 10);
    }
    return ( 
        <div className={cn()}>
            {generatePageNumbers().map((page, index) => (
                page === '...'
                ?
                <span key={index}>{page}</span>
                :
                <button 
                    className={page === currentPage ? cn('page-active') : cn('page')} 
                    key={index} 
                    onClick={() => {setCurrentPage(page); handleNext(page)}}
                    >
                        {page}
                </button>
            ))}
        </div>
    );

}
export default React.memo(Pagination)