import { Fragment, useContext } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { navigation } from '../navigation';
import { DashboardContextType, DashboardContext } from '@/lib/contexts/DashboardContext';
import { useRouter } from 'next/router';
import DashboardInnerHeader from '../DashboardInnerHeader';
import { signOut } from 'next-auth/react';
import { DashboardProps } from '@/types/sharedTypes';
import Link from 'next/link';

function classNames({ classes = [] }: { classes?: any[] } = {}) {
    return classes.filter(Boolean).join(' ');
}

export const InnerDashboardLayout = ({ session, children }: DashboardProps) => {
    const { currentFunds, setSideBarOpen, sideBarOpen } = useContext<DashboardContextType>(DashboardContext);
    const router = useRouter();
    const currentRoute = router.route;

    return (
        <div className="min-h-full">
            <Transition.Root show={sideBarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSideBarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-opacity/75 fixed inset-0 bg-gray-600" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4 pt-5">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute right-0 top-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSideBarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex shrink-0 items-center px-4">
                                    <h2 className="text-2xl font-extrabold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                        Creator Studio
                                    </h2>
                                </div>
                                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                                    <nav className="px-2">
                                        <div className="space-y-1">
                                            {navigation(currentRoute).map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames({
                                                        classes: [
                                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                            'group flex items-center rounded-md px-2 py-2 text-base font-medium leading-5'
                                                        ]
                                                    })}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    <item.icon
                                                        className={classNames({
                                                            classes: [
                                                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                                'mr-3 h-6 w-6 flex-shrink-0'
                                                            ]
                                                        })}
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                        <div className="mt-8">
                                            <Link href="/tsAndCs">
                                                <h3 className="px-3 text-sm font-medium text-gray-500" id="mobile-teams-headline">
                                                    Terms and Conditions
                                                </h3>
                                            </Link>
                                        </div>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 shrink-0" aria-hidden="true">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
                <div className="flex shrink-0 items-center px-6">
                    {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500" alt="Your Company" /> */}
                </div>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
                    {/* User account dropdown */}
                    <Menu as="div" className="relative inline-block px-3 text-left">
                        <div>
                            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                <span className="flex w-full items-center justify-between">
                                    <span className="flex min-w-0 items-center justify-between space-x-3">
                                        {session?.user?.image && <img className="h-10 w-10 shrink-0 rounded-full bg-gray-300" src={session.user.image} alt="No Image Url" />}
                                        <span className="flex min-w-0 flex-1 flex-col">
                                            <span className="truncate text-sm font-medium text-gray-900">{session?.user?.name}</span>
                                            <span className="truncate text-sm text-gray-500">{session?.user?.email}</span>
                                        </span>
                                    </span>
                                    <ChevronUpDownIcon className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                </span>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="ring-opacity/5 absolute inset-x-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/portal/account"
                                                className={classNames({
                                                    classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                })}
                                            >
                                                Settings
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/portal/stripe/payments/choose-top-up-method"
                                                className={classNames({
                                                    classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                })}
                                            >
                                                Top Up your Funds
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="#"
                                                className={classNames({
                                                    classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                })}
                                            >
                                                Support
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                onClick={async () => await signOut({ callbackUrl: `${window.location.origin}/login` })}

                                                className={classNames({
                                                    classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                })}
                                            >
                                                Logout
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {/* Navigation */}
                    <nav className="mt-6 px-3">
                        <div className="space-y-1">
                            {navigation(currentRoute).map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames({
                                        classes: [
                                            item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                        ]
                                    })}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <item.icon
                                        className={classNames({
                                            classes: [item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 h-6 w-6 flex-shrink-0']
                                        })}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="mt-8">
                            {/* Secondary navigation */}
                            <Link href="/tsAndCs">
                                <h3 className="px-3 text-sm font-medium text-gray-500" id="desktop-teams-headline">
                                    Terms and Conditions
                                </h3>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Main column */}
            <div className="flex flex-col lg:pl-64">
                {/* Search header */}
                <div className="sticky top-0 z-10 flex h-16 shrink-0 border-b border-gray-200 bg-white lg:hidden">
                    <button
                        type="button"
                        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                        onClick={() => setSideBarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-1">
                            {/* <form className="flex w-full md:ml-0" action="#" method="GET">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <input
                                        id="search-field"
                                        name="search-field"
                                        className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </form> */}
                        </div>
                        <div className="flex items-center">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={session?.user?.image ?? ''} alt="" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="ring-opacity/5 absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames({
                                                            classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                        })}
                                                    >
                                                        View profile
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames({
                                                            classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                        })}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames({
                                                            classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                        })}
                                                    >
                                                        Notifications
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames({
                                                            classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                        })}
                                                    >
                                                        Support
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => {
                                                            signOut({
                                                                callbackUrl: '/login'
                                                            });
                                                        }}
                                                        href="#"
                                                        className={classNames({
                                                            classes: [active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']
                                                        })}
                                                    >
                                                        Logout
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                <main className="flex-1">
                    <DashboardInnerHeader currentFunds={currentFunds} />
                    <div className="bg-white px-4">{children}</div>
                </main>
            </div>
        </div>
    );
};
