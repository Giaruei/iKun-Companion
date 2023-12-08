import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MolbieFooter from "./MolbieFooter";

async function SideBar({ children }: { children: React.ReactNode }) {
	const currentUser = await getCurrentUser();
	return (
		<div className="h-full">
			<DesktopSidebar currentUser={currentUser!} />
			<MolbieFooter />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}

export default SideBar;
