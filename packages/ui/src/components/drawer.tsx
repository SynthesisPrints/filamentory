'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ComponentProps, Fragment } from 'react';
import { FaXmark } from 'react-icons/fa6';

export type DrawerProps = ComponentProps<'div'> & {
	show?: boolean;
	onClose?: (value: boolean) => void;
	header?: string | null;
};

export const Drawer = ({ children, show, onClose, header }: DrawerProps) => {
	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog className="relative z-50" onClose={(value) => onClose?.(value)}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="transform transition ease-in-out duration-500"
					enterFrom="-translate-x-full"
					enterTo="translate-x-0"
					leave="transform transition ease-in-out duration-500"
					leaveFrom="translate-x-0"
					leaveTo="-translate-x-full"
				>
					<div className="fixed inset-y-0 left-0 max-w-full overflow-hidden pointer-events-none">
						<Dialog.Panel className="relative grid grid-rows-[auto_1fr_auto] gap-4 w-screen h-full max-w-sm p-4 pointer-events-auto bg-base-100">
							<button type="button" className="absolute top-1 right-1 btn btn-ghost" onClick={() => onClose?.(false)}>
								<FaXmark />
							</button>
							{header && <Dialog.Title className="pr-4 text-2xl text-center font-bold">{header}</Dialog.Title>}
							{children}
						</Dialog.Panel>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition.Root>
	);
};
