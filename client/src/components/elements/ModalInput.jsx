export default function ModalInput(props) {
    const { label, type, name, id, placeholder, value, onChange, classname } = props
    return (
        <>
            <div className="flex flex-col w-full">
                <label className="text-sm font-semibold mb-2">{label}</label>
                <input
                    className={`${classname ? `${classname} ` : 'w-full rounded-lg border-gray-200 text-sm shadow-sm border border-grey-200 mb-4 p-2 flex items-start'}`}
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
        </>
    )
}