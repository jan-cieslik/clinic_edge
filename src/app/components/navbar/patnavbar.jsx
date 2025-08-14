"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { UserButton } from "@clerk/nextjs";
import LanguageSelector from "../elements/flagselector";
import { CEconfig } from "@/utils/logic/config";
import { formatDate } from "@/utils/logic/helper";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PatNavbar({ patid, pat_prom, lang, dict, children }) {
  const navigation = [
    {
      name: dict.pat.navigation.overview,
      href: "/" + lang + "/pat/" + patid,
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.anamnesis,
      href: "/" + lang + "/pat/" + patid + "/chat/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.requests,
      href: "/" + lang + "/pat/" + patid + "/requests/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.reports,
      href: "/" + lang + "/pat/" + patid + "/reports/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.findings,
      href: "/" + lang + "/pat/" + patid + "/findings/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.labs,
      href: "/" + lang + "/pat/" + patid + "/labs/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.diagnosis,
      href: "/" + lang + "/pat/" + patid + "/diagnosis/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: dict.pat.navigation.rx,
      href: "/" + lang + "/pat/" + patid + "/rx/",
      icon: HomeIcon,
      current: false,
    },
    // {
    //   name: "DEBUG",
    //   href: "/" + lang + "/pat/" + patid + "/debug/",
    //   icon: HomeIcon,
    //   current: false,
    // },
  ];
  const teams = [
    {
      id: 1,
      name: dict.app.navigation.allcases,
      href: "/" + lang + "/app",
      initial: "A",
      current: false,
    },
    { id: 2, name: dict.app.navigation.help, href: "/" + lang + "/app", initial: "H", current: false },
    { id: 3, name: dict.app.navigation.eval, href: "https://go.clinic-edge.org/eval" , initial: "E", current: false },
    { id: 4, name: dict.app.navigation.contact, href: "/" + lang + "/app", initial: "K", current: false },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [pat, setPat] = useState(null);
  useEffect(() => {
    if (pat_prom && pat_prom.then) {
      pat_prom.then((data) => {
        setPat(data);
      });
    } else {
      setPat(pat_prom);
    }
  }, [pat_prom]);

  return (
    <>
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-keyA-500 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-20 w-auto"
                        src="/logo_01.png"
                        alt="Clinic Edge"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-keyA-700 text-white"
                                      : "text-keyA-100 hover:text-white hover:bg-keyA-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-keyA-100 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-keyA-100">
                            {dict.general.more}
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-keyA-700 text-white"
                                      : "text-keyA-100 hover:text-white hover:bg-keyA-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-keyA-400  bg-keyA-700 text-[0.625rem] font-medium text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-keyA-100 hover:bg-keyA-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-keyA-100 group-hover:text-white"
                              aria-hidden="true"
                            />
                            {dict.general.settings}
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-keyA-500 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-20 w-auto"
                src="/logo_01.png"
                alt="Clinic Edge"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-keyA-700 text-white"
                              : "text-keyA-100 hover:text-white hover:bg-keyA-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-keyA-100 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-keyA-100">
                    {dict.general.more}
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-keyA-700 text-white"
                              : "text-keyA-100 hover:text-white hover:bg-keyA-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-keyA-400  bg-keyA-700 text-[0.625rem] font-medium text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-keyA-100 hover:bg-keyA-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-keyA-100 group-hover:text-white"
                      aria-hidden="true"
                    />
                    {dict.general.settings}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div className="relative flex flex-1 items-center">
                <p>{pat ? <> {pat.pat_data.name_last}, {pat.pat_data.name_first} *{formatDate(pat.pat_data.dob, lang)} ({pat.pat_data.gender})</> : ""}</p>
              </div>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <LanguageSelector languages={CEconfig.lang.supported} selectedLang={lang} />
                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <UserButton />
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
