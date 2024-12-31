import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ArrowUpDown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "../axios/axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserData } from "@/types/datea";

const UserDataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const RECORDS_PER_PAGE = 10;
  const [maxPage, setMaxPage] = useState(0);

  useEffect(() => {
    axios(`/api/v1/en/user?row=${RECORDS_PER_PAGE}&page=${activePage}`)
      .then((data) => {
        console.log(data.data);
        setMaxPage(Math.ceil(data.data.total / RECORDS_PER_PAGE));
        setData(data.data.result);
      })
      .catch((err) => console.log(err));
  }, [activePage]);

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "profileImage",
      header: () => {
        return <Button variant="ghost">Profile</Button>;
      },
      cell: ({ row }) => {
        const profileImage = row.getValue("profileImage");
        const userName = row.original.name || "User";
        const initials = userName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <Avatar className="h-10 w-10">
            {profileImage ? (
              <AvatarImage
                src={profileImage as string}
                alt={`${userName}'s profile`}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-slate-100">
              {profileImage === null ? (
                <UserCircle className="h-6 w-6 text-slate-400" />
              ) : (
                initials
              )}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("createdAt");
        return new Date(date as Date).toLocaleDateString();
      },
    },
    {
      accessorKey: "isArchived",
      header: "Archived",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>User Profile Details</CardTitle>

          <button
            className="bg-red-500 text-white px-2 py-1"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            logout
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <div className="flex gap-4 mb-10 justify-end px-8">
        <button
          className="bg-blue-500 text-white px-5 py-1 rounded-md"
          onClick={() => {
            setActivePage((prev) => (prev === 1 ? 1 : prev - 1));
          }}
        >
          &lt;
        </button>
        <button
          className="bg-blue-500 text-white px-5 py-1 rounded-md"
          onClick={() => {
            setActivePage((prev) => (prev >= maxPage ? maxPage : prev + 1));
          }}
        >
          &gt;
        </button>
      </div>
    </Card>
  );
};

export default UserDataTable;
