import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function CasesCard({allcases, dict, lang, dummy}) {
  if (!allcases || allcases.length === 0) {
    return (
      <div className="text-center mb-4">
        {dict.app.general.no_cases_found}
      </div>
    )
  }
  return (
    <ul
      info="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {allcases.map((patient) => (
        <li key={patient.pat_id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={patient.pat_data.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {dummy? <a href={"/"+lang+"/app/newpat/"+patient.pat_id+"/"+Date.now()}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {patient.pat_data.manifestation}
                </a>:<a href={"/"+lang+"/pat/"+patient.pat_id}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  <span className='text-xs'>#{patient.pat_id}</span> {patient.pat_data.name_first} {patient.pat_data.name_last}
                </a>}
              </p>
              {dummy?"":<p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {patient.pat_data.manifestation}
              </p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{dummy ? "":patient.pat_data.age+dict.general.year_abr+" "+dict.general.genders[patient.pat_data.gender].adj}</p>
              {patient.pat_data.lastChange ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {dict.general.lastChange} <time dateTime={patient.pat_data.lastChangeDateTime}>{patient.pat_data.lastChange}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Neuer Fall</p>
                </div>
              )}
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  )
}
