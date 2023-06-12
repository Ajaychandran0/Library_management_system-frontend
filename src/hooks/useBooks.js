import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterBooks,
  getBooks,
  reset,
} from "../features/member/books/bookSlice";

const useBooks = ({ searchValue, filter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { books, totalPages } = useSelector(state => state.books);
  const defaultPagination = {
    page: 0,
    pageSize: 8,
  };

  const [paginationModel, setPaginationModel] = useState(defaultPagination);
  const handlePagination = (event, page) => {
    setCurrentPage(page);
    setPaginationModel({ page: page - 1, pageSize: 8 });
  };

  useEffect(() => {
    if (searchValue && searchValue === search) {
      dispatch(filterBooks({ ...paginationModel, filter: searchValue }));
    } else if (searchValue) {
      setSearch(searchValue);
      setCurrentPage(1);
      dispatch(filterBooks({ ...defaultPagination, filter: searchValue }));
    } else {
      dispatch(getBooks({ ...paginationModel, ...filter }));
    }

    return () => {
      dispatch(reset());
    };
  }, [searchValue, paginationModel]);

  return { handlePagination, currentPage, books, totalPages };
};

export default useBooks;
