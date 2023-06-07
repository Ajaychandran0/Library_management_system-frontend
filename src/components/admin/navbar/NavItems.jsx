import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";
import ErrorIcon from "@mui/icons-material/Error";

const navMainItems = [
  {
    id: 0,
    icon: <DashboardIcon />,
    label: "Dashboard",
    items: [{ id: 0, label: "Home", route: "/admin" }],
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Members",
    items: [
      { id: 0, label: "View Members", route: "/admin/members" },
      { id: 1, label: "Add Members", route: "/admin/members/add" },
    ],
  },
  {
    id: 2,
    icon: <CategoryIcon />,
    label: "Categories",
    items: [
      { id: 0, label: "View Categories", route: "/admin/categories" },
      { id: 1, label: "Add Categories", route: "/admin/categories/add" },
    ],
  },
  {
    id: 3,
    icon: <BookIcon />,
    label: "Books",
    items: [
      { id: 0, label: "View Books", route: "/admin/books" },
      { id: 1, label: "Add Book", route: "/admin/books/add" },
    ],
  },
  {
    id: 4,
    icon: <LibraryBooksIcon />,
    label: "Book Transactions",
    items: [
      {
        id: 0,
        label: "Book Requests",
        route: "/admin/book-transactions/book-requests",
      },
      {
        id: 1,
        label: "Issue Book",
        route: "/admin/book-transactions/issue-books",
      },
      {
        id: 2,
        label: "Return Book",
        route: "/admin/book-transactions/return-books",
      },
      { id: 3, label: "Fine", route: "/admin/book-transactions/fine" },
    ],
  },
  {
    id: 5,
    icon: <ErrorIcon />,
    label: "Lost Books",
    items: [
      { id: 0, label: "View Lost Books", route: "/admin/lost_books" },
      { id: 1, label: "Add Lost Book", route: "/admin/lost_books/add" },
      { id: 2, label: "fine", route: "/admin/lost_books/fine" },
    ],
  },
];
export default navMainItems;
