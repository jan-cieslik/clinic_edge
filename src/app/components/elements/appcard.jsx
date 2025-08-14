export default function AppCard({ title, classname, children }) {
    return (
        <div className={classname + " shadow sm:rounded-lg px-2 sm:px-4 py-4"}>
            {title != null ? <div className="px-4 py-4 sm:px-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    {title}
                </h3>
            </div> : ""}
            
            <div className={"border-t border- border-gray-100" + (title != null ? " pt-4" : "")}>
                {children}
            </div>
        </div>
    )
}
