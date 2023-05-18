import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CategoryIcon from "@mui/icons-material/Category";

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
      { id: 0, label: "Issue Book", route: "/admin/issue-books" },
      { id: 1, label: "Fine", route: "/admin/fine" },
    ],
  },
];
export default navMainItems;
