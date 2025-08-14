import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function CaseCardStart({data, dict, lang}) {
  return (
    <ul
      info="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {data.map((CaseTemplates) => (
        <li key={CaseTemplates.case_id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href={"/"+lang+"/app/newpat/direct/"+CaseTemplates.case_id+"/"+Date.now()}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {CaseTemplates.internal_name}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {CaseTemplates.internal_comment}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">...</p>
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Neuer Fall</p>
                </div>
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  )
}
