import { generatePortalLink } from "@/lib/actions/generatePortalLink";

function ManageAccountButton() {
  return (
    <form action={generatePortalLink}>
      <button type="submit">Manage Billing</button>
    </form>
  );
}

export default ManageAccountButton;
