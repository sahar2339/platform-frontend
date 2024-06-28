/// <reference types="vite-plugin-svgr/client" />
import Thumbnail from "@/assets/account-thumbnails/color-3.svg?react";
import Typography from "@components/typography/Typography";
import React from "react";
import { MenuItem } from "@components/menu/items";
import TableRow from "@components/table/row/TableRow";
import { MemberRole } from "@hooks/members/useMembers";
type MemberRowProps = {
  username: string;
  role: MemberRole,
  lastActive: string;
};

const menuItems: (name: string) => MenuItem[] = () => [
  { label: "Remove member", path: `` },

];

const MemberRow = React.memo(({ username, role,lastActive}: MemberRowProps) => {
  return (
    <TableRow menuItems={menuItems(username)}>
      <td className="relative flex justify-center items-center">
      <div className="relative flex justify-center items-center">
        <Thumbnail />
        <div className="text-white absolute inset-0 flex justify-center items-center">
          {username[0].toUpperCase()}
        </div>
      </div>

      <div className="flex flex-col pl-3 flex-grow overflow-hidden justify-center">
        <Typography
          variant="headline-xs"
          className="text-mono/basic-1 truncate "
        >
          {username}
        </Typography>
      </div>
      </td>
      <td>
            <Typography variant="label-md" className="text-mono/basic-5">
              {lastActive}
            </Typography>
      </td>
      <td>
        <Typography variant="label-md" className="text-mono/basic-5">
          {role}
        </Typography>
      </td>
    </TableRow>
  );
});

export default MemberRow;
