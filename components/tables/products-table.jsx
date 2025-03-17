import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TransactionsTable2({
  data = [
    {
      id: "728ed52f",
      image: {
        cell: (cell) => {
          return (
            <Image
              src="/assets/item-image.png"
              width={52}
              height={31}
              alt="item-image"
              className="relative"
            />
          );
        },
      },
      details: "AK-47 | Case Hardened",
      type: "Sell",
      transactionId: "12345566",
      status: "Pending",
      price: "$16.99",
      date: "2.10.23",
    },
    {
      id: "728e212d52f",
      image: () => (
        <Image
          src="/assets/item-image.png"
          width={52}
          height={31}
          alt="item-image"
          className="relative"
        />
      ),
      details: "AK-47 | Case Hardened",
      type: "Buy",
      transactionId: "12345566",
      status: "Done",
      price: "$16.99",
      date: "2.10.23",
    },
  ],
}) {
  return (
    <div>
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow className="!border-b-0 hover:bg-transparent">
            <TableHead className="text-tiny px-7 text-white text-opacity-20">
              Name
            </TableHead>
            <TableHead className="text-tiny px-7 text-white text-opacity-20">
              Link
            </TableHead>
            <TableHead className="text-tiny px-7 text-white text-opacity-20">
              Views
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.map((link, index) => (
              <TableRow
                key={link.id}
                className="text-tiny border-transparent bg-secondary-300"
              >
                <TableCell
                  className={cn(
                    "border-0 px-7",
                    index === 0 && "rounded-bl-lg rounded-tl-lg",
                    index === data.length - 1 && "rounded-br-lg rounded-tr-lg"
                  )}
                >
                  {link.status}
                </TableCell>
                {/* <TableCell>{link.id}</TableCell>
                  <TableCell>{link.viewCount}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow className="text-tiny border-transparent bg-secondary-300">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
