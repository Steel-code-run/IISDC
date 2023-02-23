import React, {FC} from 'react';
import styles from './Pagination.module.scss';

export interface PaginationProps {
}

const Pagination: FC<PaginationProps> = () => {
    return (
        <div className={styles.pagination} data-testid="Pagination">

        </div>

    )
};

export default Pagination;
