import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function CsCard({allcs, dict, lang, dummy}) {
  return (
    <ul
      info="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {allcs && allcs.filter((symptom) => symptom.cs_data).map((symptom) => (
        <li key={symptom.cs_key} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            {symptom.cs_data && symptom.cs_data.imageUrl ? <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={symptom.cs_data.imageUrl} alt="" />:""}
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {dummy? <a href={"/"+lang+"/app/newpat/"+symptom.cs_id+"/"+Date.now()}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {symptom.cs_data && symptom.cs_data.manifestation}
                </a>:<a href={"/"+lang+"/pat/"+symptom.cs_id}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  <span className='text-xs'>#{symptom.cs_id}</span> {symptom.cs_data.name_first} {symptom.cs_data.name_last}
                </a>}
              </p>
              {dummy?"":<p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {symptom.cs_data.manifestation}
              </p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{dummy ? "":symptom.cs_data.age+dict.general.year_abr+" "+dict.general.genders[symptom.cs_data.gender].adj}</p>
              {symptom.cs_data && symptom.cs_data.lastChange ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {dict.general.lastChange} <time dateTime={symptom.cs_data.lastChangeDateTime}>{symptom.cs_data.lastChange}</time>
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
