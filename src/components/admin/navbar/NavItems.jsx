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
    route: "/admin",
  },
  {
    id: 1,
    icon: <PeopleIcon />,
    label: "Members",
    route: "/admin/members",
  },
  {
    id: 2,
    icon: <CategoryIcon />,
    label: "Categories",
    route: "/categories",
  },
  {
    id: 3,
    icon: <BookIcon />,
    label: "Books",
    route: "/books",
  },
  {
    id: 4,
    icon: <LibraryBooksIcon />,
    label: "Book Transactions",
    route: "/book-transactions",
  },
];
export default navMainItems;
