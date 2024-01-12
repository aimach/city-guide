import React, { ReactNode } from "react";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import { IoPencil, IoTrash } from "react-icons/io5";
import { faCity, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface TableProps<T> {
  data?: T[];
  columnTitles: string[];
  renderColumns: ((item: T) => ReactNode)[];
  showCheckboxes?: boolean;
  onSelect?: (item: T) => void;
  onUpdate?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function Table<T>({
  data = [],
  columnTitles,
  renderColumns,
  showCheckboxes = false,
  onSelect,
  onUpdate,
  onDelete,
}: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {showCheckboxes && <th></th>}
          {columnTitles.map((title, index) => (
            <th key={index}>{title}</th> // Utilisez les titres de colonne ici
          ))}
          {onUpdate && <th>Modifier</th>}
          {onDelete && <th>Supprimer</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {showCheckboxes && (
              <td>
                <Checkbox onChange={() => onSelect && onSelect(item)} />
              </td>
            )}
            {renderColumns.map((renderColumn, columnIndex) => (
              <td key={columnIndex}>{renderColumn(item)}</td>
            ))}
            {onUpdate && (
              <td>
                <Button icon={faPen} onClick={() => {}} typeButton={""} />
              </td>
            )}
            {onDelete && (
              <td>
                <Button icon={faTrashCan} onClick={() => {}} typeButton={""} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
