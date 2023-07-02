import {useCallback, useState} from "react";

export const useTable = (type) => {
    if (type === 'grants') {

        const [pageGrants, setPageGrants] = useState(1);
        const [rowsPerPageGrants, setRowsPerPageGrants] = useState(5);

        const handlePageChangeGrants = useCallback(
            (event, value) => {
                setPageGrants(value);
            },
            []
        );

        const handleRowsPerPageChangeGrants = useCallback(
            (event) => {
                setRowsPerPageGrants(event.target.value);
            },
            []
        );

        return [
            pageGrants,
            setPageGrants,
            rowsPerPageGrants,
            setRowsPerPageGrants,
            handlePageChangeGrants,
            handleRowsPerPageChangeGrants
        ]

    } else if (type === 'competitions') {

        const [pageCompetitions, setPageCompetitions] = useState(1);
        const [rowsPerPageCompetitions, setRowsPerPageCompetitions] = useState(5);

        const handlePageChangeCompetitions = useCallback(
            (event, value) => {
                setPageCompetitions(value);
            },
            []
        );

        const handleRowsPerPageChangeCompetitions = useCallback(
            (event) => {
                setRowsPerPageCompetitions(event.target.value);
            },
            []
        );

        return [
            pageCompetitions,
            setPageCompetitions,
            rowsPerPageCompetitions,
            setRowsPerPageCompetitions,
            handlePageChangeCompetitions,
            handleRowsPerPageChangeCompetitions
        ]
    } else if (type === 'internships') {
        const [pageInternships, setPageInternships] = useState(1);
        const [rowsPerPageInternships, setRowsPerPageInternships] = useState(5);


        const handlePageChangeInternships = useCallback(
            (event, value) => {
                setPageInternships(value);
            },
            []
        );

        const handleRowsPerPageChangeInternships = useCallback(
            (event) => {
                setRowsPerPageInternships(event.target.value);
            },
            []
        );

        return [
            pageInternships,
            setPageInternships,
            rowsPerPageInternships,
            setRowsPerPageInternships,
            handlePageChangeInternships,
            handleRowsPerPageChangeInternships
        ]

    }



}