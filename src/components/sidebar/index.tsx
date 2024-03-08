import { getAuthUserDetails } from "@/lib/queries";
import React from "react";
import MenuOptions from "./menu-options";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async ({ id, type }: Props) => {
  const user = await getAuthUserDetails();
  if (!user?.Agency) return null;

  const details =
    type === "agency"
      ? user?.Agency
      : user?.Agency?.SubAccount.find((subaccount) => subaccount.id === id);

  const isWhiteLabelAgency = user.Agency.whiteLabel;

  if (!details) return;

  let sideBarLogo = user.Agency.agencyLogo || "/assets/plura-logo.svg";

  if (!isWhiteLabelAgency) {
    if (type === "subaccount") {
      sideBarLogo =
        user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.subAccountLogo || user.Agency.agencyLogo;
    }
  }

  const sideBarOpt =
    type === "agency"
      ? user.Agency.SidebarOption || []
      : user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
          ?.SidebarOption || [];

  const subaccounts = user.Agency.SubAccount.filter((subaccount) =>
    user.Permissions.find(
      (permission) =>
        permission.subAccountId === subaccount.id && permission.access
    )
  );
  return (
    <>
      <MenuOptions
        defaultOpen={true}
        details={details}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sideBarOpt}
        subAccounts={subaccounts}
        user={user}
        id={id}
      />
      <MenuOptions
        defaultOpen={true}
        details={details}
        sidebarLogo={sideBarLogo}
        sidebarOpt={sideBarOpt}
        subAccounts={subaccounts}
        user={user}
        id={id}
      />
    </>
  );
};

export default Sidebar;
