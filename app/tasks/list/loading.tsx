import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import { idxs, tableHeaders } from "../consts";

import classNames from "classnames";
import TaskActions from "./TaskActions";

const LoadingTaskPage = (): JSX.Element => {
  return (
    <>
      <TaskActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {tableHeaders.map((header, idx) => {
              return (
                <Table.ColumnHeaderCell
                  key={idx}
                  className={classNames({
                    "hidden md:table-cell":
                      header === "Status" || header === "Created",
                  })}
                >
                  {header}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {idxs.map((idx) => {
            return (
              <Table.Row key={idx}>
                <Table.Cell>
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <Skeleton />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingTaskPage;
