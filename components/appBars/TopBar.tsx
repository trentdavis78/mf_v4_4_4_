
import { Fragment, useContext, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import Button from "../buttons/Button";
import { ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { SessionContext } from "@/pages/_app";
import DropDownMenu, { Option } from "../menus/DropDownMenu";

export type TopBarProps = {
  className?: string
}

const TopBar = ({
  className = ''
}: TopBarProps) => {
  const [showLoginDropDown, setShowLoginDropDown] = useState<boolean>(false)

  const sessionContext = useContext(SessionContext)
  const session = sessionContext?.session;
  const sessionKit = sessionContext?.sessionKit;

  const handleLogin = async () => {
    if (!sessionContext || !sessionKit) {
      return;
    }

    const response = await sessionKit.login();
    const session = response.session;

    if (sessionContext.setSession) {
      sessionContext.setSession(session)
    }
  }

  const handleLogout = async () => {
    if (!sessionContext || !sessionKit) {
      return;
    }

    await sessionKit.logout();
    if (sessionContext.setSession) {
      sessionContext.setSession(undefined)
    }
  }

  const wallet = session?.actor.toString();
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <> <header
          className={`flex  w-full 
            border-b border-neutral-900
            items-center px-2 md:px-4 py-2 ${className}`}>
          <div className={`flex justify-start`}>
            <img src="https://imagedelivery.net/dCSlCQNYRsUOWJPw5n2BPQ/24b1ca57-ca74-43cf-015a-fb10dc948000/icon" alt="" />
          </div>
          <div className="hidden lg:ml-6 lg:flex flex-1 justify-end ">
            <div className="p space-x-4 ml-24">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                Sales
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Crafting

              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Merchandise
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Team
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Arcade
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Whitepaper
              </a>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Assets
              </a>
            </div>
          </div>
          <div className="flex flex-1 justify-end px-2 lg:ml-6 ">
            {/* <div className="w-full max-w-lg lg:max-w-xs ">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />  
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-slate-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-slate-900 focus:text-slate-900 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div> */}
          </div>
          <div className='flex flex-1 justify-end'>
            {
              wallet
                ? (
                  <div
                    className="relative">
                    <button
                      onMouseOver={() => setShowLoginDropDown(true)}
                      onMouseOut={() => setShowLoginDropDown(false)}
                      className="flex items-center">
                      <p
                        className="font-medium mr-1.5">
                        {wallet}
                      </p>
                      <UserCircleIcon
                        className="h-5 w-5 text-purple-600" />
                    </button>
                    <DropDownMenu
                      showMenu={showLoginDropDown}
                      setShowMenu={setShowLoginDropDown}>
                      <Option
                        onClick={handleLogout}>
                        <p
                          className="mr-2">
                          Log Out
                        </p>
                        <ArrowLeftOnRectangleIcon
                          className="h-5 w-5" />
                      </Option>
                    </DropDownMenu>
                  </div>
                )
                : (
                  <Button
                    onClick={handleLogin}>
                    <p
                      className="mr-2 up">
                        login
                    </p>
                    <ArrowRightOnRectangleIcon
                      className="h-5 w-5" />
                  </Button>
                )
            }
          </div>
        </header>


          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">

                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-400">tom@example.com</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


export default TopBar