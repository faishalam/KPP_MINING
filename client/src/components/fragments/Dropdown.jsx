import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Arlene Mccoy' },
    { id: 5, name: 'Devon Webb' },
]

export default function Dropdown() {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(people[1])

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <>
            <div>
                
            </div>

            <div className="w-52 mb-4">
                <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')} __demoMode>
                    <div className="relative">
                        <ComboboxInput
                            className={clsx(
                                'w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-sm/6 text-black border shadow',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            displayValue={(person) => person?.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                            <ChevronDownIcon className="size-4 fill-black group-data-[hover]:fill-black" />
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions
                        anchor="bottom"
                        transition
                        className={clsx(
                            'w-[var(--input-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                    >
                        {filteredPeople.map((person) => (
                            <ComboboxOption
                                key={person.id}
                                value={person}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200"
                            >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/6 text-black">{person.name}</div>
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
        </>
    )
}
