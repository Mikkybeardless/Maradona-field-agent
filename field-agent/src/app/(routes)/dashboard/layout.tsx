import { DashboardNav } from "@/app/_components/dashboard-nav/dashboard-nav"

export default function LoginLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section className="bg-['#FAFAFA']">
            <div className="mx-auto w-10/12 max-w-[80rem]">
                <DashboardNav />
                {children}
            </div>
        </section>
    )

}
