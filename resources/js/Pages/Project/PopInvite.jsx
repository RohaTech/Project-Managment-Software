import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react'

function PopInvite({}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
    <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-slate-200 rounded-lg p-6 w-full max-w-sm">
            <DialogTitle>Invite Team Members</DialogTitle>
            <form className="">

            </form>
        </Dialog.Panel>
    </div>
</Dialog>
)
}

export default PopInvite
