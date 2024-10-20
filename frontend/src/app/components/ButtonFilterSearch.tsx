import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useHomeContext } from '../providers/rootProviders/HomeProviders'

export default function ButtonFilterSearch() {
    const {
        
    } = useHomeContext()

    const handleSelectBy = (value: string) => {
        // setSearchBy(value)
    }

    return (
        <div className="w-full max-w-[170px] shadow">
            <Field>
                <div className="relative w-full p-1 max-w-full bg-gray-400 rounded hover:bg-gray-500 transition-all">
                    <Select
                        onChange={(e) => handleSelectBy(e.target.value)}
                        className={clsx(
                            'block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-[12px] text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            '*:text-black'
                        )}
                    >
                        <option value="namaAsset">Search by Nama Asset</option>
                        <option value="namaUser">Search by Nama User</option>
                    </Select>
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                        aria-hidden="true"
                    />
                </div>
            </Field>
        </div>
    )
}
