/* eslint-disable react/prop-types */

const InputGroup = ({ htmlFor, type, name, value, onChange, placeholder, className, required,error, touched }) => {
    return (
        <div>
            <label htmlFor={htmlFor}></label>
            <input
                type={type}
                name={name}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`appearance-none rounded-md relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm ${className}`}
                
            />
            <div className="lastName" />
          {error && touched ? (
            <div className="text-red-500">{error}</div>
          ) : null}
        </div >
    )
}

export default InputGroup

